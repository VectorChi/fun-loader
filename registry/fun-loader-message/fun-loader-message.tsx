'use client';

import type { ComponentProps } from 'react';

import { FunLoader } from '@/components/ui/fun-loader';
import { cn } from '@/lib/utils';

// A chat bubble to show while the assistant's answer is on its way. Swap it for the real
// message when the first tokens arrive.
function FunLoaderMessage({ className, ...props }: ComponentProps<typeof FunLoader>) {
  return (
    <div className={cn('flex w-fit max-w-[80%] rounded-lg bg-muted px-3 py-2', className)}>
      <FunLoader theme="thinking" icon="dots" {...props} />
    </div>
  );
}

export { FunLoaderMessage };
