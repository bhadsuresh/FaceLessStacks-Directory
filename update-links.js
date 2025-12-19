import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Locate your database file
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toolsFilePath = path.join(__dirname, 'src/data/tools.json');

// 2. The COMPLETE Master List of URLs (Based on your tools.json)
const urlMap = {
    "invideo-ai": "https://invideo.io",
    "murf-ai": "https://murf.ai",
    "elevenlabs": "https://elevenlabs.io",
    "opus-clip": "https://www.opus.pro",
    "subscribr": "https://subscribr.ai",
    "1of10": "https://1of10.com",
    "vidiq": "https://vidiq.com",
    "pictory": "https://pictory.ai",
    "jasper": "https://www.jasper.ai",
    "descript": "https://www.descript.com",
    "canva": "https://www.canva.com",
    "heygen": "https://www.heygen.com",
    "synthesia": "https://www.synthesia.io",
    "speechify": "https://speechify.com",
    "tubebuddy": "https://www.tubebuddy.com",
    "lovo": "https://lovo.ai",
    "veed-io": "https://www.veed.io",
    "play-ht": "https://play.ht",
    "wondershare-filmora": "https://filmora.wondershare.com",
    "copy-ai": "https://www.copy.ai",
    "runway-ml": "https://runwayml.com",
    "midjourney": "https://www.midjourney.com",
    "suno-ai": "https://suno.com",
    "adobe-podcast": "https://podcast.adobe.com",
    "rask-ai": "https://rask.ai",
    "getmunch": "https://www.getmunch.com",
    "d-id": "https://www.d-id.com",
    "soundraw": "https://soundraw.io",
    "kaiber": "https://kaiber.ai",
    "leonardo-ai": "https://leonardo.ai",
    "gling": "https://gling.ai",
    "vizard": "https://vizard.ai",
    "beatoven-ai": "https://www.beatoven.ai",
    "cleanvoice-ai": "https://cleanvoice.ai",
    "castmagic": "https://www.castmagic.io",
    "podcastle": "https://podcastle.ai",
    "steve-ai": "https://www.steve.ai",
    "fliki": "https://fliki.ai",
    "tome": "https://tome.app",
    "adobe-firefly": "https://firefly.adobe.com"
};

// 3. Run the Update
try {
    // Read file
    if (!fs.existsSync(toolsFilePath)) {
        throw new Error("Could not find src/data/tools.json");
    }
    
    const rawData = fs.readFileSync(toolsFilePath, 'utf-8');
    const tools = JSON.parse(rawData);
    let updatedCount = 0;

    // Update tools
    const updatedTools = tools.map(tool => {
        const key = tool.id; // Your JSON uses 'id' as the primary key
        
        // If we have a URL for this tool
        if (urlMap[key]) {
            // Overwrite or add the link
            tool.link = urlMap[key];
            updatedCount++;
        } else {
            console.log(`⚠️ Warning: No URL found for ID: ${key}`);
        }
        return tool;
    });

    // Save file
    fs.writeFileSync(toolsFilePath, JSON.stringify(updatedTools, null, 2));
    
    console.log(`\n✅ Success! Updated ${updatedCount} tools with correct links.`);
    console.log(`📂 File saved to: ${toolsFilePath}`);

} catch (error) {
    console.error("\n❌ Error:", error.message);
}