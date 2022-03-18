import { TitleText } from "../../../common/TitleText";

const powerLevelIcon = `${process.env.PUBLIC_URL}/assets/power-level-icon.png`;

const Mode = ({ modeType, powerLevel }) => (
  <div className="flex">
    <p className="text-sm text-white flex-initial mr-2 light">{modeType}: </p>
    <img
      className="flex-none w-2 h-2 relative top-1 mr-0.5"
      src={powerLevelIcon}
    />
    <p className="text-sm text-white flex-initial"> {powerLevel}</p>
  </div>
);

export const Dungeons = () => {
  return (
    <div className="mb-5">
      <TitleText>DUNGEONS</TitleText>
      <div className="py-5 pl-1">
        <p className="text-sm text-white tracking-widest">THE COSMODROME</p>
        <h1 className="text-2xl lg:text-4xl text-white bold my-1">
          Grasp of Avarice
        </h1>
        <p className="text-xs text-white mb-3 italic">
          A cautionary tale for adventurers willing to trade their humanity for
          riches
        </p>
        <div className="mb-3">
          <Mode modeType="Legend" powerLevel={1530} />
          <Mode modeType="Master" powerLevel={1590} />
        </div>
        <div className="mb-3">
          <p className="text-sm text-white light">
            Modifiers (Master)
            <div className="my-2">
              <p className="text-sm text-white">Champions: Overload</p>
              <p className="text-sm text-white">
                This mode contains Overload Champions, which cannot be stopped
                without an Overload mod
              </p>
            </div>
            <div className="my-2">
              <p className="text-sm text-white">Champions: Barrier</p>
              <p className="text-sm text-white">
                This mode contains Barrier Champions, which cannot be stopped
                without an Anti-Barrier mod
              </p>
            </div>
            <div className="my-2">
              <p className="text-sm text-white">Match Game</p>
              <p className="text-sm text-white">
                Enemy shields are highly resistant to all unmatched elemental
                damage
              </p>
            </div>
          </p>
        </div>
        <div className="mb-3">
          <p className="text-sm text-white light">Encounters</p>
          <div className="my-2">
            <p className="text-sm text-white">
              1st: Phry'zhia, The Insatiable (Ogre)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
