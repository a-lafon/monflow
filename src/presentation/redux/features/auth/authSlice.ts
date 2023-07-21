import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/domain/models/user';

export interface State {
  isAuth: boolean;
  user: User | undefined;
}

const initialState: State = {
  isAuth: false,
  user: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
    },
  },
})

export const { setAuth, setUser } = authSlice.actions

export default authSlice.reducer