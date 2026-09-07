# Local playground

ML Learning Lab can be used locally without deploying an MCP server to the public internet.

## Option A — local development server

```bash
npm install
npm run playground
```

Open:

- `http://localhost:3000/playground`
- MCP remains available locally at `http://localhost:3000/mcp`.

The playground runs the same widget and the same exercise definitions as the ChatGPT app.

## Option B — standalone HTML

```bash
npm install
npm run playground:export
```

Open `dist/linear-regression-loss.html` directly in Safari, Chrome, or Firefox. No remote server and no ChatGPT connection are needed after the file has been generated.

## ChatGPT is different

The local playground and ChatGPT integration are separate concerns. ChatGPT does not connect directly to `localhost` MCP endpoints. For testing inside ChatGPT, use a supported secure MCP tunnel or another remote HTTPS endpoint.
