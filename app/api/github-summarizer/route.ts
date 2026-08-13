import { NextRequest } from "next/server";
import { hashApiKey } from "@/lib/api-keys";
import { prisma } from "@/lib/prisma";
import { getReadmeMdContent, summarizeReadme } from "./chain";

/**
 * POST /api/github-summarizer
 * Validates the API key, fetches the repo README, and summarizes it with LangChain.
 *
 * Body:
 * {
 *   "apiKey": "dandi_...",
 *   "githubUrl": "https://github.com/owner/repo"
 * }
 *
 * apiKey can also be sent as:
 *   Authorization: Bearer dandi_...
 *   or x-api-key: dandi_...
 */
export async function POST(request: NextRequest) {
  try {
    let body: { apiKey?: string; githubUrl?: string };

    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const apiKey =
      body.apiKey?.trim() ||
      request.headers.get("x-api-key")?.trim() ||
      request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim() ||
      "";

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

    const githubUrl = body.githubUrl?.trim();
    if (!githubUrl) {
      return Response.json(
        { error: "githubUrl is required" },
        { status: 400 },
      );
    }

    const readmeContent = await getReadmeMdContent(githubUrl);
    if (!readmeContent) {
      return Response.json(
        { error: "Could not fetch README.md for this repository" },
        { status: 404 },
      );
    }

    const summary = await summarizeReadme(readmeContent);

    return Response.json({
      valid: true,
      githubUrl,
      ...summary,
    });
  } catch (error) {
    console.error("POST /api/github-summarizer failed:", error);
    return Response.json(
      { error: "Failed to process GitHub summarizer request" },
      { status: 500 },
    );
  }
}
