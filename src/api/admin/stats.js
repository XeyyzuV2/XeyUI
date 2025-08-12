import { readUsers } from "../../utils/userService.js"
import { requireAuth } from "../../utils/authTokens.js"
import { getLogs, getStats } from "../../utils/logger.js"

export default (app) => {
  app.get("/api/admin/stats", requireAuth("admin"), (req, res) => {
    const users = readUsers()
    const stats = {
      totalUsers: users.length,
      suspendedUsers: users.filter((u) => u.suspended).length,
      totalRequests: getStats().totalRequests,
    }
    res.json({ status: true, stats })
  })

  app.get("/api/admin/logs", requireAuth("admin"), (req, res) => {
    res.json({ status: true, logs: getLogs() })
  })
}
