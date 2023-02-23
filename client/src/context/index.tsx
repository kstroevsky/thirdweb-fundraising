import React, { useContext, createContext } from "react";

import {
  useAddress,
  useLogout,
  useContract,
  useMetamask,
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
    '0x159179dCd9272f845eD2d3bba3843982A772671b'
  );


  console.log(contract);
  

  const address = useAddress();
  const connect = useMetamask();
  const logout = useLogout();
  const login = useLogin();

  const publishCampaign = async (form: Campaign) => {
    const {
      title,
      description,
      target,
      deadline,
      image,
    } = form

    try {
      const campaign = await contract?.call("createCompaigns", address, title,
        description,
        target,
        new Date(deadline).getTime(),
        image);

      return campaign;

    } catch (error) {
      console.log(error);
    }
  }

  const deleteCampaign = async (_id: number) => {
    try {
      const campaigns = await contract?.call("deleteCompaign", _id);

      return campaigns;
    } catch (error) {
      console.log(error);
    }
  }

  const getCampaign = async (_id: number) => {
    try {
      const campaign = await contract?.call("getCompaign", _id);

      return campaign;

    } catch (error) {
      console.log(error);
    }
  }

  const editCampaign = async (_id: number, _title: string, _description: string, _target: bigint, _deadline: number, _image: string) => {
    try {
      const campaign = await contract?.call("editCampaigns", _id, _title, _description, _target, _deadline, _image);

      return campaign;

    } catch (error) {
      console.log(error);
    }
  }

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

      return parsedCampaings.filter((item: ParsedCampaign) => item.title.length > 0);
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
        deleteCampaign,
        createCampaign: publishCampaign,
        getCompaigns,
        getUserCampaigns,
        donate,
        getDonations,
        getCampaign,
        editCampaign
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
