export function normalizeSeed(seed: string | number): string {
  if (typeof seed === "number" && !Number.isFinite(seed)) throw new RangeError("seed must be finite");
  const value = String(seed).trim();
  if (!value) throw new RangeError("seed must not be empty");
  if (value.length > 256) throw new RangeError("seed must be at most 256 UTF-16 code units");
  return value;
}

/** Recursive key ordering gives a stable JSON representation for fingerprints. */
export function stableStringify(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value !== null && typeof value === "object") {
    const object = value as Record<string, unknown>;
    return `{${Object.keys(object).sort().map(key => `${JSON.stringify(key)}:${stableStringify(object[key])}`).join(",")}}`;
  }
  const encoded = JSON.stringify(value);
  if (encoded === undefined) throw new TypeError("unsupported value in canonical JSON");
  return encoded;
}
