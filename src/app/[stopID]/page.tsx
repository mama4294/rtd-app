import { Branch, StopDetails, Trip } from "@/app/types";
import Selectors from "../../components/LineSelector";
import RouteDetails from "../../components/routeDetails";
import { getStopDetails } from "@/lib/ApiRequests";

export default async function Page({
  params,
  searchParams,
}: {
  params: { stopID: string };
  searchParams: { [key: string]: string };
}) {
  const rawData: StopDetails = await getStopDetails(params.stopID);
  const selectedRouteID = searchParams.id;
  const selectedRouteDirection = searchParams.directionName;
  const getUniqueBranchIds = () => {
    const uniqueIdsSet = new Set(); //uses set to remove duplicates
    rawData.branches.forEach((branch: Branch) => {
      if (branch.mode === "RAIL") {
        uniqueIdsSet.add(branch.id);
      }
    });
    const uniqueBranchIds = Array.from(uniqueIdsSet) as string[]; //changes set back into an array
    return uniqueBranchIds;
  };

  const getPossibleDirectionByLine = () => {
    const uniqueDirectionsSet = new Set(); //uses set to remove duplicates
    rawData.branches.forEach((branch: Branch) => {
      if (
        branch.mode === "RAIL" &&
        branch.id === selectedRouteID &&
        !branch.dropoffOnly
      ) {
        uniqueDirectionsSet.add(branch.directionName);
      }
    });
    const uniqueDirections = Array.from(uniqueDirectionsSet) as string[]; //changes set back into an array
    return uniqueDirections;
  };

  const selectedRoute = rawData.branches.find((branch) => {
    return (
      branch.id === selectedRouteID &&
      branch.directionName === selectedRouteDirection
    );
  });

  return (
    <>
      <p className="text-2xl font-semibold mb-4">{rawData.name}</p>
      <Selectors
        lines={getUniqueBranchIds()}
        possibleDirections={getPossibleDirectionByLine()}
      />

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left lg:justify-between gap-4">
        {<RouteDetails props={selectedRoute} />}
      </div>
    </>
  );
}
