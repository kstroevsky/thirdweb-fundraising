export interface Campaign {
  name: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
}

export interface ParsedCampaign {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: number;
  amountCollected: string | number;
  image: string;
  pId: number;
}

export interface Donations {
  donator: string;
  donation: string;
}
