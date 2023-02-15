import { DisplayProperties } from "./displayProperties";

export type Season = {
  artifactItemHash: number;
  backgroundImagePath: string;
  blacklisted: boolean;
  displayProperties: DisplayProperties;
  endDate: string;
  hash: number;
  index: number;
  redacted: boolean;
  sealPresentationNodeHash: number;
  seasonNumber: number;
  seasonPassHash: number;
  seasonPassProgressionHash: number;
  seasonPassUnlockHash: number;
  seasonalChallengesPresentationNodeHash: number;
  startDate: string;
  startTimeInSeconds: string;
};
