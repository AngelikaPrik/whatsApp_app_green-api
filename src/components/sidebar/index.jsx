import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { StyledButton, TextField } from '@components'
import { getAuth } from '@service'
import { setAccount } from '@slices/accountSlice'
import { clearMessages } from '@slices/messagesSlice'

import editIcon from '@images/edit.svg'
import done from '@images/done.svg'
import style from './sidebar.module.scss'

export const SideBar = () => {
  const { account } = useSelector(state => state.account)
  const [inputVal, setInputVal] = useState({
    id: '',
    apiToken: '',
    phoneNumber: '',
  })
  const [isEditPhone, setIsEditPhone] = useState(false)
  const [notification, setNotification] = useState('')

  const dispatch = useDispatch()

  const onChange = e => {
    const { value, name } = e.target
    const newValue =
      name === 'phoneNumber' ? value.replace(/\D/g, '') : value.trim()
    setInputVal(prevInputVal => ({ ...prevInputVal, [name]: newValue }))
  }

  const onClick = () => {
    getAuth(inputVal)
      .then(({ data, status }) => {
        if (status === 200) {
          if (data.stateInstance === 'authorized') {
            dispatch(setAccount({ ...inputVal, isAuthorized: true }))
          }
        }
      })
      .catch(error => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          setNotification('Вы ввели неверные данные')
        } else if (error.response && error.response.status >= 500) {
          setNotification('Произошла ошибка на сервере')
        } else {
          setNotification('Произошла ошибка авторизации')
        }
      })
      .finally(() => setTimeout(() => setNotification(''), 3000))
  }

  const onEditPhoneNumber = () => {
    setIsEditPhone(!isEditPhone)
    const isEqualNumber = account.phoneNumber === inputVal.phoneNumber
    if (isEditPhone && !isEqualNumber) {
      dispatch(setAccount({ ...account, phoneNumber: inputVal.phoneNumber }))
      dispatch(clearMessages())
    }
  }

  const isButtonDisabled = () => {
    const { id, apiToken, phoneNumber } = inputVal
    return !id || !apiToken || !phoneNumber
  }

  return (
    <div className={style.sidebar}>
      <div className={style.container}>
        <h2 className={style.title}>Начать чат</h2>
        <div className={style.container}>
          <TextField
            value={inputVal.id}
            onChange={onChange}
            type='text'
            name='id'
            placeholder='idInstance'
          />
          <TextField
            value={inputVal.apiToken}
            onChange={onChange}
            type='text'
            name='apiToken'
            placeholder='apiTokenInstance'
          />
          <div className={style.phone}>
            <TextField
              value={inputVal.phoneNumber}
              onChange={onChange}
              type='tel'
              name='phoneNumber'
              placeholder='номер телефона'
              disabled={account.isAuthorized && !isEditPhone}
            />
            {account.isAuthorized && (
              <div className={style.phone__edit} onClick={onEditPhoneNumber}>
                <img width={16} src={isEditPhone ? done : editIcon} />
              </div>
            )}
          </div>
          {!account.isAuthorized && (
            <div className={style.btn}>
              <StyledButton disabled={isButtonDisabled()} onClick={onClick}>
                Начать
              </StyledButton>
            </div>
          )}
          {notification && (
            <div className={style.notification}>
              <p>{notification}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
