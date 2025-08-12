import crypto from "crypto"

const tokens = new Map()

export function generateToken(user) {
  const token = crypto.randomBytes(24).toString("hex")
  tokens.set(token, { username: user.username, role: user.role })
  return token
}

export function verifyToken(token) {
  return tokens.get(token)
}

export function requireAuth(role) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || ""
    const token = authHeader.split(" ")[1]
    const session = verifyToken(token)
    if (!session || (role && session.role !== role)) {
      return res.status(401).json({ status: false, error: "Unauthorized" })
    }
    req.user = session
    next()
  }
}
