import { Fragment, useEffect, useState } from "react";
import { Text } from "../../../common/Text";
import { TimeLine } from "../../../common/Timeline";
import { TitleText } from "../../../common/TitleText";
import { uniqueId } from "lodash";
import dungeonData from "./dungeonData.json";
import styled from "styled-components";

const powerLevelIcon = `${process.env.PUBLIC_URL}/assets/power-level-icon.png`;

const Mode = ({ modeType, powerLevel }) => (
  <div className="flex">
    <Text classes="flex-initial text-sm mr-2">{modeType}:</Text>
    <img
      className="flex-none w-2 h-2 relative top-1 mr-0.5"
      src={powerLevelIcon}
    />
    <Text classes="flex-initial text-sm">{powerLevel}</Text>
  </div>
);

const ModifierImg = styled.img`
  max-width: initial;
`;

export const Dungeons = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(JSON.parse(JSON.stringify(dungeonData)));
  }, []);

  return (
    <div className="mb-5">
      <TitleText>DUNGEONS</TitleText>
      <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2 gap-0">
        {data &&
          data.dungeons.map(
            ({ name, location, description, modes, modifiers, encounters }) => (
              <div key={uniqueId("dungeon_")} className="py-3 px-1 md:px-2">
                <Text classes="text-xxs sm:text-sm tracking-widerest">
                  {location.toUpperCase()}
                </Text>
                <h1 className="text-3xl xs:text-4xl md:5xl text-white bold my-0">
                  {name}
                </h1>
                <Text classes="text-xxs sm:text-sm mb-3 italic">
                  {description}
                </Text>
                <div className="mb-3">
                  <h6 className="text-sm text-white">LIGHT LEVEL</h6>
                  <div className="my-2">
                    {modes.map(
                      ({ type, recommendedLightLevel, uniqueLoot }) => (
                        <Fragment key={uniqueId("modes_")}>
                          <Mode
                            modeType={type}
                            powerLevel={recommendedLightLevel}
                          />
                          {uniqueLoot &&
                            uniqueLoot.map(({ title, description }) => (
                              <div
                                key={uniqueId("unique_loot_")}
                                className="mt-2"
                              >
                                <Text classes="text-sm" light>
                                  {title}
                                </Text>
                                <Text classes="text-sm">{description}</Text>
                              </div>
                            ))}
                        </Fragment>
                      )
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  {modifiers &&
                    modifiers.map(({ type, typeModifiers }) => (
                      <div key={uniqueId("modifier_")} className="my-2">
                        <h6 className="text-sm text-white">
                          MODIFIERS ({type.toUpperCase()})
                        </h6>
                        {typeModifiers.map(
                          ({ name, description, iconPath }) => (
                            <div
                              key={uniqueId("type_modifier_")}
                              className="my-2"
                            >
                              <div className="flex">
                                <div className="mr-2">
                                  <ModifierImg
                                    className="relative h-7 top-4 md:h-6 md:top-2"
                                    src={iconPath}
                                  />
                                </div>
                                <div>
                                  <Text classes="text-sm" regular>
                                    {name}
                                  </Text>
                                  <Text classes="text-sm">{description}</Text>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    ))}
                </div>
                <div className="mb-3">
                  <h6 className="text-sm text-white">ENCOUNTERS</h6>
                  <TimeLine encounters={encounters} />
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
};
