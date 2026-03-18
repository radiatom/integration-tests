export const formatSeconds = (totalSeconds: number, isHour?: boolean): string => {
  const hours = Math.floor(totalSeconds / 60 / 60)
  const minutes = Math.floor(isHour ? (totalSeconds / 60) % 60 : totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${isHour ? `${String(hours).padStart(2, '0')}:` : ''}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}
