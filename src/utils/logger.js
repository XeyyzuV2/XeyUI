export const logs = []

export function logRequest(req) {
  logs.push({
    path: req.originalUrl,
    method: req.method,
    time: new Date().toISOString(),
  })
  if (logs.length > 1000) logs.shift()
}

export function getLogs() {
  return logs
}

export function getStats() {
  return { totalRequests: logs.length }
}
