import { Trip } from "@/app/types";
import {
  calculateDelay,
  calculateMinutesRemaining,
  getOrdinalString,
  timestampToTime,
} from "./logic";

const Trip = ({ props, index }: { props: Trip; index: number }) => {
  const { scheduledArrivalTime, predictedArrivalTime } = props;
  const delayMinutes = calculateDelay(
    scheduledArrivalTime,
    predictedArrivalTime
  );

  const arrivalTime = predictedArrivalTime || scheduledArrivalTime;
  const minutesRemaining = calculateMinutesRemaining(arrivalTime);
  const ordinal = getOrdinalString(index + 1); //1st trip, 2nd trip etc
  const isSoon = minutesRemaining && minutesRemaining < 60;

  return (
    <div className="group rounded-lg border border-transparent px-5 py-4 transition-colorsborder-gray-300 bg-gray-300/30 dark:border-neutral-700 dark:bg-neutral-800/30">
      <h2 className={`mb-3 text-xl`}>{ordinal} trip</h2>

      <p className={`mb-3 text-2xl font-semibold`}>
        {isSoon ? <p>{minutesRemaining} min</p> : timestampToTime(arrivalTime)}
      </p>
      {isSoon ? timestampToTime(arrivalTime) : "Today"}
      {delayMinutes !== null && (
        <p className={`m-0 text-sm`}>
          {delayMinutes >= 0
            ? `${delayMinutes} min late`
            : `${Math.abs(delayMinutes)} min early`}
        </p>
      )}
    </div>
  );
};

export default Trip;
