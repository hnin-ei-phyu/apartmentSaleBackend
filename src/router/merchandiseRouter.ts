import MerchandiseController from "../controllers/merchandiseController";
import express from "express"
const router = express.Router()
const merchandiseController = new MerchandiseController()

router.post("/create-merchandise",merchandiseController.create)
router.put("/update-merchandise/:id",merchandiseController.update)
router.get("/get-merchandise/:id",merchandiseController.get)
router.get("/get-all",merchandiseController.getAll)
router.get("/get-paginate",merchandiseController.paginate)
router.delete("/delete-merchandise/:id",merchandiseController.delete)

export default router