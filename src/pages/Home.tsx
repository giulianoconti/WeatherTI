import "./Home.css";
import backIcons from "../assets/back_icons.svg";
import sun from "../assets/sun.svg";
import { useRef, useState } from "react";
import { useFetchs } from "../hooks/useFetchs";
import humidity from "../assets/humidity.svg";
import uv_index from "../assets/uv_index.svg";
import wind from "../assets/wind.svg";
import arrow_up from "../assets/arrow_up.svg";
import { SunriseGraph } from "../components/HomeComponents/SunriseGraph";
import { DataWeather } from "../interfaces/Interfaces";

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
import { useParams, Link } from "react-router-dom";

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
} as { [key: number]: string };

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
} as { [key: number]: string };

export const Home = (): JSX.Element => {
  const infoRef = useRef<HTMLDivElement>(null);
  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const [startY, setStartY] = useState<number | null>(null);

  const { lat, lon } = useParams<{ lat: string; lon: string }>();
  console.log(lat, lon);

  const url = `
    https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${lat},${lon}&days=3&aqi=no&alerts=no
  `;
  const dataFetch = useFetchs([url]);
  const dataWeather = dataFetch[url]?.data as DataWeather;

  if (dataFetch[url]?.error) {
    return <div>Error</div>;
  }

  if (dataFetch[url]?.isLoading || !dataFetch[url]?.data) {
    return <div>Loading</div>;
  }

  const handleStart = (event: React.SyntheticEvent<HTMLDivElement>): void => {
    if (event.type === "touchstart") {
      const { clientY } = (event as React.TouchEvent<HTMLDivElement>).touches[0];
      setStartY(clientY);
    } else if (event.type === "mousedown") {
      const { clientY } = event as React.MouseEvent<HTMLDivElement>;
      setStartY(clientY);
    }
  };

  const handleMove = (event: React.SyntheticEvent<HTMLDivElement>): void => {
    if (startY !== null) {
      const deltaY: number =
        event.type === "touchmove"
          ? (event as React.TouchEvent<HTMLDivElement>).touches[0].clientY - startY
          : (event as React.MouseEvent<HTMLDivElement>).clientY - startY;
      const scrollTop: number = infoRef?.current?.scrollTop ?? 0;
      if (scrollTop < 1) {
        if ((deltaY > 0 && scrollTop < 0) || deltaY > 50) {
          setOpenMoreInfo(false);
        } else if (deltaY < -50) {
          setOpenMoreInfo(true);
        }
      }
    }
  };

  const handleEnd = (): void => {
    setStartY(null);
  };

  const transformFormat24To12 = (hour: number): string => {
    const ampm = hour >= 12 ? "PM" : "AM";
    const hours12 = hour % 12 || 12;
    return hours12 + " " + ampm;
  };

  const getWindDirectionStyle = (windDir: string): { left: string; rotate: string; top: string } => {
    const directionMapping: Record<string, { left: string; rotate: string; top: string }> = {
      E: { left: "30%", rotate: "90deg", top: "0%" },
      ENE: { left: "27.5%", rotate: "67.5deg", top: "-11.5%" },
      ESE: { left: "27.5%", rotate: "112.5deg", top: "11.5%" },
      N: { left: "0%", rotate: "0deg", top: "-30%" },
      NE: { left: "21%", rotate: "45deg", top: "-21%" },
      NNE: { left: "11.5%", rotate: "22.5deg", top: "-27.5%" },
      NNW: { left: "-11.5%", rotate: "-22.5deg", top: "-27.5%" },
      NW: { left: "-21%", rotate: "-45deg", top: "-21%" },
      S: { left: "0%", rotate: "180deg", top: "30%" },
      SE: { left: "21%", rotate: "135deg", top: "21%" },
      SSE: { left: "11.5%", rotate: "157.5deg", top: "27.5%" },
      SSW: { left: "-11.5%", rotate: "-157.5deg", top: "27.5%" },
      SW: { left: "-21%", rotate: "-135deg", top: "21%" },
      W: { left: "-30%", rotate: "-90deg", top: "0%" },
      WNW: { left: "-27.5%", rotate: "-67.5deg", top: "-11.5%" },
      WSW: { left: "-27.5%", rotate: "-112.5deg", top: "11.5%" },
    };
    return directionMapping[windDir] || directionMapping["N"];
  };

  const windDirectionStyle = getWindDirectionStyle(dataWeather.current.wind_dir);

  return (
    <div className="home">
      <div className="home">
        <div className="home_top_info_container">
          <h3 className={`home_city ${openMoreInfo ? "open_city" : ""}`}>{dataWeather?.location.name}</h3>
          <div className="home_current_container">
            <div className={`home_current_container_city_temp ${openMoreInfo ? "open_container_city_temp" : ""}`}>
              <h2 className={`home_temp ${openMoreInfo ? "open_temp" : ""}`}>{Math.round(dataWeather?.current.temp_c)}°</h2>
              <h5 className="home_weather">{dataWeather?.current.condition.text}</h5>
            </div>
            <div className="home_temp_h_l">
              <h4 className="home_temp_h">H:{Math.round(dataWeather?.forecast.forecastday[0].day.maxtemp_c)}°</h4>
              <h4 className="home_temp_l">L:{Math.round(dataWeather?.forecast.forecastday[0].day.mintemp_c)}°</h4>
            </div>
          </div>
        </div>
        <div
          className={`home_weather_info ${openMoreInfo ? "open" : ""}`}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          ref={infoRef}
        >
          <button className="home_weather_info_btn" onClick={() => setOpenMoreInfo(!openMoreInfo)} />
          <h3 className="home_weather_info_hourly">3 Day Hourly Forecast</h3>
          <hr className="home_weather_info_hr" />
          <div className={`home_weather_info_for_hour ${openMoreInfo ? "mb-16" : ""}`}>
            {dataWeather.forecast.forecastday.map((day: any) => {
              return (
                <div className="home_weather_info_for_hour_day_container" key={day.date}>
                  <h3 className={"home_weather_info_day"}>{day.date}</h3>

                  <div className="home_weather_info_for_hour_each_day">
                    {day.hour.map((hour: any) => {
                      // If the day and time have already passed, do not show
                      if (hour.time.slice(0, 10) === new Date().toISOString().slice(0, 10) && hour.time.slice(11, 13) < new Date().toString().slice(16, 18)) {
                        return null;
                      }
                      return (
                        <div className="home_weather_box" key={hour.time}>
                          <h4 className="home_weather_box_hour">{transformFormat24To12(hour.time.slice(11, 13))}</h4>
                          <img
                            className="home_weather_box_img"
                            src={hour.is_day === 1 ? imagesDay[hour.condition.text] : imagesNight[hour.condition.text]}
                            title={hour.condition.text}
                            alt="Weather Icon"
                          />
                          <h5 className="home_weather_box_chance_rain">
                            {hour.chance_of_rain ? hour.chance_of_rain + " %" : hour.chance_of_snow ? hour.chance_of_snow + " %" : ""}
                          </h5>
                          <h3 className="home_weather_box_temp">{Math.round(hour.temp_c)}°</h3>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <h3 className="home_weather_info_hourly">Current Data</h3>

          <div className="home_widget_container">
            <div className="home_widget">
              <div className="home_widget_title">
                <img className="home_widget_icon" src={humidity} alt="Humidity Icon" />
                <h3>HUMIDITY</h3>
              </div>
              <div className="home_widget_description">{dataWeather.current.humidity} %</div>
              <div className="home_widget_graph">
                <div className="home_widget_graph_fill" style={{ left: `${dataWeather.current.humidity}%` }} />
              </div>
            </div>

            <div className="home_widget">
              <div className="home_widget_title">
                <img className="home_widget_icon" src={uv_index} alt="Weather Icon" />
                <h3>UV INDEX</h3>
              </div>
              <div className="home_widget_description">
                {dataWeather.current.uv} <br />
                {dataWeather.current.uv < 3
                  ? "Low"
                  : dataWeather.current.uv < 6
                  ? "Moderate"
                  : dataWeather.current.uv < 8
                  ? "High"
                  : dataWeather.current.uv < 11
                  ? "Very High"
                  : "Extreme"}
              </div>
              <div className="home_widget_graph">
                <div className="home_widget_graph_fill" style={{ left: `${dataWeather.current.uv * 10}%` }} />
              </div>
            </div>
            <div className="home_widget">
              <h3 className="home_widget_title">SUNRISE</h3>
              <div className="home_widget_description">
                {dataWeather?.forecast.forecastday[0].astro.sunrise}
                <br />
                <h5 className="home_widget_description_footer">Sunset: {dataWeather?.forecast.forecastday[0].astro.sunset}</h5>
              </div>
              <SunriseGraph sunrise={dataWeather?.forecast.forecastday[0].astro.sunrise} sunset={dataWeather?.forecast.forecastday[0].astro.sunset} />
            </div>
            <div className="home_widget">
              <div className="home_widget_title">
                <img className="home_widget_icon" src={wind} alt="Weather Icon" />
                <h3>WIND</h3>
              </div>
              <div className="home_widget_graph_compass">
                <h3>N</h3>
                <h3>W</h3>
                <h3>E</h3>
                <h3>S</h3>
                <h2>{dataWeather.current.wind_kph}</h2>
                <h4>km/h</h4>
                <h5>{dataWeather.current.wind_dir}</h5>
                <img
                  className="home_widget_wind_arrow"
                  src={arrow_up}
                  alt="Weather Icon"
                  style={{
                    left: windDirectionStyle.left,
                    rotate: windDirectionStyle.rotate,
                    top: windDirectionStyle.top,
                  }}
                />
              </div>
            </div>
            <div className="home_widget">
              <h3 className="home_widget_title">AIR QUALITY</h3>
              <div className="home_widget_description">3-Low Health Risk</div>
              <img className="home_widget_img" src={sun} alt="Weather Icon" />
            </div>
            <div className="home_widget">
              <h3 className="home_widget_title">AIR QUALITY</h3>
              <div className="home_widget_description">3-Low Health Risk</div>
              <img className="home_widget_img" src={sun} alt="Weather Icon" />
            </div>
          </div>
        </div>
        <div className="home_back_container">
          <img className="home_back_line" src={backIcons} alt="Icons" />
          <Link className="home_add_city" to="/" />
          <button className="home_current_weather_btn" />
          <Link className="home_favorites_weather_btn" to="/" />
        </div>
      </div>
    </div>
  );
};
