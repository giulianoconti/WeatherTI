import { imagesSvg } from "../Images";
import { DataWeather } from "../../interfaces/Interfaces";

export const WindGraph = ({ dataWeather }: { dataWeather: DataWeather }) => {
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
  );
};
