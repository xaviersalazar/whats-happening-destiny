import moment from "moment";
import { useEffect, useState } from "react";
import { TitleText } from "../../../common/TitleText";
import { SubTitleText } from "../../../common/SubTitleText";

export const Daily = () => {
  const [resetTime, setResetTime] = useState("");

  useEffect(() => {
    const now = moment();
    const nextDailyReset = moment()
      .add(1, "day")
      .set("hour", 12)
      .set("minute", 0)
      .set("second", 0);

    const timeLeft = moment.duration(nextDailyReset.diff(now));

    setResetTime(parseInt(timeLeft.asHours()));
  }, []);

  return (
    <>
      <TitleText>DAILY</TitleText>
      <SubTitleText>Activities reset in {resetTime} hours</SubTitleText>
    </>
  );
};
