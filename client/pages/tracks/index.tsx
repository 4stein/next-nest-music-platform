import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useRouter } from 'next/router';
import MainLayout from '../../layouts/MainLayout';
import TracksList from '../../components/TracksList';
import { useSelector } from 'react-redux';
import { fetchTracks, trackSelector } from '../../store/slices/track';
import { wrapper } from '../../store';
import { GetServerSideProps } from 'next';

const TrackList = () => {
  const router = useRouter();

  // useSelector
  const { tracks, error } = useSelector(trackSelector);

  if (error.length) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    );
  }

  return (
    <>
      <MainLayout title="Tracks list - Music platform">
        <Grid container justifyContent={'center'}>
          <Card style={{ width: '100%' }}>
            <Box p={3}>
              <Grid
                style={{ display: 'flex' }}
                justifyContent={'space-between'}
              >
                <h1>Tracks list</h1>
                <Button onClick={() => router.push('/tracks/create')}>
                  Download
                </Button>
              </Grid>
            </Box>
            <TracksList tracks={tracks} />
          </Card>
        </Grid>
      </MainLayout>
    </>
  );
};

export default TrackList;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async () => {
    await store.dispatch(await fetchTracks());
    return { props: {} };
  });
