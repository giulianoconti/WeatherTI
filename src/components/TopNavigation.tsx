import "./TopNavigation.css";
import options from "../assets/icon_options.svg";
import search from "../assets/icon_search.svg";

export const TopNavigation = () => {
  return (
    <div className="TopNavigation">
      <h2>Weather</h2>
      <img src={options} alt="React Logo" />
      <div className="TopNavigation_search">
        <img src={search} alt="Search Icon" />
        <input type="text" placeholder="Search for a city" />
      </div>
    </div>
  );
};
