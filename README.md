# MCP Weather Server

A Model Context Protocol (MCP) server that exposes weather tools to AI clients such as Claude Desktop.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)

## Technologies

- **TypeScript** — statically typed JavaScript
- **Node.js** — runtime (ES modules)
- **MCP SDK** (`@modelcontextprotocol/sdk`) — framework for building MCP servers
- **Zod** — schema validation and type inference for tool inputs
- **pnpm** — package manager
- **Open-Meteo API** — free weather & geocoding API (no API key required)

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| `@modelcontextprotocol/sdk` | ^1.27.1 | MCP server/transport primitives |
| `zod` | ^4.3.6 | Input schema validation |

## How it works

The server runs over **stdio transport**, meaning an MCP host (e.g. Claude Desktop) spawns the process and communicates through stdin/stdout.

Tools registered:
- `fetch-weather` — fetches real-time weather for a given city using the [Open-Meteo](https://open-meteo.com/) geocoding and forecast APIs

## Usage

Install dependencies:
```bash
pnpm install
```

Run the server:
```bash
npx tsx main.ts
```

## Debugging with MCP Inspector

The [MCP Inspector](https://github.com/modelcontextprotocol/inspector) lets you test and debug your MCP server interactively in a browser UI without needing a full AI client.

Run the inspector pointing at your server:
```bash
npx @modelcontextprotocol/inspector npx tsx main.ts
```

This will open a local web UI (usually at `http://localhost:5173`) where you can:
- Browse available tools
- Call `fetch-weather` with a city name and inspect the raw response
- View logs and errors in real time
