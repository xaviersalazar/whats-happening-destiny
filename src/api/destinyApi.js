import axios from "axios";

const API_URL = "https://www.bungie.net/Platform";

const bungieApiAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "X-API-Key": process.env.REACT_APP_X_API_KEY,
  },
});

const getDefinition = async (entityType, hashIdentifier) => {
  return await bungieApiAxios
    .get(`/Destiny2/Manifest/${entityType}/${hashIdentifier}`)
    .then(async (res) => await res.data.Response)
    .catch((error) => error);
};

const getMilestones = async () => {
  return await bungieApiAxios
    .get("/Destiny2/Milestones")
    .then(async (res) => await res.data.Response)
    .catch((error) => error);
};

export { getDefinition, getMilestones };
