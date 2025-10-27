# LobbyX Scrapper
## Як користуватись?
1. Йдемо на [сторінку релізів](https://github.com/kolos7720/lobbyx-scrapper-chrome-extension/releases).<br>
2. Скачуємо "lobbyx-scrapper.zip" з останнього релізу.<br>
3. Розпаковуємо десь його собі.<br>
4. Встановлюємо за цією [інструкцією](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked).<br>
5. Переходимо на сторінку налаштувань.<br>
<img width="577" height="455" alt="Screenshot 2025-10-27 at 18 47 21" src="https://github.com/user-attachments/assets/7f9c6657-2b75-402c-803c-85426c7d4957" /><br>
6. Вводимо дані.<br>
   WebHook URL - ендпоінт куди будуть віддаватись дані. В нашому випадку це автоматизація NetHunt. Тіло запиту буде відповідати типу [Application](https://github.com/kolos7720/lobbyx-scrapper-chrome-extension/blob/main/src/types.ts).<br>
   Vacancies URLs - список вакансій з яких будемо збирати заявки кандидатів.<br>
<img width="802" height="557" alt="Screenshot 2025-10-27 at 18 49 08" src="https://github.com/user-attachments/assets/bebaef37-ea9c-40de-9f90-5bc794b8b040" /><br>
Зберігаємо.<br>
9. Відкриваємо бічну панель (Ctrl/Command + Shift + L).<br>
<img width="430" height="491" alt="Screenshot 2025-10-27 at 20 11 28" src="https://github.com/user-attachments/assets/37e4f5e9-3433-4971-9ffd-48f8591a7ed2" /><br>
10. Натискаємо "Start"<br><img width="399" height="896" alt="Screenshot 2025-10-27 at 20 30 55" src="https://github.com/user-attachments/assets/7e4dc987-b135-4e36-a60c-2d9eceb4b0d1" />

## Логіка роботи
Розширення проходиться по вказаних в налаштуваннях вакансіях і "збирає" кандидатів. А точніше парсить сторінку, знаходить заявку від кандидата, віддає її дані (так, кожна заяка окремий запит) методом POST на вказаний ендпоінт (WebHook URL). Коли дані відправлені заявка помічається тегом "scrapped".<br>
Розширення саме працює з пагінацією, не потрібно вказувати в налаштуваннях всі сторінки вакансії, лише першу.<br>
Парсинг сторінки відбувається допоки не будуть оброблені всі заявки в вакансії або допоки на сторінці не зустрінеться тег "scrapped", в такому випадку вважається, що попердні канидати оброблені і можна перейти до наступної сторінки/вакансії.

## Дисклеймер
Парсинг сторінок далеко не сама надійна річ. Можна навіть впевпнено назвати це "костиль".<br>
Якщо розробники LobbyX змінять щось в структурі сторінок, це може вплинути на роботу. Навряд станеться щось критичне, але все ж надіюсь, що ви це розумієте.<br>
Тому думайТЕ!
