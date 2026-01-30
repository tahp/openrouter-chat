import { streamText, type CoreMessage } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});

export async function POST(req: Request) {
  const body = await req.json();

  // Convert UIMessage → CoreMessage
  const messages: CoreMessage[] = body.messages.map((m: any) => ({
    role: m.role,
    content: m.parts
      ?.filter((p: any) => p.type === "text")
      .map((p: any) => p.text)
      .join("") ?? "",
  }));

  const result = await streamText({
    model: openrouter("openai/gpt-4o-mini"),
    messages,
  });

  return result.toTextStreamResponse();
}
