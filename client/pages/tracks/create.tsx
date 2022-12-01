import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';

import StepWrapper from '../../components/StepWrapper';
import MainLayout from '../../layouts/MainLayout';
import FileUpload from '../../components/FileUpload';
import useInput from '../../hooks/useInput';
import { useRouter } from 'next/router';

const CreateTrack = () => {
  const router = useRouter();

  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState<any>(null);
  const [audio, setAudio] = useState<any>(null);

  const name = useInput('');
  const artist = useInput('');
  const text = useInput('');

  const next = async () => {
    if (activeStep !== 2) {
      setActiveStep(prev => prev + 1);
    } else {
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('artist', artist.value);
      formData.append('picture', picture);
      formData.append('audio', audio);
      try {
        await axios.post('http://localhost:5000/tracks', formData);
        router.push('/tracks');
      } catch (e) {
        console.log(e);
      }
    }
  };
  const back = () => {
    setActiveStep(prev => prev - 1);
  };

  return (
    <>
      <MainLayout>
        <StepWrapper activeStep={activeStep}>
          {activeStep === 0 && (
            <Grid container direction="column" style={{ padding: 20 }}>
              <TextField
                {...name}
                label="Track name"
                style={{ marginTop: 10 }}
              />
              <TextField
                {...artist}
                label="Author name"
                style={{ marginTop: 10 }}
              />
              <TextField
                {...text}
                label="Track text"
                multiline
                rows={3}
                style={{ marginTop: 10 }}
              />
            </Grid>
          )}
          {activeStep === 1 && (
            <FileUpload setFile={setPicture} accept="image/*">
              <Button>Upload picture</Button>
            </FileUpload>
          )}
          {activeStep === 2 && (
            <FileUpload setFile={setAudio} accept="audio/*">
              <Button>Upload audio</Button>
            </FileUpload>
          )}
        </StepWrapper>
        <Grid container justifyContent="space-between">
          <Button disabled={activeStep === 0} onClick={() => back()}>
            Go back
          </Button>
          <Button onClick={() => next()}>Next</Button>
        </Grid>
      </MainLayout>
    </>
  );
};

export default CreateTrack;
