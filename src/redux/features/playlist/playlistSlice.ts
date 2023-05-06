import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Track } from '@/models/track'

export interface State {
  tracks: Track[]
}

const initialState: State = {
  tracks: [],
}

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    addTrack: (state, action: PayloadAction<Track>) => {
      state.tracks.push(action.payload)
    },
  },
})

export const { addTrack } = playlistSlice.actions

export default playlistSlice.reducer