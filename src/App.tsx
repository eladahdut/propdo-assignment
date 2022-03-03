import React from "react";
import logo from "./logo.svg";
import "./App.css";
import RealEstate from "./components/RealEstate";
import AppDataProvider from "./context/appContext";

function App() {
  return (
    <AppDataProvider>
      <div className="App">
        <RealEstate />
      </div>
    </AppDataProvider>
  );
}

export default App;
