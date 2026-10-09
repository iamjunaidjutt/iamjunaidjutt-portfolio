const fs = require('fs');

let content = fs.readFileSync('components/chatbot/ChatWidget.tsx', 'utf8');

// layoutStorageKey is declared twice, const layoutStorageKey = "junaid-portfolio-chat-layout";
let countKey = 0;
content = content.replace(/const layoutStorageKey = "junaid-portfolio-chat-layout";/g, (match) => {
    countKey++;
    return countKey === 1 ? match : '';
});

// layoutClasses is declared twice
let countClasses = 0;
// We can just use a specific target instead of regex
const classesLiteral = `const layoutClasses = {
\t\tcompact: "md:inset-x-auto md:bottom-24 md:right-6 md:top-auto md:h-[min(560px,70vh)] md:w-[min(380px,calc(100vw-2rem))]",
\t\tpanel: "md:inset-x-auto md:bottom-24 md:right-6 md:top-auto md:h-[min(85vh,760px)] md:w-[min(620px,calc(100vw-2rem))]",
\t\tfullscreen: "md:inset-3 md:h-auto md:w-auto",
\t} as const;`;
content = content.replace(classesLiteral + '\n\t' + classesLiteral, classesLiteral);

// layout state declared twice
const layoutState = `const [layout, setLayout] = useState<"compact" | "panel" | "fullscreen">("compact");`;
content = content.replace(layoutState + '\n\t' + layoutState, layoutState);

fs.writeFileSync('components/chatbot/ChatWidget.tsx', content);
