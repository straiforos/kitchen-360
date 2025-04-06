# Kitchen 360° Organizer - Architecture Guide

## System Architecture

### Overview
The Kitchen 360° Organizer is built as a modern web application with a React frontend and cloud-based backend services. The architecture follows a modular, component-based design pattern with clear separation of concerns, leveraging Photo Sphere Viewer's official plugins for core functionality.

### Frontend Architecture

#### Core Components
1. **Viewer Component**
   - Uses `@photo-sphere-viewer/core` for base 360° image rendering
   - Implements `@photo-sphere-viewer/plugin-markers` for hotspot management
   - Uses `@photo-sphere-viewer/plugin-gallery` for view transitions
   - Implements `@photo-sphere-viewer/plugin-visible-range` for performance
   - Uses `@photo-sphere-viewer/plugin-zoom` for zoom controls

2. **View Navigation System**
   - Leverages `@photo-sphere-viewer/plugin-gallery` for view management
   - Uses `@photo-sphere-viewer/plugin-virtual-tour` for view connections
   - Implements `@photo-sphere-viewer/plugin-minimap` for spatial awareness
   - Uses `@photo-sphere-viewer/plugin-compass` for orientation

3. **Hotspot System**
   - Uses `@photo-sphere-viewer/plugin-markers` for hotspot visualization
   - Implements custom marker types for different storage types
   - Uses `@photo-sphere-viewer/plugin-tooltip` for hotspot information
   - Leverages `@photo-sphere-viewer/plugin-visible-range` for performance

4. **Modal System**
   - Uses `@photo-sphere-viewer/plugin-markers` for hotspot interaction
   - Implements custom modal for content management
   - Uses `@photo-sphere-viewer/plugin-tooltip` for quick previews

5. **Editor Interface**
   - Uses `@photo-sphere-viewer/plugin-markers` for hotspot placement
   - Implements `@photo-sphere-viewer/plugin-virtual-tour` for view connections
   - Uses `@photo-sphere-viewer/plugin-visible-range` for performance

### Backend Architecture

#### Data Models

```mermaid
classDiagram
    class Room {
        +String id
        +String name
        +String type
        +String description
        +String layoutType
        +View[] views
        +Date createdAt
        +Date updatedAt
    }

    class View {
        +String id
        +String roomId
        +String name
        +String description
        +String imageUrl
        +PSVPosition position
        +StorageArea[] storageAreas
        +ViewConnection[] connections
        +Date createdAt
        +Date updatedAt
    }

    class StorageArea {
        +String id
        +String viewId
        +String name
        +String type
        +String description
        +PSVPosition position
        +String openImageUrl
        +Date createdAt
        +Date updatedAt
    }

    class PSVPosition {
        +Number longitude
        +Number latitude
        +Number zoom
    }

    class ViewConnection {
        +String targetViewId
        +PSVPosition position
        +String type
    }

    Room "1" -- "many" View : contains
    View "1" -- "many" StorageArea : contains
    View "1" -- "many" ViewConnection : has
```

#### Database Structure

```mermaid
erDiagram
    ROOMS ||--o{ VIEWS : contains
    VIEWS ||--o{ STORAGE_AREAS : contains
    VIEWS ||--o{ VIEW_CONNECTIONS : has

    ROOMS {
        string id PK
        string name
        string type
        string description
        string layoutType
        timestamp createdAt
        timestamp updatedAt
    }

    VIEWS {
        string id PK
        string roomId FK
        string name
        string description
        string imageUrl
        json position
        timestamp createdAt
        timestamp updatedAt
    }

    STORAGE_AREAS {
        string id PK
        string viewId FK
        string name
        string type
        string description
        json position
        string openImageUrl
        timestamp createdAt
        timestamp updatedAt
    }

    VIEW_CONNECTIONS {
        string id PK
        string sourceViewId FK
        string targetViewId FK
        json position
        string type
    }
```

