import { streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export const runtime = "edge";
export const dynamic = "force-dynamic"; // ← THIS is the fix

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openrouter("openai/gpt-4o-mini"),
    messages,
  });

  return result.toTextStreamResponse();
}
