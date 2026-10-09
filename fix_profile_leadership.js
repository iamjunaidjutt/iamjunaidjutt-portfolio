const fs = require('fs');

let dp = fs.readFileSync('data/profile.ts', 'utf8');

// I'll replace the existing leadershipList array with the separated ones from Leadership.tsx
dp = dp.replace(/leadershipList: \[[\s\S]*?courses: \`- AI Engineer/, `leadership: [
    {
      period: "Dec 2023 — Mar 2024",
      title: "Aspire Leaders Program",
      org: "Aspire Institute · Remote",
      bullets: [
        "Completed 30 hours of coursework, including three full modules and a culminating project.",
        "Final project: \\"Empowering Minds - Education Outreach for Needy Children in Pakistan\\", a plan to help children in need get a better education.",
      ],
      tags: ["Leadership", "Community work", "Education outreach", "Teamwork"],
      link: "https://drive.google.com/file/d/13RdRi2w56hCt0Dt1Wxnzlk1aQKRu6aPO/view?usp=sharing",
      linkLabel: "View certificate",
    },
    {
      period: "Aug 2022 — May 2023",
      title: "Deputy Head of Marketing",
      org: "SOFTEC'23 · FAST-NUCES, Lahore, Pakistan",
      bullets: [
        "Helped lead a marketing team of about 40 people, before and during the event.",
        "Worked with company executives to close three sponsorship deals. We raised over PKR 1,000,000, which was 25% above the target.",
      ],
      tags: ["Team leadership", "Sponsorships", "Partnerships", "Marketing"],
      link: "https://drive.google.com/file/d/1gPtFvc7lbRl_uWWfl82TZ6HQd14IWLCz/view?usp=sharing",
      linkLabel: "View certificate",
    },
  ],
  volunteering: [
    {
      period: "Nov 2022 — Jan 2023",
      title: "Volunteer · Operations",
      org: "Future Fest'23 · Lahore, Pakistan",
      bullets: [
        "Checked billboards, banners, and other promotional materials.",
        "Looked after security at the auditorium and VIP areas while working with senior police officers, including the District Police Officer.",
        "Helped set up and pack up the event, and stayed in touch with teams and vendors.",
      ],
      tags: ["Event operations", "Logistics", "Security"],
      link: "https://drive.google.com/file/d/1EFlcRZoIpfwwjiB9TjlKzMBtu00niuLk/view?usp=sharing",
      linkLabel: "View certificate",
    },
    {
      period: "Oct 2021 — Aug 2022",
      title: "Volunteer · Marketing, Software House Enclosure & Infrastructure",
      org: "SOFTEC'22 · FAST-NUCES, Lahore, Pakistan",
      bullets: [
        "Called HR managers and CEOs to set up sponsorship meetings, and joined those meetings with the marketing head.",
        "Worked with the setup team to run the Software House Enclosure.",
        "Looked after company exhibits and talked with visitors to keep things running smoothly.",
      ],
      tags: ["Marketing", "Sponsorships", "Sponsor outreach", "Event management"],
      link: "https://drive.google.com/file/d/1m5YY44z8DmlIh-26BHSFRG47CkuriCpd/view?usp=sharing",
      linkLabel: "View certificate",
    },
  ],
  courses: \`- AI Engineer`);

fs.writeFileSync('data/profile.ts', dp);

let pt = fs.readFileSync('lib/chat/profileText.ts', 'utf8');

pt = pt.replace(/leadershipList: \{[\s\S]*?\}\[];/, `leadership: {
    period: string;
    title: string;
    org: string;
    bullets: string[];
    tags: string[];
    link: string;
    linkLabel: string;
  }[];
  volunteering: {
    period: string;
    title: string;
    org: string;
    bullets: string[];
    tags: string[];
    link: string;
    linkLabel: string;
  }[];`);

// Fix profileText.ts for leadership text builder? 
// buildProfileText still relies on `leadership: string`, I'll rename `leadershipText: string` 
// wait, pt interface has `leadership: string;`, I will rename `leadershipText` there too, but let's just make the simple type change first.

pt = pt.replace(/leadership: string;/, `leadershipText: string;`);
pt = pt.replace(/\$\{p\.leadership\}/, `\$\{p\.leadershipText\}`);
fs.writeFileSync('lib/chat/profileText.ts', pt);

dp = fs.readFileSync('data/profile.ts', 'utf8');
dp = dp.replace(/leadership: \`Aspire/, `leadershipText: \`Aspire`);
fs.writeFileSync('data/profile.ts', dp);

