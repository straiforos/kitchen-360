import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Paper } from '@mui/material';
import { StorageAreaImageUpload } from './StorageAreaImageUpload';
import { StorageAreaForm } from './StorageAreaForm';
import { StorageAreaCreationData } from '@types';

interface StorageAreaStepperProps {
  onComplete: (area: Partial<StorageAreaCreationData>, image?: File) => void;
  onCancel: () => void;
  initialArea?: Partial<StorageAreaCreationData>;
}

const steps = ['Upload Image', 'Details'];

export const StorageAreaStepper: React.FC<StorageAreaStepperProps> = ({
  onComplete,
  onCancel,
  initialArea,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [image, setImage] = useState<File | undefined>();
  const [areaData, setAreaData] = useState<Partial<StorageAreaCreationData>>(initialArea || {});

  const handleImageUpload = (file: File) => {
    setImage(file);
    setActiveStep(1);
  };

  const handleFormSubmit = (data: Partial<StorageAreaCreationData>) => {
    setAreaData(data);
    onComplete(data, image);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Paper sx={{ p: 2 }}>
        {activeStep === 0 && (
          <StorageAreaImageUpload
            onImageUpload={handleImageUpload}
            onCancel={onCancel}
          />
        )}
        {activeStep === 1 && (
          <StorageAreaForm
            area={areaData}
            onSubmit={handleFormSubmit}
            onCancel={handleBack}
          />
        )}
      </Paper>
    </Box>
  );
}; 