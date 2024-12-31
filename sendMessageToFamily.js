import schedule from "node-schedule";
import getGreetingMessage from "./utils/getGreetingMessage.js";

export default function sendMessagesToFamily(client) {
    const familyChats = [
        "5298461747", //ayam
        "1252953082",// dadam 
        "532460566",// Nargiza opam
        "885886159",// Mirjalol aka
        "1226840968",// Guli opam
        "6598062131",//Baxtigul opam
        "1099964340",//Jamolik
        "756575492",// James bond
        "885837778",// Sardor IT
        "1498309965",//Ilmu tolib
        "1852694599",//Qamar
        "1148618999",//Farhod akam
        "6199180926",//Adiba yangam
        "6793739523",//Dinora
        "6336897067",//ishxona
        "1439408149",//Dilshoda
        "80649275", //Odil domla
        






    ];

    // Har kuni 6:00 da tabrik yuborish
    schedule.scheduleJob("0 6 * * *", async () => {
        const message = getGreetingMessage(); // Har kuni yangi tabrik
        for (const chat of familyChats) {
            await client.sendMessage(chat, { message });
        }
        console.log("Har kungi tabrik yuborildi.");
    });

    // Har juma 7:00 da maxsus tabrik
    schedule.scheduleJob("0 7 * * 5", async () => {
        const message = "Juma ayyomingiz muborak bo'lsin! Bugungi kuningiz xayrli va barokatli bo'lsin!";
        for (const chat of familyChats) {
            await client.sendMessage(chat, { message });
        }
        console.log("Juma tabrigi yuborildi.");
    });
}
