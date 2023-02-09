//External Imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//=========================================================
import { CampaignDetails, CreateCampaign, Home, Profile } from "./pages";
import { useStateContext } from "./context";
//51:56
const App = () => {
  const { address } = useStateContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        {address && (
          <Route path="/create-campaign" element={<CreateCampaign />} />
        )}
        <Route path="/campaign-details/:id" element={<CampaignDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
