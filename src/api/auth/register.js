import crypto from "crypto"
import { addUser, findUser } from "../../utils/userService.js"

export default (app) => {
  app.post("/api/auth/register", (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ status: false, error: "Username and password required" })
    }
    if (findUser(username)) {
      return res.status(409).json({ status: false, error: "User already exists" })
    }
    const passwordHash = crypto.createHash("sha256").update(password).digest("hex")
    const user = { username, passwordHash, role: "user", suspended: false }
    addUser(user)
    res.json({ status: true, message: "User registered" })
  })
}
