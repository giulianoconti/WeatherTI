import { useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { DataWeather } from "../interfaces/Interfaces";
import { useFetch } from "../hooks/useFetch";
import { imagesBgDay, imagesBgNight, imagesDay, imagesNight, imagesSvg } from "../components/Images";
import { SunriseGraph } from "../components/WeatherSelectedComponents/SunriseGraph";
import { WindGraph } from "../components/WeatherSelectedComponents/WindGraph";
import { Loading } from "../components/Loading";
import { Error404 } from "./Error404";
import "./WeatherSelected.css";

export const WeatherSelected = (): JSX.Element => {
  const infoRef = useRef<HTMLDivElement>(null);
  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const [startY, setStartY] = useState<number | null>(null);

  const { lat, lon } = useParams<{ lat: string; lon: string }>();

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${lat},${lon}&days=3`;
  const { data: dataWeather, error, isLoading }: { data: DataWeather | null; error: Error | null | string; isLoading: boolean } = useFetch(url);

  if (error) {
    return <Error404 />;
  }

  if (isLoading || !dataWeather) {
    return (
      <div className="weatherSelected">
        <Loading />
      </div>
    );
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

  return (
    <div
      className="weatherSelected"
      style={
        dataWeather?.current?.is_day === 1
          ? { backgroundImage: `url(${imagesBgDay[dataWeather.current.condition.text]})` }
          : { backgroundImage: `url(${imagesBgNight[dataWeather.current.condition.text]})` }
      }
    >
      <div className="weatherSelected_container">
        <div className="weatherSelected_top_info_container">
          <h3 className={`weatherSelected_city ${openMoreInfo ? "open_city" : ""}`}>{dataWeather?.location.name}</h3>
          <div className="weatherSelected_current_container">
            <div className={`weatherSelected_current_container_city_temp ${openMoreInfo ? "open_container_city_temp" : ""}`}>
              <h2 className={`weatherSelected_temp ${openMoreInfo ? "open_temp" : ""}`}>{Math.round(dataWeather?.current.temp_c)}°</h2>
              <h5 className="weatherSelected_weather">{dataWeather?.current.condition.text}</h5>
            </div>
            <div className="weatherSelected_temp_h_l">
              <h4 className="weatherSelected_temp_h">H:{Math.round(dataWeather?.forecast.forecastday[0].day.maxtemp_c)}°</h4>
              <h4 className="weatherSelected_temp_l">L:{Math.round(dataWeather?.forecast.forecastday[0].day.mintemp_c)}°</h4>
            </div>
          </div>
        </div>
        <div
          className={`weatherSelected_weather_info ${openMoreInfo ? "open" : ""}`}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          ref={infoRef}
        >
          <button className="weatherSelected_weather_info_btn" onClick={() => setOpenMoreInfo(!openMoreInfo)} />
          <h3 className="weatherSelected_weather_info_hourly">3 Day Hourly Forecast</h3>
          <hr className="weatherSelected_weather_info_hr" />
          <div className={`weatherSelected_weather_info_for_hour ${openMoreInfo ? "mb-16" : ""}`}>
            {dataWeather.forecast.forecastday.map((day: any) => {
              let showThis = false;
              return (
                <div className="weatherSelected_weather_info_for_hour_day_container" key={day.date}>
                  <h3 className={"weatherSelected_weather_info_day"}>{day.date}</h3>

                  <div className="weatherSelected_weather_info_for_hour_each_day">
                    {day.hour.map((hour: any) => {
                      // If the day and time have already passed, do not show
                      if (
                        dataWeather.location.localtime.slice(0, 10) === hour.time.slice(0, 10) &&
                        parseInt(dataWeather.location.localtime.split(":")[0].slice(-2)) > parseInt(hour.time.slice(11, 13))
                      ) {
                        showThis = true;
                        return null;
                      }

                      // Show only once, the current weather
                      if (showThis) {
                        showThis = false;
                        return (
                          <div className="weatherSelected_weather_box" key="now">
                            <h4 className="weatherSelected_weather_box_hour">Now</h4>
                            <img
                              className="weatherSelected_weather_box_img"
                              src={
                                dataWeather.current.is_day === 1
                                  ? imagesDay[dataWeather.current.condition.text]
                                  : imagesNight[dataWeather.current.condition.text]
                              }
                              title={dataWeather.current.condition.text}
                              alt="Weather Icon"
                            />
                            <h5 className="weatherSelected_weather_box_chance_rain">
                              {hour.chance_of_rain ? hour.chance_of_rain + " %" : hour.chance_of_snow ? hour.chance_of_snow + " %" : ""}
                            </h5>
                            <h3 className="weatherSelected_weather_box_temp">{Math.round(dataWeather.current.temp_c)}°</h3>
                          </div>
                        );
                      }

                      return (
                        <div className="weatherSelected_weather_box" key={hour.time}>
                          <h4 className="weatherSelected_weather_box_hour">{transformFormat24To12(hour.time.slice(11, 13))}</h4>
                          <img
                            className="weatherSelected_weather_box_img"
                            src={hour.is_day === 1 ? imagesDay[hour.condition.text] : imagesNight[hour.condition.text]}
                            title={hour.condition.text}
                            alt="Weather Icon"
                          />
                          <h5 className="weatherSelected_weather_box_chance_rain">
                            {hour.chance_of_rain ? hour.chance_of_rain + " %" : hour.chance_of_snow ? hour.chance_of_snow + " %" : ""}
                          </h5>
                          <h3 className="weatherSelected_weather_box_temp">{Math.round(hour.temp_c)}°</h3>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <h3 className="weatherSelected_weather_info_hourly">Current Data</h3>

          <div className="weatherSelected_widget_container">
            <div className="weatherSelected_widget">
              <div className="weatherSelected_widget_title">
                <img className="weatherSelected_widget_icon" src={imagesSvg.humidity} alt="Humidity Icon" />
                <h3>HUMIDITY</h3>
              </div>
              <div className="weatherSelected_widget_description">
                <h2>{dataWeather.current.humidity} %</h2>
              </div>
              <div className="weatherSelected_widget_graph">
                <div className="weatherSelected_widget_graph_fill" style={{ left: `${dataWeather.current.humidity}%` }} />
              </div>
            </div>

            <div className="weatherSelected_widget">
              <div className="weatherSelected_widget_title">
                <img className="weatherSelected_widget_icon" src={imagesSvg.uv_index} alt="Weather Icon" />
                <h3>UV INDEX</h3>
              </div>
              <div className="weatherSelected_widget_description">
                <h2>
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
                </h2>
              </div>
              <div className="weatherSelected_widget_graph">
                <div className="weatherSelected_widget_graph_fill" style={{ left: `${dataWeather.current.uv * 10}%` }} />
              </div>
            </div>

            <div className="weatherSelected_widget">
              <div className="weatherSelected_widget_title">
                <img className="weatherSelected_widget_icon" src={imagesSvg.sunrise} alt="Weather Icon" />
                <h3>SUNRISE</h3>
              </div>
              <div className="weatherSelected_widget_description">
                <h2>{dataWeather?.forecast.forecastday[0].astro.sunrise}</h2>
              </div>
              <SunriseGraph
                sunrise={dataWeather?.forecast.forecastday[0].astro.sunrise}
                sunset={dataWeather?.forecast.forecastday[0].astro.sunset}
                localtimeHour={parseInt(dataWeather.location.localtime.split(":")[0].slice(-2))}
              />
              <h5 className="weatherSelected_widget_description_footer">Sunset: {dataWeather?.forecast.forecastday[0].astro.sunset}</h5>
            </div>

            <div className="weatherSelected_widget">
              <div className="weatherSelected_widget_title">
                <img className="weatherSelected_widget_icon" src={imagesSvg.wind} alt="Weather Icon" />
                <h3>WIND</h3>
              </div>
              <WindGraph dataWeather={dataWeather} />
            </div>

            <div className="weatherSelected_widget">
              <div className="weatherSelected_widget_title">
                <img className="weatherSelected_widget_icon" src={imagesSvg.visibility} alt="Weather Icon" />
                <h3>VISIBILITY</h3>
              </div>
              <div className="weatherSelected_widget_description">
                <h2>
                  {dataWeather.current.vis_km} km/h <br />
                </h2>
              </div>
              <div className="weatherSelected_widget_description">
                <h2>
                  {dataWeather.current.vis_km < 1
                    ? "Poor"
                    : dataWeather.current.vis_km < 5
                    ? "Moderate"
                    : dataWeather.current.vis_km < 10
                    ? "Good"
                    : "Excellent"}
                </h2>
              </div>
            </div>

            <div className="weatherSelected_widget">
              <div className="weatherSelected_widget_title">
                <img className="weatherSelected_widget_icon" src={imagesSvg.humidity} alt="Humidity Icon" />
                <h3>PRECIPITATION</h3>
              </div>
              <div className="weatherSelected_widget_description">
                <h2>{dataWeather.forecast.forecastday[0].day.totalprecip_mm} mm</h2>
                <h3>in last 24 hours</h3>
              </div>
              <div className="weatherSelected_widget_description">
                <p>
                  {dataWeather.forecast.forecastday[0].day.totalprecip_mm < 1
                    ? "Less than 1 mm expected today"
                    : dataWeather.forecast.forecastday[0].day.totalprecip_mm < 5
                    ? "Less than 5 mm expected today"
                    : dataWeather.forecast.forecastday[0].day.totalprecip_mm < 10
                    ? "Less than 10 mm expected today"
                    : dataWeather.forecast.forecastday[0].day.totalprecip_mm < 20
                    ? "Less than 20 mm expected today"
                    : "More than 20 mm expected today"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="weatherSelected_back_container">
          <img className="weatherSelected_back_line" src={imagesSvg.backIcons} alt="Icons" />
          <Link className="weatherSelected_add_city" to="/" />
          <button className="weatherSelected_current_weather_btn" />
          <Link className="weatherSelected_favorites_weather_btn" to="/" />
        </div>
      </div>
    </div>
  );
};
