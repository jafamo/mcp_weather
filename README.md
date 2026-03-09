# MCP Weather Server

A Model Context Protocol (MCP) server that exposes weather tools to AI clients such as Claude Desktop.

## Technologies

- **TypeScript** — statically typed JavaScript
- **Node.js** — runtime (ES modules)
- **MCP SDK** (`@modelcontextprotocol/sdk`) — framework for building MCP servers
- **Zod** — schema validation and type inference for tool inputs
- **pnpm** — package manager

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| `@modelcontextprotocol/sdk` | ^1.27.1 | MCP server/transport primitives |
| `zod` | ^4.3.6 | Input schema validation |

## How it works

The server runs over **stdio transport**, meaning an MCP host (e.g. Claude Desktop) spawns the process and communicates through stdin/stdout.

Tools registered:
- `fetch-weather` — returns the weather for a given city name

## Usage

Install dependencies:
```bash
pnpm install
```

Run the server:
```bash
npx tsx main.ts
```
