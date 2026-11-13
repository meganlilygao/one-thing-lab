# Notes for Claude Code

- React 18 + Vite. Single component in `src/App.jsx`; styles in `src/styles.css`.
- `renderVals()` builds all view data; `render()` reads it as `v`. Settings live in `state.cfg`; defaults in `defaults()`, options in `schema()`, presets in `presetList()`.
- Themes are CSS classes `th-*` on the prototype root that set CSS custom properties; most settings map to root classes (see `rootCls`).
- Coach replies are scripted: `coachFor()` and `classify()`.
- Copy rules: plain, goal-led, sentence case body, Title Case buttons. Use made-up data only. Never show individual responses or quoted/attributed comments; respect the 5-response minimum.
