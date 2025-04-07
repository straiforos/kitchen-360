import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material';
import { RoomCreationData } from '@types';
import { RoomDetailsStep } from './RoomDetailsStep';
import { InitialViewStep } from './InitialViewStep';
import { StorageAreasStep } from './StorageAreasStep';
import { useRoomCreation } from '@hooks/useRoomCreation';

const steps = ['Room Details', 'Initial View', 'Storage Areas'];

export const RoomCreationStepper: React.FC<{
  onSave: (roomData: RoomCreationData) => void;
  onCancel: () => void;
  initialStep?: number;
}> = ({ onSave, onCancel, initialStep = 0 }) => {
  const [activeStep, setActiveStep] = useState(initialStep);
  const { roomData, updateRoomData, updateInitialView } = useRoomCreation();

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSave = () => {
    onSave(roomData);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <RoomDetailsStep
            data={roomData}
            onUpdate={updateRoomData}
          />
        );
      case 1:
        return (
          <InitialViewStep
            data={roomData.initialView}
            onUpdate={updateInitialView}
          />
        );
      case 2:
        return (
          <StorageAreasStep
            roomData={roomData}
            onUpdate={updateRoomData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card sx={{ maxWidth: 800, width: '100%' }}>
      <CardHeader
        title="Create New Room"
        subheader={`Step ${activeStep + 1} of ${steps.length}`}
      />
      <CardContent>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 2 }}>{getStepContent(activeStep)}</Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={handleBack} disabled={activeStep === 0}>
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button onClick={handleSave} variant="contained" color="primary">
            Create Room
          </Button>
        ) : (
          <Button onClick={handleNext} variant="contained" color="primary">
            Next
          </Button>
        )}
      </CardActions>
    </Card>
  );
}; 