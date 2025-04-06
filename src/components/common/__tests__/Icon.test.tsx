import React from 'react';
import { render, screen } from '@testing-library/react';
import { Icon } from '../Icon';
import { RoomType } from '@types';

describe('Icon', () => {
  it('renders kitchen icon for Kitchen room type', () => {
    render(<Icon type="Kitchen" />);
    expect(screen.getByTestId('KitchenIcon')).toBeInTheDocument();
  });

  it('renders restaurant icon for Dining Room room type', () => {
    render(<Icon type="Dining Room" />);
    expect(screen.getByTestId('DiningRoomIcon')).toBeInTheDocument();
  });

  it('renders weekend icon for Living Room room type', () => {
    render(<Icon type="Living Room" />);
    expect(screen.getByTestId('LivingRoomIcon')).toBeInTheDocument();
  });

  it('renders storage icon for Pantry room type', () => {
    render(<Icon type="Pantry" />);
    expect(screen.getByTestId('PantryIcon')).toBeInTheDocument();
  });

  it('renders category icon for Custom room type', () => {
    render(<Icon type="Custom" />);
    expect(screen.getByTestId('CustomIcon')).toBeInTheDocument();
  });

  it('renders view icon for view type', () => {
    render(<Icon type="view" />);
    expect(screen.getByTestId('viewIcon')).toBeInTheDocument();
  });

  it('renders add icon for add type', () => {
    render(<Icon type="add" />);
    expect(screen.getByTestId('addIcon')).toBeInTheDocument();
  });

  it('applies additional props to the icon', () => {
    render(<Icon type="Kitchen" color="primary" fontSize="large" />);
    const icon = screen.getByTestId('KitchenIcon');
    expect(icon).toHaveClass('MuiSvgIcon-colorPrimary');
    expect(icon).toHaveClass('MuiSvgIcon-fontSizeLarge');
  });
}); 