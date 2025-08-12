import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const usersFile = path.join(__dirname, "../users.json")

export function readUsers() {
  try {
    const data = fs.readFileSync(usersFile, "utf-8")
    return JSON.parse(data)
  } catch (e) {
    return []
  }
}

export function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2))
}

export function findUser(username) {
  return readUsers().find((u) => u.username === username)
}

export function addUser(user) {
  const users = readUsers()
  users.push(user)
  writeUsers(users)
}

export function updateUser(user) {
  const users = readUsers()
  const index = users.findIndex((u) => u.username === user.username)
  if (index !== -1) {
    users[index] = user
    writeUsers(users)
    return true
  }
  return false
}
