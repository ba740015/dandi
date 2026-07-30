import { createHash, randomBytes } from "crypto";

const KEY_PREFIX = "dandi";

export function generateApiKey(): { rawKey: string; prefix: string; keyHash: string } {
  const secret = randomBytes(24).toString("hex");
  const rawKey = `${KEY_PREFIX}_${secret}`;
  const prefix = `${KEY_PREFIX}_${secret.slice(0, 8)}`;
  const keyHash = hashApiKey(rawKey);
  return { rawKey, prefix, keyHash };
}

export function hashApiKey(rawKey: string): string {
  return createHash("sha256").update(rawKey).digest("hex");
}

export function serializeApiKey(key: {
  id: string;
  name: string;
  prefix: string;
  createdAt: Date;
  updatedAt: Date;
  lastUsedAt: Date | null;
}) {
  return {
    id: key.id,
    name: key.name,
    prefix: key.prefix,
    createdAt: key.createdAt.toISOString(),
    updatedAt: key.updatedAt.toISOString(),
    lastUsedAt: key.lastUsedAt?.toISOString() ?? null,
  };
}

export type ApiKey = ReturnType<typeof serializeApiKey>;
