function getMillisecondsSinceMidnight() {
  const now = new Date()
  const midnight = new Date(now)
  midnight.setHours(0, 0, 0, 0)
  return now.getTime() - midnight.getTime()
}

export function generateReportSlug(municipalityCode: string) {
  const now = new Date()
  const date = now.toISOString().split('T')[0].replace(/-/g, '').substring(2)
  const subSeconds = getMillisecondsSinceMidnight()
  return `${date}-${subSeconds}-${municipalityCode}`
}
