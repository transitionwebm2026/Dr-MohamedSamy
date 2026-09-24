import type { DynamicItem } from "@/lib/supabase/types";

export function findItem(items: DynamicItem[], key: string): DynamicItem | undefined {
  return items.find((i) => i.item_key === key);
}

/** Reads a numeric field out of an item's `extra` JSON, falling back when absent/invalid. */
export function extraNumber(item: DynamicItem | undefined, field: string, fallback: number): number {
  const v = item?.extra?.[field];
  return typeof v === "number" ? v : fallback;
}

export function extraString(item: DynamicItem | undefined, field: string, fallback: string): string {
  const v = item?.extra?.[field];
  return typeof v === "string" && v.length > 0 ? v : fallback;
}
