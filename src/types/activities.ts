type ArmorItem = {
  name: string;
  type: string;
  iconPath: string;
};

type Armor = {
  character: string;
  items: [ArmorItem];
};

type Weapon = {
  name: string;
  type: string;
  iconPath: string;
  isExotic: boolean;
};

export type Encounter = {
  title?: string;
  description?: string;
  dropsLoot?: boolean;
  doubleLoot?: boolean;
  loot: {
    weapons: [Weapon];
    armor: [Armor];
  } | null;
};

type TypeModifier = {
  name?: string;
  description?: string;
  iconPath?: string;
};

export type Modifier = {
  type?: string;
  typeModifiers?: [TypeModifier];
};

type ExtraReward = {
  title?: string;
  description?: string;
};

type Mode = {
  type?: string;
  recommendedLightLevel?: string;
};

export type RnD = {
  name: string;
  location: string;
  description: string;
  image: string;
  modes: [Mode];
  extraRewards: [ExtraReward];
  modifiers: [Modifier];
  encounters: [Encounter];
};

export type LostSector = {
  Date: string;
  "Lost sector": string;
  Planet: string;
  "Exotic reward": string;
  Champions: string;
  Burn: string;
  Shields: string;
  Notes: string;
};

export type Dungeon = {
  name: string;
  activityHashes: [number];
};

export interface ActivityData extends LostSector, RnD, Dungeon {}
