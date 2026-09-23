export interface Phenotype {
  palette: number;
  eyes: number;
  eye_size: number;
  eye_spread: number;
  snout: number;
  ears: { size: number; droop: number };
  fangs: number;
  warts: number;
  brow: number;
  skull: number;
}

export interface BehaviourGenome {
  greed: number;
  fear: number;
  patience: number;
  risk_tolerance: number;
  herd_instinct: number;
  conviction: number;
  loss_aversion: number;
  volatility_affinity: number;
  drift: number;
}

/** Founder seed alone reconstructs a founder; a child also requires both parent genomes. */
export interface Genome {
  v: 1;
  seed: string;
  origin: "founder" | "bred";
  parents: readonly [string, string] | null;
  generation: number;
  kinship: number | null;
  phenotype: Phenotype;
  behaviour: BehaviourGenome;
  variants: string[];
  mutations: string[];
}
