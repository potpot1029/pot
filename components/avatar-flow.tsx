import Image from "next/image";
import type { CSSProperties } from "react";
import { ALIAS, NAME } from "@/lib/constants";
import { SYNTHWEAVE } from "@/lib/palette";
import styles from "./avatar-flow.module.css";

// smart-sounding stuff flowing in from the left
const SMART = [
  "O(n log n)",
  "backprop",
  "malloc()",
  "dp[i][j]",
  "softmax(x)",
  "git rebase",
  "TCP/IP",
  "attention",
  "fork()",
  "BFS",
  "ReLU",
  "mutex",
  "λ",
  "segfault",
];
const SMART_COLORS = [
  SYNTHWEAVE.cyan,
  SYNTHWEAVE.greenBright,
  SYNTHWEAVE.yellow,
  SYNTHWEAVE.magenta,
];

// what comes out the right side, burning to ash
const JUNK = [
  "lol",
  "idk",
  "¯\\_(ツ)_/¯",
  "meme.png",
  "zzz",
  "@grok is this true?",
  "🫩",
  "0知",
];
// loose flakes of ash mixed in with the burning junk
const FLAKE_COUNT = 4;

// deterministic pseudo-random in [0, 1), so the layout is stable between renders
function rand(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

const smart = SMART.map((text, i) => ({
  text,
  style: {
    "--x": `${-150 - rand(i, 1) * 60}px`,
    "--y": `${(rand(i, 2) - 0.5) * 120}px`,
    "--delay": `${((i / SMART.length) * 4).toFixed(2)}s`,
    "--dur": `${(3 + rand(i, 3)).toFixed(2)}s`,
    "--color": SMART_COLORS[i % SMART_COLORS.length],
  } as CSSProperties,
}));

const junk = JUNK.map((text, i) => ({
  text,
  style: {
    "--y0": `${(rand(i, 4) - 0.5) * 60}px`,
    "--x": `${150 + rand(i, 5) * 70}px`,
    "--y": `${(rand(i, 6) - 0.7) * 110}px`,
    "--spin": `${Math.round((rand(i, 7) - 0.5) * 40)}deg`,
    "--delay": `${((i / JUNK.length) * 4).toFixed(2)}s`,
    "--dur": `${(3 + rand(i, 9) * 1.5).toFixed(2)}s`,
  } as CSSProperties,
}));

const flakes = Array.from({ length: FLAKE_COUNT }, (_, i) => ({
  style: {
    "--y0": `${(rand(i, 10) - 0.5) * 70}px`,
    "--x": `${170 + rand(i, 11) * 80}px`,
    "--y": `${(rand(i, 12) - 0.7) * 120}px`,
    "--spin": `${Math.round(rand(i, 13) * 360)}deg`,
    "--size": `${2 + Math.round(rand(i, 14) * 3)}px`,
    "--delay": `${((i / FLAKE_COUNT) * 4 + 0.25).toFixed(2)}s`,
    "--dur": `${(3 + rand(i, 15) * 1.5).toFixed(2)}s`,
  } as CSSProperties,
}));

// smart-sounding stuff flows in from the left, gets absorbed, and leaves to
// the right as useless junk burning to ash
export function AvatarFlow() {
  return (
    <div className={styles.stage}>
      {smart.map(({ text, style }) => (
        <span
          key={text}
          aria-hidden
          className={`${styles.particle} ${styles.label} ${styles.smart}`}
          style={style}
        >
          {text}
        </span>
      ))}
      {junk.map(({ text, style }) => (
        <span
          key={text}
          aria-hidden
          className={`${styles.particle} ${styles.label} ${styles.junk}`}
          style={style}
        >
          {text}
        </span>
      ))}
      {flakes.map(({ style }, i) => (
        <span
          key={i}
          aria-hidden
          className={`${styles.particle} ${styles.ash}`}
          style={style}
        />
      ))}
      <Image
        src="/cat_drooling.webp"
        alt={`${NAME} (${ALIAS})'s avatar`}
        width={160}
        height={160}
        preload
        className={`${styles.avatar} size-40 rounded-full object-cover ring-2 ring-brand shadow-[0_0_24px_var(--color-brand)]`}
      />
    </div>
  );
}
