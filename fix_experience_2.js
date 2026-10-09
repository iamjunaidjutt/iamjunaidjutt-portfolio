const fs = require('fs');

let content = fs.readFileSync('components/Experience.tsx', 'utf8');

// Replace standard imports and roles
content = content.replace(
    `import { ArrowUpRight, CalendarDays } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";`,
    `import { ArrowUpRight, CalendarDays } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PROFILE_DATA } from "@/data/profile";`
);

// We want to delete const roles = [ ... ]; entirely up to Experience = () =>
const startRoles = content.indexOf('const roles = [');
const endRoles = content.indexOf('const Experience = () => (');
if (startRoles !== -1 && endRoles !== -1) {
    content = content.substring(0, startRoles) + content.substring(endRoles);
}

// Replace roles.map with PROFILE_DATA.experience.map
content = content.replace(/roles\.map/g, 'PROFILE_DATA.experience.map');

// Replace role.tags.map with role.stack.map
content = content.replace(/role\.tags\.map/g, 'role.stack.map');

// Replace Education section facts
content = content.replace(
    `FAST-NUCES · 2021 — 2025`,
    `{PROFILE_DATA.education.degree.institution} · {PROFILE_DATA.education.degree.period}`
);
content = content.replace(
    `<h3>BS Software Engineering</h3>`,
    `<h3>{PROFILE_DATA.education.degree.title}</h3>`
);


fs.writeFileSync('components/Experience.tsx', content);
