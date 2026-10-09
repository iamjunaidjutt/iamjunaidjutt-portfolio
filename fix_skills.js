const fs = require('fs');

let content = fs.readFileSync('components/Skills.tsx', 'utf8');

content = content.replace(
    `import { motion } from "framer-motion";`,
    `import { motion } from "framer-motion";\nimport { PROFILE_DATA } from "@/data/profile";`
);

const startGroups = content.indexOf('const groups = [');
const endGroups = content.indexOf('const Skills = () => {');

if (startGroups !== -1 && endGroups !== -1) {
    content = content.substring(0, startGroups) + `const groups = [
	["AI & data", ...PROFILE_DATA.skills.ai],
	["Backend & APIs", ...PROFILE_DATA.skills.backend],
	["Frontend", ...PROFILE_DATA.skills.frontend],
	["Platforms & storage", ...PROFILE_DATA.skills.platforms],
	["Languages & delivery", ...PROFILE_DATA.skills.languages],
];\n\n` + content.substring(endGroups);
}

fs.writeFileSync('components/Skills.tsx', content);
