export interface DataWeather {
  current: {
    cloud: number;
    condition: {
      code: number;
      icon: string;
      text: string;
    };
    feelslike_c: number;
    feelslike_f: number;
    gust_kph: number;
    gust_mph: number;
    humidity: number;
    is_day: number;
    last_updated: string;
    last_updated_epoch: number;
    precip_in: number;
    precip_mm: number;
    pressure_in: number;
    pressure_mb: number;
    temp_c: number;
    temp_f: number;
    uv: number;
    vis_km: number;
    vis_miles: number;
    wind_degree: number;
    wind_dir: string;
    wind_kph: number;
    wind_mph: number;
  };
  forecast: {
    forecastday: {
      astro: {
        moon_illumination: number;
        moon_phase: string;
        moonrise: string;
        moonset: string;
        sunrise: string;
        sunset: string;
      };
      date: string;
      date_epoch: number;
      day: {
        avgtemp_c: number;
        avgtemp_f: number;
        avgvis_km: number;
        avgvis_miles: number;
        condition: {
          code: number;
          icon: string;
          text: string;
        };
        daily_chance_of_rain: string;
        daily_chance_of_snow: string;
        daily_will_it_rain: number;
        daily_will_it_snow: number;
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
      };
      hour: {
        chance_of_rain: string;
        chance_of_snow: string;
        cloud: number;
        condition: {
          code: number;
          icon: string;
          text: string;
        };
        dewpoint_c: number;
        dewpoint_f: number;
        feelslike_c: number;
        feelslike_f: number;
        gust_kph: number;
        gust_mph: number;
        heatindex_c: number;
        heatindex_f: number;
        humidity: number;
        is_day: number;
        will_it_rain: number;
        will_it_snow: number;
      }[];
      maxtemp_c: number;
      maxtemp_f: number;
      mintemp_c: number;
      mintemp_f: number;
      sunhour: number;
      totalprecip_in: number;
      totalprecip_mm: number;
      uv_index: number;
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
