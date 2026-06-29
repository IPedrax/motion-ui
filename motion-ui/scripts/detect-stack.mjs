#!/usr/bin/env node
/**
 * motion-ui stack detector.
 * Inspects the project at CWD (or argv[2]) and prints a JSON report describing
 * whether Framer Motion (the `motion` package) can be installed and how.
 *
 * Usage: node detect-stack.mjs [projectDir]
 * Exit codes: 0 = report printed (check JSON `.compatible`), 1 = no package.json found.
 */
import { readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const dir = resolve(process.argv[2] || process.cwd());
const pkgPath = join(dir, "package.json");

if (!existsSync(pkgPath)) {
  console.log(JSON.stringify({
    compatible: false,
    reason: "No package.json found — not a JS/TS project. Framer Motion needs npm-based tooling.",
    dir,
  }, null, 2));
  process.exit(1);
}

let pkg;
try {
  pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
} catch (e) {
  console.log(JSON.stringify({ compatible: false, reason: `package.json is not valid JSON: ${e.message}`, dir }, null, 2));
  process.exit(1);
}

const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
const has = (name) => Object.prototype.hasOwnProperty.call(deps, name);

// --- Package manager (by lockfile, then packageManager field) ---
let pm = "npm";
if (existsSync(join(dir, "pnpm-lock.yaml"))) pm = "pnpm";
else if (existsSync(join(dir, "yarn.lock"))) pm = "yarn";
else if (existsSync(join(dir, "bun.lockb")) || existsSync(join(dir, "bun.lock"))) pm = "bun";
else if (existsSync(join(dir, "package-lock.json"))) pm = "npm";
else if (typeof pkg.packageManager === "string") pm = pkg.packageManager.split("@")[0];

const installCmd = {
  npm: "npm install motion",
  pnpm: "pnpm add motion",
  yarn: "yarn add motion",
  bun: "bun add motion",
}[pm] || "npm install motion";

// --- Framework detection (supported set: React, Next, Vite, Remix, Astro) ---
const hasReact = has("react") || has("react-dom");
let framework = null;
if (has("next")) framework = "next";
else if (has("@remix-run/react") || has("@remix-run/node")) framework = "remix";
else if (has("astro")) framework = "astro";
else if (has("vite")) framework = "vite";
else if (hasReact) framework = "react";

// --- Motion already present? (current `motion` pkg or legacy `framer-motion`) ---
const motionInstalled = has("motion") || has("framer-motion");
const motionPkg = has("framer-motion") && !has("motion") ? "framer-motion (legacy)" : (has("motion") ? "motion" : null);
const importPath = has("framer-motion") && !has("motion") ? "framer-motion" : "motion/react";

// --- Tailwind (affects which 21st.dev recipes apply) ---
const hasTailwind = has("tailwindcss");

// --- Compatibility verdict ---
let compatible = false;
let reason = "";
const warnings = [];

if (framework && (hasReact || framework === "astro")) {
  compatible = true;
  reason = `Detected ${framework}${hasReact ? " + React" : ""}. Framer Motion (motion) is supported.`;
  if (framework === "astro" && !hasReact) {
    warnings.push("Astro detected without React. motion works inside React islands — add @astrojs/react, or use CSS/View Transitions for plain .astro files.");
  }
  if (framework === "vite" && !hasReact) {
    warnings.push("Vite without React. If this is a Vue app, use 'motion-v' instead; Svelte has built-in transitions.");
    compatible = hasReact;
    if (!compatible) reason = "Vite project without React — motion (Framer Motion) is React-only.";
  }
} else if (has("vue")) {
  reason = "Vue detected. Framer Motion is React-only — use 'motion-v' (npm i motion-v) instead.";
  warnings.push("Suggested: motion-v");
} else if (has("svelte")) {
  reason = "Svelte detected. Use Svelte's built-in transition/motion stores instead of Framer Motion.";
} else if (has("@angular/core")) {
  reason = "Angular detected. Use Angular animations (@angular/animations) instead of Framer Motion.";
} else {
  reason = "No supported React-based framework found (need react, next, remix, astro+react, or vite+react).";
}

console.log(JSON.stringify({
  compatible,
  reason,
  dir,
  framework,
  hasReact,
  hasTailwind,
  packageManager: pm,
  installCommand: installCmd,
  motionInstalled,
  motionPackage: motionPkg,
  importPath,
  warnings,
}, null, 2));
