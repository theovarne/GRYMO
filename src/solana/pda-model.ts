/** Proposed seed bytes only. No program ID, bump, or real PDA is derived. */
export function proposedLineageSeedParts(genomeFingerprint: string): readonly [string, string, string] {
  if (!/^[0-9a-f]{32}$/.test(genomeFingerprint)) throw new TypeError("expected a v1 genome fingerprint");
  return ["grymo", "lineage", genomeFingerprint];
}
