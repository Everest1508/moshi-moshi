import { ChatHub } from "./chatHub";
import { landingHtml, privacyHtml, supportHtml, updatesXml } from "./pages";

export { ChatHub };

type Env = {
  CHAT_HUB: DurableObjectNamespace;
};

function isWebSocketUpgrade(request: Request): boolean {
  return request.headers.get("Upgrade")?.toLowerCase() === "websocket";
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (isWebSocketUpgrade(request)) {
      const id = env.CHAT_HUB.idFromName("hub");
      const stub = env.CHAT_HUB.get(id);
      return stub.fetch(request);
    }

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (url.pathname === "/") {
      return new Response(landingHtml(url.origin), {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    if (url.pathname === "/updates/update.xml") {
      return new Response(updatesXml(), {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    if (url.pathname === "/privacy") {
      return new Response(privacyHtml(), {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    if (url.pathname === "/support") {
      return new Response(supportHtml(), {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    return new Response("Not Found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
};
