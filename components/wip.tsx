import Link from "next/link";
import { Prompt } from "@/components/prompt";

// placeholder for sections that aren't ready yet, styled like the homepage terminal
export function Wip({ name }: { name: string }) {
  return (
    <section className="flex grow flex-col gap-6">
      <h1 className="font-mono text-2xl font-bold"># {name}/</h1>
      <div className="grow border-[0.5px] border-synthwave-cyan bg-black/10 bg-clip-padding px-5 py-4 font-mono text-sm backdrop-blur-sm">
        <Prompt>
          <span>ls {name}/</span>
        </Prompt>
        <p className="mt-1 text-warn">
          ls: {name}/: work in progress, check back soon
        </p>
        <p className="mt-4 flex items-center gap-2">
          <span className="font-bold text-brand">❯</span>
          <Link
            href="/"
            className="underline decoration-dotted underline-offset-2 transition-colors hover:text-synthwave-pink"
          >
            cd ~
          </Link>
          <span aria-hidden className="h-4 w-2 animate-pulse bg-foreground" />
        </p>
      </div>
    </section>
  );
}
