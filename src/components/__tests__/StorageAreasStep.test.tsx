import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StorageAreasStep } from './StorageAreasStep';
import { RoomCreationData } from '../../../types/Room';

describe('StorageAreasStep', () => {
  const mockRoomData: RoomCreationData = {
    name: 'Test Room',
    type: 'Kitchen',
    description: 'Test Description',
    layoutType: 'L-shaped',
    storageAreas: [],
  };

  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<StorageAreasStep roomData={mockRoomData} onUpdate={mockOnUpdate} />);
    expect(screen.getByText('Storage Areas')).toBeInTheDocument();
  });

  it('shows add storage area button', () => {
    render(<StorageAreasStep roomData={mockRoomData} onUpdate={mockOnUpdate} />);
    expect(screen.getByText('Add Storage Area')).toBeInTheDocument();
  });

  it('shows form when add button is clicked', () => {
    render(<StorageAreasStep roomData={mockRoomData} onUpdate={mockOnUpdate} />);
    fireEvent.click(screen.getByText('Add Storage Area'));
    expect(screen.getByText('New Storage Area')).toBeInTheDocument();
  });

  it('adds a new storage area', async () => {
    render(<StorageAreasStep roomData={mockRoomData} onUpdate={mockOnUpdate} />);
    
    // Click add button
    fireEvent.click(screen.getByText('Add Storage Area'));
    
    // Fill in the form
    await userEvent.type(screen.getByLabelText('Name'), 'Test Cabinet');
    await userEvent.type(screen.getByLabelText('Description'), 'Test Description');
    
    // Save the new area
    fireEvent.click(screen.getByText('Save'));
    
    // Check if onUpdate was called with the correct data
    expect(mockOnUpdate).toHaveBeenCalledWith({
      storageAreas: [
        expect.objectContaining({
          name: 'Test Cabinet',
          type: 'Cabinet',
          description: 'Test Description',
        }),
      ],
    });
  });

  it('edits an existing storage area', async () => {
    const roomDataWithArea: RoomCreationData = {
      ...mockRoomData,
      storageAreas: [
        {
          id: 'test-id',
          name: 'Test Cabinet',
          type: 'Cabinet',
          description: 'Original Description',
        },
      ],
    };

    render(<StorageAreasStep roomData={roomDataWithArea} onUpdate={mockOnUpdate} />);
    
    // Click edit button
    fireEvent.click(screen.getByLabelText('edit'));
    
    // Update the name
    const nameInput = screen.getByDisplayValue('Test Cabinet');
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Updated Cabinet');
    
    // Click done
    fireEvent.click(screen.getByText('Done'));
    
    // Check if onUpdate was called with the correct data
    expect(mockOnUpdate).toHaveBeenCalledWith({
      storageAreas: [
        expect.objectContaining({
          id: 'test-id',
          name: 'Updated Cabinet',
          type: 'Cabinet',
        }),
      ],
    });
  });

  it('deletes a storage area', () => {
    const roomDataWithArea: RoomCreationData = {
      ...mockRoomData,
      storageAreas: [
        {
          id: 'test-id',
          name: 'Test Cabinet',
          type: 'Cabinet',
          description: 'Test Description',
        },
      ],
    };

    render(<StorageAreasStep roomData={roomDataWithArea} onUpdate={mockOnUpdate} />);
    
    // Click delete button
    fireEvent.click(screen.getByLabelText('delete'));
    
    // Check if onUpdate was called with empty storage areas
    expect(mockOnUpdate).toHaveBeenCalledWith({
      storageAreas: [],
    });
  });

  it('cancels adding a new storage area', () => {
    render(<StorageAreasStep roomData={mockRoomData} onUpdate={mockOnUpdate} />);
    
    // Click add button
    fireEvent.click(screen.getByText('Add Storage Area'));
    
    // Click cancel
    fireEvent.click(screen.getByText('Cancel'));
    
    // Check if the form is hidden
    expect(screen.queryByText('New Storage Area')).not.toBeInTheDocument();
    
    // Check that onUpdate was not called
    expect(mockOnUpdate).not.toHaveBeenCalled();
  });

  it('validates required fields', async () => {
    render(<StorageAreasStep roomData={mockRoomData} onUpdate={mockOnUpdate} />);
    
    // Click add button
    fireEvent.click(screen.getByText('Add Storage Area'));
    
    // Try to save without entering a name
    fireEvent.click(screen.getByText('Save'));
    
    // Check that onUpdate was not called
    expect(mockOnUpdate).not.toHaveBeenCalled();
    
    // Save button should be disabled
    expect(screen.getByText('Save')).toBeDisabled();
  });
}); 