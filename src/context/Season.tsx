import { createContext, useContext, useState } from "react";

type Season = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  seasonHash: number;
  seasonPassHash: string | number;
};

type SeasonContext = {
  currentSeason: Season;
  setCurrentSeason: (season: Season) => void;
};

interface SeasonProviderProps {
  children: React.ReactNode;
}

const SeasonContext = createContext({} as SeasonContext);

export const useSeason = () => useContext(SeasonContext);

export const SeasonProvider = ({ children }: SeasonProviderProps) => {
  const [currentSeason, setCurrentSeason] = useState<Season>({} as Season);

  return (
    <SeasonContext.Provider value={{ currentSeason, setCurrentSeason }}>
      {children}
    </SeasonContext.Provider>
  );
};
