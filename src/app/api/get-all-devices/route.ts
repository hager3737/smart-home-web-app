import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const devices = await prisma.device.findMany({
            include: {
                logs: {
                    orderBy: {
                        createdAt: 'desc', // Order by creation date, descending (most recent first)
                    },
                    take: 1, // Take only the most recent log
                },
            },
        });

        return NextResponse.json(devices);
    } catch (error) {
        return NextResponse.json({ error: "Server error." });
    }
}
