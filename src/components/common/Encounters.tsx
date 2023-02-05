import { Grid, styled as styledNextUi, Text } from "@nextui-org/react";
import styled, { keyframes } from "styled-components";
import { concat, flatten, isEmpty, uniqueId } from "lodash";
import { Encounter } from "../../types/activities";
import Box from "./Box";
import { Fragment } from "react";

interface EncounterProps {
  encounters: [Encounter];
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
            <Text size="$sm" weight="thin">
              {description}
            </Text>
            {dropsLoot && (
              <LootItems>
                <Grid.Container
                  gap={1}
                  css={{
                    paddingLeft: "$0",
                    paddingRight: "$0",
                  }}
                >
                  {!isEmpty(loot) &&
                    concat(
                      loot.weapons,
                      flatten(loot.armor.map(({ items }) => items))
                    ).map(({ name, type, iconPath, ...rest }) => (
                      <Grid xs={3}>
                        <Box
                          css={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <LootImg
                            src={iconPath}
                            height={64}
                            width={64}
                            alt="loot-icon"
                            {...rest}
                          />
                          <Text
                            size="xx-small"
                            weight="thin"
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
                            size="x-small"
                            weight="light"
                            css={{ lineHeight: "$sm" }}
                          >
                            {name}
                          </Text>
                        </Box>
                      </Grid>
                    ))}
                </Grid.Container>
              </LootItems>
            )}
          </EncounterListItem>
        </Fragment>
      ))}
    </EncounterList>
  </Box>
);

export default Encounters;
