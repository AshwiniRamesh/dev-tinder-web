import NavigationBar from "./components/NavigationBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/login" element={<div>Login</div>}></Route>
          <Route path="/profile" element={<div>Profile</div>}></Route>
        </Routes>
      </BrowserRouter>
      <NavigationBar />
    </div>
  );
}
