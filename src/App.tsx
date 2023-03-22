import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Weathers } from "./pages/Weathers";
import { WeatherSelected } from "./pages/WeatherSelected";
import { Error404 } from "./pages/Error404";
import "./App.css";

function calculateViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

export default function App() {
  useEffect(() => {
    calculateViewportHeight();
    window.addEventListener("resize", calculateViewportHeight);
    return () => {
      window.removeEventListener("resize", calculateViewportHeight);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Weathers />} />
        <Route path="/:lat/:lon/latlon" element={<WeatherSelected />} />
        {/* <Route path="*" element={<Error404 />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
