const fs = require('fs');

let content = fs.readFileSync('components/Experience.tsx', 'utf8');

content = content.replace(
    `<h3>{PROFILE_DATA.education.degree}</h3>\n\t\t\t\t\t<p>{PROFILE_DATA.education.institution} · {PROFILE_DATA.education.period}</p>`,
    `<h3>{PROFILE_DATA.education.degree.title}</h3>\n\t\t\t\t\t<p>{PROFILE_DATA.education.degree.institution} · {PROFILE_DATA.education.degree.period}</p>`
);

fs.writeFileSync('components/Experience.tsx', content);

