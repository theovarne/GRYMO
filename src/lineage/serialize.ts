import { stableStringify } from "../deterministic/normalize.js";
import { indexLineage, type LineageIndex, type LineageRecord } from "./record.js";

export function serializeLineage(index: LineageIndex): string {
  return stableStringify([...index.values()].sort((a, b) => a.id.localeCompare(b.id)));
}

export function parseLineage(json: string): LineageIndex {
  const value: unknown = JSON.parse(json);
  if (!Array.isArray(value) || !value.every(isRecord)) throw new TypeError("invalid lineage JSON");
  return indexLineage(value);
}

function isRecord(value: unknown): value is LineageRecord {
  if (value === null || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return typeof item.id === "string" && typeof item.seed === "string" && Number.isInteger(item.generation)
    && (item.parents === null || (Array.isArray(item.parents) && item.parents.length === 2 && item.parents.every(parent => typeof parent === "string")));
}
