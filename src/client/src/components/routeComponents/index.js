import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import routeDescriptions from "../../descriptions/routes.js";
import RenderModules from "./RenderModules.js";

export default () => (
  <Router>
    <Routes>
      {routeDescriptions.map((description) => (
        <Route
          key={description.path}
          path={description.path}
          element={<RenderModules modules={description.modules} />}
        />
      ))}
    </Routes>
  </Router>
);
