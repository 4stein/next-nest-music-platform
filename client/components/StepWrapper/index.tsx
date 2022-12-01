import { Card, Container, Grid, Step, StepLabel, Stepper } from '@mui/material';
import React, { ReactElement } from 'react';

interface StepWrapperProps {
  activeStep: number;
  children: any;
}

const steps = ['Track info', 'Picture download', 'Track download'];

const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children }) => {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={activeStep > index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid
        container
        justifyContent="center"
        style={{ margin: '70px 0', height: 270 }}
      >
        <Card style={{ width: 600 }}>{children}</Card>
      </Grid>
    </Container>
  );
};

export default StepWrapper;
