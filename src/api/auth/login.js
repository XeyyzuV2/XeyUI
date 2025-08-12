import crypto from "crypto"
import { findUser } from "../../utils/userService.js"
import { generateToken } from "../../utils/authTokens.js"

export default (app) => {
  app.post("/api/auth/login", (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ status: false, error: "Username and password required" })
    }
    const user = findUser(username)
    if (!user || user.suspended) {
      return res.status(401).json({ status: false, error: "Invalid credentials" })
    }
    const passwordHash = crypto.createHash("sha256").update(password).digest("hex")
    if (user.passwordHash !== passwordHash) {
      return res.status(401).json({ status: false, error: "Invalid credentials" })
    }
    const token = generateToken(user)
    res.json({ status: true, token })
  })
}
