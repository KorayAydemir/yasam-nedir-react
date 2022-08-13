import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./globals/global.css";
import Home from "./pages/home/home";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import Yasambilim from "./pages/yasambilim/yasambilim";
import Evrim from "./pages/evrim/evrim";
import Denemeler from "./pages/denemeler/denemeler";
import Chapters from "./components/chapters/Chapters";
import Header from "./components/header";
import Sections from "./pages/sections/sections";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEDI_BSYpNZ_nDmgJxHG-yJrRTYj8vvxw",
  authDomain: "yasamnedir.firebaseapp.com",
  projectId: "yasamnedir",
  storageBucket: "yasamnedir.appspot.com",
  messagingSenderId: "979608162508",
  appId: "1:979608162508:web:2f1047b443fadfe5f6f269",
  measurementId: "G-1PD1BLV6B4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
function App() {
  return (
    <div>
      <div className="site-container"></div>
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
          <Route path="/denemeler" element={<Denemeler />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