### View Management System

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant PSV
    participant Cache
    participant API
    participant Storage

    User->>UI: Select Room
    UI->>PSV: Initialize Viewer
    PSV->>Cache: Check if view is cached
    alt View is cached
        Cache->>PSV: Return cached view
    else View not cached
        PSV->>API: Request view data
        API->>Storage: Fetch panorama image
        Storage->>API: Return image
        API->>PSV: Return view data
        PSV->>Cache: Cache view data
    end
    PSV->>User: Display view
    
    User->>PSV: Click Storage Area
    PSV->>API: Request storage area data
    API->>Storage: Fetch open image
    Storage->>PSV: Return open image
    PSV->>User: Display open storage area
```

### Storage Area Types
- Cabinet
- Drawer
- Shelf
- Custom

### View Connection Types
- Door
- Archway
- Opening
- Custom

### Plugin Integration

```mermaid
graph TD
    A[Photo Sphere Viewer] --> B[Core Features]
    A --> C[Markers Plugin]
    A --> D[Gallery Plugin]
    A --> E[Virtual Tour Plugin]
    A --> F[Other Plugins]

    B --> B1[Base Viewer]
    B --> B2[Pan Controls]
    B --> B3[Zoom Controls]

    C --> C1[Hotspot Management]
    C --> C2[Custom Markers]
    C --> C3[Tooltips]

    D --> D1[View Transitions]
    D --> D2[Thumbnails]
    D --> D3[Loading States]

    E --> E1[View Connections]
    E --> E2[Node Management]
    E --> E3[Path Visualization]

    F --> F1[Minimap]
    F --> F2[Compass]
    F --> F3[Visible Range]
```

### State Management

```mermaid
stateDiagram-v2
    [*] --> Unauthenticated
    Unauthenticated --> Authenticated: Login
    Authenticated --> Unauthenticated: Logout
    
    Authenticated --> Viewing
    Viewing --> Editing: Enter Edit Mode
    Editing --> Viewing: Save Changes
    
    Viewing --> HotspotDetails: Select Hotspot
    HotspotDetails --> Viewing: Close Modal
    
    Viewing --> ViewTransition: Change View
    ViewTransition --> Viewing: Transition Complete
```

### Security Considerations

```mermaid
graph TD
    A[Security] --> B[Data Protection]
    A --> C[Access Control]
    
    B --> B1[End-to-end Encryption]
    B --> B2[Secure File Uploads]
    B --> B3[Input Validation]
    B --> B4[XSS Prevention]
    
    C --> C1[Role-based Permissions]
    C --> C2[Resource Ownership]
    C --> C3[Rate Limiting]
    C --> C4[API Key Management]
```

### Performance Optimization

```mermaid
graph LR
    A[Performance] --> B[Frontend]
    A --> C[Backend]
    
    B --> B1[Lazy Loading]
    B --> B2[Image Optimization]
    B --> B3[View Preloading]
    B --> B4[Caching]
    B --> B5[Bundle Optimization]
    
    C --> C1[Query Optimization]
    C --> C2[Indexing]
    C --> C3[Caching]
    C --> C4[Batch Operations]
    C --> C5[Image Processing]
```

### Deployment Architecture

```mermaid
graph TD
    A[Deployment] --> B[Development]
    A --> C[Production]
    
    B --> B1[Local Environment]
    B --> B2[Hot Reloading]
    B --> B3[Mock Services]
    
    C --> C1[CI/CD Pipeline]
    C --> C2[Automated Testing]
    C --> C3[Monitoring]
    C --> C4[Backup Strategy]
```

### Future Considerations

```mermaid
mindmap
  root((Future))
    Scalability
      Horizontal Scaling
      Load Balancing
      Database Sharding
      CDN Integration
    Features
      AI Categorization
      Advanced Search
      Mobile App
      Offline Support
      View Stitching
      3D Reconstruction
```

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
- View transition testing

### Documentation
- Component documentation
- API documentation
- Setup guides
- Troubleshooting guides 