// Farcaster epoch of time is the first day of 2021 (1-1-2021),
// given a timestamp, convert it to date
export const timestampToHumanReadable = (timestamp: number) => {
  const date = new Date(1609459200000 + timestamp)
  return date
}
