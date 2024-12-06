/**
 * This is a naive GUID-like unique ID generator.
 * Source: https://stackoverflow.com/a/13403498/4038790
 */
export const generateUniqueId = () => {
  const part1 = Math.random().toString(36).substring(2, 15);
  const part2 = Math.random().toString(36).substring(2, 15);

  return `${part1}-${part2}`;
};
