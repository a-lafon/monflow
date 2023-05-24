import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Track } from '@/domain/models/track'

export interface State {
  playlist: Track[]
}

const initialState: State = {
  playlist: [],
}

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setPlaylist: (state, action: PayloadAction<Track[]>) => {
      state.playlist = action.payload;
    },
    addTrack: (state, action: PayloadAction<Track>) => {
      state.playlist.push(action.payload)
    },
    removeTrack: (state, action: PayloadAction<string>) => {
      state.playlist = state.playlist.filter((track: Track) => track.id !== action.payload)
    }
  },
})

export const { addTrack, setPlaylist, removeTrack } = playlistSlice.actions

export default playlistSlice.reducer