import express from "express"
import bodyParser from "body-parser"
import fileUpload from "express-fileupload"
import validator from "express-validator"
import application from "../constants/application"
import AdminRouter from "../router/adminRouter"
import BuyerRouter from "../router/buyerRouter"
import SellerRouter from "../router/sellerRouter"
import NotificationRouter from "../router/notificationRouter"
import AuthRouter from "../router/authRouter"
import MerchandiseRouter from "../router/merchandiseRouter"

const app: express.Application = express()
const configs: any[] = [
    {
        name: "Access-Control-Allow-Origin",
        val: "*",
    },
    {
        name: "Access-Control-Allow-Methods",
        val: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    },
    {
        name: "Access-Control-Allow-Headers",
        val: "Origin, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,Content-Type, Date, X-Api-Version, x-access-token",
    },
]

app.use(bodyParser.json())
app.use(fileUpload({createParentPath:true}))
app.use(validator())

app.use(function (req, res, next) {
    res.set("Access-Control-Allow-Origin", "*")
    res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
    res.set("Access-Control-Allow-Headers", "Origin, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,Content-Type, Date, X-Api-Version, x-access-token")

    next()
})

//router 
app.use("/api/admin",AdminRouter)
app.use("/api/buyer",BuyerRouter)
app.use("/api/seller",SellerRouter)
app.use("/api/notification",NotificationRouter)
app.use("/api/auth",AuthRouter)
app.use("/api/merchandise",MerchandiseRouter)

export default app 