import AuthController from "../controllers/authController"
import express from "express"
const router = express.Router()
const authController = new AuthController()

router.post("/register-admin",authController.adminRegister)
router.get("/login-admin",authController.adminLogin)
router.post("/register-buyer",authController.buyerRegister)
router.get("/login-buyer",authController.buyerLogin)
router.post("/register-seller",authController.sellerRegiseter)
router.get("/login-seller",authController.sellerLogin)

export default router