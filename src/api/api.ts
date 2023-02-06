import axios from "axios";
import { RnD } from "../types/activities";

const whDestinyDataURL = axios.create({
  baseURL:
    "https://raw.githubusercontent.com/xaviersalazar/wh-destiny-data/main/",
  method: "GET",
  headers: {
    Accept: "application/json",
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
