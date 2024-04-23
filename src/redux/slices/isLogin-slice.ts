import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IsLoginState {
  isLogin: any
}

const initialState: IsLoginState = {
  isLogin: '',
}

export const isLoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setIsLogin: (state: IsLoginState, action: PayloadAction<string>) => {
      state.isLogin = action.payload
    },
  },
})
export const { setIsLogin } = isLoginSlice.actions

export default isLoginSlice.reducer
