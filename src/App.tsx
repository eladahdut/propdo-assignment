import "./App.css";
import RealEstate from "./components/realEstate/RealEstate";
import AppDataProvider from "./context/appContext";
import HeaderComp from "./components/HeaderComp";
import MapComponent from "./components/MapComponent";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <AppDataProvider>
      <div className="App">
        <BrowserRouter>
          <HeaderComp />
          <Routes>
            <Route path="/real-estate" element={<RealEstate />} />
            <Route path="/map" element={<MapComponent />} />
            <Route path="*" element={<Navigate replace to="/real-estate" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppDataProvider>
  );
}

export default App;
