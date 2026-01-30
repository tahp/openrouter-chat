"use client";

import { useChat } from "@ai-sdk/react";
export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({ api: "/api/chat" });

  return (
    <main style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1>OpenRouter Chat</h1>

      <div style={{ margin: "16px 0", minHeight: 300 }}>
        {messages.map(m => (
          <div key={m.id} style={{ marginBottom: 12 }}>
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
        {isLoading && <div>Thinking…</div>}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Say something"
          style={{ width: "100%", padding: 8 }}
        />
      </form>
    </main>
  );
}
