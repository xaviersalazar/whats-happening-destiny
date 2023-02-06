import axios from "axios";
import { RnD } from "../types/activities";

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
  baseURL: `${BUNGIE_BASE_URL}/Platform/Destiny2/`,
  method: "GET",
  headers: {
    Accept: "application/json",
    "X-API-KEY": import.meta.env.VITE_X_API_KEY,
  },
});

export const fetchDungeonData = async () => {
  const { data } = await whDestinyDataURL({ url: "dungeon-data.json" });

  return data as [RnD];
};

export const fetchRaidData = async () => {
  const { data } = await whDestinyDataURL({ url: "raid-data.json" });

  return data as [RnD];
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
