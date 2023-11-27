import { Branch, StopDetails, Trip } from "@/app/types";
import Selectors from "./selectors";
import RouteDetails from "./routeDetails";

async function getStopDetails(stopID: string) {
  const url = `https://rtdnodeprod.prod.acquia-sites.com/api/v2/nextride/stops/${stopID}`;
  const headers = new Headers({
    authority: "rtdnodeprod.prod.acquia-sites.com",
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
