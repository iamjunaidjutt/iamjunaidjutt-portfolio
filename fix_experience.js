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

// Replace Education section facts
content = content.replace(
    `<h3>BS Software Engineering</h3>
					<p>FAST-NUCES · 2021 — 2025</p>`,
    `<h3>{PROFILE_DATA.education.degree}</h3>
					<p>{PROFILE_DATA.education.institution} · {PROFILE_DATA.education.period}</p>`
);

// We note in Experience roles tags vs stack vs link vs linkLabel etc.
// PROFILE_DATA.experience has 'stack' instead of 'tags', so wait, let me check PROFILE_DATA before making these assumptions.
fs.writeFileSync('components/Experience.tsx', content);
