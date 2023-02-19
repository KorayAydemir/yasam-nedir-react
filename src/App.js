import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./globals/global.css";
import Home from "./pages/home/home";
// Import the functions you need from the SDKs you need
import Yasambilim from "./pages/yasambilim/yasambilim";
import Evrim from "./pages/evrim/evrim";
import EvrimMain from "./components/EvrimMain/EvrimMain"
import Denemeler from "./pages/denemeler/denemeler";
import DenemelerMain from "./components/DenemelerMain/DenemelerMain"
import Chapters from "./components/chapters/Chapters";
import Header from "./components/header";
import Sections from "./pages/sections/sections";
import { DataProvider } from "./components/Contexts"
import { TooltipProvider } from "./components/TooltipContext"
import Neden from "./pages/neden/neden"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//

function App() {
  return (
    <DataProvider>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Header />}>
            <Route path="/yasambilim" element={<Yasambilim />}></Route>
            <Route path="/yasambilim/:chapterId" element={<Chapters />} />
            <Route
              path="/yasambilim/:chapterId/:sectionId"
              element={<Sections />}
            />
            <Route path="/evrim" element={<Evrim />} />
            {/*tomorrow try ot add route evrim into evrim mains element={} so it fetches when entered evrim instead of fetching on every new evrimMain route */}
            <Route path="/evrim/:evrimName" element={
              <TooltipProvider><EvrimMain /></TooltipProvider>} />
            <Route path="/denemeler" element={<Denemeler />} />
            <Route path="/denemeler/:denemeName" element={
              <TooltipProvider><DenemelerMain /></TooltipProvider>} />
            <Route path="/neden" element={<Neden />} />
            <Route path="*" element={<div className="site-container" style={{ fontSize: "20px", marginTop: "20px" }}>Bu sayfa bulunamıyor!</div>} />
          </Route>
        </Routes>
      </div >
    </DataProvider>
  );
}


export default App;
