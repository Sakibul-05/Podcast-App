function timeConverter(T) {
  let total_minute = T / 60;
  let minute = Math.floor(total_minute);
  let remainingMinute = total_minute - minute;
  let seconds = Math.floor(remainingMinute * 60);
  let minuteStr = "";
  let secStr = "";
  if (minute.toString().length === 1) {
    minuteStr = `0${minute}`;
  }
  if (minute.toString().length === 2) {
    minuteStr = `${minute}`;
  }
  if (seconds.toString().length === 1) {
    secStr = `0${seconds}`;
  }
  if (seconds.toString().length === 2) {
    secStr = `${seconds}`;
  }
  return `${minuteStr}:${secStr}`;
}
export default timeConverter;
