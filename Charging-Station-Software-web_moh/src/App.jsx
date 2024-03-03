import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import { Home, Splash, BatteryDashboard, Page404 } from "./index.js";
import {Feedback} from './Pages/FeedbackForm/components'
import Redirect from "./Redirect.js"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Redirect.route_1} element={<Splash />} />
        <Route path={Redirect.route_2} element={<Home />} />
        <Route path={Redirect.route_3} element={<BatteryDashboard />} />
        <Route path={Redirect.route_4} element={<Feedback />} />
        <Route path={Redirect.route_5} element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
