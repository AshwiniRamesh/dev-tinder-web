import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Body } from "./components/Body";
import { Login } from "./components/Login";
import { Connections } from "./components/Connections";
import { Feed } from "./components/Feed";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

export default function App() {
  return (
    <Provider store={appStore}>
      <div>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/feed" element={<Feed />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}
