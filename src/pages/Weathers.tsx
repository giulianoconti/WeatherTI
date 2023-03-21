import { useCallback, useEffect, useMemo, useState } from "react";
import { useCurrentLocation } from "../hooks/useCurrentLocation";
import { useFetchs } from "../hooks/useFetchs";
import { FetchResult, Location } from "../interfaces/Interfaces";
import { TopNavigation } from "../components/TopNavigation";
import { Widget } from "../components/Widget";
import "./Weathers.css";

export const Weathers = () => {
  const INITIAL_LOCATION: Location = { latitude: 9999, longitude: 9999 };

  const [locations, setLocations] = useState<Location[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [showWidgets, setShowWidgets] = useState(true);

  const { actualLatitude = INITIAL_LOCATION.latitude, actualLongitude = INITIAL_LOCATION.longitude } = useCurrentLocation() || {};
  const dataFetch = Object.values(useFetchs<FetchResult>(urls)) as FetchResult[];

  useEffect(() => {
    if (locations?.length > 0) {
      const allUrls = locations.map(
        ({ latitude, longitude }) =>
          `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${latitude},${longitude}&days=3&aqi=no&alerts=no`
      );
      setUrls(allUrls);
      addLocationsInLocalStorage();
    }
  }, [locations]);

  useEffect(() => {
    if (actualLatitude !== INITIAL_LOCATION.latitude && actualLongitude !== INITIAL_LOCATION.longitude && !existThisLocation(actualLatitude, actualLongitude)) {
      const locationsFromLocalStorage = JSON.parse(localStorage.getItem("locations") || "[]");
      if (!existThisLocationFromLocalStorage(actualLatitude, actualLongitude)) {
        setLocations((prevLocations) => [...prevLocations, { latitude: actualLatitude, longitude: actualLongitude }, ...locationsFromLocalStorage]);
      } else {
        setLocations((prevLocations) => [...prevLocations, ...locationsFromLocalStorage]);
      }
    }
  }, [actualLatitude, actualLongitude]);

  const addLocationsInLocalStorage = () => {
    localStorage.setItem("locations", JSON.stringify(locations));
  };

  const existThisLocation = useCallback(
    (latitude = 0, longitude = 0) => {
      return locations.some(({ latitude: lat, longitude: lon }) => Math.abs(lat - latitude) < 0.05 && Math.abs(lon - longitude) < 0.05);
    },
    [locations]
  );

  const existThisLocationFromLocalStorage = useCallback(
    (latitude = 0, longitude = 0) => {
      const locationsFromLocalStorage = JSON.parse(localStorage.getItem("locations") || "[]") as Location[];
      return locationsFromLocalStorage.some(({ latitude: lat, longitude: lon }) => Math.abs(lat - latitude) < 0.05 && Math.abs(lon - longitude) < 0.05);
    },
    [locations]
  );

  const handleAddWidget = useCallback(
    (latitude = INITIAL_LOCATION.latitude, longitude = INITIAL_LOCATION.longitude) => {
      if (latitude !== INITIAL_LOCATION.latitude && longitude !== INITIAL_LOCATION.longitude && !existThisLocation(latitude, longitude)) {
        setLocations((prevLocations) => [...prevLocations, { latitude, longitude }]);
      } else {
        alert("This location already exists");
      }
    },
    [existThisLocation]
  );

  const handleDeleteWidget = useCallback(
    (latitude = 0, longitude = 0) => {
      const newLocations = locations.filter(({ latitude: lat, longitude: lon }) => lat !== latitude || lon !== longitude);
      setLocations(newLocations);
      // update dataFetch
    },
    [locations]
  );
  return (
    <div className="weathers">
      <div className="weathers_container">
        <TopNavigation setShowWidgets={setShowWidgets} handleAddWidget={handleAddWidget} />
        {showWidgets &&
          locations.length > 0 &&
          dataFetch?.map((info) => (
            <Widget
              key={info.data.location.country + info.data.location.name}
              dataForThisWidget={info}
              locationsForThisWidget={{ latitude: info.data.location.lat, longitude: info.data.location.lon }}
              handleDeleteWidget={handleDeleteWidget}
            />
          ))}
      </div>
    </div>
  );
};
