<p align="center"><img src="web/icons/icon-192.png" width="96" alt=""></p>

<h1 align="center">Glossa</h1>

<p align="center"><i>glossa</i> — the translation written in the margin of old manuscripts.<br>Read books in the original with a parallel translation, instant word lookups and a personal vocabulary.<br>Any language pair. Offline-first. No server.</p>

---

Like the bilingual editions in bookshops — original text on the left, translation on the right — but
for **any book you own**, in **any language pair** (Romanian → Russian, English → Spanish, …).

## Features

- **Parallel reading** — paragraph-aligned translation next to the original; or hide it and reveal on tap for self-testing.
- **Tap a word** — translation *in this context*, dictionary form, part of speech, grammar note (tense, case, clitics…), pronunciation.
- **Select a phrase** — translation of the whole expression.
- **Idioms highlighted automatically** — set expressions and collocations are underlined, tap to see their meaning.
- **Personal vocabulary** — saved with the sentence where you met the word; saved words are highlighted throughout every book; flashcards; export to CSV / Anki; JSON backup & restore.
- **Formats** — PDF (with a text layer), EPUB, FB2, TXT.
- **Offline-first** — books, translations and vocabulary live on the device; every page is translated once and cached.
- **iOS app** — open books from the Files app (“Open in… → Glossa”), share exports through the system share sheet, haptics.

Translation is done by [Claude](https://www.anthropic.com/claude) through the **user's own Anthropic API key**
(bring-your-own-key). Quality presets: *Fast* (Claude Haiku), *Standard* (Claude Sonnet), *Literary* (Claude Opus).

## Privacy

There is no backend. Data goes from the device directly to Anthropic, only after explicit consent,
and only what is needed to translate (the current page, selected words with their sentence, title/author).
See [PRIVACY.md](PRIVACY.md).

## Run the web app

Requires Node.js 22+.

```bash
npm install
npm run serve        # http://localhost:8080
```

Open ⚙︎ → paste an API key from [console.anthropic.com](https://console.anthropic.com) → *Check*.

The web app is a PWA: install it from the browser menu (desktop, Android, iOS “Add to Home Screen”).
Pushing to `main` deploys it to GitHub Pages via `.github/workflows/pages.yml`
(enable *Settings → Pages → Source: GitHub Actions* once).

## Build the iOS app

Requires macOS, Xcode 26+, Node.js 22+. Set your bundle id in `capacitor.config.json` (`appId`) first.

```bash
npm install
npm run ios:add      # creates ios/ and registers book file types
npm run ios:assets   # app icon & splash from assets/
npm run ios:open     # opens Xcode → select your Team → Run / Archive
```

After changing anything in `web/`: `npm run ios:sync`.

## Project layout

```
web/                 the whole app (single-file index.html, service worker, manifest, icons)
web/books/           optional built-in books (git-ignored; see web/books/README.md)
scripts/vendor.mjs   copies pdf.js, JSZip and fonts into web/vendor for offline use
scripts/ios-setup.mjs registers PDF/EPUB/FB2/TXT document types in Info.plist
assets/              icon & splash sources for @capacitor/assets
docs/                App Store submission notes
```

## Books & copyright

The repository ships **no books**. Import your own files; only add texts to `web/books/`
that you have the right to distribute.

## License

[MIT](LICENSE)
