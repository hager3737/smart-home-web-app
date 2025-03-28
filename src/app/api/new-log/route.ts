import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest) {

    try {
    const logInfo = await request.json();

    if(!logInfo.deviceId || !logInfo.event || !logInfo.value) {
        return NextResponse.json({ message: "Missing crucial information." })
    }

    
        const device = await prisma.device.findUnique({
            where: { id: logInfo.deviceId }
        });

        if (!device) {
            return NextResponse.json({ message: "No device match found in database." }, { status: 404 });
        }

            await prisma.log.create({
                data: {
                    event: logInfo.event,
                    value: logInfo.value,
                    deviceId: logInfo.deviceId
                }
            });
            return NextResponse.json({message: "Device logged successfully"});
        

    } catch (error) {
        return NextResponse.json({ error: "Server error." })
    }  
}