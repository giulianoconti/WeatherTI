import { Link } from "react-router-dom";
import { imagesDay, imagesNight, imagesSvg } from "../components/Images";
import "./Widget.css";

export const Widget = ({ dataForThisWidget, locationsForThisWidget, handleDeleteWidget }: any) => {
  if (!dataForThisWidget.data || dataForThisWidget.isLoading) {
    return <div>Loading...</div>;
  }

  if (dataForThisWidget.error) {
    return <div>Error</div>;
  }

  return (
    <div className="widget">
      <Link className="widget_link" to={`/${locationsForThisWidget.latitude}/${locationsForThisWidget.longitude}/latlon`}>
        <h2>{Math.round(dataForThisWidget?.data.current?.temp_c)}°</h2>
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
      <button className="widget_delete_btn" onClick={() => handleDeleteWidget(locationsForThisWidget.latitude, locationsForThisWidget.longitude)}>
        <img className="widget_delete_btn_img" src={imagesSvg.trash} alt="delete" />
        <p className="widget_delete_btn_text">Delete Item</p>
      </button>
    </div>
  );
};
