import type { LineageIndex } from "../lineage/record.js";

function ancestors(id: string, index: LineageIndex, maxDepth: number): Map<string, number> {
  const depths = new Map<string, number>();
  const queue: Array<[string, number]> = [[id, 0]];
  while (queue.length) {
    const [current, depth] = queue.shift()!;
    if (depth > maxDepth || (depths.get(current) ?? Infinity) <= depth) continue;
    const record = index.get(current);
    if (!record) throw new Error(`missing lineage record: ${current}`);
    depths.set(current, depth);
    for (const parent of record.parents ?? []) queue.push([parent, depth + 1]);
  }
  return depths;
}

/** Nearest-common-ancestor coefficient, bounded to 8 generations by default. */
export function estimateKinship(motherId: string, fatherId: string, index: LineageIndex, maxDepth = 8): number {
  if (!Number.isInteger(maxDepth) || maxDepth < 0 || maxDepth > 32) throw new RangeError("invalid maxDepth");
  const mother = ancestors(motherId, index, maxDepth);
  const father = ancestors(fatherId, index, maxDepth);
  const shared = [...mother.keys()].filter(id => father.has(id));
  if (!shared.length) return 0;
  const minDistance = Math.min(...shared.map(id => mother.get(id)! + father.get(id)!));
  const nearest = shared.filter(id => mother.get(id)! + father.get(id)! === minDistance);
  return Math.min(0.5, nearest.reduce((sum, id) => sum + 2 ** -(mother.get(id)! + father.get(id)! + 1), 0));
}
