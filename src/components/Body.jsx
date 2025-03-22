import React from "react";
import { NavigationBar } from "./NavigationBar"; // Importing file thats named exported
import Footer from "./Footer"; // Importing file thats default exported
import { Outlet } from "react-router";
import appStore from "../utils/appStore";
import { Provider } from "react-redux";

export function Body() {
  return (
    <Provider store={appStore}>
      <div className="flex flex-col min-h-screen">
        <NavigationBar />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
    </Provider>
  );
}
