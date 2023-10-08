import AuthController from "../controllers/authController"
import express from "express"
const router = express.Router()
const authController = new AuthController()

router.get("/is-Admin",authController.isAdmin)
router.get("/is-Buyer",authController.isBuyer)
router.get("/is-Seller",authController.isSeller)
router.get("/is-auth",authController.isAuth)

export default router