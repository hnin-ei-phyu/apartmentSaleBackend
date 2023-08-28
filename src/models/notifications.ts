import { Schema, model } from "mongoose"
const notiSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)
const Notification = model("Notification",notiSchema)
export default Notification