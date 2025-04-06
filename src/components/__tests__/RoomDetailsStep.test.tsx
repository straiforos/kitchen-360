import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RoomDetailsStep } from '../RoomDetailsStep';
import { RoomCreationData } from '../../../../types/Room';

describe('RoomDetailsStep', () => {
  const mockData: RoomCreationData = {
    name: '',
    type: 'Kitchen',
    description: '',
    layoutType: 'L-shaped',
  };

  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(
      <RoomDetailsStep
        data={mockData}
        onUpdate={mockOnUpdate}
      />
    );

    expect(screen.getByRole('textbox', { name: /room name/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /room type/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /layout type/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /description/i })).toBeInTheDocument();
  });

  it('updates room name when changed', () => {
    render(
      <RoomDetailsStep
        data={mockData}
        onUpdate={mockOnUpdate}
      />
    );

    fireEvent.change(screen.getByRole('textbox', { name: /room name/i }), {
      target: { value: 'Test Kitchen' },
    });

    expect(mockOnUpdate).toHaveBeenCalledWith({
      name: 'Test Kitchen',
    });
  });

  it('updates room type when changed', () => {
    render(
      <RoomDetailsStep
        data={mockData}
        onUpdate={mockOnUpdate}
      />
    );

    fireEvent.mouseDown(screen.getByRole('combobox', { name: /room type/i }));
    fireEvent.click(screen.getByText('Pantry'));

    expect(mockOnUpdate).toHaveBeenCalledWith({
      type: 'Pantry',
    });
  });

  it('updates layout type when changed', () => {
    render(
      <RoomDetailsStep
        data={mockData}
        onUpdate={mockOnUpdate}
      />
    );

    fireEvent.mouseDown(screen.getByRole('combobox', { name: /layout type/i }));
    fireEvent.click(screen.getByText('U-shaped'));

    expect(mockOnUpdate).toHaveBeenCalledWith({
      layoutType: 'U-shaped',
    });
  });

  it('updates description when changed', () => {
    render(
      <RoomDetailsStep
        data={mockData}
        onUpdate={mockOnUpdate}
      />
    );

    fireEvent.change(screen.getByRole('textbox', { name: /description/i }), {
      target: { value: 'Test Description' },
    });

    expect(mockOnUpdate).toHaveBeenCalledWith({
      description: 'Test Description',
    });
  });

  it('shows required field indicator for room name', () => {
    render(
      <RoomDetailsStep
        data={mockData}
        onUpdate={mockOnUpdate}
      />
    );

    const nameInput = screen.getByRole('textbox', { name: /room name/i });
    expect(nameInput).toHaveAttribute('required');
  });
}); 