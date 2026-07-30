import { NextRequest } from "next/server";
import { generateApiKey, serializeApiKey } from "@/lib/api-keys";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const keys = await prisma.apiKey.findMany({
      orderBy: { createdAt: "desc" },
    });

    return Response.json({ keys: keys.map(serializeApiKey) });
  } catch (error) {
    console.error("GET /api/keys failed:", error);
    return Response.json(
      { error: "Failed to load API keys" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    let body: { name?: string };

    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const name = body.name?.trim();
    if (!name) {
      return Response.json({ error: "Name is required" }, { status: 400 });
    }

    const { rawKey, prefix, keyHash } = generateApiKey();

    const key = await prisma.apiKey.create({
      data: { name, prefix, keyHash, keyValue: rawKey },
    });

    return Response.json(
      {
        key: serializeApiKey(key),
        rawKey,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/keys failed:", error);
    return Response.json(
      { error: "Failed to create API key" },
      { status: 500 },
    );
  }
}
