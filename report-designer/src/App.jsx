/* eslint-disable no-unused-vars */
import { useState } from "react";

import LayoutPage from "./pages/LayoutPage";
import ReportPage from "./pages/ReportPage";

import AllCounts from "./components/AllCounts";
import Histograms from "./components/Histograms";
import Peers from "./components/Peers";
import PlayerStats from "./components/PlayerStats";
import RecentMatches from "./components/RecentMatches";
import Records from "./components/Records";
import TotalStats from "./components/TotalStats";
import WLStats from "./components/WLStats";

import Player from "./pages/Player";

function App() {
  return (
    <>
      <ReportPage></ReportPage>
    </>
  );
}

export default App;
