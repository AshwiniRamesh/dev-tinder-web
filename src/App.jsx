import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Body} from './components/Body';
import {Login} from './components/Login';
import {Connections} from './components/Connections';
import Profile from './components/Profile';

export default function App() {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
          <Route path="/login" element={<Login/>} />
          <Route path="/connections" element={<Connections/>} />
          <Route path="/profile" element={<Profile/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
