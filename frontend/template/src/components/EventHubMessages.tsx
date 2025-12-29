"use client";

import * as signalR from "@microsoft/signalr";
import { useEffect, useState } from "react";

interface Message {
    text: string;
    timestamp: string;
}

export default function EventHubMessages() {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:8080/messages", { withCredentials: true })
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(() => console.log("Connected to EventHub SignalR!"))
            .catch(err => console.error(err));

        connection.on("ReceiveMessage", (message: Message) => {
            setMessages(prev => [...prev, message]);
        });

        return () => {
            console.log("Disconnected from EventHub");
            connection.stop();
        };
    }, []);

return (
        <div>
            <h2>EventHub Messages</h2>
            <ul>
                {messages.map((m, i) => (
                    <li key={i}>
                        [{new Date(m.timestamp).toLocaleTimeString()}] {m.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}
