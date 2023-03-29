export const convertSecondsInMinutes = (time: number) => {
  const secs = Math.round(time);

  const divisor_for_minutes = secs % (60 * 60);
  let minutes: string | number = Math.floor(divisor_for_minutes / 60);

  const divisor_for_seconds = divisor_for_minutes % 60;
  let seconds: string | number = Math.ceil(divisor_for_seconds);
  if (minutes.toString().length === 1) {
    minutes = `0${minutes}`;
  }
  if (seconds.toString().length === 1) {
    seconds = `0${seconds}`;
  }

  return `${minutes || "0"}:${seconds}`;
};
