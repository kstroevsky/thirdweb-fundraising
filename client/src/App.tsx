import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { Sidebar, Navbar } from "./components";
import { Auth, CampaignDetails, CreateCampaign, Home, Profile } from "./pages";
import EditCampaign from "./pages/EditCampaign";

const App = () => {
  const navigate = useNavigate();
  const address = useAddress();

  useEffect(() => {
    if (!address) {
      navigate("/auth");
    } else {
      navigate("/");
    }
  }, [address]);

  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      {!address ? (
        <Auth />
      ) : (
        <>
          <div className="sm:flex hidden mr-10 relative">
            <Sidebar />
          </div>
          <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-campaign" element={<CreateCampaign />} />
              <Route path="/edit-campaign" element={<EditCampaign />} />
              <Route
                path="/campaign-details/:id"
                element={<CampaignDetails />}
              />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
