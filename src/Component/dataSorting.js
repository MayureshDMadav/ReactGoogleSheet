// EXCEL PROVIDES WORNG DATE SO MANAGER HERE

function Monthname(index) {
  const month = [
    "",
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return month[index];
}

function dateTime(data) {
  const string = JSON.stringify(data);
  const space = "T";
  const remove = ":00.000Z";
  const final = string.replace(space, " ").replace(remove, "");
  const slice = final.slice(1, 12);
  const half = slice.slice(0, 8);
  const secondhalf = slice.slice(8, 10);
  const date = parseInt(secondhalf) + 1;
  const MonthIndex = parseInt(half.slice(5, 7));
  const year = half.slice(0, 4);
  const dataSorting = date + " " + Monthname(MonthIndex) + " " + year;
  return dataSorting;
}

export default dateTime;
