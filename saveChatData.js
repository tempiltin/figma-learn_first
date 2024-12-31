import Contact from "./models/Contact.js";
import Chat from "./models/Chat.js";

export default async function saveChatData(client) {
    const dialogs = await client.getDialogs();

    for (const dialog of dialogs) {
        if (dialog.isUser) {
            const user = dialog.entity;
            const messages = await client.getMessages(dialog.id, { limit: 10 });

            // Kontaktlarni yangilash yoki qo'shish
            if (user.phone) {
                await Contact.updateOne(
                    { userId: user.id },
                    { username: user.username, phone: user.phone },
                    { upsert: true }
                );
            }

            // Chat ma'lumotlarini yangilash
            for (const msg of messages) {
                await Chat.create({
                    chatId: dialog.id,
                    userId: user.id,
                    username: user.username,
                    messageId: msg.id,
                    text: msg.message,
                    date: new Date(msg.date * 1000),
                });
            }
        }
    }

    console.log("Ma'lumotlar MongoDB bazasiga saqlandi.");
}
