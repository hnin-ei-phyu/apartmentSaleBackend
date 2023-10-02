import Buycontroller from "../controllers/buyerController"
import express from "express"
const router = express.Router()
const buyerController = new Buycontroller()

router.get("/get-buyer/:id",buyerController.get)
router.get("/get-all",buyerController.getAll)
router.delete("/delete-buyer/:id",buyerController.delete)
router.put("/update-password/:id",buyerController.updatePassword)
router.put("/update-info/:id",buyerController.update)
router.get("/get-paginate",buyerController.paginate)
router.post("/login-buyer",buyerController.buyerLogin)
router.post("/register-buyer",buyerController.buyerRegister)
router.get("/total-buyer",buyerController.totalCount)
router.post("/getWithRange",buyerController.getWithRange)
router.post("/search",buyerController.search)

export default router