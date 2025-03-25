import { CLI, Prompts } from "karozu/cli";
import { AI } from "./config";
import { templates } from "./templates";

const input = new Prompts(AI, (p) => ({
  provider: () =>
    p.select({
      message: "Which provider do you want to use?",
      options: [
        { value: "openai", label: "OpenAI" },
        { value: "google", label: "Google" },
        { value: "anthropic", label: "Anthropic" },
      ],
    }),
  apiKey: () =>
    p.text({
      message: "Please provide your API key:",
    }),
}));

export default new CLI(AI, templates, input);
