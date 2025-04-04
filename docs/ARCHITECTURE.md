# Kitchen 360° Organizer - Architecture Guide

## System Architecture

### Overview
The Kitchen 360° Organizer is built as a modern web application with a React frontend and cloud-based backend services. The architecture follows a modular, component-based design pattern with clear separation of concerns.

### Frontend Architecture

#### Core Components
1. **Viewer Component**
   - Handles 360° image rendering
   - Manages hotspot positioning and interactions
   - Implements pan/zoom controls
   - Uses Photo Sphere Viewer library

2. **Hotspot System**
   - Hotspot creation and management
   - Position tracking (yaw/pitch coordinates)
   - Visual representation and styling
   - Click/touch interaction handling

3. **Modal System**
   - Drawer/cabinet detail views
   - Image gallery management
   - Note editing interface
   - Tag management

4. **Editor Interface**
   - Hotspot placement tools
   - Position adjustment controls
   - Metadata editing forms
   - Save/undo functionality

### Backend Architecture

#### Data Models

1. **Hotspot Model**
```typescript
interface Hotspot {
  id: string;
  title: string;
  position: {
    yaw: number;
    pitch: number;
  };
  images: string[];
  notes: string;
  tags: string[];
  lastUpdated: Date;
  createdBy: string;
  roomId: string;
}
```

2. **Room Model**
```typescript
interface Room {
  id: string;
  name: string;
  imageUrl: string;
  hotspots: string[]; // Array of hotspot IDs
  createdBy: string;
  lastUpdated: Date;
}
```

#### Database Structure

1. **Firestore Collections**
   - `rooms`: Contains room configurations
   - `hotspots`: Contains hotspot data
   - `users`: User profiles and preferences

2. **Storage Buckets**
   - `360-images`: Original 360° room images
   - `drawer-images`: Individual drawer/cabinet photos

### Authentication Flow

1. **User Authentication**
   - Email/password authentication
   - Social login options (Google, GitHub)
   - Session management
   - Role-based access control

2. **Authorization**
   - Room ownership verification
   - Collaborative access management
   - Permission levels (owner, editor, viewer)

### API Endpoints

1. **Room Management**
   - `POST /api/rooms`: Create new room
   - `GET /api/rooms/:id`: Get room details
   - `PUT /api/rooms/:id`: Update room
   - `DELETE /api/rooms/:id`: Delete room

2. **Hotspot Management**
   - `POST /api/rooms/:roomId/hotspots`: Create hotspot
   - `GET /api/rooms/:roomId/hotspots`: List hotspots
   - `PUT /api/hotspots/:id`: Update hotspot
   - `DELETE /api/hotspots/:id`: Delete hotspot

3. **Image Management**
   - `POST /api/images/upload`: Upload new image
   - `GET /api/images/:id`: Get image details
   - `DELETE /api/images/:id`: Delete image

### State Management

1. **Global State**
   - Room configuration
   - User authentication
   - UI preferences
   - Active editor mode

2. **Local State**
   - Hotspot selection
   - Modal visibility
   - Form data
   - Image gallery state

### Security Considerations

1. **Data Protection**
   - End-to-end encryption for sensitive data
   - Secure file uploads
   - Input validation
   - XSS prevention

2. **Access Control**
   - Role-based permissions
   - Resource ownership verification
   - Rate limiting
   - API key management

### Performance Optimization

1. **Frontend**
   - Lazy loading of components
   - Image optimization
   - Caching strategies
   - Bundle size optimization

2. **Backend**
   - Query optimization
   - Indexing strategy
   - Caching layer
   - Batch operations

### Deployment Architecture

1. **Development**
   - Local development environment
   - Hot reloading
   - Mock backend services

2. **Production**
   - CI/CD pipeline
   - Automated testing
   - Monitoring and logging
   - Backup strategy

### Future Considerations

1. **Scalability**
   - Horizontal scaling
   - Load balancing
   - Database sharding
   - CDN integration

2. **Features**
   - AI-powered categorization
   - Advanced search capabilities
   - Mobile app development
   - Offline support

## Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write comprehensive tests

### Testing Strategy
- Unit tests for components
- Integration tests for features
- End-to-end testing
- Performance testing

### Documentation
- Component documentation
- API documentation
- Setup guides
- Troubleshooting guides 