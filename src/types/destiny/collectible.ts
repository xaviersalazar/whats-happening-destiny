import { DisplayProperties } from "./displayProperties";

export type Collectible = {
  acquisitionInfo?: {
    runOnlyAcquisitionRewardSite?: boolean;
  };
  blacklisted: boolean;
  displayProperties: DisplayProperties;
  hash: number;
  index: number;
  itemHash: number;
  sourceHash: number;
  sourceString: string;
};
