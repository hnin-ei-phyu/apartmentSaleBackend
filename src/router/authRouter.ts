import AuthController from "../controllers/authController"
import express from "express"
const router = express.Router()
const authController = new AuthController()

router.post("/is-Admin",authController.isAdmin)
router.get("/is-Buyer",authController.isBuyer)
router.post("/is-Seller",authController.isSeller)

export default router