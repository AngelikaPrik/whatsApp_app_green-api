import { configureStore } from '@reduxjs/toolkit'
import messages from './slices/messagesSlice'
import account from './slices/accountSlice'

export const store = configureStore({
  reducer: { messages, account },
})
