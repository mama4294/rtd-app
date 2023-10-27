export type Train = {
  id: string; //"086EAC93FC3CA8E6E063DD4D1FACB04D",
  label: string; //"35",
  bearing: number; //336.1,
  directionId: number; //0,
  directionName: string; //"Northbound",
  tripStatus: string; // "SCHEDULED",
  lat: number; //39.5921194734,
  lng: number; //-104.883751064,
  occupancyStatus: string | null; //null,
  tripId: string; // "114629936",
  shapeId: string; //"1251806",
  routeId: string; //"E",
  serviceDate: string; //"2023-10-24",
  headsign: string; //"Union Station",
  timestamp: number; //1698153459000,
  prevStop: Stop | null;
  currentStop: Stop | null;
  nextStop: Stop | null;
};

type Stop = {
  id: string; //"34007",
  name: string; //"Dry Creek Station"
};

export type StopDetails = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  childStops: ChildStop[];
  branches: Branch[];
  directions: string[];
};

type ChildStop = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  modesServed: string[];
};

export type Branch = {
  id: string;
  routeColor: string;
  routeTextColor: string;
  routeLongName: string;
  routeType: number;
  mode: string;
  headsign: string;
  directionId: number;
  directionName: string;
  stopName: string;
  stopId: string;
  agencyId: string;
  dropoffOnly: boolean;
  upcomingTrips: Trip[];
};

export type Trip = {
  predictedArrivalTime: number | null;
  predictedDepartureTime: number | null;
  scheduledArrivalTime: number;
  scheduledDepartureTime: number;
  stopDropOffType: number;
  stopPickupType: number;
  tripId: string;
  tripStatus: string;
  tripStopStatus: string;
  vehicle?: {
    bearing: number;
    id: string;
    label: string;
    lat: number;
    lng: number;
    timestamp: number;
    routeTextColor: string;
    routeColor: string;
    mode: string;
  };
};
