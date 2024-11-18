import "./App.css";
import { Routes, Route } from "react-router-dom";
import { routers } from "./routers/routers";

function App() {
  return (
    <div>
      <Routes>
        {routers.map((route, index) => (
          <Route key={index} path={route.path} element={route.element}>
            {route.children &&
              route.children.map((child, childIndex) => (
                <Route
                  key={childIndex}
                  path={child.path}
                  element={child.element}
                />
              ))}
          </Route>
        ))}
      </Routes>
    </div>
  );
}

export default App;
