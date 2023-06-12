import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  account: { id: '', apiToken: '' },
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount(state, { payload }) {
      state.account = payload
    },
  },
})

export const { setAccount } = accountSlice.actions

export default accountSlice.reducer
