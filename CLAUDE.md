# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Install dependencies:
```bash
pnpm install
```

Run the server:
```bash
npx tsx main.ts
```

Debug interactively with MCP Inspector:
```bash
npx @modelcontextprotocol/inspector npx tsx main.ts
```

## GitHub

Repository: `https://github.com/jafamo/mcp_weather`

To grant push access, configure the remote with a personal access token:
```bash
git remote set-url origin https://TOKEN@github.com/jafamo/mcp_weather.git
```

`gh` CLI is not installed on this machine — use the GitHub API via curl or configure the remote URL with a token as above.

## Architecture

This is a minimal **MCP (Model Context Protocol) server** that exposes weather tools to AI clients.

- **`main.ts`** — the entire server implementation in a single file
- Uses `StdioServerTransport` (stdin/stdout), suitable for Claude Desktop and other MCP hosts that spawn the process
- Tools are registered with `server.registerTool()`, each with a Zod input schema and an async handler

### `fetch-weather` tool flow

1. Geocode the city name via `https://geocoding-api.open-meteo.com/v1/search`
2. Extract `latitude` and `longitude` from the first result
3. Fetch current weather via `https://api.open-meteo.com/v1/forecast` (temperature, precipitation, pressure, is_day)
4. Return the raw JSON response as text

Both APIs are from [Open-Meteo](https://open-meteo.com/) and require no API key.

## Key Details

- Package manager: **pnpm**
- Runtime: ES modules (`"type": "module"` in package.json)
- `tsconfig.json` references `rootDir: "./src"` but source is at root — if restructuring, move `main.ts` into `src/`
- No tests are configured
