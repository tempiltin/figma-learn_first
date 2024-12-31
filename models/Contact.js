import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    userId: { type: Number, required: true, unique: true },
    username: { type: String },
    phone: { type: String },
}, { timestamps: true });

export default mongoose.model("Contact", contactSchema);
