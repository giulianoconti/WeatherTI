import { Link } from "react-router-dom";
import { imagesDay, imagesNight, imagesSvg } from "../Images";
import "./Widget.css";
import { Loading } from "../Loading";

export const Widget = ({ dataForThisWidget, locationsForThisWidget, handleDeleteWidget }: any) => {
  return (
    <div className="widget">
      <Link className="widget_link" to={`/${locationsForThisWidget.latitude}/${locationsForThisWidget.longitude}/latlon`}>
        <h2>{Math.round(dataForThisWidget?.current?.temp_c)}°</h2>
        {dataForThisWidget.current.condition.text ? (
          <img
            src={
              dataForThisWidget?.current?.is_day === 1
                ? imagesDay[dataForThisWidget.current.condition.text]
                : imagesNight[dataForThisWidget.current.condition.text]
            }
            alt="React Logo"
          />
        ) : (
          <div className="widget_loading">
            <Loading />
          </div>
        )}
        <h4>H:{Math.round(dataForThisWidget?.forecast.forecastday[0].day.maxtemp_c)}°</h4>
        <h4>L:{Math.round(dataForThisWidget?.forecast.forecastday[0].day.mintemp_c)}°</h4>
        <h3>{dataForThisWidget?.location.name}</h3>
        <h5>{dataForThisWidget?.current.condition.text}</h5>
      </Link>

      <button
        className="widget_delete_btn"
        onClick={handleDeleteWidget ? () => handleDeleteWidget(locationsForThisWidget.latitude, locationsForThisWidget.longitude) : () => {}}
        disabled={handleDeleteWidget ? false : true}
      >
        <img className="widget_delete_btn_img" src={imagesSvg.trash} alt="delete" />
        <p className="widget_delete_btn_text">Delete Item</p>
      </button>
    </div>
  );
};
