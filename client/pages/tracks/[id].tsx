import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';

import MainLayout from '../../layouts/MainLayout';
import { ITrack } from '../../types/track';
import { GetServerSideProps } from 'next';
import { wrapper } from '../../store';
import useInput from '../../hooks/useInput';

interface TrackPageProps {
  serverTrack: ITrack;
}

const TrackPage: React.FC<TrackPageProps> = ({ serverTrack }) => {
  const [track, setTrack] = useState<ITrack>(serverTrack);

  const router = useRouter();

  const username = useInput('');
  const text = useInput('');

  const addComment = async () => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/tracks/comment',
        {
          username: username.value,
          text: text.value,
          trackId: track._id,
        }
      );
      setTrack({ ...track, comments: [...track.comments, data] });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MainLayout title={`Music Platform - ${track.name} - ${track.artist}`}>
      <Button
        variant="outlined"
        style={{ fontSize: 22, marginBottom: 25 }}
        onClick={() => router.push('/tracks')}
      >
        To list
      </Button>
      <Grid container style={{ margin: '20px 0' }}>
        <picture>
          <source
            srcSet={'http://localhost:5000/' + track.picture}
            type="image/jpeg"
          />
          <img
            height={200}
            width={200}
            src={'http://localhost:5000/' + track.picture}
            alt=""
          />
        </picture>
        <div style={{ margin: 30 }}>
          <h3>Track Name: {track.name}</h3>
          <h3>Artist: {track.artist}</h3>
          <h3>Listens: {track.listens}</h3>
        </div>
      </Grid>
      <h2>Track text</h2>
      <p>{track.text}</p>
      <h2>Comments</h2>
      <Grid container style={{ marginBottom: 30 }}>
        <TextField {...username} label="Your name" fullWidth />
        <TextField {...text} label="Comment" fullWidth multiline rows={4} />
        <Button onClick={addComment}>Send</Button>
      </Grid>
      <div>
        {track.comments.map((comment, index) => (
          <>
            <div key={index}>
              <div>Author: {comment.username}</div>
              <div>Comment: {comment.text}</div>
            </div>
          </>
        ))}
      </div>
    </MainLayout>
  );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  console.log(params.id);
  const { data } = await axios.get('http://localhost:5000/tracks/' + params.id);
  return {
    props: {
      serverTrack: data,
    },
  };
};
