import { PALETTE } from "../genome/constants.js";
import type { Genome } from "../genome/schema.js";
import { clamp } from "../genome/traits.js";

export function phenotypeView(genome: Genome): { skin: string; eyeCount: number; fangCount: number; wartCount: number; jawOffset: number } {
  const p = genome.phenotype;
  return {
    skin: PALETTE[clamp(Math.round(p.palette), 0, 8)]!,
    eyeCount: clamp(Math.round(p.eyes), 1, 3),
    fangCount: clamp(Math.round(p.fangs), 0, 3),
    wartCount: clamp(Math.round(p.warts), 0, 6),
    jawOffset: Math.round((1 - clamp(p.skull, 0.7, 1.4)) * 8)
  };
}
