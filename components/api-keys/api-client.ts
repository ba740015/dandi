export async function readJson(res: Response) {
  const text = await res.text();
  if (!text) {
    throw new Error(
      res.ok
        ? "Empty response from server"
        : `Request failed (${res.status})`,
    );
  }
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    throw new Error("Unexpected response from server");
  }
}

export function maskKey(prefix: string) {
  return `${prefix}${"*".repeat(24)}`;
}

/** Fetch the full raw key for an id. Throws if unavailable. */
export async function fetchRawKey(id: string): Promise<string> {
  const res = await fetch(`/api/keys/${id}`);
  const data = await readJson(res);
  if (!res.ok) {
    throw new Error((data.error as string) ?? "Failed to load API key");
  }
  if (!data.rawKey) {
    throw new Error(
      "This key was created before viewing was available. Delete it and create a new one.",
    );
  }
  return data.rawKey as string;
}
