interface ArmorItem {
  name: string;
  type: string;
  iconPath: string;
}

interface Armor {
  character: string;
  items: [ArmorItem];
}

interface Weapon {
  name: string;
  type: string;
  iconPath: string;
  isExotic: boolean;
}

export interface Encounter {
  title?: string;
  description?: string;
  dropsLoot?: boolean;
  doubleLoot?: boolean;
  loot: {
    weapons: [Weapon];
    armor: [Armor];
  } | null;
}

interface TypeModifier {
  name?: string;
  description?: string;
  iconPath?: string;
}

export interface Modifier {
  type?: string;
  typeModifiers?: [TypeModifier];
}

interface ExtraReward {
  title?: string;
  description?: string;
}

interface Mode {
  type?: string;
  recommendedLightLevel?: string;
}

export interface RnD {
  name: string;
  location: string;
  description: string;
  image: string;
  modes: [Mode];
  extraRewards: [ExtraReward];
  modifiers: [Modifier];
  encounters: [Encounter];
}

export interface LostSector {
  "Date (DD-MM-YYYY)": string;
  "Lost sector": string;
  Planet: string;
  "Exotic reward": string;
  Champions: string;
  Burn: string;
  Shields: string;
  Notes: string;
}

export interface ActivityData extends LostSector, RnD {}
