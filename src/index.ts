import { env } from 'cloudflare:workers';
import { createMcpAgent } from '@cloudflare/playwright-mcp';

export const PlaywrightMCP = createMcpAgent(env.MYBROWSER);

export default {
  fetch(request: Request, workerEnv: Env, ctx: ExecutionContext) {
    const { pathname } = new URL(request.url);

    switch (pathname) {
      case '/sse':
      case '/sse/message':
        return PlaywrightMCP.serveSSE('/sse').fetch(request, workerEnv, ctx);
      case '/mcp':
        return PlaywrightMCP.serve('/mcp').fetch(request, workerEnv, ctx);
      case '/health':
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });
      default:
        return new Response('Not Found', { status: 404 });
    }
  },
};
