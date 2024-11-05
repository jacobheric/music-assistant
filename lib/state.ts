import { createDefine } from "fresh";
import { TokenData } from "@/lib/token.ts";

export interface State {
  title?: string;
  description?: string;
  noIndex?: boolean;
  spotifyToken: TokenData;
}

export const define = createDefine<State>();
