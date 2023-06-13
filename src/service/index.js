import axios from 'axios'

const BASE_URL = 'https://api.green-api.com'

export const getAuth = ({ id, apiToken }) => {
  return axios.get(`${BASE_URL}/waInstance${id}/getStateInstance/${apiToken}`)
}

export const sendMessage = async data => {
  const { account, textMessage } = data

  const url = `${BASE_URL}/waInstance${account.id}/sendMessage/${account.apiToken}`
  return axios.post(url, {
    chatId: `${account.phoneNumber}@c.us`,
    message: textMessage,
  })
}

export const receiveNotification = async data => {
  const { id, apiToken } = data
  const url = `${BASE_URL}/waInstance${id}/receiveNotification/${apiToken}`
  return axios.get(url)
}

export const deleteNotification = async data => {
  const { account, receiptId } = data
  const url = `${BASE_URL}/waInstance${account.id}/deleteNotification/${account.apiToken}/${receiptId}`
  return axios.delete(url)
}
