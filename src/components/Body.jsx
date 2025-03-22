import React from 'react';
import {NavigationBar} from "./NavigationBar"; // Importing file thats named exported
import Footer from './Footer' // Importing file thats default exported
import { Outlet } from "react-router";

export function Body() {
  return (
    <div>
      <NavigationBar />
      <Outlet />
      <Footer />
    </div>
  );
}
