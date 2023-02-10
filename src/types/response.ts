export interface Manifest {
  Response: {
    version: string;
    jsonWorldComponentContentPaths: {
      en: {
        DestinyActivityDefinition: string;
        DestinyDestinationDefinition: string;
        DestinyActivityModifierDefinition: string;
        DestinySeasonDefinition: string;
        [keyDefinition: string]: string;
      };
    };
  };
}

type MilestoneActivities = {
  activityHash: string;
  modifierHashes?: [number];
};

export interface Milestones {
  Response: {
    [hash: string]: {
      activities?: [MilestoneActivities];
      startDate?: string;
      endDate?: string;
      milestoneHash: string;
    };
  };
}
