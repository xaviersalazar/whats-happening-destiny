const DEFINITIONS = {
  DestinyMilestoneDefinition: "DestinyMilestoneDefinition",
  DestinyActivityDefinition: "DestinyActivityDefinition",
  DestinyActivityTypeDefinition: "DestinyActivityTypeDefinition",
};

const HASHES = {
  CHAMPIONS: {
    Overload: 882588556,
    Barrier: 605585258,
    Unstoppable: 3933343183,
  },
  DUNGEONS: {
    GraspOfAvarice: {
      Modes: [
        { type: "Legend", hash: 4078656646 },
        { type: "Master", hash: 3774021532 },
      ],
    },
    Prophecy: {
      Modes: [{ type: "Normal", hash: 1077850348 }],
    },
    PitOfHeresy: {
      Modes: [{ type: "Normal", hash: 2582501063 }],
    },
    ShatteredThrone: {
      Modes: [{ type: "Normal", hash: 2032534090 }],
    },
  },
  RAIDS: {
    VowOfTheDisciple: {
      Modes: [{ type: "Legend", hash: 2906950631 }],
    },
    DeepStoneCrypt: {
      Modes: [{ type: "Normal", hash: 910380154 }],
    },
    VaultOfGlass: {
      Modes: [
        { type: "Legend", hash: 3711931140 },
        { type: "Master", hash: 1681562271 },
      ],
    },
    LastWish: {
      Modes: [{ type: "Normal", hash: 1661734046 }],
    },
  },
};

export { DEFINITIONS, HASHES };
