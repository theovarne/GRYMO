# Renderer

`renderSvg(genome)` emits a small SVG specimen as a pure string. Renderer revision 2: palette, eye count/size/spread, exact fang/wart count, snout, ear size/droop, brow and skull geometry are taken from the versioned phenotype. The output is deterministic for a given genome. No canvas, DOM, image model, font, remote resource or animation is involved.

The site's large pixel-goblin brand mark is a separately authored PNG. This renderer does **not** recreate it. The site also has a small browser preview drawn from similar shape primitives; this implementation is designed to match that role, not to claim exact screenshot parity.
