import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./globals/global.css";
import Home from "./pages/home/home";
// Import the functions you need from the SDKs you need
import Yasambilim from "./pages/yasambilim/yasambilim";
import Evrim from "./pages/evrim/evrim";
import EvrimMain from "./components/EvrimMain/EvrimMain";
import Denemeler from "./pages/denemeler/denemeler";
import DenemelerMain from "./components/DenemelerMain/DenemelerMain";
import Chapters from "./components/chapters/Chapters";
import Header from "./components/header";
import Sections from "./pages/sections/sections";
import { DataProvider } from "./components/Contexts";
import { TooltipProvider } from "./components/TooltipContext";
import Neden from "./pages/neden/neden";
import { Helmet } from "react-helmet";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//

function App() {
  return (
    <DataProvider>
      <Helmet>
        <meta
          name="google-site-verification"
          content="UlSjM426MCz3TR9zwsy83SjXqFMnKaQs4CPnL4jbiG8"
        />
        <meta charSet="utf8" />
        <title>{`Yaşam Nedir?`}</title>
      </Helmet>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@yasamnedir" />
      <meta name="twitter:title" content="Yaşam Nedir?" />
      <meta
        name="twitter:description"
        content="
Yaşam nedir? Kimse bilmez, ancak yaşamın ne olduğunu sorgulamadığımız her an boşa geçirilmiştir!
"
      />
      <meta
        name="twitter:image"
        content="https://yasamnedir.com/static/media/ahto.07ca7dc83b1e91eea9e5.png"
      />
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
            <Route
              path="/evrim/:evrimName"
              element={
                <TooltipProvider>
                  <EvrimMain />
                </TooltipProvider>
              }
            />
            <Route path="/denemeler" element={<Denemeler />} />
            <Route
              path="/denemeler/:denemeName"
              element={
                <TooltipProvider>
                  <DenemelerMain />
                </TooltipProvider>
              }
            />
            <Route path="/neden" element={<Neden />} />
            <Route
              path="*"
              element={
                <div
                  className="site-container"
                  style={{ fontSize: "20px", marginTop: "20px" }}
                >
                  Bu sayfa bulunamıyor!
                </div>
              }
            />
          </Route>
          <Route
            path="/google0adb34ee90328952.html"
            element={<div>google</div>}
          ></Route>
        </Routes>
      </div>
    </DataProvider>
  );
}

export default App;
