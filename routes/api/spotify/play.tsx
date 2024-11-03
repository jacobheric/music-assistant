import { define } from "@/lib/state.ts";

import { play } from "@/lib/spotify.ts";
import { getSpotifyToken } from "@/lib/token.ts";

export const handler = define.handlers({
  async POST(ctx) {
    const form = await ctx.req.formData();
    const device = form.get("device")?.toString();
    const uris = form.getAll("trackURI");

    if (!device || uris.length === 0) {
      throw Error("missing device or track uri");
    }

    const token = await getSpotifyToken(ctx);
    await play(token, device, uris.map((uri) => uri.toString()));

    return new Response(null, { status: 200 });
  },
});
