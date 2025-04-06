import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import { InitialViewStep } from '../creation/RoomCreation/InitialViewStep';
import { ViewCreationData } from '../../../types/View';

describe('InitialViewStep', () => {
  const mockData: ViewCreationData = {
    name: '',
    description: '',
    imageFile: new File(['test'], 'test.jpg', { type: 'image/jpeg' }),
    position: { longitude: 0, latitude: 0, zoom: 0 },
  };

  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(
      <InitialViewStep
        data={mockData}
        onUpdate={mockOnUpdate}
      />
    );

    expect(screen.getByText('Upload 360° Image')).toBeInTheDocument();
    expect(screen.getByLabelText('View Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
  });

  it('handles image upload', () => {
    const testFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const { container } = render(
      <InitialViewStep
        data={mockData}
        onUpdate={mockOnUpdate}
      />
    );

    const fileInput = container.querySelector('input[type="file"]');
    if (fileInput) {
      fireEvent.change(fileInput, { target: { files: [testFile] } });
    }

    expect(mockOnUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        imageFile: testFile,
      })
    );
  });

  it('updates view name when changed', () => {
    render(
      <InitialViewStep
        data={mockData}
        onUpdate={mockOnUpdate}
      />
    );

    fireEvent.change(screen.getByLabelText('View Name'), {
      target: { value: 'Test View' },
    });

    expect(mockOnUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Test View',
      })
    );
  });

  it('updates description when changed', () => {
    render(
      <InitialViewStep
        data={mockData}
        onUpdate={mockOnUpdate}
      />
    );

    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Test Description' },
    });

    expect(mockOnUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        description: 'Test Description',
      })
    );
  });

  it('shows required field indicator for view name', () => {
    render(
      <InitialViewStep
        data={mockData}
        onUpdate={mockOnUpdate}
      />
    );

    const nameInput = screen.getByLabelText('View Name');
    expect(nameInput).toHaveAttribute('required');
  });

  it('shows image preview when image is uploaded', () => {
    const testFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const { container } = render(
      <InitialViewStep
        data={mockData}
        onUpdate={mockOnUpdate}
      />
    );

    const fileInput = container.querySelector('input[type="file"]');
    if (fileInput) {
      fireEvent.change(fileInput, { target: { files: [testFile] } });
    }

    expect(screen.getByAltText('Preview')).toBeInTheDocument();
  });
}); 