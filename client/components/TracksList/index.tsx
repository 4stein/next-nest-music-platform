import React from 'react';
import { Box, Grid } from '@mui/material';

import { ITrack } from '../../types/track';
import TrackItem from '../TrackItem';

interface TracksListProps {
  tracks: ITrack[];
}

const TracksList: React.FC<TracksListProps> = ({ tracks }) => {
  return (
    <Grid container direction="column">
      <Box p={2}>
        {tracks.map(track => (
          <TrackItem key={track._id} track={track} />
        ))}
      </Box>
    </Grid>
  );
};

export default TracksList;
