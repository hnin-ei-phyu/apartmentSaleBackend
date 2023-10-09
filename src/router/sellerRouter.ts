import SellerController from "../controllers/sellerController"
import express from "express"
// import Auth from "../middleware/auth"
const router = express.Router()
const sellerController = new SellerController()
// const auth = new Auth()

router.get("/get-seller/:id",sellerController.get)
router.get("/get-all",sellerController.getAll)
router.delete("/delete-seller/:id",sellerController.delete)
router.put("/update-password/:id",sellerController.updatePassword)
router.put("/update-info/:id",sellerController.update)
router.get("/get-paginate",sellerController.paginate)
router.post("/login-seller",sellerController.sellerLogin)
router.post("/register-seller",sellerController.sellerRegister)
router.get("/total-seller",sellerController.totalCount)
router.post("/getWithRange",sellerController.getWithRange)
router.post("/search",sellerController.search)

export default router