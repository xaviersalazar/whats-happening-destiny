import { useEffect, useState } from "react";
import moment from "moment";
import { SubTitleText } from "../../../common/SubTitleText";
import { TitleText } from "../../../common/TitleText";

export const Weekly = () => {
  const [resetDays, setResetDays] = useState("");

  useEffect(() => {
    const start = moment().day(2).format("MMMM Do");
    const end = moment().day(9).format("MMMM Do");

    setResetDays({ start, end });
  }, []);

  return (
    <div className="mb-5">
      <TitleText>WEEKLY</TitleText>
      <SubTitleText>
        {resetDays.start} to {resetDays.end}
      </SubTitleText>
    </div>
  );
};
