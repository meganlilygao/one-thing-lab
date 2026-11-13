# One thing lab

An interactive prototype of a "one thing at a time" AI coach chat for Perceptyx managers, with a live **Interface lab** settings window for exploring visual and interaction options.

Demo scenario (made-up data): Dana, manager of Customer Success West, 14 survey responses, career growth at 52%.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

```bash
npm run build     # production build into dist/
npm run preview   # serve the build locally
```

## What's in it

- **One thing flow**: one large coach reply at a time; every tap or typed message becomes a chat bubble above it.
- **History**: hidden by default, reachable from the left edge, a docked bar, dots, a side timeline or a button.
- **Pinning**: pin result, theme and plan cards to a Board drawer, a tray above the input, or a side column.
- **Interface lab** (right window): theme palettes (Obsidian, Mist, Peach Bloom, Lavender Haze, Rose Quartz, Prism, Opal, Tropic, Neon Dusk), orb, message, card, bubble, history, pinning, input and atmosphere settings, plus presets.
- **Scripted replies**: the coach uses keyword-matched, scripted answers. No live AI or real data.

## Privacy rules the prototype follows

- No individual responses; results shown only above a 5-response minimum.
- Comments are paraphrased and grouped, never quoted or attributed.

## Project layout

```
src/App.jsx      prototype logic and markup (one React class component)
src/styles.css   all styles, themes and settings classes
design/          original Design canvas source, for reference
```
