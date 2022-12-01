import { ITrack } from '../../../types/track';

export interface TrackState {
  tracks: ITrack[];
  error: string;
}

export enum TrackActionTypes {
  FETCH_TRACKS = 'FETCH_TRACKS',
  FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
  SET_ACTIVE = 'SET_ACTIVE',
  SET_DURATION = 'SET_DURATION',
  SET_CURRENT_TIME = 'SET_CURRENT_TIME',
  SET_VOLUME = 'SET_VOLUME',
}

export interface TrackFetchAction {
  type: TrackActionTypes.FETCH_TRACKS;
  payload: ITrack[];
}

export interface TrackFetchErrorAction {
  type: TrackActionTypes.FETCH_TRACKS_ERROR;
  payload: string;
}
