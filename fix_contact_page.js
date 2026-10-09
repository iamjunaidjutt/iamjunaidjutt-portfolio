const fs = require('fs');
let content = fs.readFileSync('app/contact/(routes)/page.tsx', 'utf8');

content = content.replace(
    `import { useRouter } from "next/navigation";`,
    `import { useRouter } from "next/navigation";\nimport { PROFILE_DATA } from "@/data/profile";`
);

content = content.replace(
    `Lahore, Pakistan`,
    `{PROFILE_DATA.meta.location}`
);

content = content.replace(
    `href="https://api.whatsapp.com/send?phone=923074254648"`,
    `href={PROFILE_DATA.contact.whatsappLink}`
);

content = content.replace(
    `+92-307-4254648`,
    `{PROFILE_DATA.contact.phone}`
);

content = content.replace(
    `href="mailto:info.iamjunaidjutt@gmail.com"`,
    `href={\`mailto:\${PROFILE_DATA.contact.email}\`}`
);

content = content.replace(
    `<span>
										info.iamjunaidjutt@gmail.com
									</span>`,
    `<span>
										{PROFILE_DATA.contact.email}
									</span>`
);

fs.writeFileSync('app/contact/(routes)/page.tsx', content);
