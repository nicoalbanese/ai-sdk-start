import { z } from "zod";
import { Extension } from "karozu";
import { baseUtilities } from "karozu/utils";

export const propSchema = z.object({
  provider: z.enum(["openai", "google", "anthropic"]),
  apiKey: z.string().min(1).max(100).optional(),
});

export const drizzle = new Extension({
  name: "AI SDK",
  version: "1.0.0",
  description: "Install AI SDK in your project.",
  author: "@nicoalbanese10",
  props: propSchema,
  dependencies: () => ({
    default: [
      {
        packageName: "ai",
        version: "latest",
      },
      {
        packageName: "@ai-sdk/react",
        version: "latest",
      },
    ],
    provider: {
      openai: [
        {
          packageName: "@ai-sdk/openai",
          version: "latest",
        },
      ],
      google: [
        {
          packageName: "@google-cloud/sql",
          version: "latest",
        },
      ],
      anthropic: [
        {
          packageName: "@ai-sdk/anthropic",
          version: "latest",
        },
      ],
    },
  }),
  utilities: {
    ...baseUtilities,
    capitalize: (str: string) => str.charAt(0).toUpperCase() + str.slice(1),
    formatDate: (date: Date) => date.toISOString(),
  },
});
