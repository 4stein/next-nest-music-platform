import React from 'react';
import { Card, Grid, IconButton } from '@mui/material';
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { styled } from '@mui/system';

import { ITrack } from '../../types/track';
import { useRouter } from 'next/router';
import { playAction, setActiveTrackAction } from '../../store/slices/player';
import { useDispatch } from 'react-redux';

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const Track = styled(Card)`
  margin: 20px;
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
  const router = useRouter();
  // useDispatch
  const dispatch = useDispatch();

  const play = (e: any) => {
    e.stopPropagation();
    dispatch(setActiveTrackAction(track));
    dispatch(playAction());
  };

  return (
    <Track onClick={() => router.push(`/tracks/${track._id}`)}>
      <IconButton onClick={play}>
        {active ? <Pause /> : <PlayArrow />}
      </IconButton>
      <picture>
        <source
          srcSet={'http://localhost:5000/' + track.picture}
          type="image/jpeg"
        />
        <img
          height={70}
          width={70}
          src={'http://localhost:5000/' + track.picture}
          alt=""
        />
      </picture>
      <Grid
        container
        direction="column"
        style={{ width: '200px', margin: '20px' }}
      >
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: 'gray' }}>{track.artist}</div>
      </Grid>
      {active && <div>02:42 / 03:22</div>}
      <IconButton
        onClick={e => e.stopPropagation()}
        style={{ marginLeft: 'auto' }}
      >
        <Delete />
      </IconButton>
    </Track>
  );
};

export default TrackItem;
