import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { Icon } from './Icon';
import { RoomType } from '@types';

interface NavItemProps {
  id: string;
  name: string;
  type: 'room' | 'view';
  roomType?: RoomType;
  selected?: boolean;
  onClick: () => void;
  indent?: boolean;
}

/**
 * A reusable navigation item component for both rooms and views
 * @component
 * @example
 * ```tsx
 * <NavItem
 *   id="room-1"
 *   name="Kitchen"
 *   type="room"
 *   roomType="Kitchen"
 *   selected={true}
 *   onClick={() => handleSelect('room-1')}
 * />
 * <NavItem
 *   id="view-1"
 *   name="Main View"
 *   type="view"
 *   selected={false}
 *   onClick={() => handleSelect('view-1')}
 *   indent
 * />
 * ```
 */
export const NavItem: React.FC<NavItemProps> = ({
  id,
  name,
  type,
  roomType,
  selected = false,
  onClick,
  indent = false,
}) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        sx={{ pl: indent ? 4 : 2 }}
        selected={selected}
        onClick={onClick}
      >
        <ListItemIcon>
          <Icon type={type === 'room' ? roomType! : 'view'} />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
}; 