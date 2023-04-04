import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Weathers } from "./pages/Weathers";
import { WeatherSelected } from "./pages/WeatherSelected";
import { Error404 } from "./pages/Error404";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Weathers />} />
        <Route path="/:lat/:lon/latlon" element={<WeatherSelected />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}
