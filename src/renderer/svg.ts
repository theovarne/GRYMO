import type { Genome } from "../genome/schema.js";
import { phenotypeView } from "./phenotype.js";

/** Renderer revision 2. Every visual locus affects geometry. Genome v1 is unchanged. */
export function renderSvg(genome: Genome): string {
  const p = genome.phenotype, v = phenotypeView(genome);
  const n = (x: number) => Number(x.toFixed(3));
  const outline = '#10150d';
  const top = n(25 - (p.skull - 1) * 25);
  const spread = n(14 * p.eye_spread), r = n(5 * p.eye_size);
  const earX = n(25 - p.ears.size * 13), earY = n(31 + p.ears.droop * 20);
  const eye = (x: number, y: number) => `<g data-locus="eye"><circle cx="${x}" cy="${y}" r="${r}" fill="#f7f8e9"/><circle cx="${x}" cy="${y}" r="${n(r * .32)}" fill="${outline}" stroke="none"/><path d="M${n(x-r)} ${n(y-r-3)}h${n(2*r)}" transform="rotate(${p.brow} ${x} ${n(y-r-3)})"/></g>`;
  const eyes = p.eyes === 1 ? eye(60, 45) : eye(n(60-spread),48)+eye(n(60+spread),48)+(p.eyes === 3 ? eye(60,32) : '');
  const fangs = Array.from({length:v.fangCount}, (_,i) => {
    const x = 51+i*8; return `<path data-locus="fang" d="M${x} 71l4 ${p.fangs===3?-9:9} 4 ${p.fangs===3?9:-9}Z" fill="#f7f8e9"/>`;
  }).join('');
  const positions = [[33,60],[86,63],[29,52],[90,54],[39,72],[80,74]];
  const warts = positions.slice(0,v.wartCount).map(([x,y])=>`<circle data-locus="wart" cx="${x}" cy="${y}" r="2" fill="#536b30"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Procedural GRYMO goblin" data-renderer="2"><g stroke="${outline}" stroke-width="2.5" stroke-linejoin="round"><path d="M39 81L33 106H49L60 90L71 106H87L81 81" fill="#5c4b2d"/><path d="M29 41L${earX} ${earY}L27 63Q27 82 60 84Q93 82 93 63L${n(120-earX)} ${earY}L91 41Q83 ${top} 60 ${top}Q37 ${top} 29 41Z" fill="${v.skin}"/>${eyes}<path d="M57 53l${n(10*p.snout)} ${n(7*p.snout)}-14 2" fill="${v.skin}"/><path d="M45 70Q60 ${n(78+(1-p.skull)*12)} 77 69" fill="none"/>${fangs}${warts}</g></svg>`;
}
