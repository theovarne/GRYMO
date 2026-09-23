# Breeding

`breed(mother, father, eventSeed, { lineage })` is a pure local function. It performs:

1. Normalize the event seed; derive `childSeed = hash32(mother.seed + ":" + father.seed + ":" + eventSeed)` as a decimal string.
2. Determine kinship from a complete local lineage index, or mark it `null` when no index is supplied. Unknown kinship uses baseline mutation odds; this is an assumption, not a claim of unrelated parents.
3. Inherit palette, eyes, fangs and warts with independent xorshift32 draws seeded by `childSeed + ":inherit"`.
4. Blend the remaining visual and behaviour loci at the parental midpoint plus deterministic 10%-of-range jitter.
5. Roll mutations at each locus, then clamp all values to the schema's legal range.

The output stores both parent content IDs, generation, kinship, visible variants and actual mutation events. Swapping mother and father may change the child; ordering is intentional. The website's current “RUN BREED TRACE” uses fixed parent numbers and a hash-only child preview. It does not yet call this function.

The algorithm is stable **within v1**. Changes to draw order, ranges or serialization require a new schema/spec version and new golden vectors.
