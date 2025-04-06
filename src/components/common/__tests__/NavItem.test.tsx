import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavItem } from '../NavItem';

describe('NavItem', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders room item with correct name and icon', () => {
    render(
      <NavItem
        id="room-1"
        name="Kitchen"
        type="room"
        roomType="Kitchen"
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText('Kitchen')).toBeInTheDocument();
    expect(screen.getByTestId('KitchenIcon')).toBeInTheDocument();
  });

  it('renders view item with correct name and icon', () => {
    render(
      <NavItem
        id="view-1"
        name="Main View"
        type="view"
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText('Main View')).toBeInTheDocument();
    expect(screen.getByTestId('viewIcon')).toBeInTheDocument();
  });

  it('applies indentation for nested items', () => {
    render(
      <NavItem
        id="view-1"
        name="Main View"
        type="view"
        onClick={mockOnClick}
        indent
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ paddingLeft: '32px' }); // 4 * 8px = 32px
  });

  it('applies selected state when selected prop is true', () => {
    render(
      <NavItem
        id="room-1"
        name="Kitchen"
        type="room"
        roomType="Kitchen"
        selected
        onClick={mockOnClick}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('Mui-selected');
  });

  it('calls onClick handler when clicked', () => {
    render(
      <NavItem
        id="room-1"
        name="Kitchen"
        type="room"
        roomType="Kitchen"
        onClick={mockOnClick}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('renders with correct room type icon', () => {
    const roomTypes = ['Kitchen', 'Dining Room', 'Living Room', 'Pantry', 'Custom'] as const;
    
    roomTypes.forEach(roomType => {
      const { unmount } = render(
        <NavItem
          id="room-1"
          name={roomType}
          type="room"
          roomType={roomType}
          onClick={mockOnClick}
        />
      );
      
      expect(screen.getByTestId(`${roomType.replace(' ', '')}Icon`)).toBeInTheDocument();
      unmount();
    });
  });
}); 