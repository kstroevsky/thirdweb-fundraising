import React from "react";
import { ParsedCampaign } from "../types";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import FundCard from "./FundCard";

interface DisplayCampaignsType {
  title: string;
  isLoading: boolean;
  campaigns: ParsedCampaign[];
}
const DisplayCampaigns = ({
  title,
  isLoading,
  campaigns,
}: DisplayCampaignsType) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign: ParsedCampaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        <div className="flex flex-wrap mt-[20px] gap-[26px]">
          {isLoading && <Loader />}
        </div>

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={campaign.pId}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
