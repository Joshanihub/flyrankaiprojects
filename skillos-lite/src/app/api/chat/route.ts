import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { z } from "zod";

const requestSchema = z.object({
  messages: z.array(z.unknown()).min(1),
});

const systemPrompt = `You are a practical skill evaluation assistant for SkillOS Lite.

When a user describes a work scenario:
- Name the main skill demonstrated.
- Assess it as Novice, Developing, Proficient, or Expert.
- Point out one specific strength from the story.
- Suggest one concrete area for improvement.
- Offer one realistic next challenge.

Keep the response focused and use short headings. Do not invent details that the user did not provide.`;

export async function POST(request: Request) {
  try {
    const parsed = requestSchema.safeParse(await request.json());

    if (!parsed.success) {
      return Response.json({ error: "Send at least one message." }, { status: 400 });
    }

    const messages = parsed.data.messages as UIMessage[];
    const result = streamText({
      model: google("gemini-3.5-flash"),
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
      maxOutputTokens: 700,
    });

    return result.toUIMessageStreamResponse();
  } catch {
    return Response.json({ error: "The evaluation could not be started." }, { status: 500 });
  }
}