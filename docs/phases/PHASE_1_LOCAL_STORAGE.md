# Phase 1: Local Storage MVP

## Overview
This document outlines the implementation details for Phase 1 of the Kitchen 360° Organizer, focusing on creating a functional prototype with local storage and blob storage for images.

## Architecture Diagram

```mermaid
graph TD
    A[User Interface] --> B[Viewer Component]
    A --> C[Storage Manager]
    A --> D[State Manager]
    
    B --> E[Photo Sphere Viewer]
    B --> F[Hotspot Manager]
    
    C --> G[LocalStorage Adapter]
    C --> H[IndexedDB Adapter]
    
    D --> I[React Context]
    D --> J[Custom Hooks]
    
    E --> K[Core Viewer]
    E --> L[Basic Plugins]
    
    F --> M[Hotspot Creation]
    F --> N[Hotspot Editing]
    
    G --> O[Metadata Storage]
    
    H --> P[Blob Storage]
    H --> Q[Image Cache]
```

## Component Architecture

### Storage Layer
```mermaid
classDiagram
    class StorageManager {
        +getMetadata(key: string)
        +setMetadata(key: string, value: any)
        +createBlobUrl(blob: Blob)
        +revokeBlobUrl(url: string)
        +delete(key: string)
        +getAllKeys()
    }
    
    class IndexedDBAdapter {
        +get(key: string)
        +set(key: string, value: any)
        +delete(key: string)
        +getAllKeys()
    }
    
    StorageManager --> IndexedDBAdapter
```

### State Management
```mermaid
classDiagram
    class AppState {
        +currentRoom: Room
        +currentView: View
        +hotspots: Hotspot[]
        +isEditing: boolean
        +blobUrls: Map<string, string>
    }
    
    class Room {
        +id: string
        +name: string
        +views: View[]
    }
    
    class View {
        +id: string
        +name: string
        +blobUrl: string
        +position: Position
    }
    
    class Hotspot {
        +id: string
        +type: string
        +position: Position
        +data: any
    }
    
    AppState --> Room
    AppState --> View
    AppState --> Hotspot
```

### Viewer Integration
```mermaid
sequenceDiagram
    participant UI
    participant Viewer
    participant Storage
    participant State
    
    UI->>Viewer: Initialize
    Viewer->>Storage: Load Image Metadata
    Storage->>Viewer: Return Metadata
    Viewer->>State: Create Blob URL
    State->>Viewer: Provide Blob URL
    Viewer->>State: Update Loading State
    State->>UI: Render Viewer
    
    UI->>Viewer: Create Hotspot
    Viewer->>State: Add Hotspot
    State->>Storage: Save Hotspot
    Storage->>UI: Update UI
```

## Data Flow

### Image Loading
```mermaid
graph LR
    A[User Action] --> B[Load Image]
    B --> C[Check Blob URL Cache]
    C -->|Cache Hit| D[Use Existing URL]
    C -->|Cache Miss| E[Create New Blob URL]
    E --> F[Store in State]
    D --> G[Display in Viewer]
    F --> G
```

### Hotspot Management
```mermaid
graph TD
    A[Create Hotspot] --> B[Validate Position]
    B --> C[Create Data]
    C --> D[Save to IndexedDB]
    D --> E[Update State]
    E --> F[Update UI]
    
    G[Edit Hotspot] --> H[Load from IndexedDB]
    H --> I[Update Data]
    I --> J[Save to IndexedDB]
    J --> K[Update State]
    K --> L[Update UI]
```

## Implementation Details

### Storage Structure
```mermaid
erDiagram
    ROOMS ||--o{ VIEWS : contains
    VIEWS ||--o{ HOTSPOTS : contains
    HOTSPOTS ||--o{ ITEMS : contains
    
    ROOMS {
        string id PK
        string name
        string type
        string description
        string layoutType
        json metadata
        timestamp created
        timestamp updated
    }
    
    VIEWS {
        string id PK
        string roomId FK
        string name
        string description
        string blobKey
        json position
        json connections
        timestamp created
        timestamp updated
    }
    
    HOTSPOTS {
        string id PK
        string viewId FK
        string type
        string name
        string description
        json position
        json appearance
        json data
        timestamp created
        timestamp updated
    }

    ITEMS {
        string id PK
        string hotspotId FK
        string name
        string description
        string category
        integer quantity
        string units
        date expirationDate
        date purchaseDate
        date lastUsedDate
        json customProperties
        timestamp created
        timestamp updated
    }
```

