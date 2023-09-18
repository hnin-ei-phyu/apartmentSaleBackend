import AdminController from "../controllers/adminController"
import express from "express"
const router = express.Router()
const adminController = new AdminController()

router.get("/get-admin/:id",adminController.get)
router.get("/get-all",adminController.getAll)
router.delete("/delete-admin/:id",adminController.delete)
router.put("/update-password/:id",adminController.updatePassword)
router.put("/update-info/:id",adminController.update)
router.get("/get-paginate",adminController.paginate)
router.post("/register-admin",adminController.adminRegister)
router.post("/login-admin",adminController.adminLogin)
router.get("/total-admin",adminController.totalCount)
router.post("/getWithRange",adminController.getWithRange)
router.post("/search",adminController.search)

export default router