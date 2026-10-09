const fs = require('fs');

let content = fs.readFileSync('components/Training.tsx', 'utf8');

content = content.replace(
    `import { motion } from "framer-motion";`,
    `import { motion } from "framer-motion";\nimport { PROFILE_DATA } from "@/data/profile";`
);

let start = content.indexOf('const training = [');
let end = content.indexOf('const Training = () => (');

if (start !== -1 && end !== -1) {
    content = content.substring(0, start) + content.substring(end);
}

// Modify mapping to handle string-based icon mapping
content = content.replace(
    /\{training\.map\([\s\S]*?\([\s\S]*?\{[\s\S]*?icon: Icon,[\s\S]*?title,[\s\S]*?provider,[\s\S]*?bullets,[\s\S]*?tags,[\s\S]*?certificate,[\s\S]*?\},[\s\S]*?index,[\s\S]*?\) => \(/m,
    `{PROFILE_DATA.coursesList.map((item, index) => {
					const Icon = item.description === 'Cloud' ? Cloud : item.description === 'Network' ? Network : BookOpen;
					return (`
);

content = content.replace(/\{title\}/g, `{item.title}`);
content = content.replace(/\{provider\}/g, `{item.instructor}`);
content = content.replace(/bullets\.map/g, `item.bullets.map`);
content = content.replace(/tags\.map/g, `item.tags.map`);
content = content.replace(/href=\{certificate\}/g, `href={item.link}`);
content = content.replace(/key=\{title\}/g, `key={item.title}`);
content = content.replace(/training-description/g, `training-description`); // just match
// Replace the trailing parenthesis of the map
content = content.replace(/<\/motion\.article>[\s\S]*?\),[\s\S]*?\)/m, `</motion.article>\n\t\t\t\t\t\t);\n\t\t\t\t\t})`);

fs.writeFileSync('components/Training.tsx', content);
