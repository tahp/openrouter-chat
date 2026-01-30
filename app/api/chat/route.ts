import { streamText, type CoreMessage } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});

type UIPart =
  | { type: "text"; text: string }
  | { type: string; [key: string]: unknown };

type UIMessage = {
  role: "system" | "user" | "assistant";
  parts: UIPart[];
};

export async function POST(req: Request) {
  const body: { messages: UIMessage[] } = await req.json();

  const messages: CoreMessage[] = body.messages.map((m) => ({
    role: m.role,
    content: m.parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join(""),
  }));

  const result = await streamText({
    model: openrouter("openai/gpt-4o-mini"),
    messages,
  });

  return result.toTextStreamResponse();
}
