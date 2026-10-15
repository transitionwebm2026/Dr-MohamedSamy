"use client";

import { createContext, useContext } from "react";

/**
 * There's no server to `revalidatePath` after a mutation anymore — every
 * section/item action here calls this instead to make the editor re-fetch
 * its own page/sections/items from Supabase.
 */
const RefreshContext = createContext<() => void>(() => {});

export const RefreshProvider = RefreshContext.Provider;

export function useRefresh() {
  return useContext(RefreshContext);
}
