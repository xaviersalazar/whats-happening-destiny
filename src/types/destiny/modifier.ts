import { DisplayProperties } from "./displayProperties";

export type Modifier = {
  blacklisted: boolean;
  displayInActivitySelection: boolean;
  displayInNavMode: boolean;
  displayProperties: DisplayProperties;
  hash: number;
  index: number;
  redacted: boolean;
};
