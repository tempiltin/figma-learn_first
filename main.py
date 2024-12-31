from telethon.sync import TelegramClient
from telethon.sessions import StringSession

# Telegram API ma'lumotlari
api_id = 27801574  # my.telegram.org orqali olingan API ID
api_hash = '8a001e7f720ce54edb810050f15c3c48'  # my.telegram.org orqali olingan API Hash
session_name = 'session_name'  # Sessiya faylining nomi

# TelegramClient obyekti bilan ishlash
with TelegramClient(StringSession(), api_id, api_hash) as client:
    if client.is_user_authorized():
        print("Sessiya muvaffaqiyatli yangilandi!")
    else:
        print("Sessiya yangilanishi uchun login qilish talab etiladi.")
        phone_number = input("Telefon raqamingizni kiriting (masalan: +998901234567): ")
        client.send_code_request(phone_number)  # Kod yuboriladi
        code = input("Telefoningizga kelgan kodni kiriting: ")
        try:
            client.sign_in(phone_number, code)
            print("Sessiya muvaffaqiyatli yaratildi!")
        except Exception as e:
            print(f"Xatolik yuz berdi: {e}")

    # StringSession qiymatini chop etish
    string_session = StringSession.save(client.session)
    print(f"StringSession: \"{string_session}\"")
