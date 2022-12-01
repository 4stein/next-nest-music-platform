import React from 'react';
import styled from '@emotion/styled';
import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import { Card, Grid, IconButton } from '@mui/material';

import { ITrack } from '../../types/track';
import TrackProgress from '../TrackProgress';
import { useSelector } from 'react-redux';
import {
  playerSelector,
  playAction,
  pauseAction,
  setVolumeAction,
  setActiveTrackAction,
  setCurrentTimeAction,
  setDurationAction,
} from '../../store/slices/player';
import { useDispatch } from 'react-redux';

const track: ITrack = {
  _id: '123',
  name: 'User1',
  artist: 'Artist1',
  text: 'Test text 1',
  listens: 1,
  picture:
    'https://images.pexels.com/photos/2693529/pexels-photo-2693529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  audio:
    'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/82/4d/57/824d576f-8c55-5702-eec8-321d4e0a8db5/mzaf_17908942221579753273.plus.aac.p.m4a',
  comments: [{ _id: '234', username: 'User2', text: 'Test text 1.1' }],
};

interface PlayerProps {}

let audio: any;

const PlayerBox = styled(Card)`
  height: 60px;
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background-color: lightgray;
`;

const Player: React.FC<PlayerProps> = () => {
  // useSelector
  const { active, pause, volume, duration, currentTime } =
    useSelector(playerSelector);
  // useDispatch
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      playHandler();
    }
  }, [active]);

  const setAudio = () => {
    if (active) {
      audio.src = 'http://localhost:5000/' + active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        dispatch(setDurationAction(Math.ceil(audio.duration)));
      };
      audio.ontimeupdate = () => {
        dispatch(setCurrentTimeAction(Math.ceil(audio.currentTime)));
      };
    }
  };

  const playHandler = () => {
    if (pause) {
      dispatch(playAction());
      audio.play();
    } else {
      dispatch(pauseAction());
      audio.pause();
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100;
    dispatch(setVolumeAction(Number(e.target.value)));
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
    dispatch(setCurrentTimeAction(Number(e.target.value)));
  };

  if (!active) {
    return null;
  }

  return (
    <PlayerBox>
      <IconButton onClick={e => playHandler()}>
        {!pause ? <Pause /> : <PlayArrow />}
      </IconButton>
      <Grid
        container
        direction="column"
        style={{ width: '200px', margin: '20px' }}
      >
        <div>{active?.name}</div>
        <div style={{ fontSize: 12, color: 'gray' }}>{active?.artist}</div>
      </Grid>
      <TrackProgress
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      />
      <VolumeUp style={{ marginLeft: 'auto' }} />
      <TrackProgress left={volume} right={100} onChange={changeVolume} />
    </PlayerBox>
  );
};

export default Player;
