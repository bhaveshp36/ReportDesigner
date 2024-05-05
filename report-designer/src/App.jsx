/* eslint-disable no-unused-vars */
import { useState } from "react";

import LayoutPage from "./pages/LayoutPage"; // Import the Layout component
import PlayerStats from "./components/PlayerStats"; // Import the Layout component
import ReportPage from "./pages/ReportPage";
import WLStats from "./components/WLStats";
import Histograms from "./components/Histograms";
import AllCounts from "./components/AllCounts";
import Player from "./pages/Player";

function App() {
  return (
    <>
      <ReportPage>
        <Histograms />
      </ReportPage>
    </>
  );
}

export default App;
