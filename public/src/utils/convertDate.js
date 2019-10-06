// ./src/utils/convertDate.js

export default function (date) {
  const newDate = new Date(date);
  return newDate.toDateString();
}
