export type MilestoneActivities = {
  activityHash: string;
  booleanActivityOptions: {
    [hash: string]: boolean;
  };
  challengeObjectiveHashes: number[];
  modifierHashes: number[];
  phaseHashes: number[];
};

export interface Milestones {
  Response: {
    [hash: string]: {
      activities: MilestoneActivities[];
      startDate: string;
      endDate: string;
      milestoneHash: string;
    };
  };
}
