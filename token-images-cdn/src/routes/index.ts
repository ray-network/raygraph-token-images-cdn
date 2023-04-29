import { Express } from "express"
import images from "./images"

export default (app: Express) => {
  app.use("/", images)
}
