import { TitleText } from "../../../common/TitleText";
import "./timeline.css";

const powerLevelIcon = `${process.env.PUBLIC_URL}/assets/power-level-icon.png`;

const Mode = ({ modeType, powerLevel }) => (
  <div className="flex">
    <p className="text-sm text-white flex-initial mr-2 light">{modeType}:</p>
    <img
      className="flex-none w-2 h-2 relative top-1 mr-0.5"
      src={powerLevelIcon}
    />
    <p className="text-sm text-white flex-initial">{powerLevel}</p>
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
          <div className="timeline text-white">
            <ul>
              <li>
                <span />
                <div className="timeline-title">
                  <p className="text-sm text-white light">Loot Cave Entrance</p>
                </div>
                <div className="timeline-info">
                  <p className="text-sm text-white">
                    Kill some enemies to gather and dunk engrams to make your
                    way into the cave
                  </p>
                </div>
              </li>
              <li>
                <span />
                <div className="timeline-title">
                  <p className="text-sm text-white light">
                    Navigate To First Boss
                  </p>
                </div>
                <div className="timeline-info">
                  <p className="text-sm text-white">
                    Make your way to the first boss but watch out for spikes,
                    traps, and a barrel. There's a few switches you have to flip
                    here too
                  </p>
                </div>
              </li>
              <li>
                <span className="drops-loot" />
                <div className="timeline-title">
                  <p className="text-sm text-white light">
                    Phry'zhia, The Insatiable
                  </p>
                </div>
                <div className="timeline-info">
                  <p className="text-sm text-white">
                    Defeat Phry'zhia by collecting and dunking engrams till
                    damage phase. Rinse and repeat
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-white light">Possible Rewards</p>
                  <p className="text-sm text-white">Matador 64</p>
                  <p className="text-sm text-white">Echo Boots</p>
                  <p className="text-sm text-white">Echo Class Item</p>
                </div>
              </li>
              <li>
                <span />
                <div className="timeline-title">
                  <p className="text-sm text-white light">Sparrow Run</p>
                </div>
                <div className="timeline-info">
                  <p className="text-sm text-white">
                    Sparrow your way to the next encounter defusing mines along
                    the way. Make sure to ding the red buttons to extend your
                    time
                  </p>
                </div>
              </li>
              <li>
                <span className="drops-loot" />
                <div className="timeline-title">
                  <p className="text-sm text-white light">Fallen Shield</p>
                </div>
                <div className="timeline-info">
                  <p className="text-sm text-white">
                    Destroy the shielded Servitors and launch their corpse at a
                    shield generator. You'll need to do this 4 times
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-white light">Possible Rewards</p>
                  <p className="text-sm text-white">Hero of Ages</p>
                  <p className="text-sm text-white">Echo Gloves</p>
                  <p className="text-sm text-white">Echo Chest</p>
                </div>
              </li>
              <li>
                <span className="drops-loot" />
                <div className="timeline-title">
                  <p className="text-sm text-white light">
                    Captain Avarokk, The Covetous
                  </p>
                </div>
                <div className="timeline-info">
                  <p className="text-sm text-white">
                    Defeat Captain Avarokk by collecting and dunking engrams to
                    reach damage phase. Rinse and repeat
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-white light">
                    Possible Rewards (Double Loot)
                  </p>
                  <div className="flex">
                    <div className="mr-5">
                      <p className="text-sm text-white">1000 Yard Stare</p>
                      <p className="text-sm text-white">Matador 64</p>
                      <p className="text-sm text-white">Hero of Ages</p>
                      <p className="text-sm text-white">Eyasluna</p>
                    </div>
                    <div>
                      <p className="text-sm text-white">Echo Helm</p>
                      <p className="text-sm text-white">Echo Gloves</p>
                      <p className="text-sm text-white">Echo Boots</p>
                      <p className="text-sm text-white">Echo Class Item</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
