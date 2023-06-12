import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyledButton, Loader } from '@components'
import { setMessages } from '@slices/messagesSlice'
import { receiveNotification, deleteNotification } from '@service'
import { ChatMessages } from './chatMessages'
import { ChatForm } from './chatForm'

import style from './chat.module.scss'

export const Chat = () => {
  const { account } = useSelector(state => state.account)
  const { messages } = useSelector(state => state.messages)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState('')

  const getMessage = () => {
    setLoading(true)

    receiveNotification(account)
      .then(({ status, data }) => {
        if (status === 200) {
          if (!data) {
            setNotification('У вас нет входящих сообщений :(')
            setLoading(false)
            return
          }

          if (data.body.typeWebhook === 'outgoingMessageReceived') {
            const { textMessage } = data.body.messageData.textMessageData
            const { idMessage } = data.body
            if (textMessage) {
              dispatch(setMessages({ idMessage, textMessage, incoming: true }))
              setLoading(false)
            }
          } else {
            setTimeout(getMessage, 3000)
            return data.receiptId
          }

          return data.receiptId
        }
      })
      .then(receiptId => {
        if (receiptId) deleteNotification({ account, receiptId })
      })
      .catch(e => {
        console.error(e)
        setLoading(false)
        setNotification('Произошла ошибка :(')
      })
      .finally(() => setTimeout(() => setNotification(''), 3000))
  }

  return (
    <div className={style.container}>
      <ChatMessages messages={messages} />
      <ChatForm />

      {notification && (
        <div className={style.notification}>
          <p>{notification}</p>
        </div>
      )}

      <div className={style.receivBtn}>
        <StyledButton
          disabled={!account.isAuthorized || loading}
          onClick={getMessage}
        >
          {loading ? <Loader /> : 'Получить сообщение'}
        </StyledButton>
      </div>
    </div>
  )
}
