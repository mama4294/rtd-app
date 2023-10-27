export const timestampToTime = (timestamp: number | null) => {
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
  const minutesRemaining = Math.floor(timeRemaining / 60000); // 1 minute = 60,000 milliseconds

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
