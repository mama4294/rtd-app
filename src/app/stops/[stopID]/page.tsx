import { Branch, StopDetails, Trip } from "@/app/types";
import Selectors from "./selectors";
import RouteDetails from "./routeDetails";
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
      if (branch.mode === "RAIL" && branch.id === selectedRouteID) {
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

  console.log("rawData", rawData);

  return (
    <>
      <p className="text-2xl font-semibold mb-4">{rawData.name}</p>
      <Selectors
        lines={getUniqueBranchIds()}
        possibleDirections={getPossibleDirectionByLine()}
      />

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left lg:justify-between gap-4">
        {selectedRoute && <RouteDetails props={selectedRoute} />}
      </div>
    </>
  );
}
