import type { Genome } from "../genome/schema.js";
import { phenotypeView } from "./phenotype.js";

/** Small deterministic SVG specimen, not the site's hand-authored hero PNG. */
export function renderSvg(genome: Genome): string {
  const view = phenotypeView(genome);
  const eye = (x: number, y: number, radius: number) => `<circle cx="${x}" cy="${y}" r="${radius}" fill="#f7f8e9" stroke="#10150d" stroke-width="3"/><circle cx="${x}" cy="${y}" r="2.5" fill="#10150d"/>`;
  const eyes = view.eyeCount === 1 ? eye(60, 47, 9)
    : view.eyeCount === 3 ? eye(60, 42, 7) + eye(41, 48, 7) + eye(79, 48, 7)
    : eye(45, 47, 8) + eye(75, 47, 8);
  const fangs = view.fangCount > 1 ? '<path d="M53 69 l4 10 4-9 M66 70 l4 9 4-11" fill="#f7f8e9" stroke="#10150d" stroke-width="2"/>' : '';
  const warts = view.wartCount > 3 ? '<circle cx="28" cy="73" r="2" fill="#4e672c"/><circle cx="91" cy="72" r="2" fill="#4e672c"/><circle cx="87" cy="83" r="2" fill="#4e672c"/>' : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Procedural GRYMO goblin"><g shape-rendering="crispEdges"><path d="M22 49 L12 36 L29 40 Q36 22 60 22 Q84 22 91 40 L108 36 L98 52 Q98 75 60 82 Q22 75 22 49Z" fill="${view.skin}" stroke="#10150d" stroke-width="4"/><path d="M38 84 L32 107 L50 107 L60 87 L70 107 L88 107 L82 84" fill="#5c4b2d" stroke="#10150d" stroke-width="4"/>${eyes}<path d="M49 65 Q60 ${65 + view.jawOffset} 71 65" fill="none" stroke="#10150d" stroke-width="3"/>${fangs}${warts}</g></svg>`;
}
