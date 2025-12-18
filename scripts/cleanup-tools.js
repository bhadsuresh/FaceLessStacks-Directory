import fs from "fs";
import path from "path";

const INPUT_PATH = path.resolve("src/data/tools.enriched.json");
const OUTPUT_PATH = path.resolve("src/data/tools.cleaned.json");

/**
 * Canonical category names
 */
const CATEGORY_NORMALIZATION = {
  "Growth & Thumbnails": "Growth & SEO",
  "Growth": "Growth & SEO",
  "SEO": "Growth & SEO",
  "Video": "Video Generation",
  "Video Creation": "Video Generation",
  "Voice Over": "Voiceover",
  "Audio": "Audio & Music",
  "Music": "Audio & Music",
  "Shorts": "Shorts Repurposing"
};

/**
 * Allowed canonical use cases
 */
const ALLOWED_USE_CASES = new Set([
  "faceless-youtube",
  "youtube-automation",
  "shorts-creation",
  "shorts-repurposing",
  "faceless-reels",
  "narration",
  "story-videos",
  "video-editing",
  "content-polishing",
  "thumbnails",
  "channel-branding",
  "youtube-growth",
  "keyword-research",
  "background-music",
  "audio-cleaning",
  "video-translation",
  "global-distribution"
]);

/**
 * Helpers
 */
function normalizeBoolean(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "true";
  return false;
}

function normalizeNumber(value) {
  const num = Number(value);
  return isNaN(num) ? null : Number(num.toFixed(1));
}

function normalizeCategory(category) {
  return CATEGORY_NORMALIZATION[category] || category;
}

function normalizeUseCases(useCases = []) {
  return [...new Set(useCases)]
    .map(u => u.toLowerCase())
    .filter(u => ALLOWED_USE_CASES.has(u));
}

/**
 * Read file
 */
const raw = fs.readFileSync(INPUT_PATH, "utf-8");
const tools = JSON.parse(raw);

/**
 * Normalize tools
 */
const cleaned = tools.map(tool => {
  return {
    ...tool,

    verified: normalizeBoolean(tool.verified),
    rating: normalizeNumber(tool.rating),

    category: normalizeCategory(tool.category),

    useCases: normalizeUseCases(tool.useCases),

    // Optional SEO helpers (non-breaking)
    bestFor: tool.bestFor || "",
    freePlan: normalizeBoolean(tool.freePlan),
    trial: normalizeBoolean(tool.trial),
    alternatives: Array.isArray(tool.alternatives) ? tool.alternatives : []
  };
});

/**
 * Write cleaned output
 */
fs.writeFileSync(
  OUTPUT_PATH,
  JSON.stringify(cleaned, null, 2),
  "utf-8"
);

console.log("✅ tools.cleaned.json generated successfully!");
