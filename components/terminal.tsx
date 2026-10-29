"use client";

import { useEffect, useRef, useState } from "react";
import { BranchIcon } from "@/components/icons/branch";
import { Prompt } from "@/components/prompt";
import { SYNTHWEAVE } from "@/lib/palette";

// typed one after another; each command's output appears before the next starts
const COMMANDS = [
  { command: "neofetch", Output: Neofetch },
  { command: "cat skills.txt", Output: Skills },
];
const START_DELAY_MS = 400;
const KEY_DELAY_MS = 90;
const OUTPUT_DELAY_MS = 250;
// pause after an output so it can be read before the next command types
const NEXT_COMMAND_DELAY_MS = 700;

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

// each language with what it's used for, nested under "- languages" in skills.txt
const LANGUAGES = [
  { name: "python", note: "dl(pytorch), scripting" },
  { name: "go", note: "backend" },
  { name: "c++", note: "competitive programming" },
  { name: "javascript", note: "backend(node.js, express.js)" },
  { name: "typescript", note: "frontend(react)" },
];

const SKILLS = [
  { group: "human", items: ["cantonese", "mandarin", "english", "japanese"] },
  { group: "tools", items: ["git", "docker"] },
  { group: "databases", items: ["postgres", "mysql"] },
  { group: "llm stack", items: ["langchain", "ollama"] },
  { group: "ai coding", items: ["claude code", "codex", "opencode"] },
];

// starship palette, shown as neofetch's color blocks
const PALETTE = Object.values(SYNTHWEAVE);

// where each command starts in the flat count of typed keys
const OFFSETS = COMMANDS.map((_, k) =>
  COMMANDS.slice(0, k).reduce((sum, { command }) => sum + command.length, 0),
);

type Step = { at: number; typed?: number; shown?: number };

// every key press and output reveal, in order, with its time from the start
function timeline(reduce: boolean): Step[] {
  const pause = (ms: number) => (reduce ? 0 : ms);
  const steps: Step[] = [];
  let at = pause(START_DELAY_MS);
  let typed = 0;
  COMMANDS.forEach(({ command }, k) => {
    for (let i = 0; i < command.length; i++) {
      at += pause(KEY_DELAY_MS);
      steps.push({ at, typed: ++typed });
    }
    at += pause(OUTPUT_DELAY_MS);
    steps.push({ at, shown: k + 1 });
    at += pause(NEXT_COMMAND_DELAY_MS);
  });
  return steps;
}

export function Terminal() {
  // keys typed across all commands, and how many outputs are revealed
  const [typed, setTyped] = useState(0);
  const [shown, setShown] = useState(0);
  // with cacheComponents, Next keeps this route mounted (hidden) across
  // navigations and re-runs effects when it's shown again; resume from the
  // last applied step instead of restarting, and play only once
  const applied = useRef(0);

  useEffect(() => {
    // reduced motion: show everything at once
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const steps = timeline(reduce);
    const from = applied.current;
    if (from >= steps.length) return;

    // when resuming, continue one key-press after the last applied step
    const offset =
      from === 0 ? 0 : steps[from].at - (reduce ? 0 : KEY_DELAY_MS);
    const timers = steps.slice(from).map((step, j) =>
      setTimeout(() => {
        applied.current = from + j + 1;
        if (step.typed !== undefined) setTyped(step.typed);
        if (step.shown !== undefined) setShown(step.shown);
      }, step.at - offset),
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    // translucent terminal window, like a Ghostty pane over the page
    <div className="terminal-window grow px-5 pt-4 pb-1">
      {/* without JS the effect never runs, so show everything already typed */}
      <noscript>
        <style>
          {".terminal-pending { opacity: 1 !important; }" +
            ".terminal-untyped { display: inline !important; }" +
            ".terminal-cursor { display: none !important; }"}
        </style>
      </noscript>
      {COMMANDS.map(({ command, Output }, k) => {
        const keys = Math.min(Math.max(typed - OFFSETS[k], 0), command.length);
        const active = shown === k;
        // later prompts appear once the previous output is shown; opacity (not
        // visibility) keeps the text readable by screen readers and crawlers
        const promptVisible = k === 0 || shown >= k;
        return (
          <div key={command}>
            {/* git branch on the right, like starship's right prompt */}
            <div
              className={`mb-1 flex items-center justify-between gap-4 font-mono text-sm ${k > 0 ? "mt-2" : ""} ${promptVisible ? "" : "terminal-pending opacity-0"}`}
            >
              <Prompt>
                {/* screen readers get the whole command, not each typed key */}
                <span className="sr-only">{command}</span>
                <span aria-hidden className="flex items-center whitespace-pre">
                  {command.slice(0, keys)}
                  {active && (
                    <span className="terminal-cursor ml-px h-4 w-2 animate-pulse bg-foreground" />
                  )}
                  <span className="terminal-untyped hidden">
                    {command.slice(keys)}
                  </span>
                </span>
              </Prompt>
              <p className="flex items-center gap-1 font-bold text-yellow">
                <BranchIcon />
                main
              </p>
            </div>
            <div className={shown > k ? "" : "terminal-pending opacity-0"}>
              <Output />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Neofetch() {
  return (
    <div className="mb-3 flex flex-wrap items-start gap-x-8 gap-y-4 font-mono text-sm">
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
  );
}

// skills.txt, printed as plain text the way `cat` shows it
const SKILLS_TXT = [
  "- languages",
  ...LANGUAGES.map(({ name, note }) => `  - ${name}: ${note}`),
  ...SKILLS.map(({ group, items }) => `- ${group}: ${items.join(", ")}`),
].join("\n");

function Skills() {
  return (
    <pre className="mb-3 font-mono text-sm leading-snug whitespace-pre-wrap">
      {SKILLS_TXT}
    </pre>
  );
}
