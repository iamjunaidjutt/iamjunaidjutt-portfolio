const fs = require('fs');
let content = fs.readFileSync('components/Experience.tsx', 'utf8');
content = content.replace(/import \{ PROFILE_DATA \} from "@\/data\/profile";\nimport \{ PROFILE_DATA \} from "@\/data\/profile";/, 'import { PROFILE_DATA } from "@/data/profile";');
fs.writeFileSync('components/Experience.tsx', content);
