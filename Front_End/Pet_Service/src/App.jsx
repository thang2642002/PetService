import "./App.css";
import { Routes, Route } from "react-router-dom";
import { routers } from "./routers/routers";
import { ToastContainer } from "react-toastify";
import { getUserById } from "./services/userServices";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { login } from "./redux/Slices/userSlices";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const access_tokens = localStorage.getItem("access_tokens");
  const fetchUserById = async () => {
    if (access_tokens) {
      const decoded = jwtDecode(access_tokens);
      const userLogin = await getUserById(decoded?.id);
      if (userLogin && userLogin.errCode === 0) {
        dispatch(login(userLogin));
      }
    }
  };

  useEffect(() => {
    fetchUserById();
  }, []);

  return (
    <>
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
      <div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}

export default App;
