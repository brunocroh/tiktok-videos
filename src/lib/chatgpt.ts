import { Configuration, OpenAIApi } from 'openai';

type PromptResponse = {
  title: string;
  texts: string[];
};

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

function renderTemplate(prompt: string) {
  return `
    Cria para mim um roteiro de video bem simples e curto.

    O tema dos videos vão ser ${prompt}.

    A estrutura do roteiro é um Titulo que gere engajamento e seja curto.
    e em seguida 6 textos bem curtos.

    retorne a resposta como um JSON, tendo os campos title e texts, texts sendo um array.
  `;
}

export async function getPrompt(
  prompt: string
): Promise<PromptResponse | undefined> {
  try {
    const template = renderTemplate(prompt);

    const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-0301',
      messages: [
        {
          role: 'user',
          content: template,
        },
      ],
      temperature: 0.5,
      max_tokens: 1000,
    });

    const choice = result?.data.choices[0];

    if (choice && choice.message) {
      const text = choice.message.content.replace(/\n/g, '');
      return JSON.parse(text);
    }
  } catch (error: any) {
    console.log(error);
    console.log(error.message);
  }
}
