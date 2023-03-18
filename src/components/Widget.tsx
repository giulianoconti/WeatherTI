import "./Widget.css";
import clearDay from "../assets/weather_img/weather_clearDay.svg";
import clearNight from "../assets/weather_img/weather_clearNight.svg";
import partlyCloudyDay from "../assets/weather_img/weather_partlyCloudyDay.svg";
import partlyCloudyNight from "../assets/weather_img/weather_partlyCloudyNight.svg";
import cloudy from "../assets/weather_img/weather_cloudy.svg";
import overcast from "../assets/weather_img/weather_overcast.svg";
import mist from "../assets/weather_img/weather_mist.svg";
import patchyRainDay from "../assets/weather_img/weather_patchyRainDay.svg";
import patchyRainNight from "../assets/weather_img/weather_patchyRainNight.svg";
import patchySnowDay from "../assets/weather_img/weather_patchySnowDay.svg";
import patchySnowNight from "../assets/weather_img/weather_patchySnowNight.svg";
import patchySleetDay from "../assets/weather_img/weather_patchySleetDay.svg";
import patchySleetNight from "../assets/weather_img/weather_patchySleetNight.svg";
import thunderyOutbreaksDay from "../assets/weather_img/weather_thunderyOutbreaksDay.svg";
import thunderyOutbreaksNight from "../assets/weather_img/weather_thunderyOutbreaksNight.svg";
import blizzard from "../assets/weather_img/weather_blizzard.svg";
import fog from "../assets/weather_img/weather_fog.svg";
import lightDrizzle from "../assets/weather_img/weather_lightDrizzle.svg";
import lightRain from "../assets/weather_img/weather_lightRain.svg";
import heavyRainDay from "../assets/weather_img/weather_heavyRainDay.svg";
import heavyRainNight from "../assets/weather_img/weather_heavyRainNight.svg";
import heavyRain from "../assets/weather_img/weather_heavyRain.svg";
import lightSleet from "../assets/weather_img/weather_lightSleet.svg";
import lightSnow from "../assets/weather_img/weather_lightSnow.svg";
import heavySnow from "../assets/weather_img/weather_heavySnow.svg";
import icePellets from "../assets/weather_img/weather_icePellets.svg";
import moderateRainDay from "../assets/weather_img/weather_moderateRainDay.svg";
import moderateRainNight from "../assets/weather_img/weather_moderateRainNight.svg";
import torrentialRainDay from "../assets/weather_img/weather_torrentialRainDay.svg";
import torrentialRainNight from "../assets/weather_img/weather_torrentialRainNight.svg";
import moderateSleetDay from "../assets/weather_img/weather_moderateSleetDay.svg";
import moderateSleetNight from "../assets/weather_img/weather_moderateSleetNight.svg";
import moderateSnowDay from "../assets/weather_img/weather_moderateSnowDay.svg";
import moderateSnowNight from "../assets/weather_img/weather_moderateSnowNight.svg";
import lightIcePelletsDay from "../assets/weather_img/weather_lightIcePelletsDay.svg";
import lightIcePelletsNight from "../assets/weather_img/weather_lightIcePelletsNight.svg";
import moderateIcePelletsDay from "../assets/weather_img/weather_moderateIcePelletsDay.svg";
import moderateIcePelletsNight from "../assets/weather_img/weather_moderateIcePelletsNight.svg";
import moderateThunder from "../assets/weather_img/weather_moderateThunder.svg";
import patchyThunderSnowDay from "../assets/weather_img/weather_patchyThunderSnowDay.svg";
import patchyThunderSnowNight from "../assets/weather_img/weather_patchyThunderSnowNight.svg";
import patchyThunderSnow from "../assets/weather_img/weather_patchyThunderSnow.svg";
import { DataWeather } from "../interfaces/Interfaces";
import { Link } from "react-router-dom";

