const fs = require('fs');

let content = fs.readFileSync('components/chatbot/ChatWidget.tsx', 'utf8');

content = content.replace(
    `import { useEffect, useRef, useState } from "react";`,
    `import { useEffect, useRef, useState, useMemo } from "react";`
);

fs.writeFileSync('components/chatbot/ChatWidget.tsx', content);
