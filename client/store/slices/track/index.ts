import {
  createAsyncThunk,
  createSlice,
  // createAsyncThunk
} from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../..';
import {
  TrackActionTypes,
  TrackFetchAction,
  TrackFetchErrorAction,
  TrackState,
} from './types';

export const fetchTracks: any = createAsyncThunk(
  TrackActionTypes.FETCH_TRACKS,
  async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/tracks');
      return data;
    } catch (err) {
      console.log('Fetch Tracks Error: ', err);
      return err;
    }
  }
);

const initialState: TrackState = {
  tracks: [],
  error: '',
};

const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    playAction: (state, action) => {
      state.tracks = action.payload;
      state.error = '';
    },
    setCurrentTimeAction: (state, action) => {
      state.tracks = action.payload;
    },
  },
  extraReducers: {
    [fetchTracks.fulfilled]: (state: TrackState, action: TrackFetchAction) => {
      state.tracks = action.payload;
    },
    [fetchTracks.rejected]: (
      state: TrackState,
      action: TrackFetchErrorAction
    ) => {
      state.error = action.payload;
    },
  },
});

export const trackSelector = (state: RootState) => state.track;

export const { playAction, setCurrentTimeAction } = trackSlice.actions;

export default trackSlice.reducer;
