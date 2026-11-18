# Публикация в App Store — пошагово

Вам понадобятся: Mac с Xcode 26+, Node.js 22+, ваш Apple Developer аккаунт.

## 1. Подготовка проекта (один раз)

1. В `capacitor.config.json` замените `appId` на свой bundle id, например
   `com.ВАШЕ_ИМЯ.glossa` (так же, как в ваших двух приложениях).
2. В терминале, в папке проекта:
   ```bash
   npm install
   npm run ios:add       # создаёт папку ios/ и регистрирует типы файлов книг
   npm run ios:assets    # иконка и заставка из assets/
   npm run ios:open      # открывает Xcode
   ```
3. В Xcode: проект **App** → вкладка **Signing & Capabilities** → **Team** = ваша команда.
   **General** → Display Name: `Glossa`, Version `1.0.0`, Build `1`.
4. Запустите на своём iPhone (▶︎) и проверьте:
   - экран согласия появляется **до** первого перевода;
   - «Файлы» → книга (.epub/.pdf/.fb2) → «Поделиться» → Glossa → книга открывается;
   - Словарь → Экспорт → открывается системное меню «Поделиться»;
   - в авиарежиме открываются уже переведённые страницы, приложение не показывает ошибок браузера.
5. После любых изменений в `web/`: `npm run ios:sync`. Папку `ios/` закоммитьте в git.

## 2. App Store Connect

1. **My Apps → + → New App**: iOS, имя `Glossa: Parallel Books`
   (просто «Glossa» в App Store уже занято другими приложениями; запасные варианты —
   `Glossa Reader: Bilingual Books`, `Glossa — книги с переводом`), язык — Русский, ваш bundle id, SKU — любой.
2. **App Privacy → Privacy Policy URL**: ссылка на PRIVACY.md в вашем репозитории, например
   `https://github.com/ВАШ_ЛОГИН/glossa/blob/main/PRIVACY.md`.
3. **Data Collection** — что отвечать. Разработчик ничего не собирает, но текст уходит в Anthropic.
   Честный и безопасный вариант:
   - *Do you or your third-party partners collect data?* → **Yes**
   - **User Content → Other User Content** (текст страниц книги и выбранные слова)
     - Used for: **App Functionality**
     - Linked to user: **No**
     - Tracking: **No**
4. **Age Rating**: всё «None» → 4+.
5. **Category**: Education (дополнительно — Books).

## 3. Описание для страницы в App Store (можно править)

**Подзаголовок:** Книги в оригинале с переводом

**Описание:**
> Читайте книги на иностранном языке — как в двуязычных изданиях: слева оригинал, справа перевод абзац за абзацем.
>
> • Нажмите на слово — перевод именно в этом предложении, начальная форма и грамматика
> • Выделите фразу — перевод всего выражения
> • Идиомы и устойчивые выражения подчёркиваются автоматически
> • Личный словарь с контекстом, карточки для повторения, экспорт в Anki и CSV
> • PDF, EPUB, FB2, TXT — открывайте книги прямо из приложения «Файлы»
> • Любые пары языков: румынский, английский, испанский, французский, немецкий и другие
> • Всё хранится на устройстве, переведённые страницы доступны без интернета
>
> Перевод выполняет ИИ Claude (Anthropic). Нужен ваш собственный ключ Anthropic API — вы платите напрямую Anthropic только за то, что переводите. У приложения нет подписок и своего сервера.

**Ключевые слова:** параллельный перевод,билингва,изучение языков,читалка,словарь,epub,fb2,румынский,anki

## 4. Notes for App Review (вставить в поле «Notes», по-английски)

```
Glossa is an offline-first e-reader for language learners. Users import
their own books (PDF/EPUB/FB2/TXT, also via the Files app "Open in…"), read them
offline, save words to a local vocabulary with flashcards, and export it via the
share sheet.

Translation uses Anthropic's Claude API with the user's OWN API key
(bring-your-own-key). The app has no backend, accounts or in-app purchases; the
user pays Anthropic directly. Before any data is sent, the app shows a consent
screen naming Anthropic, PBC and listing exactly what is sent
(guideline 5.1.2(i)); consent can be withdrawn in Settings.

For review, a test API key with credit is provided below — paste it into
Settings (⚙︎) → API key. Steps: open the bundled sample book → the consent
screen appears → Allow → the page is translated → tap any word.

Test API key: sk-ant-...   (revoke it after review)
```

**Важно:** без ключа проверяющий не увидит перевод и может отклонить приложение как нерабочее.
Создайте отдельный ключ с небольшим лимитом расходов (console.anthropic.com → Limits),
вставьте его в Notes и удалите после одобрения.

Для проверки удобно, чтобы в сборке была книга-пример. Положите в `web/books/` текст,
который вы вправе распространять (например, классику из общественного достояния),
и пропишите его в `web/books/index.json`.

## 5. Загрузка

Xcode → Product → **Archive** → Distribute App → App Store Connect → Upload.
Затем в App Store Connect выберите сборку, заполните скриншоты (iPhone 6.9" обязательно)
и нажмите **Add for Review**.

## Возможные причины отказа и что делать

| Причина | Что сделать |
|---|---|
| 4.2 «просто сайт» | В Notes перечислите возможности iOS: открытие из «Файлов», меню «Поделиться», работа офлайн, локальное хранение. При необходимости добавим виджет «слово дня» или напоминания о повторении. |
| 5.1.1 / 5.1.2 согласие на ИИ | Убедитесь, что экран согласия виден до первого запроса; приложите скриншот экрана в ответе. |
| 2.1 не работает | Проверьте, что тестовый ключ в Notes активен и на нём есть деньги. |
| 3.1.1 платёжная система | Ответьте: в приложении нет платного контента, пользователь использует собственный ключ стороннего API. |
