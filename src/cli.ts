import { CLI, Prompts } from "karozu/cli";
import { drizzle } from "./config";
import { templates } from "./templates";

const input = new Prompts(drizzle, (p) => ({
  provider: () =>
    p.select({
      message: "Which provider do you want to use?",
      options: [
        { value: "openai" },
        { value: "google" },
        { value: "anthropic" },
      ],
    }),
}));

export default new CLI(drizzle, templates, input);
