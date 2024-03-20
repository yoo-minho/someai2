import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"],
});

export async function callClaude(prompt: string) {
  const message = await anthropic.messages.create({
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
    model: "claude-3-haiku-20240307",
  });

  console.log(message.content[0].text);

  return {
    title: "Claude",
    desc: message.content[0].text,
    url: "",
    image:
      "https://techcrunch.com/wp-content/uploads/2023/04/anthropic-header.jpg?w=1200&crop=1",
  };
}
