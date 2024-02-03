export const getTime = (timeRange) => {
  const timeSTART = new Date(timeRange[0].startDate)
    .toLocaleString()
    .split(",")[0];
  const timeEND = new Date(timeRange[0].endDate).toLocaleString().split(",")[0];
  const time = `${timeSTART} - ${timeEND}`;
  return { time, timeSTART, timeEND };
};

// const date = new Date(timeRange[0].startDate);
// const options = {
//   year: "numeric",
//   month: "long",
//   day: "numeric",
//   hour: "numeric",
//   minute: "numeric",
//   second: "numeric",
//   timeZone: "Asia/Baku", // Set the timezone to Azerbaijan
//   timeZoneName: "short", // Optionally, include the timezone abbreviation
// };

// const AzerbaijaniDateTime = date.toLocaleString("az-AZ", options);
//
