import { ref } from "#imports"

interface Result {
  no: string
  card: string
  position: string
  explanation: string
  answer: string
}

export const useRequestTarotAnswer = () => {
  const promptAnswer = ref<Result>()
  const userQuestion = ref<string>()
  const message = ref<string>("")
  const pending = ref<boolean>(false)
  const successed = ref<boolean>(false)
  const isApiCalled = ref<boolean>(false)
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
    successed.value = false
    isApiCalled.value = false
  }

  const sendMessage = async () => {
    const question = message.value
    successed.value = false
    pending.value = true
    userQuestion.value = message.value
    message.value = ""
    isApiCalled.value = true
    const res = await useFetch("/api/openai", {
      method: "POST",
      body: {
        question: question,
      },
    })
    const data = await res.data.value
    if (!data) {
      pending.value = false
      successed.value = false
      return
    }
    const parsedData = isJsonString(data.content) ? JSON.parse(data.content.trim()) : null
    if (!parsedData) {
      pending.value = false
      successed.value = false
      return
    }
    const result: Result = {
      no: parsedData.no,
      card: parsedData.card,
      position: parsedData.position,
      explanation: parsedData.explanation,
      answer: parsedData.answer,
    }
    promptAnswer.value = result
    successed.value = true
    pending.value = false
  }
  return { promptAnswer, userQuestion, message, successed, pending, isApiCalled, sendMessage, resetPrompt }
}
