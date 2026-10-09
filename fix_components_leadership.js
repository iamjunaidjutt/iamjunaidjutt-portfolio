const fs = require('fs');

let content = fs.readFileSync('components/Leadership.tsx', 'utf8');

content = content.replace(
    `import { motion } from "framer-motion";`,
    `import { motion } from "framer-motion";\nimport { PROFILE_DATA } from "@/data/profile";`
);

let start = content.indexOf('const leadershipItems = [');
let end = content.indexOf('const TimelineItem = ({');

if (start !== -1 && end !== -1) {
    content = content.substring(0, start) + content.substring(end);
}

content = content.replace(/typeof leadershipItems/g, `typeof PROFILE_DATA.leadership`);
content = content.replace(/leadershipItems\.map/g, `PROFILE_DATA.leadership.map`);
content = content.replace(/volunteeringItems\.map/g, `PROFILE_DATA.volunteering.map`);

fs.writeFileSync('components/Leadership.tsx', content);

