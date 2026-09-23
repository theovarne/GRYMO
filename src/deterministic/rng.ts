import { hash32 } from "./hash.js";

/** Xorshift32. State and draw order are part of the v1 breeding specification. */
export function createRng(seed: string): () => number {
  let state = hash32(seed) || 0x6d2b79f5;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 4294967296;
  };
}
