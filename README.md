# Kitchen 360° Organizer

A modern web application that helps you organize and manage your kitchen contents through an interactive 360° interface.

## Overview

Kitchen 360° Organizer allows users to:
- View their kitchen in 360° through multiple panorama views
- Seamlessly switch between different kitchen sections
- Add interactive hotspots to drawers and cabinets
- Manage contents with photos and notes
- Collaborate with roommates or family members
- Track changes and updates

## Features

- **Multi-View 360° Image Viewer**: Explore different sections of your kitchen with multiple panorama views
- **View Navigation**: Easily switch between different kitchen sections
- **Interactive Hotspots**: Click on drawers and cabinets to view their contents
- **Content Management**: Add photos and notes to each storage space
- **Edit Mode**: Reposition and customize hotspots
- **Collaboration**: Share and manage kitchen organization with others
- **Cloud Storage**: Securely store your kitchen data and images

## Tech Stack

- **Frontend**: React + TypeScript
- **360° Viewer**: Photo Sphere Viewer
- **Backend**: Firebase (Firestore + Storage) or Supabase
- **Authentication**: Firebase Auth or Magic.link

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase/Supabase account (for backend services)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kitchen-360.git
cd kitchen-360
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

## Documentation

For detailed documentation, please refer to:
- [Architecture Guide](docs/ARCHITECTURE.md)
- [API Documentation](docs/API.md)
- [Contributing Guidelines](docs/CONTRIBUTING.md)

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](docs/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Photo Sphere Viewer for the 360° viewing capabilities
- Firebase/Supabase for backend services
- All contributors who have helped shape this project 