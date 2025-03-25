import { CLI, Prompts } from "karozu/cli";
import { aiStarter } from "./config";
import { templates } from "./templates";

const input = new Prompts(aiStarter, (p) => ({
  provider: () =>
    p.select({
      message: "Which provider do you want to use?",
      options: [
        { value: "openai" },
        { value: "google" },
        { value: "anthropic" },
      ],
    }),
  apiKey: () =>
    p.text({
      message: "Please provide your API key:",
    }),
}));

export default new CLI(aiStarter, templates, input);
