const fs = require('fs');

let dp = fs.readFileSync('data/profile.ts', 'utf8');

// There is still a property `leadershipText: \`Aspire...` and `leadership: [...]`
// But wait, the previous `leadership` array I inserted failed because `profileText.ts` type expects `leadershipText: string` but does it still expect `leadership: { ... }[]`?

// Let's check `lib/chat/profileText.ts`
let pt = fs.readFileSync('lib/chat/profileText.ts', 'utf8');
// Yes, `leadership: { ... }[]` is inside `profileText.ts` Profile interface!
// Wait - the error says `Type 'string' is not assignable to type '{ period: string;... }[]'
// Ah, no, the error says: Type '{ ... }[]' (the array I put) is not assignable to type 'string' OR wait - let's read the error properly.
// Error: Type 'string' is not assignable to type '{ period: ... }[]'. What? `leadership` in data/profile.ts is an array, but somehow TypeScript thinks it is providing a string? No, it thinks data/profile.ts `leadership` is a string. Wait, maybe the type definition in `lib/chat/profileText.ts` for `leadership` is still `string`!

pt = pt.replace(/leadership: string;/, `leadership: {
    period: string;
    title: string;
    org: string;
    bullets: string[];
    tags: string[];
    link: string;
    linkLabel: string;
  }[];`);

fs.writeFileSync('lib/chat/profileText.ts', pt);
