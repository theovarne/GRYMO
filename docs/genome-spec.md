# Genome specification (v1)

Founders are `generateGenome(seed)`. Seeds are strings or finite numbers, stringified and trimmed, 1–256 UTF-16 code units. The browser preview used `String(seed || "741190")`; this library rejects empty input instead of silently choosing a default. Do not assume Unicode normalization beyond that trim. For identical ASCII seeds, `hash32` and the website's `deriveTrait(seed, locus)` are identical.

The hash begins at `2166136261`, XORs each UTF-16 code unit, multiplies by `16777619` with 32-bit `Math.imul`, and applies the same final shifts/mixes as the website. A trait draw is `hash32(seed + ":" + locus) / 4294967295`. The palette and discrete features use `hash32(seed + ":" + feature) % range`. Continuous values are rounded to two decimals.

| Visual locus | Legal range |
| --- | --- |
| palette | integer 0–8 |
| eyes | integer 1–3 |
| eye_size | 0.6–1.8 |
| eye_spread | 0.5–1.5 |
| snout | 0.4–1.6 |
| ears.size / ears.droop | 0.7–1.5 / 0–1 |
| fangs / warts | integer 0–3 / 0–6 |
| brow / skull | integer −30–30 / 0.7–1.4 |

`variants` are visible anomalies (including inherited or founder anomalies). `mutations` are **new events** in a breeding operation, so founder `mutations` is empty. The website's `mutations` field instead labels founder anomalies; this intentional semantic distinction is why the records are not byte-for-byte website JSON.

`siteSeedFingerprint("741190")` is `fp: d240:dc25:3e89:0aaa`. `genomeFingerprint` hashes canonical sorted-key JSON in four 32-bit lanes and identifies a full v1 record. Neither fingerprint is collision-resistant; do not use either as a cryptographic proof or on-chain commitment. The guarantee being tested here is deterministic replay, not uniqueness against adversaries.

The browser preview invents pseudo-parent IDs, depth and kinship from a founder seed. The core does not: a founder has `parents: null`, `generation: 0` and `kinship: null`. Child parent IDs refer to full parent-genome fingerprints. A bred child's seed is a display/event-derived value; its full parent genomes are required to replay it.
