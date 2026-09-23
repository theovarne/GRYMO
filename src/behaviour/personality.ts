import type { BehaviourGenome } from "./schema.js";

/** Local deterministic labels, not an LLM voice or financial advice. */
export function personality(behaviour: BehaviourGenome): { mood: string; stance: string } {
  const mood = behaviour.fear > 0.66 ? "alert and hiding" : behaviour.greed > 0.66 ? "hungry for motion" : "watchful and patient";
  return { mood, stance: behaviour.conviction > 0.65 ? "speaks first" : "waits for a better sign" };
}
