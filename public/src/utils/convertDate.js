export default function (date) {
  let newDate = new Date(date);
  return newDate.toDateString();
}
