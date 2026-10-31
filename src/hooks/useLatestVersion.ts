import { useEffect, useState } from 'react';
import { VERSION, latestVersion } from '../site';

let cached: Promise<string | null> | null = null;

/** The newest released version, read once per page load; falls back to VERSION. */
export function useLatestVersion(): string {
  const [v, setV] = useState(VERSION);
  useEffect(() => {
    let alive = true;
    (cached ??= latestVersion()).then((x) => { if (alive && x) setV(x); });
    return () => { alive = false; };
  }, []);
  return v;
}
