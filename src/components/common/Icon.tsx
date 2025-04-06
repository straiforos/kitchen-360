import React from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
import KitchenIcon from '@mui/icons-material/Kitchen';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LivingIcon from '@mui/icons-material/Weekend';
import StorageIcon from '@mui/icons-material/Storage';
import CategoryIcon from '@mui/icons-material/Category';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import AddIcon from '@mui/icons-material/Add';
import { RoomType } from '@types';

export type IconType = RoomType | 'view' | 'add';

interface IconProps extends SvgIconProps {
  type: IconType;
}

/**
 * A generic icon component that renders appropriate icons based on type
 * @component
 * @example
 * ```tsx
 * <Icon type="Kitchen" />
 * <Icon type="view" />
 * <Icon type="add" />
 * ```
 */
export const Icon: React.FC<IconProps> = ({ type, ...props }) => {
  const iconMap: Record<IconType, React.ComponentType<SvgIconProps>> = {
    'Kitchen': KitchenIcon,
    'Dining Room': RestaurantIcon,
    'Living Room': LivingIcon,
    'Pantry': StorageIcon,
    'Custom': CategoryIcon,
    'view': ViewInArIcon,
    'add': AddIcon,
  };

  const IconComponent = iconMap[type];
  return <IconComponent data-testid={`${type.replace(' ', '')}Icon`} {...props} />;
}; 