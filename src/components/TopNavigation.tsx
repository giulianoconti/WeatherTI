import { useEffect, useState } from "react";
import { CitiesOptions, HandleWidget, SetShowWidgets } from "../interfaces/Interfaces";
import { imagesSvg } from "./Images";
import "./TopNavigation.css";

export const TopNavigation = ({ setShowWidgets, handleAddWidget }: { setShowWidgets: SetShowWidgets; handleAddWidget: HandleWidget }): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const [citiesOptions, setCitiesOptions] = useState<CitiesOptions[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanedValue = value.replace(/[^a-zA-Z,\s]/g, "");
    const trimmedValue = cleanedValue.replace(/\s+/g, " ");
    setInputValue(trimmedValue);
    if (e.target.value.length > 2) {
      fetch(`https://api.weatherapi.com/v1/search.json?key=${import.meta.env.VITE_API_KEY}&q=${e.target.value}`)
        .then((res) => res.json())
        .then((data) => {
          setCitiesOptions(data);
        });
    } else {
      setCitiesOptions([]);
    }
  };

  useEffect(() => {
    if (inputValue.length > 2) {
      setShowWidgets(false);
    } else {
      setShowWidgets(true);
    }
  }, [inputValue]);

  return (
    <div className="topNavigation">
      <h2 className="topNavigation_title">Weather</h2>
      <img className="topNavigation_points_icon" src={imagesSvg.options} alt="More Icon" />
      <div className="topNavigation_search">
        <img className="topNavigation_search_img" src={imagesSvg.search} alt="Search Icon" />
        <input
          className={`topNavigation_search_input ${citiesOptions.length > 0 ? "topNavigation_search_input_open" : ""}`}
          value={inputValue}
          onChange={handleInput}
          type="text"
          placeholder="Search for a city"
        />
        {citiesOptions.length > 0 && (
          <>
            <button
              className="topNavigation_cancel_btn"
              onClick={() => {
                setInputValue("");
                setCitiesOptions([]);
              }}
            >
              Cancel
            </button>
            <div className="topNavigation_search_options_container">
              {citiesOptions.map((city) => (
                <button
                  className="topNavigation_search_option"
                  key={city.lat + "," + city.lon}
                  onClick={() => {
                    handleAddWidget(city.lat, city.lon);
                    setInputValue("");
                    setCitiesOptions([]);
                  }}
                >
                  <p className="topNavigation_search_inputValue_text">{inputValue}</p>
                  <p className="topNavigation_search_text">{(city.name + ", " + city.region + ", " + city.country).slice(inputValue.length)}</p>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
