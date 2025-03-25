import { Template } from "karozu";
import { AI } from "./config";

export const chatEndpoint = new Template(AI, ({ props, utilities }) => ({
  title: `Chat API Endpoint`,
  description: "The API route for your chatbot",
  path: "app/api/chat/route.ts",
  template: `import { ${props.provider} } from '@ai-sdk/${props.provider}';
  import { streamText } from 'ai';

  // Allow streaming responses up to 30 seconds
  export const maxDuration = 30;

  export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = streamText({
    model: ${(() => {
      switch (props.provider) {
        case "openai":
          return `openai('gpt-4o')`;
        case "anthropic":
          return `anthropic('claude-3-7-sonnet-20250219'')`;
        case "google":
          return `google("gemini-1.5-pro-latest")`;
      }
    })()},
      messages,
    });

    return result.toDataStreamResponse();
  }`,
}));

export const useChatFE = new Template(AI, () => ({
  title: `Frontend`,
  description: "The main useChat implementation",
  path: "app/page.tsx",
  template: `"use client";

  import { useChat } from "@ai-sdk/react";

  export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit, error } = useChat();
    if (error) return <div>{error.message}</div>;

    return (
      <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
        <div className="space-y-4">
          {messages.map((m) =>
            m.parts.map((p, i) => {
              switch (p.type) {
                case "text":
                  return (
                    <div key={i} className="whitespace-pre-wrap">
                      <div>
                        <div className="font-bold">{m.role}</div>
                        <p>{p.text}</p>
                      </div>
                    </div>
                  );
                default:
                  return null;
              }
            }),
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    );
  }`,
}));

export const envFile = new Template(AI, ({ props }) => ({
  title: `Environment Variables`,
  description: "Configuration for API keys",
  path: ".env",
  template: `# ${props.provider.toUpperCase()} API key
${props.provider.toUpperCase()}_API_KEY=${props.apiKey}`,
}));

export const templates = [chatEndpoint, useChatFE, envFile];
