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
    const question = message.value
    status.value = "pending"
    userQuestion.value = message.value
    message.value = ""
    const res = await useFetch("/api/openai", {
      method: "POST",
      body: {
        question: question,
      },
    })
    const data = await res.data.value
    if (!data) {
      status.value = "failure"
      return
    }
    const parsedData = isJsonString(data.content) ? JSON.parse(data.content.trim()) : null
    if (!parsedData) {
      status.value = "failure"
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
    status.value = "success"
  }
  return { promptAnswer, userQuestion, message, status, sendMessage, resetPrompt }
}
