import { useState, useEffect } from 'react';
import { useStateContext } from "../../context";
import { AcheiveItem } from './AcheiveItem';
import { ParsedCampaign, Achievement } from '../../types';

export const Achievements = () => {
  const [campaignsData, setCampaignsData] = useState<null | ParsedCampaign[]>(null);
  const { address, contract } = useStateContext();

  const donatedCampaigns = campaignsData ? campaignsData.filter((campaign: ParsedCampaign) => campaign.donators.some((donator: string) => donator === address)) : [];
  const donationsList: string[] | [] = donatedCampaigns.length < 1 ? [] : donatedCampaigns.map((campaign: ParsedCampaign) => campaign.donators.filter((donator: string) => donator === address)).flat();

  const acheiveList: Achievement[] | [] = donationsList.length > 0 ? [
    {
      id: 0,
      title: 'First donate',
      description: 'make you first donate',
      success: donationsList.length >= 1,
    },
    {
      id: 1,
      title: 'Second donate',
      description: 'make you second donate',
      success: donationsList.length >= 2,
    },
    {
      id: 2,
      title: 'Third donate',
      description: 'make you third donate',
      success: donationsList.length >= 3,
    },
    {
      id: 3,
      title: 'Fourth donate',
      description: 'make you fourth donate',
      success: donationsList.length >= 4,
    },
  ] : [];

  const successfulAcheiveCount = acheiveList.length > 0 && acheiveList.filter((achieve: Achievement) => achieve.success).length;

  const getCampaigns = () => contract?.call("getCompaigns");

  useEffect(() => {
    if (!campaignsData) {
      getCampaigns().then((item: ParsedCampaign[]) => setCampaignsData(item));
    }

  }, [])

  return (
    <>
      <div className="mt-[20px]">
        <h2 className="font-epilogue font-semibold text-[18px] text-white text-left">All Achievemets ({successfulAcheiveCount}\{acheiveList.length})</h2>
        <section className="flex flex-wrap mt-[20px] gap-[26px]">
          {acheiveList.length > 0 && (
            acheiveList.map((achieve: any) => (
              <AcheiveItem
                key={achieve.id}
                title={achieve.title}
                description={achieve.description}
                status={achieve.success}
              />
            ))
          )}
        </section>
      </div>
    </>
  )
}