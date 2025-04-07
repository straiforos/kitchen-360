import React, { useState } from 'react';
import { Hotspot, Position } from '../../types';
import { MarkerType } from '@photo-sphere-viewer/markers-plugin';
import './HotspotForm.css';

interface HotspotFormProps {
  /** The position where the hotspot will be placed */
  position: Position;
  /** Callback function when the form is submitted */
  onSubmit: (hotspot: Omit<Hotspot, 'id'>) => void;
  /** Callback function when the form is cancelled */
  onCancel: () => void;
  /** Optional initial values for the form */
  initialValues?: Partial<Omit<Hotspot, 'id' | 'position'>>;
}

/**
 * A form component for creating or editing hotspots in a 360° viewer
 * @component
 */
export const HotspotForm: React.FC<HotspotFormProps> = ({
  position,
  onSubmit,
  onCancel,
  initialValues = {},
}) => {
  const [name, setName] = useState(initialValues.name || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [type, setType] = useState<MarkerType>(initialValues.type || 'html' as MarkerType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      position,
      type,
      html: `<div class="hotspot-marker">${name}</div>`
    });
  };

  return (
    <div className="hotspot-form" role="dialog" aria-labelledby="hotspot-form-title">
      <h2 id="hotspot-form-title">Create Hotspot</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            aria-required="true"
            placeholder="Enter hotspot name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter hotspot description"
            aria-label="Hotspot description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as MarkerType)}
            aria-label="Hotspot type"
          >
            <option value="marker">Marker</option>
            <option value="image">Image</option>
            <option value="html">HTML</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} aria-label="Cancel hotspot creation">
            Cancel
          </button>
          <button type="submit" aria-label="Create hotspot">
            Create Hotspot
          </button>
        </div>
      </form>
    </div>
  );
}; 