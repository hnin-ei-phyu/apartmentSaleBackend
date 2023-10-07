import Buycontroller from "../controllers/buyerController"
import express from "express"
import Auth from "../middleware/auth"

const router = express.Router()
const buyerController = new Buycontroller()
const auth = new Auth()

router.get("/get-buyer/:id",auth.isBuyer,buyerController.get)
router.get("/get-all",buyerController.getAll)
router.delete("/delete-buyer/:id",auth.isBuyer,buyerController.delete)
router.put("/update-password/:id",auth.isBuyer,buyerController.updatePassword)
router.put("/update-info/:id",auth.isBuyer,buyerController.update)
router.get("/get-paginate",buyerController.paginate)
router.post("/login-buyer",auth.isBuyer,buyerController.buyerLogin)
router.post("/register-buyer",buyerController.buyerRegister)
router.get("/total-buyer",buyerController.totalCount)
router.post("/getWithRange",buyerController.getWithRange)
router.post("/search",buyerController.search)

export default router