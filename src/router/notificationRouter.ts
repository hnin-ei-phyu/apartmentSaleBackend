import NotificationController from "../controllers/notificationController";
import express from "express"
const router = express.Router()
const notificationController = new NotificationController()

router.post("/create-noti",notificationController.create)
router.get("/get-noti/:id",notificationController.get)
router.get("/get-all",notificationController.getAll)
router.delete("/delete-noti/:id",notificationController.delete)
router.get("/total-noti",notificationController.totalCount)
router.get("/total-noti",notificationController.totalCount)
router.post("/getWithRange",notificationController.getWithRange)
router.get("/search",notificationController.search)

export default router 