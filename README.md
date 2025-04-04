# Kitchen 360° Organizer

A modern web application for organizing and navigating 360° kitchen views with interactive hotspots.

## Features

- 360° panorama viewer
- Interactive hotspot creation and management
- Multiple view support with smooth transitions
- Local storage for offline access
- GitHub-based storage for easy sharing
- Material Design 3 UI

## Quick Start

1. Clone the repository
```bash
git clone https://github.com/yourusername/kitchen-360.git
cd kitchen-360
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Documentation

For detailed documentation, including architecture, development roadmap, and implementation guides, please see our [Development Roadmap](docs/DEVELOPMENT_ROADMAP.md).

## Development

### Prerequisites
- Node.js 18+
- npm 9+
- Modern web browser

### Project Structure
```
kitchen-360/
├── src/              # Source code
│   ├── components/   # React components
│   ├── context/      # React context providers
│   ├── hooks/        # Custom React hooks
│   ├── services/     # Service layer (storage, API)
│   ├── types/        # TypeScript type definitions
│   ├── tests/        # Test files
│   └── mocks/        # Test mocks
├── public/           # Static assets
├── docs/             # Documentation
└── tests/            # Test files
```

### Scripts
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run test` - Run unit tests
- `npm run test:integration` - Run integration tests
- `npm run lint` - Run linter
- `npm run preview` - Preview production build

## Contributing

Please read our [Contributing Guide](docs/guides/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Photo Sphere Viewer](https://photo-sphere-viewer.js.org/) for the 360° viewer
- [Material Design 3](https://m3.material.io/) for the UI components
- [GitHub Pages](https://pages.github.com/) for hosting
- [Vite](https://vitejs.dev/) for the build tool