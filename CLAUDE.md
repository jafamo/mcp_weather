# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Install dependencies:
```bash
pnpm install
```

Run the server (requires a TypeScript runner since no build script is configured):
```bash
npx tsx main.ts
```

Build (TypeScript compiler — note: tsconfig expects `src/` directory but `main.ts` is at root):
```bash
npx tsc
```

## Architecture

This is a minimal **MCP (Model Context Protocol) server** that exposes weather tools to AI clients.

- **`main.ts`** — the entire server implementation in a single file
- Uses `StdioServerTransport`, meaning clients connect via stdin/stdout (suitable for Claude Desktop or other MCP hosts that spawn the process)
- Tools are registered with `server.registerTool()`, each with a Zod input schema and an async handler

## Key Details

- Package manager: **pnpm**
- Runtime: ES modules (`"type": "module"` in package.json)
- The `tsconfig.json` references `rootDir: "./src"` but source is currently at root — if restructuring, move `main.ts` into `src/`
- The `fetch-weather` tool currently returns a hardcoded response; the `NWS_API_BASE` constant (`https://api.weather.gov`) is defined but not yet used
- No tests are configured
