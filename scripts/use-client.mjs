// Bundlers strip module-level directives, so restore 'use client' on the React
// entry after the build. Next.js needs it as the very first statement.
import { readFile, writeFile } from 'node:fs/promises';

const file = new URL('../dist/react/index.js', import.meta.url);
const code = await readFile(file, 'utf8');
if (!code.startsWith("'use client'")) await writeFile(file, `'use client';\n${code}`);
