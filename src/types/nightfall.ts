type RewardItems = {
  hasConditionalVisibility: boolean;
  itemHash: number;
  quantity: number;
};

type Rewards = {
  rewardItems: [RewardItems];
};

type Modifier = {
  activityModifierHash: number;
};

type DisplayProperties = {
  description: string;
  hasIcon: boolean;
  icon: string;
  name: string;
};

export type Nightfall = {
  activityLightLevel: number;
  activityModeHashes: [number];
  activityModeTypes: [number];
  activityTypeHash: number;
  destinationHash: number;
  displayProperties: DisplayProperties;
  modifiers: [Modifier];
  originalDisplayProperties: DisplayProperties;
  pgcrImage: string;
  placeHash: number;
  rewards: [Rewards];
};
