import { Branch, Trip } from "@/app/types";
import TripDetails from "./trip";

const RouteDetails = ({ props }: { props: Branch }) => {
  const { routeLongName, id, directionName, upcomingTrips } = props;

  return (
    <div className="group text-center rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
      <div className="mb-4">
        <h2 className={`mb-2 text-2xl font-semibold`}>Upcomming Trains</h2>
        <p className={`mb-0 text-sm opacity-50`}>
          {id} Line - {directionName}
        </p>
        <p className={`mb-0  text-sm opacity-50`}>{routeLongName}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4 grid-cols-1 ">
        {upcomingTrips &&
          upcomingTrips.map((trip: Trip, index: number) => {
            return <TripDetails props={trip} index={index} key={trip.tripId} />;
          })}
      </div>
    </div>
  );
};

export default RouteDetails;
