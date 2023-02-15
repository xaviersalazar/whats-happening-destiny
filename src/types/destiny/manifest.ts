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
