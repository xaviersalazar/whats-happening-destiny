import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Text } from "@nextui-org/react";
import { get } from "idb-keyval";
import moment from "moment";
import { isEmpty } from "lodash";
import { useSeason } from "../../context/Season";
import { BUNGIE_BASE_URL, getWhDestinyData } from "../../api/api";
import useResetTime from "../../hooks/useResetTime";
import { Activity, Loader, Section } from "../common";
import { AltarsRotator } from "../../types/whDestinyData";
import { Collectible } from "../../types/destiny";
import altars from "../../assets/altars.jpg";

type CurrentAltars = {
  name: string;
  rewards: Collectible[];
};

const CurrentAltars = () => {
  const { currentSeason } = useSeason();
  const { resetTime } = useResetTime();

  const [isLoadingAltars, setIsLoadingAltars] = useState<boolean>(true);
  const [currentAltars, setCurrentAltars] = useState<CurrentAltars | null>(
    null
  );

  const { isLoading, isSuccess, data } = useQuery("CurrentAltars", () =>
    getWhDestinyData("altars-schedule-s19")
  );

  const getAltars = async () => {
    const collectibleDefinitions = await get("DestinyCollectibleDefinition");

    const totalDaysInSeason = moment(currentSeason?.endDate).diff(
      currentSeason?.startDate,
      "days"
    );
    const daysLeftInSeason = moment(currentSeason?.endDate).diff(
      moment(),
      "days"
    );

    const currAltarsRotation = Math.floor(
      ((totalDaysInSeason - daysLeftInSeason) / 7) % data!.length
    );

    let currAltars = {} as AltarsRotator;

    if (moment().utc().get("hour") <= 17)
      currAltars = data?.[currAltarsRotation] as AltarsRotator;
    else {
      if (currAltarsRotation === 2) {
        currAltars = data?.[0] as AltarsRotator;
      } else {
        currAltars = data?.[currAltarsRotation + 1] as AltarsRotator;
      }
    }

    const rewards = currAltars?.collectibleHashes.map(
      (collectibleHash) => collectibleDefinitions[collectibleHash]
    ) as Collectible[];

    setCurrentAltars({
      name: currAltars?.name,
      rewards,
    });

    setIsLoadingAltars(false);
  };

  useEffect(() => {
    if (isSuccess) {
      getAltars();
    }
  }, [isSuccess]);

  if ((!isSuccess || isEmpty(currentAltars)) && !isLoading) return null;

  if (isLoading || isLoadingAltars) return <Loader />;

  return (
    <Activity
      imageSrc={altars}
      subTitle="ALTARS OF SORROW // THE MOON"
      title={currentAltars?.name || ""}
      description={`Resets ${moment(resetTime.daily).fromNow()}`}
    >
      {!isEmpty(currentAltars?.rewards) && (
        <Section sectionTitle="REWARDS">
          <div className="grid grid-cols-1 gap-2 mt-4">
            {currentAltars?.rewards.map((reward) => (
              <div key={reward.hash} className="flex gap-x-2">
                <img
                  src={`${BUNGIE_BASE_URL}/${reward.displayProperties?.icon}`}
                  className="h-6 w-6 rounded-[0.25rem]"
                />
                <Text className="text-sm font-medium">
                  {reward.displayProperties?.name}
                </Text>
              </div>
            ))}
          </div>
        </Section>
      )}
    </Activity>
  );
};

export default CurrentAltars;
