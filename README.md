# Cloudflare Playwright MCP for LinkedIn Automation (Human-in-the-loop)

This repo deploys a **Playwright MCP server** on Cloudflare Workers using Browser Rendering.

It is designed for safe LinkedIn recruiting workflows:
- profile research
- candidate note drafting
- status tagging/logging
- optional manual send (you confirm final click)

## Endpoints

After deploy, your Worker exposes:

- `GET /health` → health check
- `SSE /sse` → MCP over Server-Sent Events
- `POST /mcp` → MCP endpoint

## Prerequisites

- Cloudflare account with Browser Rendering enabled
- Wrangler authenticated (`npx wrangler login`)
- Node 18+

## Setup

```bash
npm ci
```

## Deploy

```bash
npm run deploy
```

Worker URL example:

`https://cloudflare-playwright.<subdomain>.workers.dev/sse`

Use that `/sse` URL in your MCP client (Claude Desktop, AI Playground, etc.).

## MCP Client Usage Pattern (LinkedIn)

Recommended safe sequence:

1. "Open linkedin.com and wait for me to log in manually."
2. "Go to this profile: <linkedin-url>"
3. "Extract: name, title, company, location, and 2 personalization hooks."
4. "Draft a 300-character connection note for BetterBrain (healthtech + AI mission)."
5. "Stop and wait for my approval before clicking Connect or Send."

## Important Guardrails

- Keep a human in the loop for all outbound actions.
- Avoid high-frequency actions that can trigger anti-automation protections.
- Use this for augmentation (research + drafting), not spam.

## Wrangler config highlights

- `browser` binding: `MYBROWSER`
- Durable Object class: `PlaywrightMCP`
- `nodejs_compat` enabled
- modern `compatibility_date`

## Local check

```bash
npm run build
npx wrangler dev
```

Then test:

```bash
curl http://127.0.0.1:8787/health
```
