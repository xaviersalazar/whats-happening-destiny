import axios from "axios";
import { ActivityData } from "../types/activities";

export const BUNGIE_BASE_URL = "https://www.bungie.net/";

const whDestinyDataURL = axios.create({
  baseURL:
    "https://raw.githubusercontent.com/xaviersalazar/wh-destiny-data/main/",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
});

const bungieApiURL = axios.create({
  baseURL: `${BUNGIE_BASE_URL}Platform/Destiny2/`,
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

  return data as any;
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
