import { ref } from "#imports"

interface Word {
  word: string
  pronounce: string
  meaning: string
  sentence: string
  sentence_meaning: string
}

export const useRequestTarotAnswer = () => {
  const promptAnswer = ref<Word[]>()
  const userQuestion = ref<string>()
  const message = ref<string>("")
  const status = ref<string>("default")
  const isJsonString = (str: string): boolean => {
    try {
      JSON.parse(str)
    } catch (e) {
      console.log(e)
      return false
    }
    return true
  }

  const resetPrompt = () => {
    userQuestion.value = ""
    status.value = "default"
  }

  const sendMessage = async () => {
    const language = message.value
    status.value = "pending"
    userQuestion.value = message.value
    message.value = ""
    const res = await useFetch("/api/openai", {
      method: "POST",
      body: {
        language: language,
      },
    })
    const data = await res.data.value
    if (!data) {
      status.value = "failure"
      return
    }
    const startIndex = data.content.indexOf('[');
    const endIndex = data.content.lastIndexOf(']') + 1;
    const jsonString = data.content.substring(startIndex, endIndex);
    const jsonData = JSON.parse(jsonString);
    const wordList: Word[] = []
    jsonData.forEach((elem: Word) => {
      wordList.push(elem)
    });
    promptAnswer.value = wordList
    console.log(promptAnswer.value)
    status.value = "success"
  }
  return { promptAnswer, userQuestion, message, status, sendMessage, resetPrompt }
}
