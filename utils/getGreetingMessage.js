export default function getGreetingMessage() {
  const messages = [
    "Assalomu alaykum! Yangi haftaning boshlanishi sizga omad, quvonch va yangi imkoniyatlar olib kelsin! 🌅 Bugungi ishlaringiz barakali va sermahsul bo'lishini tilaymiz.",
    "Assalomu alaykum! Serquyosh seshanba kuni bilan! 🌞 Bugun siz uchun yangi bilimlar eshigi ochilib, barcha maqsadlaringizga erishishingizni tilaymiz.",
    "Assalomu alaykum! Hayirli chorshanba kuni muborak bo'lsin! 🌟 Yarim haftaning bu ajoyib kunida kuch-g'ayratingiz ortib, barcha rejalaringiz amalga oshsin!",
    "Assalomu alaykum! Hayirli payshanba! ✨ Haftaning yakuniga yaqinlashar ekan, bugun sizni muvaffaqiyatli va quvonchli voqealar kutayotganiga ishonamiz.",
    "Assalomu alaykum! Juma muborak aziz do'stim! 🕌 Bugungi kuningiz ibodat, rahmat va baraka bilan to'lsin! Yaqinlaringizga yaxshi tilaklar bildirishni unutmang.",
    "Assalomu alaykum! Shanba kuningiz maroqli va baxtiyor o'tsin! 🎉 Dam olish vaqtingizni oilangiz, do'stlaringiz bilan mazmunli o'tkazing.",
    "Assalomu alaykum! Yakshanba kuningiz mazmunli va samarali o'tsin! 🌺 Bugungi dam olish sizga yangi hafta uchun kuch-g'ayrat bersin!",
  ];

  const today = new Date();
  const dayOfWeek = today.getDay(); // 0: Yakshanba, 1: Dushanba, ..., 6: Shanba
  return messages[dayOfWeek % messages.length]; // Har kuni boshqa xabar
}
