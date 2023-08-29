import Buycontroller from "../controllers/buyerController"
import express from "express"
const router = express.Router()
const buyerController = new Buycontroller()

router.get("/get-buyer/:id",buyerController.get)
router.get("/get-all",buyerController.getAll)
router.delete("/delete-buyer",buyerController.delete)
router.put("/update-password/:id",buyerController.updatePassword)
router.put("/update-info/:id",buyerController.update)
router.get("/get-paginate",buyerController.paginate)

export default router