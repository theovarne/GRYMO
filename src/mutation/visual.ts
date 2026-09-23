import type { Phenotype } from "../genome/schema.js";

export const VISUAL_LOCI = ["eyes", "fangs", "skull", "warts", "ears"] as const;
export type VisualLocus = typeof VISUAL_LOCI[number];

export function mutateVisual(phenotype: Phenotype, locus: VisualLocus): string {
  switch (locus) {
    case "eyes": if (phenotype.eyes === 3) { phenotype.eyes = 1; return "eye_loss"; } phenotype.eyes = 3; return "third_eye";
    case "fangs": if (phenotype.fangs === 3) { phenotype.fangs = 0; return "fang_loss"; } phenotype.fangs = 3; return "reversed_fang";
    case "skull": if (phenotype.skull <= 0.7) { phenotype.skull += 0.3; return "swollen_skull"; } phenotype.skull -= 0.3; return "caved_skull";
    case "warts": if (phenotype.warts >= 5) { phenotype.warts -= 2; return "wart_loss"; } phenotype.warts += 2; return "wart_bloom";
    case "ears": if (phenotype.ears.droop >= 0.75) { phenotype.ears.droop -= 0.25; return "perked_ears"; } phenotype.ears.droop += 0.25; return "drooping_ears";
  }
}
