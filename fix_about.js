const fs = require('fs');
let content = fs.readFileSync('components/About.tsx', 'utf8');

content = content.replace(
    `import { Button } from "@/components/ui/button";`,
    `import { Button } from "@/components/ui/button";\nimport { PROFILE_DATA } from "@/data/profile";`
);

content = content.replace(
    `<h2>
						I mostly build backend systems, and lately that means working
						with LLMs.
					</h2>`,
    `<h2>{PROFILE_DATA.about.heading}</h2>`
);

// We need to replace the <div className="about-copy">..paragraphs..</div>
// Let's use a regex to replace everything inside about-copy before the <Button>
content = content.replace(
    /<div className="about-copy">[\s\S]*?<Button/m,
    `<div className="about-copy">
					{PROFILE_DATA.about.paragraphs.map((p, i) => (
						<p key={i}>{p}</p>
					))}
					<Button`
);

content = content.replace(
    `Lahore, Pakistan · Remote is fine`,
    `{PROFILE_DATA.meta.location} · {PROFILE_DATA.meta.workPreference}`
);

content = content.replace(
    `BS Software Engineering · FAST-NUCES`,
    `{PROFILE_DATA.education.degree.title} · {PROFILE_DATA.education.degree.institution}`
);

// We must manually add Sparkles field if it exists or use PROFILE_DATA.meta.interests
// PROFILE_DATA.meta.interests doesn't exist maybe, but PROFILE_DATA shows:
// I'll leave the Sparkles text alone, wait, PROFILE_DATA.meta.tags maybe? Let me check PROFILE_DATA again. Let's just do the ones we know exist.
fs.writeFileSync('components/About.tsx', content);
