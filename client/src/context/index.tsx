import React, { useContext, createContext } from "react";

import {
  useAddress,
  useLogout,
  useContract,
  useMetamask,
  useContractWrite,
  useLogin,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { EditionMetadataWithOwnerOutputSchema } from "@thirdweb-dev/sdk";
import { Campaign, Donations, ParsedCampaign } from "../types";

const StateContext = createContext<any>("");

export const StateContextProvider = ({ children }: any) => {
  // This is contract address, you can get it
  //from  https://thirdweb.com/ in your accoutn after deploying yourcontract
  const { contract } = useContract(
    "0x41b966d9AB15E7346A5D38F44a03D6990D79d01e"
  );
  // i did a mistake
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCompaigns"
  );

  const address = useAddress();
  const connect = useMetamask();
  const logout = useLogout();
  const login = useLogin();

  const publishCampaign = async (form: Campaign) => {
    try {
      const data = await createCampaign([
        address, //owner
        form.title, // title
        form.description, //description
        form.target, // target
        new Date(form.deadline).getTime(), // deadline
        form.image, // image
      ]);

      console.log("contract call succes", data);
    } catch (err) {
      console.log("contract call failure", err);
    }
  };

  const getCompaigns = async () => {
    try {
      const campaigns = await contract?.call("getCompaigns");

      // Parsed to readeble format
      const parsedCampaings: ParsedCampaign[] = campaigns.map(
        (campaign: any, i: number) => ({
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.utils.formatEther(campaign.target.toString()),
          deadline: campaign.deadline.toNumber(),
          amountCollected: ethers.utils.formatEther(
            campaign.amountCollected.toString()
          ),
          image: campaign.image,
          pId: i,
        })
      );
      return parsedCampaings;
    } catch (err) {
      console.log("contract call failure", err);
    }
  };

  const getUserCampaigns = async () => {
    try {
      const allCampaigns: ParsedCampaign[] | [] = (await getCompaigns()) ?? [];

      const filteredCampaigns = allCampaigns?.filter(
        (campaign) => campaign.owner === address
      );
      return filteredCampaigns;
    } catch (err) {
      console.log("contract call failure", err);
    }
  };

  const donate = async (pId: number, amount: string) => {
    try {
      const data = await contract?.call("donateToCompaign", pId, {
        value: ethers.utils.parseEther(amount),
      });

      return data;
    } catch (err) {
      console.log("contract call failure", err);
    }
  };

  const getDonations = async (pId: number) => {
    try {
      const donations = await contract?.call("getDonators", pId);
      const numberOfDonations = donations[0].length;

      const parsedDonations: Donations[] = [];

      for (let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
          donator: donations[0][i],
          donation: ethers.utils.formatEther(donations[1][i].toString()),
        });
      }

      return parsedDonations;
    } catch (err) {
      console.log("contract call failure", err);
    }
  };
  return (
    <StateContext.Provider
      value={{
        address,
        logout,
        login,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCompaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
