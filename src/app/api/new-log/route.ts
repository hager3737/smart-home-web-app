import { WebSocketServer } from 'ws'; // Import WebSocket package
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// WebSocket server setup
const wss = new WebSocketServer({ port: 8080 }); 

let clients: Set<any> = new Set(); 

wss.on('connection', (ws) => {
    clients.add(ws); 
    ws.on('close', () => {
        clients.delete(ws); 
    });
});

export async function POST(request: NextRequest) {
    try {
        const logInfo = await request.json();

        if (!logInfo.deviceId || !logInfo.event || !logInfo.value) {
            return NextResponse.json({ message: "Missing crucial information." });
        }

        const device = await prisma.device.findUnique({
            where: { id: logInfo.deviceId }
        });

        if (!device) {
            return NextResponse.json({ message: "No device match found in database." }, { status: 404 });
        }

        const log = await prisma.log.create({
            data: {
                event: logInfo.event,
                value: logInfo.value,
                deviceId: logInfo.deviceId
            }
        });

        for (const client of clients) {
            client.send(JSON.stringify({ event: log.event, value: log.value, deviceId: log.deviceId }));
        }

        return NextResponse.json({ message: "Device logged successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Server error." });
    }
}
