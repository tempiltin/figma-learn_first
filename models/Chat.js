import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    chatId: { type: Number, required: true },
    userId: { type: Number, required: true },
    username: { type: String },
    messageId: { type: Number, required: true },
    text: { type: String },
    date: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model("Chat", chatSchema);
