import express from 'express'
import { add, remove, foodList } from '../controllers/controller.js'
import multer from 'multer'

const foodRouter = express.Router();

// Image Storage

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (request, file, callback) => {
    return callback(null, `${Date.now()}${file.originalname}`)
  }
})

const upload = multer({ storage: storage })


foodRouter.post("/add", upload.single("image"), add)
foodRouter.post("/remove", remove)
foodRouter.get("/list", foodList)


export default foodRouter;