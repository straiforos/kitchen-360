import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { Viewer } from "@components/viewer/Viewer";
import { StorageAreaCreation } from "./pages/StorageAreaCreation";

/**
 * 
 * @returns 360 Photosphere viewer with storage location markers.
 */
const ViewerPage: React.FC = () => {
  return (
    <Viewer
      imageUrl="./public/top_cabinets.jpg"
      hotspots={[]}
      onHotspotClick={() => {}}
      storageAreas={[]}
    />
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ViewerPage />} />
          <Route path="/storage">
            <Route path="create" element={<StorageAreaCreation />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