const imagesDay = {
  Sunny: clearDay,
  Clear: clearDay,
  "Partly cloudy": partlyCloudyDay,
  Cloudy: cloudy,
  Overcast: overcast,
  Mist: mist,
  "Patchy rain possible": patchyRainDay,
  "Patchy snow possible": patchySnowDay,
  "Patchy sleet possible": patchySleetDay,
  "Patchy freezing drizzle possible": fog,
  "Thundery outbreaks possible": thunderyOutbreaksDay,
  "Blowing snow": blizzard,
  Blizzard: blizzard,
  Fog: fog,
  "Freezing fog": fog,
  "Patchy light drizzle": lightDrizzle,
  "Light drizzle": lightDrizzle,
  "Freezing drizzle": fog,
  "Heavy freezing drizzle": fog,
  "Patchy light rain": lightRain,
  "Light rain": lightRain,
  "Moderate rain at times": moderateRainDay,
  "Moderate rain": lightRain,
  "Heavy rain at times": heavyRainDay,
  "Heavy rain": heavyRain,
  "Light freezing rain": fog,
  "Moderate or heavy freezing rain": fog,
  "Light sleet": lightSleet,
  "Moderate or heavy sleet": lightSleet,
  "Patchy light snow": patchySnowDay,
  "Light snow": lightSnow,
  "Patchy moderate snow": patchySnowDay,
  "Moderate snow": lightSnow,
  "Patchy heavy snow": patchySnowDay,
  "Heavy snow": heavySnow,
  "Ice pellets": icePellets,
  "Light rain shower": patchyRainDay,
  "Moderate or heavy rain shower": moderateRainDay,
  "Torrential rain shower": torrentialRainDay,
  "Light sleet showers": patchySleetDay,
  "Moderate or heavy sleet showers": moderateSleetDay,
  "Light snow showers": patchySnowDay,
  "Moderate or heavy snow showers": moderateSnowDay,
  "Light showers of ice pellets": lightIcePelletsDay,
  "Moderate or heavy showers of ice pellets": moderateIcePelletsDay,
  "Patchy light rain with thunder": thunderyOutbreaksDay,
  "Moderate or heavy rain with thunder": moderateThunder,
  "Patchy light snow with thunder": patchyThunderSnowDay,
  "Moderate or heavy snow with thunder": patchyThunderSnow,
} as { [key: string]: string };

const imagesNight = {
  Sunny: clearNight,
  Clear: clearNight,
  "Partly cloudy": partlyCloudyNight,
  Cloudy: cloudy,
  Overcast: overcast,
  Mist: mist,
  "Patchy rain possible": patchyRainNight,
  "Patchy snow possible": patchySnowNight,
  "Patchy sleet possible": patchySleetNight,
  "Patchy freezing drizzle possible": fog,
  "Thundery outbreaks possible": thunderyOutbreaksNight,
  "Blowing snow": blizzard,
  Blizzard: blizzard,
  Fog: fog,
  "Freezing fog": fog,
  "Patchy light drizzle": lightDrizzle,
  "Light drizzle": lightDrizzle,
  "Freezing drizzle": fog,
  "Heavy freezing drizzle": fog,
  "Patchy light rain": lightRain,
  "Light rain": lightRain,
  "Moderate rain at times": moderateRainNight,
  "Moderate rain": lightRain,
  "Heavy rain at times": heavyRainNight,
  "Heavy rain": heavyRain,
  "Light freezing rain": fog,
  "Moderate or heavy freezing rain": fog,
  "Light sleet": lightSleet,
  "Moderate or heavy sleet": lightSleet,
  "Patchy light snow": patchySnowNight,
  "Light snow": lightSnow,
  "Patchy moderate snow": patchySnowNight,
  "Moderate snow": lightSnow,
  "Patchy heavy snow": patchySnowNight,
  "Heavy snow": heavySnow,
  "Ice pellets": icePellets,
  "Light rain shower": patchyRainNight,
  "Moderate or heavy rain shower": moderateRainNight,
  "Torrential rain shower": torrentialRainNight,
  "Light sleet showers": patchySleetNight,
  "Moderate or heavy sleet showers": moderateSleetNight,
  "Light snow showers": patchySnowNight,
  "Moderate or heavy snow showers": moderateSnowNight,
  "Light showers of ice pellets": lightIcePelletsNight,
  "Moderate or heavy showers of ice pellets": moderateIcePelletsNight,
  "Patchy light rain with thunder": thunderyOutbreaksNight,
  "Moderate or heavy rain with thunder": moderateThunder,
  "Patchy light snow with thunder": patchyThunderSnowNight,
  "Moderate or heavy snow with thunder": patchyThunderSnow,
} as { [key: string]: string };

export const Widget = ({ dataForThisWidget, latitudeLongitudeForThisWidget }: any) => {
  if (!dataForThisWidget.data || dataForThisWidget.isLoading) {
    return <div>Loading...</div>;
  }

  if (dataForThisWidget.error) {
    return <div>Error</div>;
  }

  return (
    <Link className="Widget" to={`/${latitudeLongitudeForThisWidget[0]}/${latitudeLongitudeForThisWidget[1]}`}>
      <h2>{dataForThisWidget?.data.current?.temp_c}°</h2>
      <img
        src={
          dataForThisWidget?.data.current?.is_day === 1
            ? imagesDay[dataForThisWidget.data.current.condition.text]
            : imagesNight[dataForThisWidget.data.current.condition.text]
        }
        alt="React Logo"
      />
      <h4>H:{Math.round(dataForThisWidget?.data.forecast.forecastday[0].day.maxtemp_c)}°</h4>
      <h4>L:{Math.round(dataForThisWidget?.data.forecast.forecastday[0].day.mintemp_c)}°</h4>
      <h3>{dataForThisWidget?.data.location.name}</h3>
      <h5>{dataForThisWidget?.data.current.condition.text}</h5>
    </Link>
  );
};
