import AdminController from "../controllers/adminController"
import express from "express"
import Auth from "../middleware/auth"

const router = express.Router()
const adminController = new AdminController()
const auth = new Auth()

router.get("/get-admin/:id",auth.isAdmin,adminController.get)
router.get("/get-all",auth.isAdmin,adminController.getAll)
router.delete("/delete-admin/:id",auth.isAdmin,adminController.delete)
router.put("/update-password/:id",auth.isAdmin,adminController.updatePassword)
router.put("/update-info/:id",auth.isAdmin,adminController.update)
router.get("/get-paginate",adminController.paginate)
router.post("/register-admin",adminController.adminRegister)
router.post("/login-admin",auth.isAdmin,adminController.adminLogin)
router.get("/total-admin",adminController.totalCount)
router.post("/getWithRange",adminController.getWithRange)
router.get("/search",adminController.search)

export default router