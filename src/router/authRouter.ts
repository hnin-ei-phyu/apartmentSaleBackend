import Auth from "../middleware/auth"
import express from "express"
const router = express.Router()
const auth = new Auth()

router.post("/register-admin",auth.adminRegister)
router.get("/login-admin",auth.adminLogin)
router.post("/register-buyer",auth.buyerRegister)
router.get("/login-buyer",auth.buyerLogin)
router.post("/register-seller",auth.sellerRegiseter)
router.get("/login-seller",auth.sellerLogin)

export default router