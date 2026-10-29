"use client";

import { useEffect, useRef, useState } from "react";
import { BranchIcon } from "@/components/icons/branch";
import { Prompt } from "@/components/prompt";
import { SYNTHWEAVE } from "@/lib/palette";

const COMMAND = "neofetch";
const START_DELAY_MS = 400;
const KEY_DELAY_MS = 90;
const OUTPUT_DELAY_MS = 250;

// a steaming pot (pot/) in place of the distro logo; steam lines are colored separately
const LOGO: { text: string; steam?: boolean }[] = [
  { text: "      )   )   )", steam: true },
  { text: "     (   (   (", steam: true },
  { text: "      )   )   )", steam: true },
  { text: "   .-------------." },
  { text: " o=|=============|=o" },
  { text: "   |             |" },
  { text: "   |             |" },
  { text: "    \\___________/" },
];

const INFO = [
  { key: "os", value: "arch linux/windows 11/mac os" },
  { key: "shell", value: "zsh" },
  { key: "prompt", value: "starship" },
  { key: "wm", value: "hyprland" },
  { key: "terminal", value: "ghostty" },
  { key: "font", value: "blexmono nerd font" },
  { key: "editor", value: "neovim/zed" },
];

// starship palette, shown as neofetch's color blocks
const PALETTE = Object.values(SYNTHWEAVE);

export function Terminal() {
  const [typed, setTyped] = useState(0);
  const [done, setDone] = useState(false);
  // with cacheComponents, Next keeps this route mounted (hidden) across
  // navigations and re-runs effects when it's shown again; resume from the
  // last typed key instead of restarting, and play only once
  const progress = useRef(0);
  const finished = useRef(false);

  useEffect(() => {
    if (finished.current) return;

    // reduced motion: show everything at once
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const start = reduce ? 0 : START_DELAY_MS;
    const key = reduce ? 0 : KEY_DELAY_MS;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const from = progress.current;

    for (let i = from + 1; i <= COMMAND.length; i++) {
      timers.push(
        setTimeout(
          () => {
            progress.current = i;
            setTyped(i);
          },
          start + (i - from) * key,
        ),
      );
    }
    timers.push(
      setTimeout(
        () => {
          finished.current = true;
          setDone(true);
        },
        start + (COMMAND.length - from) * key + (reduce ? 0 : OUTPUT_DELAY_MS),
      ),
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    // translucent terminal window, like a Ghostty pane over the page
    <div className="grow border-[0.5px] border-synthwave-cyan bg-black/10 bg-clip-padding px-5 pt-4 pb-1 backdrop-blur-sm">
      {/* git branch on the right, like starship's right prompt */}
      <div className="mb-1 flex items-center justify-between gap-4 font-mono text-sm">
        <Prompt>
          {/* screen readers get the whole command, not each typed key */}
          <span className="sr-only">{COMMAND}</span>
          <span aria-hidden className="flex items-center">
            {COMMAND.slice(0, typed)}
            {!done && (
              <span className="ml-px h-4 w-2 animate-pulse bg-foreground" />
            )}
          </span>
        </Prompt>
        <p className="flex items-center gap-1 font-bold text-yellow">
          <BranchIcon />
          main
        </p>
      </div>
      {/* command output, revealed once the command is typed; opacity (not
          visibility) keeps it readable by screen readers and crawlers */}
      <div
        className={`neofetch-output mb-3 flex flex-wrap items-start gap-x-8 gap-y-4 font-mono text-sm ${done ? "" : "opacity-0"}`}
      >
        {/* without JS the effect never runs, so show the output right away */}
        <noscript>
          <style>{".neofetch-output { opacity: 1 !important; }"}</style>
        </noscript>
        <pre
          aria-hidden
          className="font-bold leading-snug text-prompt-dir [text-shadow:0_0_0.5em_var(--color-prompt-dir)]"
        >
          {LOGO.map(({ text, steam }, i) => (
            <span
              key={i}
              className={
                steam
                  ? "text-steam [text-shadow:0_0_0.5em_var(--color-steam)]"
                  : undefined
              }
            >
              {text}
              {"\n"}
            </span>
          ))}
        </pre>
        <div className="leading-snug">
          <p className="font-bold">
            <span className="text-brand">potpot</span>
            <span>@</span>
            <span className="text-brand">pot</span>
          </p>
          <p aria-hidden>------------</p>
          <dl>
            {INFO.map(({ key, value }) => (
              <div key={key} className="flex gap-2">
                <dt className="font-bold text-prompt-dir">{key}:</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p aria-hidden className="mt-3 flex">
            {PALETTE.map((color) => (
              <span
                key={color}
                className="h-4 w-6"
                style={{ background: color }}
              />
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
