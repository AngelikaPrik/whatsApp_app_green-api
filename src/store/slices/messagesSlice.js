import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: [],
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, { payload }) {
      state.messages.push(payload)
    },
    clearMessages(state) {
      state.messages = []
    },
  },
})

export const { setMessages, clearMessages } = messagesSlice.actions

export default messagesSlice.reducer
