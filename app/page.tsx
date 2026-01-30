"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";

export default function Home() {
  const [input, setInput] = useState("");

  const { messages, sendMessage } = useChat();

  return (
    <main style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1>OpenRouter Chat</h1>

      <div style={{ margin: "16px 0", minHeight: 300 }}>
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: 12 }}>
           <strong>{m.role}:</strong>{" "}
{m.parts
  .filter((p) => p.type === "text")
  .map((p, i) => (
    <span key={i}>{p.text}</span>
  ))}
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          sendMessage({
  role: "user",
  parts: [{ type: "text", text: input }],
});
          setInput("");
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Say something"
          style={{ width: "100%", padding: 8 }}
        />
      </form>
    </main>
  );
}
