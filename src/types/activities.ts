interface ArmorItem {
  name?: string;
  type?: string;
  iconPath?: string;
}

interface Armor {
  character?: string;
  items?: [ArmorItem];
}

interface Weapon {
  name?: string;
  type?: string;
  iconPath?: string;
  isExotic?: boolean;
}

export interface Encounter {
  title?: string;
  description?: string;
  dropsLoot?: boolean;
  doubleLoot?: boolean;
  loot?: {
    weapons?: [Weapon];
    armor?: [Armor];
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

interface RND {
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
  date: string;
  lostSector: string;
  destination: string;
  lostSectorImg: string;
  exoticReward: string;
  modifiers: [Modifier];
  champions: [string];
  burn: string;
  shields: [string];
}

interface ActivityData extends LostSector, RND {}

export interface Activity {
  data: [ActivityData];
}
