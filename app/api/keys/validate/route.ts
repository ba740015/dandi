import { NextRequest } from "next/server";
import { hashApiKey } from "@/lib/api-keys";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    let body: { apiKey?: string };

    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const apiKey = body.apiKey?.trim();
    if (!apiKey) {
      return Response.json(
        { valid: false, error: "API key is required" },
        { status: 400 },
      );
    }

    const keyHash = hashApiKey(apiKey);
    const match = await prisma.apiKey.findFirst({
      where: { keyHash },
    });

    if (!match) {
      return Response.json(
        { valid: false, error: "Invalid API Key" },
        { status: 401 },
      );
    }

    await prisma.apiKey.update({
      where: { id: match.id },
      data: { lastUsedAt: new Date() },
    });

    return Response.json({ valid: true });
  } catch (error) {
    console.error("POST /api/keys/validate failed:", error);
    return Response.json(
      { error: "Failed to validate API key" },
      { status: 500 },
    );
  }
}
