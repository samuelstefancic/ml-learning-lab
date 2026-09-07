# ML Learning Lab

Reusable interactive machine-learning labs for ChatGPT and Codex.

## What is implemented in v0.2.0

- Linear regression / loss lab.
- Live graph, formula, raw dataset, substitutions, residuals, MSE and RMSE.
- Weight and bias can be changed with synchronized sliders **or direct numeric entry**.
- Numeric inputs use the exact entered value; no hidden preset buckets.
- Decimal input is supported, including the outlier mission (`step = 0.1`).
- Objective success explanations are split into readable calculation steps.
- Quiz feedback is semantic **green for correct** and **red for incorrect**, with a concept reminder after every choice.
- Lab definitions are data-driven in `src/exercises.ts`, so new subjects can reuse the same UI engine.

## Plugin layout

- `.codex-plugin/plugin.json` — plugin manifest.
- `skills/ml-learning-lab/SKILL.md` — teaching workflow and behavior.
- `.mcp.json` — bundled stdio MCP server for local/Codex use.
- `src/server.ts` — MCP tools + UI resource + HTTP/stdio entrypoints.
- `src/exercises.ts` — lab definitions.
- `src/math.ts` — reusable math helpers.
- `web/mcp-app.html` — generic interactive MCP App UI.
- `tests/` — calculation tests.

## Install and verify

```bash
npm install
npm run check
```

Run the local playground and MCP endpoint together:

```bash
npm run playground
# Playground: http://localhost:3000/playground
# MCP endpoint: http://localhost:3000/mcp
```

Export a standalone playground that can be opened directly in a browser with no remote server:

```bash
npm run playground:export
# Open dist/linear-regression-loss.html
```

Or run the bundled MCP server over stdio:

```bash
npm run start:stdio
```

## Local-first playground

The interactive learning experience does **not** require ChatGPT or a remote server. See `docs/LOCAL_PLAYGROUND.md`.

## ChatGPT developer-mode testing

ChatGPT requires an MCP server connection. Deploy or expose the HTTP server at a stable HTTPS URL ending in `/mcp`, register it in ChatGPT Developer Mode, then map the resulting `plugin_asdk_app...` technical ID through `.app.json` when packaging for a ChatGPT-local marketplace.

The source package deliberately does **not** contain a fake `.app.json` ID: that identifier is created only after registering the actual server connection.

## Add another lab later

Add a lab spec to `src/exercises.ts` and register it in `LABS`. Reuse existing mission kinds where possible. New mission types should be implemented once in `web/mcp-app.html`, then become available to every future lab definition.
