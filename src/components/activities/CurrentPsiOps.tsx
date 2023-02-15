import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Text } from "@nextui-org/react";
import { getMany } from "idb-keyval";
import moment from "moment";
import { isEmpty, uniqueId } from "lodash";
import { useSeason } from "../../context/Season";
import { BUNGIE_BASE_URL, getWhDestinyData } from "../../api/api";
import useResetTime from "../../hooks/useResetTime";
import { Activity, Box, Loader, ModifierImage, Section } from "../common";
import { ActivityRotator } from "../../types/whDestinyData";
import { ActivityDefinition, Destination, Modifier } from "../../types/destiny";
import { beforePeriodRegex } from "../../utils/helpers";
import placeholderImage from "../../assets/placeholder.jpeg";
type CurrentPsiOps = {
  psiOps: ActivityDefinition;
  destination: Destination;
  champions: Modifier[];
  modifiers: Modifier[];
};

const CurrentPsiOps = () => {
  const { currentSeason } = useSeason();
  const { resetTime } = useResetTime();

  const [isLoadingPsiOps, setIsLoadingPsiOps] = useState<boolean>(true);
  const [currentPsiOps, setCurrentPsiOps] = useState<CurrentPsiOps | null>(
    null
  );
  const [activityImage, setActivityImage] = useState(placeholderImage);

  const { isLoading, isSuccess, data } = useQuery("CurrentPsiOps", () =>
    getWhDestinyData("psiops-schedule-s19")
  );

  const loadActivityImage = (src: string) => {
    const img = new Image();
    img.src = src;
    img.onload = () => setActivityImage(src);
  };

  const getPsiOps = async () => {
    const definitions = await getMany([
      "DestinyActivityDefinition",
      "DestinyDestinationDefinition",
      "DestinyActivityModifierDefinition",
    ]);

    const totalDaysInSeason = moment(currentSeason?.endDate).diff(
      currentSeason?.startDate,
      "days"
    );
    const daysLeftInSeason = moment(currentSeason?.endDate).diff(
      moment(),
      "days"
    );

    const currPsiOpsRotation = Math.floor(
      ((totalDaysInSeason - daysLeftInSeason) / 7) % data!.length
    );
    let currPsiOps = {} as ActivityRotator;

    if (moment().utc().get("hour") <= 17)
      currPsiOps = data?.[currPsiOpsRotation] as ActivityRotator;
    else {
      if (currPsiOpsRotation === 2) {
        currPsiOps = data?.[0] as ActivityRotator;
      } else {
        currPsiOps = data?.[currPsiOpsRotation + 1] as ActivityRotator;
      }
    }

    const psiOps = definitions[0][
      currPsiOps?.activityHashes?.[1]
    ] as ActivityDefinition;
    const destination = definitions[1][psiOps.destinationHash] as Destination;

    const modifierHashes = [
      ...new Set(
        psiOps.modifiers.map(({ activityModifierHash }) => activityModifierHash)
      ),
    ];
    const modifiers = modifierHashes.map(
      (modifierHash) => definitions[2][modifierHash]
    ) as Modifier[];
    const separatedModifiers = [
      modifiers.filter(({ displayProperties }) =>
        displayProperties.name.match(/Champion|Champions/g)
      ),
      modifiers.filter(
        ({ displayProperties }) =>
          !displayProperties.name.match(/Champion|Champions/g)
      ),
    ];

    loadActivityImage(`${BUNGIE_BASE_URL}/${psiOps.pgcrImage}`);

    setCurrentPsiOps({
      psiOps,
      destination,
      champions: separatedModifiers[0],
      modifiers: separatedModifiers[1],
    });

    setIsLoadingPsiOps(false);
  };

  useEffect(() => {
    if (isSuccess) {
      getPsiOps();
    }
  }, [isSuccess]);

  if (
    (!isSuccess || isEmpty(currentPsiOps?.psiOps)) &&
    !(isLoading || isLoadingPsiOps)
  )
    return null;

  if (isLoading || isLoadingPsiOps) return <Loader />;

  return (
    <Activity
      imageSrc={activityImage}
      subTitle={`PSIOPS ${` // ${
        currentPsiOps?.destination.displayProperties?.name.toUpperCase() || ""
      }`}`}
      title={currentPsiOps?.psiOps.originalDisplayProperties.name || ""}
      description={`Resets ${moment(resetTime.daily).fromNow()}`}
    >
      {!isEmpty(currentPsiOps?.champions) && (
        <Section sectionTitle="CHAMPIONS">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-2 mt-4">
            {currentPsiOps?.champions.map(
              ({ displayProperties }) =>
                displayProperties.name && (
                  <Box key={uniqueId("modifier_")} css={{ display: "flex" }}>
                    <ModifierImage
                      src={`${BUNGIE_BASE_URL}${displayProperties.icon}`}
                      className="h-6 w-6"
                    />
                    <Box css={{ marginLeft: "$4" }}>
                      <Text size="$sm" weight="normal">
                        {displayProperties?.name}
                      </Text>
                      <Text size="$xs" weight="thin">
                        {displayProperties?.description?.match(
                          beforePeriodRegex
                        )?.[0] || displayProperties?.description}
                      </Text>
                    </Box>
                  </Box>
                )
            )}
          </div>
        </Section>
      )}
      {!isEmpty(currentPsiOps?.modifiers) && (
        <Section sectionTitle="MODIFIERS">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-2 mt-4">
            {currentPsiOps?.modifiers.map(
              ({ displayProperties }) =>
                displayProperties.name && (
                  <Box key={uniqueId("modifier_")} css={{ display: "flex" }}>
                    <ModifierImage
                      src={`${BUNGIE_BASE_URL}${displayProperties.icon}`}
                      className="h-6 w-6"
                    />
                    <Box css={{ marginLeft: "$4" }}>
                      <Text size="$sm" weight="normal">
                        {displayProperties?.name}
                      </Text>
                      <Text size="$xs" weight="thin">
                        {displayProperties?.description?.match(
                          beforePeriodRegex
                        )?.[0] || displayProperties?.description}
                      </Text>
                    </Box>
                  </Box>
                )
            )}
          </div>
        </Section>
      )}
    </Activity>
  );
};

export default CurrentPsiOps;
