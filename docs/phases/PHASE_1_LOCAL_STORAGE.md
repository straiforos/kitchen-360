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
    B --> F[Storage Area Manager]
    B --> G[View Navigation]
    
    C --> H[LocalStorage Adapter]
    C --> I[IndexedDB Adapter]
    
    D --> J[React Context]
    D --> K[Custom Hooks]
    
    E --> L[Core Viewer]
    E --> M[Basic Plugins]
    
    F --> N[Storage Area Creation]
    F --> O[Storage Area Editing]
    F --> P[Open/Close States]
    
    G --> Q[View Transitions]
    G --> R[View Connections]
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
        +storageAreas: StorageArea[]
        +isEditing: boolean
        +blobUrls: Map<string, string>
    }
    
    class Room {
        +id: string
        +name: string
        +type: RoomType
        +description: string
        +layoutType: RoomLayoutType
        +views: View[]
        +createdAt: Date
        +updatedAt: Date
    }
    
    class View {
        +id: string
        +roomId: string
        +name: string
        +description: string
        +imageUrl: string
        +position: Position
        +storageAreas: StorageArea[]
        +connections: ViewConnection[]
        +createdAt: Date
        +updatedAt: Date
    }
    
    class StorageArea {
        +id: string
        +viewId: string
        +name: string
        +type: StorageAreaType
        +description: string
        +position: Position
        +openImageUrl: string
        +createdAt: Date
        +updatedAt: Date
    }
    
    class Position {
        +longitude: number
        +latitude: number
        +zoom: number
    }
    
    class ViewConnection {
        +targetViewId: string
        +position: Position
        +type: ViewConnectionType
    }
    
    AppState --> Room
    AppState --> View
    AppState --> StorageArea
    View --> Position
    StorageArea --> Position
    View --> ViewConnection
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
    
    UI->>Viewer: Click Storage Area
    Viewer->>State: Get Storage Area Data
    State->>Storage: Load Open Image
    Storage->>Viewer: Return Open Image
    Viewer->>UI: Display Open Storage Area
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

### Storage Area Management
```mermaid
graph TD
    A[Create Storage Area] --> B[Validate Position]
    B --> C[Create Data]
    C --> D[Save to IndexedDB]
    D --> E[Update State]
    E --> F[Update UI]
    
    G[Edit Storage Area] --> H[Load from IndexedDB]
    H --> I[Update Data]
    I --> J[Save to IndexedDB]
    J --> K[Update State]
    K --> L[Update UI]
    
    M[View Storage Area] --> N[Load Open Image]
    N --> O[Display Open State]
    O --> P[Return to Closed State]
```

## Implementation Details

### Storage Structure
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
        timestamp created
        timestamp updated
    }
    
    VIEWS {
        string id PK
        string roomId FK
        string name
        string description
        string imageUrl
        json position
        timestamp created
        timestamp updated
    }
    
    STORAGE_AREAS {
        string id PK
        string viewId FK
        string name
        string type
        string description
        json position
        string openImageUrl
        timestamp created
        timestamp updated
    }
    
    VIEW_CONNECTIONS {
        string id PK
        string sourceViewId FK
        string targetViewId FK
        json position
        string type
    }
```

### File Structure
```
src/
├── components/
│   ├── viewer/
│   │   ├── Viewer.tsx
│   │   ├── StorageAreaManager.tsx
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
│   │   └── StorageAreaCreation/
│   │       ├── StorageAreaCreationDialog.tsx
│   │       ├── StorageAreaTypeStep.tsx
│   │       ├── StorageAreaPlacementStep.tsx
│   │       ├── StorageAreaConfigStep.tsx
│   │       └── StorageAreaImageStep.tsx
│   └── common/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Stepper.tsx
│       └── Dialog.tsx
├── hooks/
│   ├── useStorage.ts
│   ├── useViewer.ts
│   ├── useStorageAreas.ts
│   ├── useRoomCreation.ts
│   ├── useViewCreation.ts
│   └── useStorageAreaCreation.ts
├── services/
│   ├── storage/
│   │   └── IndexedDB.ts
│   └── viewer/
│       ├── ViewerService.ts
│       └── StorageAreaService.ts
├── types/
│   ├── Room.ts
│   ├── View.ts
│   ├── StorageArea.ts
│   └── Position.ts
└── context/
    ├── AppContext.tsx
    ├── ViewerContext.tsx
    ├── CreationContext.tsx
    └── StorageAreaContext.tsx
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

### Storage Area Creation Flow
```mermaid
sequenceDiagram
    participant UI
    participant Creation
    participant Viewer
    participant Storage
    
    UI->>Creation: Start Storage Area Creation
    Creation->>UI: Show Type Selection
    UI->>Creation: Select Type
    Creation->>Viewer: Enable Placement Mode
    UI->>Viewer: Place Storage Area
    Viewer->>Creation: Return Position
    UI->>Creation: Upload Open Image
    Creation->>Storage: Store Open Image
    Storage->>Creation: Return Blob Key
    UI->>Creation: Configure Properties
    Creation->>Storage: Save Storage Area
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
    D --> F[StorageAreaManager]
    D --> G[Controls]
    D --> H[Creation Components]
    
    I[Hook Tests] --> J[useStorage]
    I --> K[useViewer]
    I --> L[useStorageAreas]
    I --> M[useRoomCreation]
    I --> N[useViewCreation]
    I --> O[useStorageAreaCreation]
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
    
    Test->>UI: Add Storage Area
    UI->>Storage: Save Storage Area
    Storage->>UI: Confirm Save
    UI->>Viewer: Load Storage Area
    Viewer->>Test: Verify Display
```

## Next Steps
1. Set up project structure
2. Implement basic storage adapters
3. Create core viewer component
4. Implement room creation flow
5. Add view creation functionality
6. Add storage area creation and management
7. Implement basic UI components
8. Set up testing infrastructure 