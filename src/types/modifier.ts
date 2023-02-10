type DisplayProperties = {
  description: string;
  hasIcon: boolean;
  icon: string;
  name: string;
};

export type Modifier = {
  blacklisted: boolean;
  displayInActivitySelection: boolean;
  displayInNavMode: boolean;
  displayProperties: DisplayProperties;
  hash: number;
  index: number;
  redacted: boolean;
};
