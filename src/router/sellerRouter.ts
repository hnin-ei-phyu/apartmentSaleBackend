import SellerController from "../controllers/sellerController"
import express from "express"
import Auth from "../middleware/auth"
const router = express.Router()
const sellerController = new SellerController()
const auth = new Auth()

router.get("/get-seller/:id",auth.isSeller,sellerController.get)
router.get("/get-all",auth.isSeller,sellerController.getAll)
router.delete("/delete-seller/:id",auth.isSeller,sellerController.delete)
router.put("/update-password/:id",auth.isSeller,sellerController.updatePassword)
router.put("/update-info/:id",auth.isSeller,sellerController.update)
router.get("/get-paginate",auth.isSeller,sellerController.paginate)

export default router