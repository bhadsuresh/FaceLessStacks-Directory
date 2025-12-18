import fs from "fs";
import path from "path";

// Adjust paths if needed
const INPUT_PATH = path.resolve("src/data/tools.json");
const OUTPUT_PATH = path.resolve("src/data/tools.enriched.json");

// Category → Platforms + Use Cases mapping
const CATEGORY_MAP = {
  "Video Generation": {
    platforms: ["youtube", "instagram", "tiktok", "facebook"],
    useCases: [
      "faceless-youtube",
      "youtube-automation",
      "faceless-reels",
      "shorts-creation"
    ]
  },
  "Voiceover": {
    platforms: ["youtube", "instagram", "tiktok"],
    useCases: [
      "faceless-youtube",
      "narration",
      "story-videos"
    ]
  },
  "Shorts Repurposing": {
    platforms: ["youtube", "instagram", "tiktok"],
    useCases: [
      "shorts-repurposing",
      "faceless-reels"
    ]
  },
  "Scriptwriting": {
    platforms: ["youtube"],
    useCases: [
      "youtube-automation",
      "script-generation"
    ]
  },
  "Growth & SEO": {
    platforms: ["youtube"],
    useCases: [
      "youtube-growth",
      "keyword-research"
    ]
  },
  "AI Avatar": {
    platforms: ["youtube", "instagram"],
    useCases: [
      "faceless-avatar-videos",
      "presentation-videos"
    ]
  },
  "Editing": {
    platforms: ["youtube", "instagram", "tiktok"],
    useCases: [
      "video-editing",
      "content-polishing"
    ]
  },
  "Design": {
    platforms: ["youtube", "instagram"],
    useCases: [
      "thumbnails",
      "channel-branding"
    ]
  },
  "Audio & Music": {
    platforms: ["youtube", "instagram", "tiktok"],
    useCases: [
      "background-music",
      "audio-cleaning"
    ]
  },
  "Translation": {
    platforms: ["youtube"],
    useCases: [
      "video-translation",
      "global-distribution"
    ]
  }
};

// Utility: slugify
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// Read original JSON
const raw = fs.readFileSync(INPUT_PATH, "utf-8");
const tools = JSON.parse(raw);

// Enrich tools
const enriched = tools.map(tool => {
  const categoryData = CATEGORY_MAP[tool.category] || {
    platforms: ["youtube"],
    useCases: ["faceless-youtube"]
  };

  return {
    ...tool,

    // Add slug if missing
    slug: tool.slug || tool.id || slugify(tool.name),

    // Add platforms & useCases if missing
    platforms: tool.platforms || categoryData.platforms,
    useCases: tool.useCases || categoryData.useCases
  };
});

// Save enriched file
fs.writeFileSync(
  OUTPUT_PATH,
  JSON.stringify(enriched, null, 2),
  "utf-8"
);

console.log("✅ tools.enriched.json generated successfully!");
