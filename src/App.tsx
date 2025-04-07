import React from "react";
import { AppProvider } from "./context/AppContext";
import { Viewer } from "@components/viewer/Viewer";

/**
 * 
 * @returns 360 Photosphere viewer with storage location markers.
 */
const AppContent: React.FC = () => {
  return (
    <Viewer
      imageUrl="./public/top_cabinets.jpg"
      onClick={console.log}
    >
    </Viewer>
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
