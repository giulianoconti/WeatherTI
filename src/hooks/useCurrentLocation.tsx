import { useState, useEffect } from "react";

type Coords = {
  actualLatitude: number;
  actualLongitude: number;
};

type Position = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

type PositionError = {
  code: number;
  message: string;
};

export const useCurrentLocation = (): Coords => {
 /*  console.log("useCurrentLocation") */
  const [coords, setCoords] = useState<Coords>({ actualLatitude: 9999, actualLongitude: 9999 });

  useEffect(() => {
    const handleSuccess = (position: Position) => {
      setCoords({
        // Only 2 decimals
        actualLatitude: Math.round(position.coords.latitude * 100) / 100,
        actualLongitude: Math.round(position.coords.longitude * 100) / 100,
      });
    };

    const handleError = (error: PositionError) => {
      console.error(error);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return coords;
};
