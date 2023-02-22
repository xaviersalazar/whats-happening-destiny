import { Fragment } from "react";
import { styled as styledNextUi, Text } from "@nextui-org/react";
import { concat, flatten, isEmpty, uniqueId } from "lodash";
import styled, { keyframes } from "styled-components";
import { Encounter } from "../../../types/whDestinyData";
import Box from "../Box";
interface EncounterProps {
  encounters: Encounter[];
}

const pulseAnimation = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
`;

const EncounterList = styledNextUi("ul", {
  listStyleType: "none",
  margin: "$0",
  padding: "$0",
  position: "relative",
  top: 0,
  transition: "all 0.5s linear",
});

const EncounterListItem = styledNextUi("li", {
  margin: "28px 36px",
  position: "relative",
  padding: "12px 0",
  color: "$almostBlack",
  borderRadius: "10px",
  lineHeight: "20px",
  width: "90%",
});

const EncounterDisplay = styled.span<{ dropsLoot: string }>`
  content: "";
  display: block;
  width: 0;
  height: 100%;
  border: 1px solid #0c0f0a;
  position: absolute;
  left: -30px;

  &::before {
    content: "";
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ dropsLoot }) => (dropsLoot ? "#0c0f0a" : "transparent")};
    border: 1px solid #0c0f0a;
    position: absolute;
    top: -20px;
    left: -5px;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
    transform: scale(1);
    animation-name: ${({ dropsLoot }) => (dropsLoot ? pulseAnimation : "none")};
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }
`;

const LootImg = styled.img<{ isExotic?: boolean }>`
  max-width: initial;
  border-radius: 0.25rem;
  border: ${(props) =>
    props.hasOwnProperty("isExotic") && props?.isExotic
      ? "0.25rem solid #ebc942"
      : "0.25rem solid #623a78"};
`;

const LootItems = ({ children }: any) => (
  <Box css={{ marginTop: "$2" }}>{children}</Box>
);

const Encounters = ({ encounters }: EncounterProps) => (
  <Box
    id={uniqueId("encounters_")}
    css={{
      margin: "$0",
      height: "auto",
      padding: "$0",
    }}
  >
    <EncounterList>
      {encounters.map(({ title, description, dropsLoot, doubleLoot, loot }) => (
        <Fragment key={uniqueId("encounter_")}>
          <EncounterListItem>
            <EncounterDisplay dropsLoot={dropsLoot as any} />
            <Text size="$md" weight="semibold">
              {title} {doubleLoot && "(x2 Rewards)"}
            </Text>
            <Text className="text-sm font-light" css={{ marginBottom: "$8" }}>
              {description}
            </Text>
            {dropsLoot && (
              <LootItems>
                <div className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-6">
                  {!isEmpty(loot) &&
                    concat(
                      loot.weapons,
                      flatten(loot.armor.map(({ items }) => items))
                    ).map(({ name, type, iconPath, ...rest }) => (
                      <Box
                        key={uniqueId("loot_")}
                        className="h-auto max-w-16 md:max-w-20 lg:max-w-16 xl:max-w-20"
                        css={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <LootImg
                          src={iconPath}
                          className="h-16 w-16 md:h-20 md:w-20 lg:h-16 lg:w-16 xl:h-20 xl:w-20"
                          alt="loot-icon"
                          {...rest}
                        />
                        <Text
                          size="xx-small"
                          weight="normal"
                          className="text-slate-500"
                          css={{
                            marginTop: "$3",
                            marginBottom: "$2",
                            letterSpacing: "$widest",
                            lineHeight: "$xs",
                          }}
                        >
                          {type.toUpperCase()}
                        </Text>
                        <Text
                          className="text-xs font-light"
                          css={{ lineHeight: "$sm" }}
                        >
                          {name}
                        </Text>
                      </Box>
                    ))}
                </div>
              </LootItems>
            )}
          </EncounterListItem>
        </Fragment>
      ))}
    </EncounterList>
  </Box>
);

export default Encounters;
