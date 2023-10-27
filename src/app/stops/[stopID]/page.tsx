import { Branch, StopDetails, Trip } from "@/app/types";
import Selectors from "./selectors";

async function getStopDetails(stopID: string) {
  const url = `https://www.rtd-denver.com/api/v2/nextride/stops/${stopID}`;
  const headers = new Headers({
    authority: "www.rtd-denver.com",
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    "api-key": "e7b926a1-cddb-46e7-bb27-6d134e5b5feb",
    dnt: "1",
    "if-none-match": 'W/"9c5-oXAWjEx6QWwhR6cnavtSTc3zKwQ"',
    origin: "https://app.rtd-denver.com",
    referer: "https://app.rtd-denver.com/",
  });

  const request = new Request(url, {
    method: "GET",
    headers: headers,
  });

  const res = await fetch(request, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
export default async function Page({
  params,
  searchParams,
}: {
  params: { stopID: string };
  searchParams: { [key: string]: string };
}) {
  const rawData: StopDetails = await getStopDetails(params.stopID);
  const selectedRouteID = searchParams.id || "E";
  const selectedRouteDirection = searchParams.directionName || "Northbound";

  const Route = rawData.branches.find((branch) => {
    return (
      branch.id === selectedRouteID &&
      branch.directionName === selectedRouteDirection
    );
  });

  return (
    <>
      <p className="text-2xl font-semibold mb-4">{rawData.name}</p>
      <Selectors />

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left lg:justify-between gap-4">
        {Route && <RouteDetails props={Route} />}
      </div>
    </>
  );
}

const RouteDetails = ({ props }: { props: Branch }) => {
  const { routeLongName, id, directionName, upcomingTrips } = props;

  return (
    <div className="group text-center rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
      <div className="mb-4">
        <h2 className={`mb-0 text-2xl font-semibold`}>{id} Line</h2>
        <p className={`mb-2  text-sm opacity-50`}>{directionName}</p>
        <p className={`mb-0  text-sm opacity-50`}>{routeLongName}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4 grid-cols-1 ">
        {upcomingTrips &&
          upcomingTrips.map((trip: Trip, index: number) => {
            return <Trip props={trip} index={index} key={trip.tripId} />;
          })}
      </div>
    </div>
  );
};

const timestampToTime = (timestamp: number | null) => {
  if (timestamp == null) return null;
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours < 12 ? "AM" : "PM"; // Convert hours to 12-hour format
  const formattedHours = hours % 12 || 12;
  const formattedTime = `${formattedHours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;
  return formattedTime;
};

const calculateDelay = (
  scheduledTime: number | null,
  predictedTime: number | null
) => {
  if (scheduledTime == null || predictedTime == null) {
    return null; // Invalid data, return null
  }
  const delayMinutes = Math.round((predictedTime - scheduledTime) / 60000); // Calculate the delay/earliness in minutes
  return delayMinutes;
};

const calculateMinutesRemaining = (time: number | null) => {
  if (time == null) {
    return null; // Invalid data, return null
  }

  const currentTime = new Date().getTime(); // Current time in milliseconds

  // Calculate the time remaining in milliseconds
  const timeRemaining = time - currentTime;

  // Convert milliseconds to minutes and seconds
  const minutesRemaining = Math.floor(timeRemaining / 60000); // 1 minute = 60,000 milliseconds

  return minutesRemaining;
};

const getOrdinalString = (number: number): string => {
  if (number >= 11 && number <= 13) {
    return number + "th";
  }

  const lastDigit = number % 10;
  let ordinal;

  switch (lastDigit) {
    case 1:
      ordinal = "st";
      break;
    case 2:
      ordinal = "nd";
      break;
    case 3:
      ordinal = "rd";
      break;
    default:
      ordinal = "th";
      break;
  }

  let string = number + ordinal;
  if (string == "1st") string = "Next";

  return string;
};

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
