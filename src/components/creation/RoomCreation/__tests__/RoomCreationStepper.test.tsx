import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RoomCreationStepper } from '../RoomCreationStepper';

describe('RoomCreationStepper', () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the stepper with initial step', () => {
    render(
      <RoomCreationStepper
        open={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    expect(screen.getByText('Create New Room')).toBeInTheDocument();
    expect(screen.getByText('Room Details')).toBeInTheDocument();
    expect(screen.getByText('Initial View')).toBeInTheDocument();
    expect(screen.getByText('Storage Areas')).toBeInTheDocument();
  });

  it('handles navigation between steps', () => {
    render(
      <RoomCreationStepper
        open={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    // Should start at first step
    expect(screen.getByText('Room Name')).toBeInTheDocument();

    // Move to next step
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Upload 360° Image')).toBeInTheDocument();

    // Move back to previous step
    fireEvent.click(screen.getByText('Back'));
    expect(screen.getByText('Room Name')).toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', () => {
    render(
      <RoomCreationStepper
        open={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onSave with room data when create button is clicked', async () => {
    render(
      <RoomCreationStepper
        open={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    // Fill in room details
    fireEvent.change(screen.getByLabelText('Room Name'), {
      target: { value: 'Test Kitchen' },
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Test Description' },
    });

    // Navigate to last step
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));

    // Click create button
    fireEvent.click(screen.getByText('Create Room'));

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Test Kitchen',
          description: 'Test Description',
          type: 'Kitchen',
          layoutType: 'L-shaped',
        })
      );
    });
  });

  it('disables back button on first step', () => {
    render(
      <RoomCreationStepper
        open={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    expect(screen.getByText('Back')).toBeDisabled();
  });
}); 