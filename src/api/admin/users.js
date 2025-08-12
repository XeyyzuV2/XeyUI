import { readUsers, findUser, updateUser } from "../../utils/userService.js"
import { requireAuth } from "../../utils/authTokens.js"

export default (app) => {
  app.get("/api/admin/users", requireAuth("admin"), (req, res) => {
    const users = readUsers().map(({ passwordHash, ...rest }) => rest)
    res.json({ status: true, users })
  })

  app.post("/api/admin/users/:username/suspend", requireAuth("admin"), (req, res) => {
    const { username } = req.params
    const { suspended } = req.body
    const user = findUser(username)
    if (!user) {
      return res.status(404).json({ status: false, error: "User not found" })
    }
    user.suspended = !!suspended
    updateUser(user)
    res.json({ status: true, user: { username: user.username, suspended: user.suspended, role: user.role } })
  })
}
