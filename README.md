<p align="center">
  <img src="assets/cover.png" width="360" alt="蛋糕工坊 cover">
</p>

<h1 align="center">Cake Workshop · 蛋糕工坊</h1>

<p align="center">
  <strong>Craft a cake. Hide a little feeling. Slice open a surprise.</strong><br>
  做一块蛋糕，把一份心意藏进去。
</p>

<p align="center">
  A playful, mobile-first Canvas web experience for creating a cake, hiding a message or a memory, and revealing it through a small ritual.
</p>

## Why this project

Cake Workshop is a small interactive story rather than a conventional cake editor. The experience follows a deliberate emotional arc:

```
make a cake → hide a message or photo → slice it open → reveal → share
```

It is built to feel tactile on a phone, light enough for a mini-tool environment, and polished enough to share as a gift.

## Highlights

- **Make it yours** — five cake shapes, three flavours, cream, piping, borders, and twelve illustrated toppings.
- **Touch-first interaction** — draw cream, place or move toppings, erase, undo/redo, pinch to zoom, and adjust the viewing angle.
- **A private reveal** — write a message, draw a reviewed surprise, or place a photo; the content appears only after the cake is sliced.
- **Shareable ending** — create a gift-video sequence with box opening, confetti, slicing, and the reveal; publish the finished image as a Xiaohongshu photo note.
- **Cake Cabinet** — completed works are stored locally and can be revisited, reshared, remixed, or removed.
- **Offline-first** — no backend, no CDN, and no external runtime dependencies.

## Try it locally

```bash
git clone https://github.com/xuanyiwu126/cake-workshop.git
cd cake-workshop
python3 -m http.server 8000
```

Then open <http://localhost:8000>. For mobile testing, use the computer's LAN IP on the same Wi-Fi network instead of opening the HTML file directly.

## Build for Xiaohongshu Mini Tool

The upload-ready package is already available at:

[dist/cake-workshop-v27-xhs.zip](dist/cake-workshop-v27-xhs.zip)

Its root contains only:

```text
index.html
styles.css
app.js
```

To rebuild:

```bash
zip -j dist/cake-workshop-v27-xhs.zip index.html styles.css app.js
unzip -t dist/cake-workshop-v27-xhs.zip
```

## Project structure

```text
.
├── index.html
├── styles.css
├── app.js
├── assets/cover.png
├── data/final-random-quotes-v27.json
├── docs/VERSION_HISTORY.md
└── dist/cake-workshop-v27-xhs.zip
```

## Technical notes

- Vanilla HTML, CSS, and JavaScript; no build step required.
- Canvas 2D rendering with Pointer Events and touch fallbacks.
- Export uses `canvas.captureStream(30)` and `MediaRecorder` when the host supports them.
- Photo-mode export is 1440 × 2560; text and surprise exports are 1080 × 1920.
- Drafts, original photos, and Cake Cabinet items remain in the browser's local storage / IndexedDB. Nothing is uploaded by the web app itself.

## Privacy and compatibility

The app does not send creation data to a server. Clearing browser site data removes locally saved drafts and cabinet items. Video recording support varies by WebView; image-note publishing remains available when video export is unavailable.

## Resume-ready summary

**Cake Workshop** — Designed and built a mobile-first interactive Canvas experience that combines tactile cake decoration, hidden-message storytelling, touch gestures, local persistence, and shareable video/image export for Xiaohongshu-style mini-tool environments.

## License

[MIT](LICENSE) © 2026 Xuanyi Wu
