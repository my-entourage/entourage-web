import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns true after hydration is complete (client-side only).
 * Uses useSyncExternalStore to avoid setState-in-effect anti-pattern.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,  // Client: always true
    () => false  // Server: always false
  );
}
