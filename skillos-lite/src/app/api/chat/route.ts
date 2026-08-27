import { convertToModelMessages, createUIMessageStreamResponse, streamText, toUIMessageStream, type UIMessage } from "ai";
import { z } from "zod";
import { evaluationModel, evaluationSystemPrompt } from "@/lib/ai-config";

const requestSchema = z.object({
  messages: z.array(z.unknown()).min(1),
});

export async function POST(request: Request) {
  try {
    const parsed = requestSchema.safeParse(await request.json());

    if (!parsed.success) {
      return Response.json({ error: "Send at least one message." }, { status: 400 });
    }

    const messages = parsed.data.messages as UIMessage[];
    const result = streamText({
      model: evaluationModel,
      system: evaluationSystemPrompt,
      messages: await convertToModelMessages(messages),
      maxOutputTokens: 10000,
    });

    return createUIMessageStreamResponse({ stream: toUIMessageStream({ stream: result.stream }) });
  } catch {
    return Response.json({ error: "The evaluation could not be started." }, { status: 500 });
  }
}