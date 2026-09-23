/** Exact 32-bit UTF-16 hash used by the grymo.lol local preview. Not cryptographic. */
export function hash32(value: string | number): number {
  let h = 2166136261;
  const text = String(value);
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  h += h << 13;
  h ^= h >>> 7;
  h += h << 3;
  h ^= h >>> 17;
  h += h << 5;
  return h >>> 0;
}

/** Website-compatible trait draw in the closed interval [0, 1]. */
export function deriveUnit(seed: string, locus: string): number {
  return hash32(`${seed}:${locus}`) / 4294967295;
}
