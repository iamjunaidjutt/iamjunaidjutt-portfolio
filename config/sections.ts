export const SECTION_IDS = ["about", "experience", "stack", "training", "projects", "leadership"] as const;
export type SectionId = typeof SECTION_IDS[number];
