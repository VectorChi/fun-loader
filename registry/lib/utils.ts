// Stand-in for the `cn` helper every shadcn app has (clsx + tailwind-merge), so the registry
// files typecheck in this repo. Not part of any registry item: users keep their own.
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(' ');
}
