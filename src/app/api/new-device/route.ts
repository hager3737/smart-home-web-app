import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest) {

    const deviceInfo = await request.json();

    if(!deviceInfo.deviceId || !deviceInfo.name || !deviceInfo.type || !deviceInfo.location) {
        return NextResponse.json({message: "Missing crucial information."})
    }

    try {
        let newDevice = await prisma.device.findFirst({
            where: { name: deviceInfo.name }
        });

        if(!newDevice) {
            await prisma.device.create({
                data: {
                    id: deviceInfo.deviceId,
                    name: deviceInfo.name,
                    type: deviceInfo.type,
                    location: deviceInfo.location
                }
            });
            return NextResponse.json({message: "Device registered successfully"}, {status: 200});
        } else {
            return NextResponse.json({ message: "Device allready exists in database."}, {status: 400});
        }

    } catch (error) {
        return NextResponse.json({ error: "Server error." })
    }  
}