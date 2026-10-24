'use client';

import { FunLoader as FunLoaderBase, type FunLoaderProps } from '@vectorchi/fun-loader/react';

import { cn } from '@/lib/utils';

// fun-loader, themed with your shadcn/ui tokens: muted text and a primary-colored icon.
// Every option is a prop: https://vectorchi.github.io/fun-loader/reference/options
function FunLoader({ className, ...props }: FunLoaderProps) {
  return (
    <FunLoaderBase
      className={cn(
        'text-sm text-muted-foreground [--fun-loader-icon-color:var(--primary)]',
        className,
      )}
      {...props}
    />
  );
}

export { FunLoader };