### File Structure
```
src/
├── components/
│   ├── viewer/
│   │   ├── Viewer.tsx
│   │   ├── HotspotManager.tsx
│   │   └── Controls.tsx
│   ├── layout/
│   │   ├── AppBar.tsx
│   │   ├── Navigation.tsx
│   │   └── Modal.tsx
│   ├── creation/
│   │   ├── RoomCreation/
│   │   │   ├── RoomCreationStepper.tsx
│   │   │   ├── RoomDetailsStep.tsx
│   │   │   ├── InitialViewStep.tsx
│   │   │   └── StorageAreasStep.tsx
│   │   ├── ViewCreation/
│   │   │   ├── ViewCreationDialog.tsx
│   │   │   ├── ViewUploadStep.tsx
│   │   │   └── ViewConnectionsStep.tsx
│   │   └── HotspotCreation/
│   │       ├── HotspotCreationDialog.tsx
│   │       ├── HotspotTypeStep.tsx
│   │       ├── HotspotPlacementStep.tsx
│   │       ├── HotspotConfigStep.tsx
│   │       └── HotspotContentStep.tsx
│   └── common/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Stepper.tsx
│       └── Dialog.tsx
├── hooks/
│   ├── useStorage.ts
│   ├── useViewer.ts
│   ├── useHotspots.ts
│   ├── useRoomCreation.ts
│   ├── useViewCreation.ts
│   └── useHotspotCreation.ts
├── services/
│   ├── storage/
│   │   └── IndexedDB.ts
│   └── viewer/
│       ├── ViewerService.ts
│       └── HotspotService.ts
├── types/
│   ├── Room.ts
│   ├── View.ts
│   ├── Hotspot.ts
│   └── Item.ts
└── context/
    ├── AppContext.tsx
    ├── ViewerContext.tsx
    ├── CreationContext.tsx
    └── HotspotContext.tsx
```

## New Features Implementation

### Room Creation Flow
```mermaid
sequenceDiagram
    participant UI
    participant Creation
    participant Storage
    participant State
    
    UI->>Creation: Start Room Creation
    Creation->>UI: Show Stepper
    UI->>Creation: Enter Room Details
    Creation->>Storage: Validate Name
    Storage->>Creation: Return Validation
    UI->>Creation: Upload Initial View
    Creation->>Storage: Store Image
    Storage->>Creation: Return Blob Key
    UI->>Creation: Configure Storage Areas
    Creation->>Storage: Save Room
    Storage->>State: Update Current Room
    State->>UI: Update Navigation
```

### View Creation Flow
```mermaid
sequenceDiagram
    participant UI
    participant Creation
    participant Storage
    participant Viewer
    
    UI->>Creation: Start View Creation
    Creation->>UI: Show Dialog
    UI->>Creation: Upload 360° Image
    Creation->>Storage: Store Image
    Storage->>Creation: Return Blob Key
    UI->>Creation: Configure Position
    Creation->>Viewer: Preview Position
    UI->>Creation: Save View
    Creation->>Storage: Save View
    Storage->>UI: Update Room Views
```

### Hotspot Creation Flow
```mermaid
sequenceDiagram
    participant UI
    participant Creation
    participant Viewer
    participant Storage
    
    UI->>Creation: Start Hotspot Creation
    Creation->>UI: Show Type Selection
    UI->>Creation: Select Type
    Creation->>Viewer: Enable Placement Mode
    UI->>Viewer: Place Hotspot
    Viewer->>Creation: Return Position
    UI->>Creation: Configure Properties
    Creation->>Storage: Save Hotspot
    Storage->>UI: Update View
```

## Performance Considerations

### Blob Management
```mermaid
graph TD
    A[Image Upload] --> B[Create Blob URL]
    B --> C[Store in State]
    C --> D[Update Viewer]
    
    E[Cleanup] --> F[Revoke Unused URLs]
    F --> G[Clear Memory]
    
    H[Memory Management] --> I[Track Usage]
    I --> J[Revoke Old URLs]
    J --> K[Free Memory]
```

### State Management
```mermaid
graph LR
    A[User Action] --> B[Update State]
    B --> C[Persist Metadata]
    C --> D[Update UI]
    
    E[Load Data] --> F[Check Memory]
    F -->|Memory Hit| G[Use Memory]
    F -->|Memory Miss| H[Load from IndexedDB]
    H --> I[Update Memory]
```

## Testing Strategy

### Unit Tests
```mermaid
graph TD
    A[Storage Tests] --> B[LocalStorage]
    A --> C[IndexedDB]
    
    D[Component Tests] --> E[Viewer]
    D --> F[HotspotManager]
    D --> G[Controls]
    D --> H[Creation Components]
    
    I[Hook Tests] --> J[useStorage]
    I --> K[useViewer]
    I --> L[useHotspots]
    I --> M[useRoomCreation]
    I --> N[useViewCreation]
    I --> O[useHotspotCreation]
```

### Integration Tests
```mermaid
sequenceDiagram
    participant Test
    participant UI
    participant Storage
    participant Viewer
    
    Test->>UI: Create Room
    UI->>Storage: Save Room
    Storage->>UI: Confirm Save
    UI->>Viewer: Load Room
    Viewer->>Storage: Load Image
    Storage->>Viewer: Return Image
    Viewer->>Test: Verify Display
    
    Test->>UI: Add View
    UI->>Storage: Save View
    Storage->>UI: Confirm Save
    UI->>Viewer: Load View
    Viewer->>Test: Verify Display
    
    Test->>UI: Add Hotspot
    UI->>Storage: Save Hotspot
    Storage->>UI: Confirm Save
    UI->>Viewer: Load Hotspot
    Viewer->>Test: Verify Display
```

## Next Steps
1. Set up project structure
2. Implement basic storage adapters
3. Create core viewer component
4. Implement room creation flow
5. Add view creation functionality
6. Add hotspot creation and management
7. Implement basic UI components
8. Set up testing infrastructure 