import type { LineageIndex, LineageRecord } from "./record.js";

export interface LineageNode { record: LineageRecord; parents: LineageNode[] }

export function traceLineage(id: string, index: LineageIndex): LineageNode {
  const visit = (current: string, path: Set<string>): LineageNode => {
    const record = index.get(current);
    if (!record) throw new Error(`unknown lineage ID: ${current}`);
    if (path.has(current)) throw new Error(`lineage cycle at ${current}`);
    const next = new Set(path);
    next.add(current);
    return { record, parents: (record.parents ?? []).map(parent => visit(parent, next)) };
  };
  return visit(id, new Set());
}
