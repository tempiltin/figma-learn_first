import { TelegramClient } from "telegram";
import dotenv from "dotenv";

import { StringSession } from "telegram/sessions/index.js";
import { Api } from "telegram";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import sendMessagesToFamily from "./sendMessageToFamily.js";
import saveChatData from "./saveChatData.js";
import Chat from "./models/Chat.js";
import Contact from "./models/Contact.js";
dotenv.config();
const apiId = 27801574;
const apiHash = process.env.API_HASH;
const stringSession = new StringSession("1ApWapzMBuzWJ8fJ8gexS5PCOaN5apiXjulxoVtOmLKtl-ZqFnWdrJmH_Sdf69rXDE_VhYEpBeKm0GiJp4pjfcytWWpm9oOCBV3GUUcRxME7bwX77vNlqcZDLvBNuOj_6Z8AZp6CkH0is8YcrM58CGxg7zBWTv-1zyzhTKNlZ7AAedfDUwbBIpAD-DXx-0FPjYod41fk6Lg5KxP52Ns6STCMS8AghTZ8J97k52Rdt_GjCwmZKwpLWVSJ1v0Sc_LNob9kYIXvjZR41cn9yEDghBhEZZmHn4p1dBz4oP7rTQ6B6Jb0q8BxFD-yE48fI1ltG7GAUO15zm4W1yu3zHbINqo8m75rY5pI="); // Sessiya

const dbURI = process.env.MONGOURI; // MongoDB ulanish URI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB ga ulanish amalga oshirildi."))
    .catch(err => console.error("MongoDB ga ulanishda xatolik:", err));

// Set up Express app
const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// Routes for the API


app.get("/api/v1/chats/:chatId", async (req, res) => {
    const { chatId } = req.params;
    try {
        const chat = await Chat.find({ chatId });
        res.json(chat);
    } catch (err) {
        res.status(500).json({ message: "Serverda xatolik yuz berdi", error: err });
    }
});

app.get("/api/v1/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: "Serverda xatolik yuz berdi", error: err });
    }
});

app.get("/api/v1/:username", async (req, res) => {
    const { username } = req.params;
    try {
        const chat = await Chat.find({ username });
        res.json(chat);
    } catch (err) {
        res.status(500).json({ message: "Serverda xatolik yuz berdi", error: err });
    }
});

// Start the server
app.listen(3000, () => {
    console.log("API server 3000-portda ishlayapti...");
});

// Telegram bot functionality
(async () => {
    const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 });

    // Telegram hisobiga ulanish
    await client.start({
        phoneNumber: async () => await input.text("Telefon raqamingizni kiriting: "),
        password: async () => await input.text("Parolingizni kiriting: "),
        phoneCode: async () => await input.text("Tasdiqlash kodini kiriting: "),
        onError: (err) => console.log(err),
    });

    console.log("Telegram hisobingizga ulandik!");
    // Oila a'zolariga xabar yuborish funksiyasi
    sendMessagesToFamily(client);

    // Chat va kontakt ma'lumotlarini saqlash funksiyasi
    saveChatData(client);
})();
