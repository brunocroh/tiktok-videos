import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
function renderTemplate(prompt) {
    return `
    Cria para mim um roteiro de video curto, com duração de um pouco mais de 1 minuto.

    O tema dos videos vão ser ${prompt}. 

    A estrutura do roteiro é um Titulo que gere engajamento e seja curto.
    e em seguida 10 frases. 

    retorne a resposta como um JSON, tendo os campos title e texts, texts sendo um array.
  `;
}
export async function getPrompt(prompt) {
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
            const text = choice.message.content?.replace(/\n/g, '');
            return JSON.parse(text);
        }
    }
    catch (error) {
        console.log(error);
        console.log(error.message);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdGdwdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY2hhdGdwdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQU9sRCxNQUFNLGFBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBQztJQUN0QyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjO0NBQ25DLENBQUMsQ0FBQztBQUVILE1BQU0sTUFBTSxHQUFHLElBQUksU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRTVDLFNBQVMsY0FBYyxDQUFDLE1BQWM7SUFDcEMsT0FBTzs7O2dDQUd1QixNQUFNOzs7Ozs7R0FNbkMsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLENBQUMsS0FBSyxVQUFVLFNBQVMsQ0FDN0IsTUFBYztJQUVkLElBQUksQ0FBQztRQUNILE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4QyxNQUFNLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQztZQUMvQyxLQUFLLEVBQUUsb0JBQW9CO1lBQzNCLFFBQVEsRUFBRTtnQkFDUjtvQkFDRSxJQUFJLEVBQUUsTUFBTTtvQkFDWixPQUFPLEVBQUUsUUFBUTtpQkFDbEI7YUFDRjtZQUNELFdBQVcsRUFBRSxHQUFHO1lBQ2hCLFVBQVUsRUFBRSxJQUFJO1NBQ2pCLENBQUMsQ0FBQztRQUVILE1BQU0sTUFBTSxHQUFHLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXZDLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFLLENBQUMsQ0FBQztRQUMzQixDQUFDO0lBQ0gsQ0FBQztJQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QixDQUFDO0FBQ0gsQ0FBQyJ9