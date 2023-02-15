import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Text } from "@nextui-org/react";
import { getMany } from "idb-keyval";
import moment from "moment";
import { isEmpty, uniqueId } from "lodash";
import { useSeason } from "../../context/Season";
import { BUNGIE_BASE_URL, getWhDestinyData } from "../../api/api";
import { Activity, Box, Loader, ModifierImage, Section } from "../common";
import { PsiOps } from "../../types/psiOps";
import { Destination } from "../../types/destination";
import { Modifier } from "../../types/modifier";
import { beforePeriodRegex } from "../../utils/helpers";
import placeholderImage from "../../assets/placeholder.jpeg";

type CurrentPsiOps = {
  psiOps: PsiOps;
  destination: Destination;
  champions: Modifier[];
  modifiers: Modifier[];
};

const CurrentPsiOps = () => {
  const [isLoadingPsiOps, setIsLoadingPsiOps] = useState<boolean>(true);
  const [currentPsiOps, setCurrentPsiOps] = useState<CurrentPsiOps | null>(
    null
  );
  const [activityImage, setActivityImage] = useState(placeholderImage);
  const [resetTime, setResetTime] = useState<string>("");

  const { currentSeason } = useSeason();
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
    let currPsiOps = {} as any;

    const now = moment().utc();

    if (
      now.isSameOrBefore(
        moment().set("hour", 11).set("minute", 0).set("second", 0).utc()
      )
    )
      currPsiOps = data?.[currPsiOpsRotation] as any;
    else {
      if (currPsiOpsRotation === 2) {
        currPsiOps = data?.[0] as any;
      } else {
        currPsiOps = data?.[currPsiOpsRotation + 1] as any;
      }
    }

    const psiOps = definitions[0][currPsiOps?.activityHashes[1]] as PsiOps;
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
    const now = moment();

    if (now.isBefore(moment().hour(11))) {
      const resetTime = moment()
        .set("hour", 11)
        .set("minute", 0)
        .set("second", 0);

      setResetTime(moment(resetTime).fromNow());
    } else {
      const nextDailyReset = moment()
        .add(1, "day")
        .set("hour", 11)
        .set("minute", 0)
        .set("second", 0);

      setResetTime(moment(nextDailyReset).utc().fromNow());
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      getPsiOps();
    }
  }, [isSuccess]);

  if (!isSuccess && !(isLoading || isLoadingPsiOps)) return null;

  if (isLoading || isLoadingPsiOps) return <Loader />;

  return (
    <Activity
      imageSrc={activityImage}
      subTitle={`PSIOPS ${` // ${
        currentPsiOps?.destination.displayProperties?.name.toUpperCase() || ""
      }`}`}
      title={currentPsiOps?.psiOps.originalDisplayProperties.name || ""}
      description={`Resets ${resetTime}`}
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
