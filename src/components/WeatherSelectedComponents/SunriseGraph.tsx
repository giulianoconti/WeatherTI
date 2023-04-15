import { useEffect, useRef, useState } from "react";
import "./SunriseGraph.css";

const removeAMPM = (time: string) => time.split(" ")[0];

const onlyHour = (time: string): number => {
  let hour = time.split(" ")[0].split(":")[0];
  if (hour.startsWith("0")) {
    hour = hour.slice(1);
  }
  return Number(hour);
};

export const SunriseGraph = ({ sunrise = "06:00 AM", sunset = "08:00 PM", localtimeHour = 5 }: { sunrise: string; sunset: string; localtimeHour: number }) => {
  const [sunriseHour, setSunriseHour] = useState<number>(onlyHour(sunrise));
  const [sunsetHour, setSunsetHour] = useState<number>(onlyHour(sunset));

  useEffect(() => {
    setSunriseHour(onlyHour(sunrise));
    setSunsetHour(onlyHour(sunset));
  }, [sunrise, sunset]);

  return (
    <div className="sunrise_graph">
      <svg viewBox="0 0 150 70" xmlns="http://www.w3.org/2000/svg">
        <path
          d={`M 0 60 C ${sunriseHour * 3} 60 30 ${sunriseHour * 7} ${sunriseHour * 6.25} 35 C ${(sunriseHour * 6.25 + (sunsetHour * 6.25 + 75)) / 2 - 12.5} 0 ${
            (sunriseHour * 6.25 + (sunsetHour * 6.25 + 75)) / 2 + 12.5
          } 0 ${sunsetHour * 6.25 + 75} 35 C ${sunsetHour * 8 + 75} 60 150 60 150 60`}
          fill="none"
          stroke="rgb(255, 255, 255)"
          strokeWidth="3"
        ></path>
      </svg>

      <div className="sunrise_graph_localtime" style={{ left: `${localtimeHour * 4}%` }}>
        <h5 className="sunrise_graph_localtime_text" style={{ direction: `${localtimeHour > 12 ? "rtl" : "ltr"}` }}>
          Current Time
        </h5>
      </div>
      <h5 className="sunrise_graph_text" style={{ left: `${sunriseHour * 4}%` }}>
        {removeAMPM(sunrise)}
      </h5>
      <h5 className="sunrise_graph_text" style={{ left: `${sunsetHour * 4 + 50}%` }}>
        {removeAMPM(sunset)}
      </h5>
    </div>
  );
};
