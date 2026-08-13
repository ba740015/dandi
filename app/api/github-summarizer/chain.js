import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

/**
 * Chain for summarizing a GitHub repository's README content.
 * Input:  { readmeContent: string }
 * Output: { summary: string, cool_facts: string[] }
 */

const summarizerPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are an expert developer and technical writer.
Summarize this GitHub repository from this readme file content.
Your output must be returned strictly as a JSON object with two keys:
- "summary": a concise summary of the repository
- "cool_facts": a list of interesting or unique facts or features mentioned in the readme

Use the following content for your analysis:
\`\`\`
{readmeContent}
\`\`\``,
  ],
  [
    "human",
    "Please provide your summary and facts in the specified JSON format.",
  ],
]);

const llm = new ChatOpenAI({
  temperature: 0.2,
});

const summarizeChain = summarizerPrompt.pipe(llm);

function extractText(result) {
  if (typeof result === "string") return result;
  const content = result?.content;
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((part) => (typeof part === "string" ? part : part?.text ?? ""))
      .join("");
  }
  return String(content ?? "");
}

function parseSummary(content) {
  const tryParse = (text) => {
    const parsed = JSON.parse(text);
    if (typeof parsed.summary !== "string" || !Array.isArray(parsed.cool_facts)) {
      throw new Error("Invalid summary shape");
    }
    return {
      summary: parsed.summary,
      cool_facts: parsed.cool_facts.map(String),
    };
  };

  try {
    return tryParse(content);
  } catch {
    const match = content.match(/\{[\s\S]+\}/);
    if (match?.[0]) {
      return tryParse(match[0]);
    }
    throw new Error("Could not extract a valid JSON summary from LLM output.");
  }
}

/**
 * Fetches README.md for a public GitHub repository URL.
 * @param {string} githubUrl
 * @returns {Promise<string|null>}
 */
export async function getReadmeMdContent(githubUrl) {
  try {
    const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)(\/|$)/i);
    if (!match) return null;

    const owner = match[1];
    const repo = match[2].replace(/\.git$/, "");
    const branches = ["main", "master"];

    for (const branch of branches) {
      const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`;
      const response = await fetch(rawUrl);
      if (response.ok) {
        return await response.text();
      }
    }

    return null;
  } catch (err) {
    console.error("Error fetching README.md:", err);
    return null;
  }
}

/**
 * Runs the summarizer chain on README content.
 * @param {string} readmeContent
 * @returns {Promise<{ summary: string, cool_facts: string[] }>}
 */
export async function summarizeReadme(readmeContent) {
  const result = await summarizeChain.invoke({ readmeContent });
  const content = extractText(result);
  return parseSummary(content);
}
