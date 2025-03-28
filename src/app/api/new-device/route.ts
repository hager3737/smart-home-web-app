import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest) {

    const deviceInfo = await request.json();

    if(!deviceInfo.name || !deviceInfo.type || !deviceInfo.location) {
        return NextResponse.json({message: "Missing crucial information."})
    }

    try {
        let device = await prisma.device.findFirst({
            where: { name: deviceInfo.name }
        });

        if(!device) {
            await prisma.device.create({
                data: {
                    name: deviceInfo.name,
                    type: deviceInfo.type,
                    location: deviceInfo.location
                }
            });
            return NextResponse.json({message: "Device registered successfully"});
        } else {
            return NextResponse.json({ message: "Device allready exists in database."});
        }

    } catch (error) {
        return NextResponse.json({ error: "Server error." })
    }  
}