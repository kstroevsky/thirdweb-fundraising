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
  donators: string[]
}

export interface Donations {
  donator: string;
  donation: string;
}

export interface Achievement {
  id: number,
  title: string,
  description: string,
  success: boolean,
}
