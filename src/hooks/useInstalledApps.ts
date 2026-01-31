import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'korea-starter-pack-installed';

function loadInstalledApps(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore parse errors
  }
  return [];
}

function saveInstalledApps(appIds: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appIds));
  } catch {
    // ignore storage errors
  }
}

export function useInstalledApps() {
  const [installedApps, setInstalledApps] = useState<string[]>(loadInstalledApps);

  // Sync to localStorage whenever state changes
  useEffect(() => {
    saveInstalledApps(installedApps);
  }, [installedApps]);

  const isInstalled = useCallback(
    (appId: string) => installedApps.includes(appId),
    [installedApps]
  );

  const toggleInstalled = useCallback((appId: string) => {
    setInstalledApps((prev) =>
      prev.includes(appId)
        ? prev.filter((id) => id !== appId)
        : [...prev, appId]
    );
  }, []);

  return { installedApps, isInstalled, toggleInstalled };
}
