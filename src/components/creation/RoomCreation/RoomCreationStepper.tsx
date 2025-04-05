import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { RoomCreationData } from '../../../types/Room';
import { ViewCreationData } from '../../../types/View';
import { RoomDetailsStep } from './RoomDetailsStep';
import { InitialViewStep } from './InitialViewStep';
import { StorageAreasStep } from './StorageAreasStep';

const steps = ['Room Details', 'Initial View', 'Storage Areas'];

export const RoomCreationStepper: React.FC<{
  open: boolean;
  onClose: () => void;
  onSave: (roomData: RoomCreationData) => void;
}> = ({ open, onClose, onSave }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [roomData, setRoomData] = useState<RoomCreationData>({
    name: '',
    type: 'Kitchen',
    description: '',
    layoutType: 'L-shaped',
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSave = () => {
    onSave(roomData);
    onClose();
  };

  const updateRoomData = (updates: Partial<RoomCreationData>) => {
    setRoomData((prev) => ({ ...prev, ...updates }));
  };

  const updateInitialView = (viewData: ViewCreationData) => {
    setRoomData((prev) => ({ ...prev, initialView: viewData }));
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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Create New Room</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 2 }}>{getStepContent(activeStep)}</Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
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
      </DialogActions>
    </Dialog>
  );
}; 