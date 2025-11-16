"use client";

import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

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
    console.log(messages);
    return (
        <div>
            <h2>EventHub Messages</h2>
            <ul>
                {messages.map((m, i) => (
                    <li key={i}>
                       {m}
                    </li>
                ))}
            </ul>
        </div>
    );
}
