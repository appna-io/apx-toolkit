# apx-toolkit

[![Apx Toolkit](https://img.shields.io/badge/apx-toolkit-blue.svg)](https://github.com/appna-io/apx-toolkit)
[![AppNA.io](https://img.shields.io/badge/appna.io--UX/UI-orange.svg)](https://appna.io)
[![apx-ui](https://img.shields.io/badge/tag-apx--ui-purple.svg)](https://github.com/appna-io/apx-toolkit)

Monorepo for **`@apx-ui/toolkit`** — the universal web utility SDK for AppNA frontend applications — and the interactive playground that documents it.

```
package/   → the published library (@apx-ui/toolkit). Zero runtime dependencies.
demo/      → the playground app. React + Vite + Tailwind, never published.
```

The demo imports the library by its npm name (`@apx-ui/toolkit`), aliased in [vite.config.ts](vite.config.ts) to `package/src`. It therefore behaves exactly like a real install while staying in-repo — every edit to the library hot-reloads straight into the playground.

## Getting started

```bash
npm install     # installs both workspaces
npm run dev     # playground at http://localhost:5173
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Playground with hot reload against the library source |
| `npm run build` | Builds the library, then type-checks and builds the demo |
| `npm run build:lib` | Library only — ESM + CJS + declarations via tsup |
| `npm run build:demo` | Demo only, into `dist/` |
| `npm run test` | Jest suite for the library |
| `npm run lint` / `lint:fix` | ESLint over `package/src` |
| `npm run typecheck` | `tsc --noEmit` across the workspaces |

## Publishing

Only `package/` is published. The root is a private workspace.

```bash
npm publish -w @apx-ui/toolkit
```

`prepublishOnly` cleans and rebuilds, so `dist/` is always regenerated from source at publish time.

## The playground

Each page in the demo is a list of declarative specs — see [demo/src/lib/api.ts](demo/src/lib/api.ts). A spec declares its arguments and calls the real export; the card derives *both* the live result and the code snippet from the same argument values, so the code shown is always the code that ran.

The **Settings** page writes straight into `config()` — the real `ApxContext` — so changing language, region or currency there visibly rewrites the output of every context-aware formatter in the app.

Adding a new utility to the playground means adding one entry to the matching file in [demo/src/demos/](demo/src/demos/); the card, inputs, result rendering and snippet all follow from it.

## License

ISC © AppNA UX Team
