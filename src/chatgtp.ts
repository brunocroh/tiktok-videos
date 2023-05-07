import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("TOKEN OPEN AI", process.env.OPENAI_API_KEY)

const openai = new OpenAIApi(configuration);

function renderTemplate(prompt: string) {
  return `
    Cria para mim um roteiro de video bem simples e curto.

    O tema dos videos vão ser ${prompt}.

    A estrutura do roteiro é um Titulo que gere engajamento e seja curto.
    e em seguida 6 textos bem curtos.

    retorne a resposta como um JSON, tendo os campos title e texts, texts sendo um array.
  `
}

export async function getPrompt(prompt: string) {
  try {
    const template = renderTemplate(prompt)
    const result = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: template,
      temperature: 0.5,
      max_tokens: 1000,
    });

    const choice = result?.data.choices[0]

    console.log({ choice })

    if (choice && choice.text) {
      const text = choice.text.replace(/\n/g, '')
      return JSON.parse(text)
    }

    return null
  } catch (error: any) {
    console.log(
      error.message
    )
  }
}
