import { Branch, Trip } from "@/app/types";
import TripDetails from "./TripCard";

const RouteDetails = ({ props }: { props: Branch | undefined }) => {
  if (props == undefined) return <LoadingPage />;

  const { id, directionName, routeLongName, upcomingTrips } = props;

  return (
    <div className="group text-center rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
      <div className="mb-4">
        <h2 className="mb-2 text-2xl font-semibold">Upcoming Trains</h2>
        <p className={`mb-0 text-sm opacity-50`}>
          {id} Line - {directionName}
        </p>
        <p className={`mb-0  text-sm opacity-50`}>{routeLongName}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4 grid-cols-1 ">
        {upcomingTrips.map((trip: Trip, index: number) => {
          return <TripDetails props={trip} index={index} key={trip.tripId} />;
        })}
      </div>
    </div>
  );
};

const LoadingPage = () => (
  <div className="group text-center rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
    <div className="mb-4">
      <h2 className="mb-4 text-2xl font-semibold">Upcoming Trains</h2>
      <div className="mx-auto w-48 overflow-hidden">
        <LoadingLine />
        <LoadingLine />
      </div>
    </div>
    <div className="grid md:grid-cols-3 gap-4 grid-cols-1 ">
      <LoadingSquare />
      <LoadingSquare />
      <LoadingSquare />
      <LoadingSquare />
      <LoadingSquare />
      <LoadingSquare />
    </div>
  </div>
);

const LoadingLine = () => (
  <div className="animate-pulse h-2 bg-gray-500 rounded-xl dark:bg-gray-700 w-48 mb-4" />
);

const LoadingSquare = () => (
  <div className="group rounded-lg border border-transparent px-5 py-4 transition-colorsborder-gray-300 bg-gray-300/30 dark:border-neutral-700 dark:bg-neutral-800/30">
    <div className="mb-3 w-12 overflow-hidden mx-auto">
      <LoadingLine />
    </div>
    <div className="mb-3 w-24 overflow-hidden mx-auto">
      <LoadingLine />
    </div>
    <div className="mb-3 w-12 overflow-hidden mx-auto">
      <LoadingLine />
    </div>
  </div>
);

export default RouteDetails;
