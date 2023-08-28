import mongoose, { mongo } from "mongoose"
import app from "./config/express"
import application from "./constants/application"

const databaseUri = application.env.dtabaseUri
const port = application.env.serverPort 

mongoose.set("strictQuery", false);
mongoose
        .connect(databaseUri)
        .then((result) => {
            console.log(`Connected to database at: ${databaseUri}`)

            //Listen express server 
            app.listen(port, () => {
                console.log(`Server is listening on port ${port}`)
            })
        }).catch((err) => {
            console.log(`Database connection failed with err: ${err}`)
        });