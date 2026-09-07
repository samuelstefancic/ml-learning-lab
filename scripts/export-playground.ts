import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LABS } from "../src/exercises.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const ui = fs.readFileSync(path.join(root, "web", "mcp-app.html"), "utf8");
const outDir = path.join(root, "dist");
fs.mkdirSync(outDir, { recursive: true });

for (const lab of Object.values(LABS)) {
  const payload = JSON.stringify({ lab }).replaceAll("</script", "<\\/script");
  const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${lab.title} — ML Learning Lab</title>
</head>
<body>
<script>window.__ML_LEARNING_LAB_LOCAL__ = ${payload};</script>
${ui}
</body>
</html>`;
  fs.writeFileSync(path.join(outDir, `${lab.id}.html`), html, "utf8");
}

console.log(`Standalone playground exported to ${path.join(outDir, "linear-regression-loss.html")}`);
