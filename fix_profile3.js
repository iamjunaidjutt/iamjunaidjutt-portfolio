const fs = require('fs');
let dp = fs.readFileSync('data/profile.ts', 'utf8');
dp = dp.replace(/education: \`BS in Software Engineering, FAST-NUCES, Lahore \(2021 to 2025\)\.\\nAspire Leaders Program, Aspire Institute \(Dec 2023 to Mar 2024\)\.\`,/, `education: {
    degree: {
      title: "BS Software Engineering",
      institution: "FAST-NUCES",
      period: "2021 — 2025"
    },
    description: \`BS in Software Engineering, FAST-NUCES, Lahore (2021 to 2025).\\nAspire Leaders Program, Aspire Institute (Dec 2023 to Mar 2024).\`
  },`);
fs.writeFileSync('data/profile.ts', dp);
