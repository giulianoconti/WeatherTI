import { Link } from "react-router-dom";
import "./Error404.css";

export const Error404 = () => {
  return (
    <div className="error404">
      <h1>
        Error<span>404</span>
      </h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};
