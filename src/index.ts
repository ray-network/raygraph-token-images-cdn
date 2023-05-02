import express from "express"
import fs from "fs"
import dotenv from "dotenv"
import mountRoutes from "./routes"

dotenv.config()
const HOST = process.env.HOST
const PORT = process.env.PORT
const CDN_FOLDER = process.env.CDN_FOLDER

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
  res.header("Access-Control-Allow-Headers", "Content-Type")
  next()
})
mountRoutes(app)
app.listen(Number(PORT), HOST, () => {
  console.log(`App listening on port http://localhost:${PORT}`)
})

fs.mkdirSync(CDN_FOLDER, { recursive: true })
