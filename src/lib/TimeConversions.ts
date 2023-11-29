import moment from "moment-timezone";

export const timestampToTime = (timestamp: number | null) => {
  if (timestamp == null) return null;
  const denverTime = moment(timestamp).tz("America/Denver"); // Create a moment-timezone object for the timestamp in the Denver time zone
  const hours = denverTime.hours();
  const minutes = denverTime.minutes();
  const ampm = hours < 12 ? "AM" : "PM"; // Determine whether it's AM or PM
  const formattedHours = hours % 12 || 12; // Convert hours to 12-hour format
  // Format the time
  const formattedTime = `${formattedHours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;
  return formattedTime;
};

export const calculateDelay = (
  scheduledTime: number | null,
  predictedTime: number | null
) => {
  if (scheduledTime == null || predictedTime == null) {
    return null; // Invalid data, return null
  }
  const delayMinutes = Math.round((predictedTime - scheduledTime) / 60000); // Calculate the delay/earliness in minutes
  return delayMinutes;
};

export const calculateMinutesRemaining = (time: number | null) => {
  if (time == null) {
    return null; // Invalid data, return null
  }

  const currentTime = new Date().getTime(); // Current time in milliseconds

  // Calculate the time remaining in milliseconds
  const timeRemaining = time - currentTime;

  // Convert milliseconds to minutes and seconds
  let minutesRemaining = Math.floor(timeRemaining / 60000); // 1 minute = 60,000 milliseconds
  if (minutesRemaining < 0) minutesRemaining = 0; //cannot be less than 0

  return minutesRemaining;
};

export const getOrdinalString = (number: number): string => {
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

export function convertToFriendlyFormat(timestamp: number) {
  const now = moment();
  const targetDate = moment(timestamp);
  const diffInDays = targetDate.diff(now, "days");

  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "Tomorrow";
  } else {
    return targetDate.format("MMM DD"); // You can adjust the date format as needed
  }
}
