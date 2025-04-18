"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wifi, CheckCircle, XCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [logs, setLogs] = useState<any[]>([]); // State to store logs

    const { data: devices, isLoading, error } = useQuery({
        queryKey: ['devices'],
        queryFn: () => api.getAllDevices()
    });

    useEffect(() => {
        // Connect to the WebSocket server
        const socket = new WebSocket('ws://localhost:8080'); // Connect to the WebSocket server

        // Listen for incoming messages
        socket.onmessage = (event) => {
            const log = JSON.parse(event.data);
            setLogs((prevLogs) => [log, ...prevLogs]); // Add the new log to the list
        };

        // Clean up WebSocket connection on component unmount
        return () => {
            socket.close();
        };
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching devices.</div>;
    }

    if(devices == 0) {
        return <div className="flex flex-col items-center">
            <h1 className="text-3xl">No devices connected yet!</h1>
            <p>Connect your first device to get updates.</p>
        </div>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {devices?.map((device: any) => (
                <Card key={device.id} className="p-4 shadow-lg rounded-2xl border border-gray-800 bg-gray-900 text-white">
                    <CardHeader>
                        <CardTitle className="text-lg flex justify-between">
                            {device.name}
                            <Wifi className="w-5 h-5 text-gray-400" />
                        </CardTitle>
                        <p className="text-sm text-gray-400">{device.type}</p>
                        {device.location && <p className="text-sm text-gray-400">{device.location}</p>}
                        <p className="text-xs text-gray-500">Registered: {new Date(device.createdAt).toLocaleString()}</p>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        {device.logs && device.logs.length > 0 ? (
                            <div>
                                <p className="text-sm text-gray-300">Event: {device.logs[0].event}</p>
                                {device.logs[0].value && <p className="text-xs text-gray-400">Value: {device.logs[0].value}</p>}
                                <p className="text-xs text-gray-500">Logged at: {new Date(device.logs[0].createdAt).toLocaleString()}</p>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400">No recent logs available</p>
                        )}
                        <Badge
                            variant="outline"
                            className={
                                device.status === "online"
                                    ? "bg-green-600 text-white"
                                    : "bg-red-600 text-white"
                            }
                        >
                            {device.status === "online" ? "Online" : "Offline"}
                        </Badge>
                        {device.status === "online" ? (
                            <CheckCircle className="text-green-400 w-6 h-6" />
                        ) : (
                            <XCircle className="text-red-400 w-6 h-6" />
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
