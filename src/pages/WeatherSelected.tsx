import { useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetchs } from "../hooks/useFetchs";
import { DataWeather } from "../interfaces/Interfaces";
import { SunriseGraph } from "../components/WeatherSelectedComponents/SunriseGraph";
import { imagesBgDay, imagesBgNight, imagesDay, imagesNight, imagesSvg } from "../components/Images";
import "./WeatherSelected.css";

export const WeatherSelected = (): JSX.Element => {
  const infoRef = useRef<HTMLDivElement>(null);
  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const [startY, setStartY] = useState<number | null>(null);

  const { lat, lon } = useParams<{ lat: string; lon: string }>();

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${lat},${lon}&days=3`;
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
              return (
                <div className="weatherSelected_weather_info_for_hour_day_container" key={day.date}>
                  <h3 className={"weatherSelected_weather_info_day"}>{day.date}</h3>

                  <div className="weatherSelected_weather_info_for_hour_each_day">
                    {day.hour.map((hour: any) => {
                      // If the day and time have already passed, do not show
                      if (hour.time.slice(0, 10) === new Date().toISOString().slice(0, 10) && hour.time.slice(11, 13) < new Date().toString().slice(16, 18)) {
                        return null;
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
              <div className="weatherSelected_widget_description">{dataWeather.current.humidity} %</div>
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
              <div className="weatherSelected_widget_graph">
                <div className="weatherSelected_widget_graph_fill" style={{ left: `${dataWeather.current.uv * 10}%` }} />
              </div>
            </div>
            <div className="weatherSelected_widget">
              <h3 className="weatherSelected_widget_title">SUNRISE</h3>
              <div className="weatherSelected_widget_description">{dataWeather?.forecast.forecastday[0].astro.sunrise}</div>
              <SunriseGraph sunrise={dataWeather?.forecast.forecastday[0].astro.sunrise} sunset={dataWeather?.forecast.forecastday[0].astro.sunset} />
              <h5 className="weatherSelected_widget_description_footer">Sunset: {dataWeather?.forecast.forecastday[0].astro.sunset}</h5>
            </div>
            <div className="weatherSelected_widget">
              <div className="weatherSelected_widget_title">
                <img className="weatherSelected_widget_icon" src={imagesSvg.wind} alt="Weather Icon" />
                <h3>WIND</h3>
              </div>
              <div className="weatherSelected_widget_graph_compass">
                <h3>N</h3>
                <h3>W</h3>
                <h3>E</h3>
                <h3>S</h3>
                <h2>{dataWeather.current.wind_kph}</h2>
                <h4>km/h</h4>
                <h5>{dataWeather.current.wind_dir}</h5>
                <img
                  className="weatherSelected_widget_wind_arrow"
                  src={imagesSvg.arrow_up}
                  alt="Weather Icon"
                  style={{
                    left: windDirectionStyle.left,
                    rotate: windDirectionStyle.rotate,
                    top: windDirectionStyle.top,
                  }}
                />
              </div>
            </div>
            <div className="weatherSelected_widget">
              <div className="weatherSelected_widget_title">
                <img className="weatherSelected_widget_icon" src={imagesSvg.eye} alt="Weather Icon" />
                <h3>VISIBILITY</h3>
              </div>
              <p className="weatherSelected_widget_description">
                {dataWeather.current.vis_km} km/h <br />
              </p>
              <p className="weatherSelected_widget_description">
                {dataWeather.current.vis_km < 1 ? "Poor" : dataWeather.current.vis_km < 5 ? "Moderate" : dataWeather.current.vis_km < 10 ? "Good" : "Excellent"}
              </p>
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
