function getMillisecondsSinceMidnight() {
  const now = new Date()
  const midnight = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  )
  midnight.setUTCHours(0, 0, 0, 0)

  return now.getTime() - midnight.getTime()
}

export function generateReportSlug(municipalityCode: string) {
  const now = new Date()
  const date =
    now.getUTCFullYear().toString().substring(2) +
    (now.getUTCMonth() + 1).toString().padStart(2, '0') +
    now.getUTCDate().toString().padStart(2, '0')
  const subSeconds = getMillisecondsSinceMidnight()

  return `${date}-${subSeconds}-${municipalityCode}`
}
