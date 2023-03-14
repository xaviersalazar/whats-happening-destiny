import { DisplayProperties } from "./displayProperties";
import { Rewards } from "./rewards";

export type Modifier = {
  activityModifierHash: number;
};

export type ActivityDefinition = {
  activityLightLevel: number;
  activityModeHashes: [number];
  activityModeTypes: [number];
  activityTypeHash: number;
  destinationHash: number;
  displayProperties: DisplayProperties;
  hash: number;
  modifiers: Modifier[];
  originalDisplayProperties: DisplayProperties;
  pgcrImage: string;
  placeHash: number;
  rewards: Rewards[];
};
