import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Weathers } from "./pages/Weathers";
import { WeatherSelected } from "./pages/WeatherSelected";
import { Error404 } from "./pages/Error404";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Weathers />} />
      <Route path="/:lat/:lon/latlon" element={<WeatherSelected />} />
      <Route path="*" element={<Error404 />} /> */}
      <Route path="/" element={<div>hola ruta home</div>} />
      <Route path="/test" element={<div>hola ruta test</div>} />
      <Route path="*" element={<div>hola ruta 404</div>} />
    </Routes>
  </BrowserRouter>
);

/*  <React.StrictMode>
    <App />
  </React.StrictMode>, */
