import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProvider } from './context/AppContext';
import { AppBar } from './components/layout/AppBar';
import { Navigation } from './components/layout/Navigation';
import { Viewer } from './components/viewer/Viewer';
import { createAppTheme } from './theme';
import { useApp } from './context/AppContext';

const AppContent: React.FC = () => {
  const { currentView } = useApp();
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  const theme = React.useMemo(() => createAppTheme(mode), [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <AppBar mode={mode} onModeChange={toggleColorMode} />
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <Navigation />
          <main style={{ flex: 1, overflow: 'hidden' }}>
            {currentView && (
              <Viewer
                imageUrl={currentView.imageUrl}
                position={currentView.position}
                hotspots={currentView.hotspots}
                onPositionChange={() => {}}
                onHotspotClick={() => {}}
              />
            )}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
