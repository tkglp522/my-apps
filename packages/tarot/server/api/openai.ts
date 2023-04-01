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

  const question = body.question || ""

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(question),
      temperature: 0.4,
      max_tokens: 1000,
    })
    return completion.data.choices[0].text
  } catch (error) {}
})

const generatePrompt = (question: string) => {
  return `
あなたは占い師です。
以下の22枚の大アルカナのみからなるタロットデッキから一枚ランダムに選出してください。
１枚のカードを引く確率は22分の１です。
  0：愚者、
  1：魔術師、
  2：女教皇、
  3：女帝、
  4：皇帝、
  5：教皇
  6：恋人、
  7：戦車、
  8：力、
  9：隠者、
  10：運命の輪
  11：正義、
  12：吊るされた男、
  13：死神、
  14：節制、
  15：悪魔
  16：塔、
  17：星、
  18：月、
  19：太陽、
  20：審判、
  21：世界

その後、選出したカードの正位置・逆位置の一方を2分の１の確率で選択してください。
カードの意味を教えてください。カードが逆位置の場合は逆位置になることでどのような意味になるかも教えてください。
さらにそれを踏まえて、以下の質問に回答してください。

 ${question}

以下のkeyを含むJSONフォーマットで出力すること

  "no" <カードNo>,
  "card" <カード名>,
  "position" <選択したカードの位置>,
  "explanation" <選択した位置のカードの意味>,
  "answer" <質問に対する回答とその詳細>
`
}
