# Mutations

Kinship-adjusted per-locus probability is `0.04 + 1.02 × kinship`, with kinship in `[0, 0.5]`. Thus unrelated or unknown ancestry uses 4%, sibling-like `0.25` uses 29.5%, and the maximum is 55%. The website slider displayed a similar illustrative range, but did not derive kinship from records or mutate real offspring.

Visual mutation loci: eyes → third eye; fangs → reversed fang; skull → cave-in; warts → wart bloom; ears → more droop. Behaviour loci each move ±0.18 on a hit. A fixed xorshift draw sequence makes outcomes replayable. Clamping follows every mutation. Events are listed in `mutations`; existing inherited/founder appearance is listed in `variants`.

`rarity()` is a local aesthetic score using variants, mutation events, skull, fangs and warts. It is not a token rarity, pricing system or market forecast.
