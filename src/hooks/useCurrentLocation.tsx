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
  const [coords, setCoords] = useState<Coords>({ actualLatitude: 0, actualLongitude: 0 });

  useEffect(() => {
    const handleSuccess = (position: Position) => {
      setCoords({
        actualLatitude: position.coords.latitude,
        actualLongitude: position.coords.longitude,
      });
    };

    const handleError = (error: PositionError) => {
      console.error(error);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return coords;
};
