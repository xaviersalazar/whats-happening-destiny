import moment, { Moment } from "moment";
import { useEffect, useState } from "react";

type ResetTime = {
  daily: Moment;
  weekly: Moment;
};

// Daily reset time is 17:00 UTC
// Weekly reset time is every Tuesday @ 17:00 UTC
const useResetTime = () => {
  const [resetTime, setResetTime] = useState<ResetTime>({} as ResetTime);

  // Set time in UTC
  const now = moment().utc();

  useEffect(() => {
    const day = now.get("day");
    const hour = now.get("hour");

    // Tuesday == 2 in moment.get('day')
    // Today is Tuesday
    if (day == 2) {
      if (hour <= 17) {
        // The hour is 17:00 UTC or before on Tuesday
        // Both reset times are the same, 17:00 UTC on Tuesday
        const daily = moment()
          .utc()
          .set("hour", 17)
          .set("minutes", 0)
          .set("seconds", 0);
        const weekly = moment()
          .utc()
          .set("hour", 17)
          .set("minutes", 0)
          .set("seconds", 0);

        setResetTime({
          daily,
          weekly,
        });
      } else {
        // The hour is after 17:00 UTC on Tuesday
        // Reset daily in tomorrow at 17:00 UTC
        // Reset weekly is next Tuesday at 17:00 UTC
        const daily = moment()
          .utc()
          .add(1, "day")
          .set("hour", 17)
          .set("minutes", 0)
          .set("seconds", 0);
        const weekly = moment()
          .utc()
          .add(1, "week")
          .set("day", 2)
          .set("hour", 17)
          .set("minutes", 0)
          .set("seconds", 0);

        setResetTime({
          daily,
          weekly,
        });
      }
    } else if (day < 2 || day > 2) {
      // Any other day than Tuesday
      if (hour <= 17) {
        // The hour is 17:00 UTC or before on that day
        // Reset daily is at 17:00 UTC that day
        // Reset weekly is next Tuesday at 17:00 UTC
        const daily = moment()
          .utc()
          .set("hour", 17)
          .set("minutes", 0)
          .set("seconds", 0);
        const weekly = moment()
          .utc()
          .add(1, "week")
          .set("hour", 17)
          .set("minutes", 0)
          .set("seconds", 0);

        setResetTime({
          daily,
          weekly,
        });
      } else {
        // The hour is after 17:00 UTC on Tuesday
        // Reset daily in tomorrow at 17:00 UTC
        // Reset weekly is next Tuesday at 17:00 UTC
        const daily = moment()
          .utc()
          .add(1, "day")
          .set("hour", 17)
          .set("minutes", 0)
          .set("seconds", 0);
        const weekly = moment()
          .utc()
          .add(1, "week")
          .set("day", 2)
          .set("hour", 17)
          .set("minutes", 0)
          .set("seconds", 0);

        setResetTime({
          daily,
          weekly,
        });
      }
    }
  }, []);

  return { resetTime };
};

export default useResetTime;
