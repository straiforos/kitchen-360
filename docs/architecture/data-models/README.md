# Data Models

## Entity Relationships

```mermaid
classDiagram
    class ImageUrlMixin {
        +String imageUrl
    }

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
        +Position position
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
        +Position position
        +Date createdAt
        +Date updatedAt
    }

    class Position {
        +Number longitude
        +Number latitude
        +Number zoom
    }

    class ViewConnection {
        +String targetViewId
        +Position position
        +String type
    }

    ImageUrlMixin <|-- View : implements
    ImageUrlMixin <|-- StorageArea : implements
    Room "1" -- "many" View : contains
    View "1" -- "many" StorageArea : contains
    View "1" -- "many" ViewConnection : has
```

## Database Structure

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
        string imageUrl
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

## Type System

```mermaid
classDiagram
    class ImageUrlMixin {
        +String imageUrl
    }

    class BaseEntity {
        +String id
        +Date createdAt
        +Date updatedAt
    }

    class Position {
        +Number longitude
        +Number latitude
        +Number zoom
    }

    class BasePositionedEntity {
        +Position position
    }

    BaseEntity <|-- Room
    BaseEntity <|-- View
    BaseEntity <|-- StorageArea
    ImageUrlMixin <|-- View
    ImageUrlMixin <|-- StorageArea
    BasePositionedEntity <|-- View
    BasePositionedEntity <|-- StorageArea
    BasePositionedEntity <|-- ViewConnection
```

## Storage Area Types
- Cabinet
- Drawer
- Shelf
- Custom

## View Connection Types
- Door
- Archway
- Opening
- Custom

## Data Flow

### Room Creation
1. User inputs room details
2. System validates input
3. Room is created in database
4. Room ID is returned
5. User proceeds to view creation

### View Creation
1. User uploads 360° image
2. System processes and stores image
3. User inputs view details
4. System validates input
5. View is created in database
6. View ID is returned
7. Optional: User creates view connections

### Storage Area Creation
1. User selects position in view
2. User uploads storage area image
3. System processes and stores image
4. User inputs storage area details
5. System validates input
6. Storage area is created in database
7. Storage area ID is returned
8. Marker is added to view

## Validation Rules

### Room Validation
- Name: Required, 2-100 characters
- Type: Required, must be valid room type
- Description: Optional, max 500 characters
- Layout Type: Required, must be valid layout type

### View Validation
- Name: Required, 2-100 characters
- Description: Optional, max 500 characters
- Image: Required, must be valid 360° image
- Position: Required, valid coordinates

### Storage Area Validation
- Name: Required, 2-100 characters
- Type: Required, must be valid storage type
- Description: Optional, max 500 characters
- Position: Required, valid coordinates
- Image: Required, valid image format 