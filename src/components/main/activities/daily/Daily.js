import moment from "moment";
import { useEffect, useState } from "react";
import { TitleText } from "../../../common/TitleText";
import { SubTitleText } from "../../../common/SubTitleText";

export const Daily = () => {
  const [resetTime, setResetTime] = useState("");

  useEffect(() => {
    const now = moment();

    if (now.isBefore(moment().hour(12))) {
      const resetTime = moment()
        .set("hour", 12)
        .set("minute", 0)
        .set("second", 0);

      setResetTime(now.to(resetTime));
    } else {
      const nextDailyReset = moment()
        .add(1, "day")
        .set("hour", 12)
        .set("minute", 0)
        .set("second", 0);

      setResetTime(`in ${nextDailyReset.diff(now, "hours")} hours`);
    }
  }, []);

  return (
    <div className="p-2 mb-5">
      <TitleText>DAILY</TitleText>
      <SubTitleText>Reset {resetTime}</SubTitleText>
    </div>
  );
};
