import { Configuration, OpenAIApi } from "openai"
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const config = useRuntimeConfig()
  const configuration = new Configuration({
    apiKey: config.API_KEY,
  })
  const openai = new OpenAIApi(configuration)

  if (!configuration.apiKey) {
    return
  }

  const language = body.language || ""

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "言語学習のサポーターとして振る舞ってください",
        },
        {
          role: "user",
          content: generatePrompt(language),
        },
      ],
      temperature: 0.2,
      max_tokens:3800 ,
    })
    return completion.data.choices[0].message
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data)
      return error.response.data
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      return "An error occurred during your request."
    }
  }
})

const generatePrompt = (language: string) => {
  return `
ユーザーは ${language}への旅行を計画しています。
旅行で役に立つ40のフレーズのリストを作成してください。

それぞれのフレーズは以下のようなオブジェクト形式記述し、全てのオブジェクトを単一の配列に格納し、json形式で返答をしてください。

### オブジェクト形式
{
  "phrase" <フレーズ>,
  "pronounce" <カタカナで発音を記述>,
  "meaning" <単語の日本語での意味>
}
`
}
