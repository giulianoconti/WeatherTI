export interface DataWeather {
  current: {
    condition: {
      text: string;
    };
    humidity: number;
    is_day: number;
    temp_c: number;
    uv: number;
    vis_km: number;
    wind_degree: number;
    wind_dir: string;
    wind_kph: number;
  };
  forecast: {
    forecastday: {
      astro: {
        sunrise: string;
        sunset: string;
      };
      date: string;
      day: Day;
      hour: Hour[];
    }[];
  };
  location: {
    country: string;
    lat: number;
    localtime: string;
    localtime_epoch: number;
    lon: number;
    name: string;
    region: string;
    tz_id: string;
  };
}

export interface Day {
  maxtemp_c: number;
  mintemp_c: number;
  totalprecip_mm: number;
}

export interface Hour {
  chance_of_rain: string;
  chance_of_snow: string;
  condition: {
    text: string;
  };
  is_day: number;
  temp_c: number;
  time: string;
}

export interface FetchResult {
  data: DataWeather;
  error: Error | null;
  isLoading: boolean;
}

export interface SetShowWidgets {
  (showWidgets: boolean): void;
}

export interface HandleWidget {
  (latitude?: number, longitude?: number): void;
}

export interface CitiesOptions {
  country: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  region: string;
  url: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}
