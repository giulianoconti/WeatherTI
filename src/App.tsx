import "./App.css";
import { useEffect, useState } from "react";
import { TopNavigation } from "./components/TopNavigation";
import { Widget } from "./components/Widget";
import { useFetchs } from "./hooks/useFetchs";
import { useCurrentLocation } from "./hooks/useCurrentLocation";
import { Home } from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";

function calculateViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

export default function App() {
  const { actualLatitude, actualLongitude } = useCurrentLocation();
  const [savedLatitudesLongitudes, setSavedLatitudesLongitudes] = useState([
    [actualLatitude, actualLongitude],
    [50, 50],
    [10, 10],
  ]);
  const [showThisLatLong, setShowThisLatLong] = useState<[number, number]>([0, 0]);
  const [urls, setUrls] = useState<string[]>([]);

  const dataFetch = useFetchs(urls);
  const datasWeather = Object.values(dataFetch);

  useEffect(() => {
    if (savedLatitudesLongitudes[0][0] !== 0 && savedLatitudesLongitudes[0][1] !== 0) {
      setUrls(
        savedLatitudesLongitudes.map((latitudeAndLongitudeg) => {
          return `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${latitudeAndLongitudeg[0]},${
            latitudeAndLongitudeg[1]
          }&days=3&aqi=no&alerts=no`;
        })
      );
    }
  }, [savedLatitudesLongitudes]);

  useEffect(() => {
    if (actualLatitude !== 0 && actualLongitude !== 0) {
      setSavedLatitudesLongitudes((prev) => {
        const newArray = [[actualLatitude, actualLongitude], ...prev.slice(1)];
        return newArray;
      });
    }

    calculateViewportHeight();
    window.addEventListener("resize", calculateViewportHeight);
    return () => {
      window.removeEventListener("resize", calculateViewportHeight);
    };
  }, [actualLatitude, actualLongitude]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <div className="app_container">
                <TopNavigation />
                {datasWeather.map((data, i) => (
                  <Widget key={i} dataForThisWidget={data} latitudeLongitudeForThisWidget={savedLatitudesLongitudes[i]} />
                ))}
              </div>
            </div>
          }
        />
        <Route path="/:lat/:lon" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
