import { Schema, model } from "mongoose";

const fileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    file: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Files = model("File", fileSchema)
export default Files