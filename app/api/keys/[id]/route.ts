import { NextRequest } from "next/server";
import { serializeApiKey } from "@/lib/api-keys";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const key = await prisma.apiKey.findUnique({ where: { id } });
    if (!key) {
      return Response.json({ error: "API key not found" }, { status: 404 });
    }

    return Response.json({
      key: serializeApiKey(key),
      rawKey: key.keyValue,
    });
  } catch (error) {
    console.error("GET /api/keys/[id] failed:", error);
    return Response.json({ error: "Failed to load API key" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

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

    const existing = await prisma.apiKey.findUnique({ where: { id } });
    if (!existing) {
      return Response.json({ error: "API key not found" }, { status: 404 });
    }

    const key = await prisma.apiKey.update({
      where: { id },
      data: { name },
    });

    return Response.json({ key: serializeApiKey(key) });
  } catch (error) {
    console.error("PATCH /api/keys/[id] failed:", error);
    return Response.json(
      { error: "Failed to update API key" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const existing = await prisma.apiKey.findUnique({ where: { id } });
    if (!existing) {
      return Response.json({ error: "API key not found" }, { status: 404 });
    }

    await prisma.apiKey.delete({ where: { id } });

    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/keys/[id] failed:", error);
    return Response.json(
      { error: "Failed to delete API key" },
      { status: 500 },
    );
  }
}
