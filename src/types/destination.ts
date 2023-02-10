type DisplayProperties = {
  description: string;
  hasIcon: boolean;
  icon: string;
  name: string;
};

export type Destination = {
  blacklisted: boolean;
  defaultFreeroamActivityHash: number;
  displayProperties: DisplayProperties;
  hash: number;
  index: number;
  placeHash: number;
  redacted: boolean;
};
