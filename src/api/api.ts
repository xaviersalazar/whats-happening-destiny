import axios from "axios";
import { ActivityData } from "../types/activities";
import { Manifest, Milestones } from "../types/response";

export const BUNGIE_BASE_URL = "https://www.bungie.net";

export const DEFINITIONS = [
  "DestinyActivityDefinition",
  "DestinyDestinationDefinition",
  "DestinyActivityModifierDefinition",
  "DestinySeasonDefinition",
];

const whDestinyDataURL = axios.create({
  baseURL:
    "https://raw.githubusercontent.com/xaviersalazar/wh-destiny-data/main/",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
});

const bungieApiURL = axios.create({
  baseURL: `${BUNGIE_BASE_URL}/Platform/Destiny2/`,
  method: "GET",
  headers: {
    Accept: "application/json",
    "X-API-KEY": import.meta.env.VITE_X_API_KEY,
  },
});

export const fetchWhDestinyData = async (file: string) => {
  const { data } = await whDestinyDataURL({ url: file });

  return data as [ActivityData];
};

export const getDestinyManifest = async () => {
  const { data } = await bungieApiURL({ url: "Manifest" });

  return data as Manifest;
};

export const getDestinyDefinition = async (definitionPath: string) => {
  const { data } = await axios.get(`${BUNGIE_BASE_URL}${definitionPath}`, {
    headers: {
      Accept: "application/json",
    },
  });

  return data as JSON;
};

export const searchDestinyEntities = async (
  entityDefinition: string,
  searchTerm: string
) => {
  const { data } = await bungieApiURL({
    url: `Armory/Search/${entityDefinition}/${searchTerm}`,
  });

  return data as any;
};

export const fetchDestinyMilestones = async () => {
  const { data } = await bungieApiURL({ url: "Milestones" });

  return data as Milestones;
};

export const fetchDestinyActivityDefinition = async (activityHash: string) => {
  const { data } = await bungieApiURL({
    url: `Manifest/DestinyActivityDefinition/${activityHash}`,
  });

  return data as any;
};

export const fetchDestinyDestinationDefinition = async (
  destinationHash: string
) => {
  const { data } = await bungieApiURL({
    url: `Manifest/DestinyDestinationDefinition/${destinationHash}`,
  });

  return data as any;
};

export const fetchDestinyActivityModifierDefinition = async (
  modifierDefinitionHash: string
) => {
  const { data } = await bungieApiURL({
    url: `Manifest/DestinyActivityModifierDefinition/${modifierDefinitionHash}`,
  });

  return data as any;
};

export const fetchDestinySeasonDefinition = async (seasonHash: string) => {
  const { data } = await bungieApiURL({
    url: `Manifest/DestinySeasonDefinition/${seasonHash}`,
  });

  return data as any;
};

export const fetchDestinySettings = async () => {
  const { data } = await axios("https://www.bungie.net/Platform/Settings/", {
    headers: {
      Accept: "application/json",
      "X-API-KEY": import.meta.env.VITE_X_API_KEY,
    },
  });

  return data as any;
};
