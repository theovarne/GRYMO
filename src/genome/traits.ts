import { deriveUnit } from "../deterministic/hash.js";

export const round = (value: number, places = 2): number => Number(value.toFixed(places));
export const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));
export const trait = (seed: string, name: string): number => deriveUnit(seed, name);
