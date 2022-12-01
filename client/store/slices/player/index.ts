import { createSlice } from '@reduxjs/toolkit';

import { PlayerState } from './types';
import { RootState } from '../..';

const initialState: PlayerState = {
  active: null,
  volume: 50,
  duration: 0,
  currentTime: 0,
  pause: true,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playAction: state => {
      state.pause = false;
    },
    pauseAction: state => {
      state.pause = true;
    },
    setCurrentTimeAction: (state, action) => {
      state.currentTime = action.payload;
    },
    setVolumeAction: (state, action) => {
      state.volume = action.payload;
    },
    setDurationAction: (state, action) => {
      state.duration = action.payload;
    },
    setActiveTrackAction: (state, action) => {
      state.active = action.payload;
      state.duration = 0;
      state.currentTime = 0;
    },
  },
});

export const playerSelector = (state: RootState) => state.player;

export const {
  playAction,
  pauseAction,
  setCurrentTimeAction,
  setVolumeAction,
  setDurationAction,
  setActiveTrackAction,
} = playerSlice.actions;

export default playerSlice.reducer;
