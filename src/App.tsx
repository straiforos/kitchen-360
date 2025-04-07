import React from "react";
import { AppProvider } from "./context/AppContext";
import { createAppTheme } from "./theme";
import { useApp } from "./context/useApp";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";

const AppContent: React.FC = () => {
  return (
    <ReactPhotoSphereViewer
      src={'./public/top_cabinets.jpg'}
      width="100wh"
      height="100vh"
    ></ReactPhotoSphereViewer>
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
