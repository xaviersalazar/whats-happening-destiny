type ArmorItem = {
  name: string;
  type: string;
  iconPath: string;
};

type Armor = {
  character: string;
  items: ArmorItem[];
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
    weapons: Weapon[];
    armor: Armor[];
  } | null;
};

type TypeModifier = {
  name?: string;
  description?: string;
  iconPath?: string;
};

export type Modifier = {
  type?: string;
  typeModifiers?: TypeModifier[];
};

type ExtraReward = {
  title?: string;
  description?: string;
};

type Mode = {
  type?: string;
  recommendedLightLevel?: string;
};

// Raid aNd Dungeon
export type RnD = {
  name: string;
  location: string;
  description: string;
  image: string;
  modes: Mode[];
  extraRewards: ExtraReward[];
  modifiers: Modifier[];
  encounters: Encounter[];
};

export type LostSectorRotator = {
  Date: string;
  "Lost sector": string;
  Planet: string;
  "Exotic reward": string;
  Champions: string;
  Burn: string;
  Shields: string;
  Notes: string;
};

export type ActivityRotator = {
  name: string;
  activityHashes: number[];
};

export type AltarsRotator = {
  name: string;
  collectibleHashes: number[];
};

export interface WHDestinyData
  extends RnD,
    LostSectorRotator,
    ActivityRotator,
    AltarsRotator {}
