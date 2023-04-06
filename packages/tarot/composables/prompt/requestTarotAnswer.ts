import { ref } from '#imports'

interface Result {
  no: string,
  card: string,
  position: string,
  explanation: string,
  answer: string,
}

export const useRequestTarotAnswer = () => {

const promptHistory = ref<Array<Result>>([])
const userHistory = ref<Array<string>>([])
const message = ref<string>('')
const pending = ref<boolean>(false)

const sendMessage = async () => {
    const question = message.value
    pending.value = true
    userHistory.value.push(message.value)
    message.value = ''
    const res = await useFetch('/api/openai', {
    method: "POST",
    body: {
    question: question
    }
  })
  const data = await res.data.value
  const parsedData = data ? JSON.parse(data.content) : null
  if (!parsedData) return
  const result: Result = {
    no: parsedData.no,
    card: parsedData.card,
    position: parsedData.position,
    explanation: parsedData.explanation,
    answer: parsedData.answer
  }
  promptHistory.value.push(result)
  pending.value = false
}
return { promptHistory, userHistory, message, pending, sendMessage}
}