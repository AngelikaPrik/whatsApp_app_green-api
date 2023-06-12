import { useState } from 'react'
import { TextField, StyledButton } from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '@slices/messagesSlice'
import { sendMessage } from '@service'

import sendIcon from '@images/sendIcon.svg'
import style from './chatForm.module.scss'

export const ChatForm = () => {
  const [textMessage, setTextMessage] = useState('')
  const [notification, setNotification] = useState('')

  const { account } = useSelector(state => state.account)
  const dispatch = useDispatch()

  const onChangeMessage = e => {
    const { value } = e.target
    setTextMessage(value)
  }

  const onSendMessage = () => {
    if (textMessage) {
      sendMessage({ account, textMessage })
        .then(({ data }) => {
          dispatch(setMessages({ idMessage: data.idMessage, textMessage }))
        })
        .catch(error => {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500
          ) {
            setNotification('Перепроверьте номер получателя')
          } else if (error.response && error.response.status >= 500) {
            setNotification('Произошла ошибка на сервере')
          } else {
            setNotification('Произошла ошибка')
          }
        })
        .finally(() => setTimeout(() => setNotification(''), 3000))
    }
    setTextMessage('')
  }

  return (
    <>
      <div className={style.form}>
        <TextField
          value={textMessage}
          onChange={onChangeMessage}
          type='text'
          name='message'
          placeholder='сообщение'
        />
        <StyledButton
          disabled={!account.isAuthorized || !textMessage}
          onClick={onSendMessage}
        >
          <img src={sendIcon} />
        </StyledButton>
      </div>
      {notification && (
        <div className={style.notification}>
          <p>{notification}</p>
        </div>
      )}
    </>
  )
}
