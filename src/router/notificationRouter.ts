import NotificationController from "../controllers/notificationController";
import express from "express"
const router = express.Router()
const notificationController = new NotificationController()

router.post("/create-noti",notificationController.create)
router.get("/get-noti/:id",notificationController.get)
router.post("/getNoti-withLimit",notificationController.getNotiWithLimit)
router.delete("/delete-noti/:id",notificationController.delete)
router.get("/total-noti",notificationController.totalCount)

export default router 