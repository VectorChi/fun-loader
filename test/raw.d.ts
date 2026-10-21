// Vitest's `?raw` imports give a file's contents as a string.
declare module '*?raw' {
  const contents: string;
  export default contents;
}
