import { Link } from "react-router-dom";

export default function HeaderComp() {
  return (
    <div className="header">
      <nav className="nav-container">
        <Link to="/real-estate">Real Estate</Link>
        <Link to="/map">Map</Link>
      </nav>
      <h1>Propdo Home Assignment</h1>
    </div>
  );
}
