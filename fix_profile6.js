const fs = require('fs');

let dp = fs.readFileSync('data/profile.ts', 'utf8');

dp = dp.replace(/display: \{ stack: \["Next\.js", "MongoDB", "Tailwind", "NextAuth"\] \} as any, \/\/ Not typed in Profile but injected below safely\n\s*description: " a site for finding and sharing AI prompts, with Google sign-in,\\n  searchable tags and user profiles\.",\n\s*display:/, 
`description: " a site for finding and sharing AI prompts, with Google sign-in,\\n  searchable tags and user profiles.",\n      display:`);

fs.writeFileSync('data/profile.ts', dp);
