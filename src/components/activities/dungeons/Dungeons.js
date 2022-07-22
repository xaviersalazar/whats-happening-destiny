import { Fragment, useEffect, useState } from "react";
import { Text } from "../../common/Text";
import { SubTitleText } from "../../common/SubTitleText";
import { TimeLine } from "../../common/Timeline";
import { TitleText } from "../../common/TitleText";
import { uniqueId } from "lodash";
import dungeonData from "./dungeonData.json";
import styled from "styled-components";

const powerLevelIcon = `${process.env.PUBLIC_URL}/assets/power-level-icon.png`;

const Mode = ({ modeType, powerLevel }) => (
  <div className="flex">
    <Text classes="flex-initial text-xs font-thin mr-2">{modeType}:</Text>
    <img
      className="flex-none w-2 h-2 relative top-1 mr-0.5"
      src={powerLevelIcon}
      alt="power-level-img"
    />
    <Text classes="flex-initial text-xs font-thin">{powerLevel}</Text>
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
    <div className="p-2 mb-5">
      <TitleText>DUNGEONS</TitleText>
      <SubTitleText>Encounters, modifiers, and loot</SubTitleText>
      <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2 gap-12 lg:gap-14 xl:gap-16 px-1 md:px-2">
        {data &&
          data.dungeons.map(
            ({
              name,
              location,
              description,
              image,
              modes,
              modifiers,
              encounters,
            }) => (
              <div key={uniqueId("dungeon_")} className="py-3">
                <img src={image} />
                <Text classes="text-[0.5rem] font-thin lg:text-xs tracking-widerest mt-3 mb-1">
                  {location.toUpperCase()}
                </Text>
                <h1 className="text-3xl font-bold xs:text-4xl md:5xl text-white mb-1">
                  {name}
                </h1>
                <Text classes="text-[0.65rem] font-thin g:text-xs mb-3 italic">
                  {description}
                </Text>
                <div className="mb-3">
                  <h6 className="text-sm font-bold text-white">LIGHT LEVEL</h6>
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
                                <Text classes="text-sm font-regular">
                                  {title}
                                </Text>
                                <Text classes="text-xs font-thin">
                                  {description}
                                </Text>
                              </div>
                            ))}
                        </Fragment>
                      )
                    )}
                  </div>
                </div>
                <div className={`${modifiers.length > 0 ? "mb-8" : "mb-3"}`}>
                  {modifiers &&
                    modifiers.map(({ type, typeModifiers }) => (
                      <div key={uniqueId("modifier_")} className="my-2">
                        <h6 className="text-sm text-white font-bold">
                          MODIFIERS
                        </h6>
                        <p className="text-xs font-thin text-white my-1 tracking-widerest">
                          // {type.toUpperCase()}
                        </p>
                        {typeModifiers.map(
                          ({ name, description, iconPath }) => (
                            <div
                              key={uniqueId("type_modifier_")}
                              className="mb-2 mt-1"
                            >
                              <div className="flex">
                                <div className="mr-2">
                                  <ModifierImg
                                    className="relative h-7 top-1 md:h-6 md:top-2"
                                    src={iconPath}
                                    alt="modifier-img"
                                  />
                                </div>
                                <div>
                                  <Text classes="text-sm font-regular">
                                    {name}
                                  </Text>
                                  <Text classes="text-xs font-thin">
                                    {description}
                                  </Text>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    ))}
                </div>
                <div className="mb-3">
                  <h6 className="text-sm text-white font-bold">ENCOUNTERS</h6>
                  <TimeLine encounters={encounters} />
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
};
