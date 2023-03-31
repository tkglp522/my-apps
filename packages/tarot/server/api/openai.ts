import { Configuration, OpenAIApi } from "openai";
export default defineEventHandler(async (event) => {
const body = await readBody(event)

const config = useRuntimeConfig();
const configuration = new Configuration({
  apiKey: config.API_KEY,
});
const openai = new OpenAIApi(configuration);


  if (!configuration.apiKey) {
    return;
  }

  const message = body.message || '';

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(message),
    });
    return completion.data.choices[0].text;
  } catch(error) {
  }
})

const generatePrompt = (message: string) => {
  return `You are fortunteller.
Draw one card from tarot decks to answer the following question.
Question: ${message}
Answer:`;
}