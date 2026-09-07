import {
  registerAppResource,
  registerAppTool,
  RESOURCE_MIME_TYPE
} from "@modelcontextprotocol/ext-apps/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import cors from "cors";
import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { LABS } from "./exercises.js";

const SERVER_VERSION = "0.2.0";
const UI_URI = "ui://ml-learning-lab/v2.html";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const UI_PATH = path.join(ROOT_DIR, "web", "mcp-app.html");

function readUi(): string {
  return fs.readFileSync(UI_PATH, "utf8");
}

export function createServer(): McpServer {
  const server = new McpServer(
    { name: "ml-learning-lab", version: SERVER_VERSION },
    {
      instructions:
        "Use open_learning_lab for interactive ML practice. Keep math explanations incremental and preserve formula reminders until the learner succeeds consistently."
    }
  );

  server.registerTool(
    "list_learning_labs",
    {
      title: "List learning labs",
      description: "List the interactive machine-learning labs currently available.",
      inputSchema: {},
      outputSchema: {
        labs: z.array(z.object({ id: z.string(), title: z.string(), description: z.string() }))
      },
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false }
    },
    async () => {
      const labs = Object.values(LABS).map(({ id, title, description }) => ({ id, title, description }));
      return {
        structuredContent: { labs },
        content: [{ type: "text" as const, text: `Available labs: ${labs.map((lab) => lab.id).join(", ")}.` }]
      };
    }
  );

  registerAppTool(
    server,
    "open_learning_lab",
    {
      title: "Open interactive learning lab",
      description:
        "Open an interactive machine-learning exercise with live formulas, editable numeric controls, step-by-step calculations, and immediate quiz feedback.",
      inputSchema: {
        labId: z.string().default("linear-regression-loss")
      },
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
      _meta: { ui: { resourceUri: UI_URI } }
    },
    async ({ labId }) => {
      const lab = LABS[labId];
      if (!lab) {
        return {
          content: [{ type: "text" as const, text: `Unknown lab: ${labId}.` }],
          structuredContent: { error: "unknown_lab", labId, available: Object.keys(LABS) },
          isError: true
        };
      }

      return {
        content: [
          {
            type: "text" as const,
            text: `Opened ${lab.title}. The interactive component contains live formulas, editable parameters, calculations, and feedback.`
          }
        ],
        structuredContent: { lab }
      };
    }
  );

  registerAppResource(
    server,
    "ML Learning Lab UI",
    UI_URI,
    { mimeType: RESOURCE_MIME_TYPE, description: "Interactive ML Learning Lab component" },
    async () => ({
      contents: [
        {
          uri: UI_URI,
          mimeType: RESOURCE_MIME_TYPE,
          text: readUi(),
          _meta: {
            ui: {
              prefersBorder: true,
              csp: { connectDomains: [], resourceDomains: [] }
            }
          }
        }
      ]
    })
  );

  return server;
}

async function startStdio(): Promise<void> {
  const server = createServer();
  await server.connect(new StdioServerTransport());
}

async function startHttp(): Promise<void> {
  const app = express();
  const port = Number(process.env.PORT ?? 3000);

  app.use(cors({ origin: true, exposedHeaders: ["Mcp-Session-Id"] }));
  app.use(express.json({ limit: "1mb" }));
  app.get("/health", (_req, res) => res.json({ ok: true, name: "ml-learning-lab", version: SERVER_VERSION }));

  app.get("/", (_req, res) => {
    res.redirect("/playground");
  });

  app.get("/playground", (req, res) => {
    const requested = typeof req.query.lab === "string" ? req.query.lab : "linear-regression-loss";
    const lab = LABS[requested] ?? LABS["linear-regression-loss"];
    const safePayload = JSON.stringify({ lab }).replaceAll("</script", "<\\/script");
    res.type("html").send(`<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${lab.title} — ML Learning Lab</title>
</head>
<body>
<script>window.__ML_LEARNING_LAB_LOCAL__ = ${safePayload};</script>
${readUi()}
</body>
</html>`);
  });

  app.post("/mcp", async (req, res) => {
    const server = createServer();
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    res.on("close", () => {
      void transport.close();
      void server.close();
    });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  });

  app.listen(port, "0.0.0.0", () => {
    console.error(`[ml-learning-lab] Playground: http://localhost:${port}/playground`);
    console.error(`[ml-learning-lab] MCP endpoint: http://localhost:${port}/mcp`);
  });
}

if (process.argv.includes("--stdio")) {
  void startStdio();
} else {
  void startHttp();
}
