import { DisplayProperties } from "./displayProperties";

export type Destination = {
  blacklisted: boolean;
  defaultFreeroamActivityHash: number;
  displayProperties: DisplayProperties;
  hash: number;
  index: number;
  placeHash: number;
  redacted: boolean;
};
