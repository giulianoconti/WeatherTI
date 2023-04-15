import { useCallback, useEffect, useState } from "react";
import { useCurrentLocation } from "../hooks/useCurrentLocation";
import { DataWeather, Location } from "../interfaces/Interfaces";
import { TopNavigation } from "../components/WeathersComponents/TopNavigation";
import { Widget } from "../components/WeathersComponents/Widget";
import "./Weathers.css";

export const Weathers = () => {
  const INITIAL_LOCATION: Location = { latitude: 9999, longitude: 9999 };

  const [locations, setLocations] = useState<Location[]>([]);
  const [showWidgets, setShowWidgets] = useState(true);
  const [data, setData] = useState([] as DataWeather[]);
  const [isLoadingNewWidget, setIsLoadingNewWidget] = useState(false);

  const { actualLatitude = INITIAL_LOCATION.latitude, actualLongitude = INITIAL_LOCATION.longitude } = useCurrentLocation() || {};

  useEffect(() => {
    if (locations?.length > 0) {
      const fetchData = async () => {
        for (const { latitude, longitude } of locations) {
          if (!data.some(({ location }) => location.lat === latitude && location.lon === longitude)) {
            setIsLoadingNewWidget(true);
            const response = await fetch(
              `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${latitude},${longitude}&days=3&hour=1`
            );
            const newData = await response.json();
            setData((prevData) => [...prevData, newData]);
            setIsLoadingNewWidget(false);
          }
        }
        localStorage.setItem("locations", JSON.stringify(locations));
      };

      fetchData();
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
      if (!existThisLocation(latitude, longitude)) {
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
      setData((prevData) => prevData.filter(({ location }) => location.lat !== latitude || location.lon !== longitude));
    },
    [locations]
  );

  return (
    <div className="weathers">
      <div className="weathers_container">
        <TopNavigation setShowWidgets={setShowWidgets} handleAddWidget={handleAddWidget} />
        {showWidgets &&
          locations.length > 0 &&
          data.length > 0 &&
          data.map((info) => (
            <Widget
              key={info.location.country + info.location.name}
              dataForThisWidget={info}
              locationsForThisWidget={{ latitude: info.location.lat, longitude: info.location.lon }}
              handleDeleteWidget={info.location.lat === actualLatitude && info.location.lon === actualLongitude ? undefined : handleDeleteWidget}
            />
          ))}
        {showWidgets && isLoadingNewWidget && (
          <div className="widget_loading_container">
            <Widget
              dataForThisWidget={{
                location: {
                  name: "Loading...",
                  country: "Loading...",
                },
                current: {
                  temp_c: 0,
                  is_day: 0,
                  condition: {
                    text: "",
                  },
                },
                forecast: {
                  forecastday: [
                    {
                      day: {
                        maxtemp_c: 0,
                        mintemp_c: 0,
                      },
                    },
                  ],
                },
              }}
              locationsForThisWidget={{ latitude: 0, longitude: 0 }}
              handleDeleteWidget={undefined}
            />
          </div>
        )}
      </div>
    </div>
  );
};
