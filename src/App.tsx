import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { Viewer } from "@components/viewer/Viewer";
import { StorageAreaCreation } from "./pages/StorageAreaCreation";
import { View } from "./types";
import { useApp } from "./context/useApp";
import { StorageArea } from "./types/StorageArea";
import { IndexedDBStorage } from "./services/storage/indexedDB";
import { ViewStorageArea } from "./pages/ViewStorageArea";

const storage = new IndexedDBStorage();

const hardcodedView: View = {
  id: "view-1",
  roomId: "room-1",
  name: "Kitchen Top Cabinets",
  description: "View of the kitchen's top cabinets",
  imageUrl: "./top_cabinets.jpg",
  position: {
    yaw: 0,
    pitch: 0,
    zoom: 50
  },
  storageAreas: [],
  connections: [],
  initialPosition: {
    yaw: 0,
    pitch: 0,
    zoom: 50
  },
  createdAt: new Date(),
  updatedAt: new Date()
};

/**
 * 
 * @returns 360 Photosphere viewer with storage location markers.
 */
const ViewerPage: React.FC = () => {
  const { setCurrentView } = useApp();
  const [storageAreas, setStorageAreas] = useState<StorageArea[]>([]);

  // Load storage areas when component mounts
  useEffect(() => {
    const loadStorageAreas = async () => {
      try {
        await storage.init();
        const areas = await storage.getAllStorageAreas();
        setStorageAreas(areas);
      } catch (err) {
        console.error('Failed to load storage areas:', err);
      }
    };

    loadStorageAreas();
  }, []);

  // Set the current view when the component mounts
  useEffect(() => {
    setCurrentView(hardcodedView);
  }, [setCurrentView]);

  return (
    <Viewer
      imageUrl={hardcodedView.imageUrl}
      storageAreas={storageAreas}
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
            <Route path=":id" element={<ViewStorageArea />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
