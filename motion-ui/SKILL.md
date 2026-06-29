---
name: motion-ui
description: "Install Framer Motion (the `motion` package) into a compatible project and build professional, animated UI/UX using 21st.dev components. Detects stack compatibility (React, Next.js, Vite, Remix, Astro) before installing. Sources components in hybrid mode: uses the 21st.dev Magic MCP when connected, otherwise built-in 21st-style Tailwind + motion recipes. Two control modes: confirm-each-step (default, full user control) and --auto (opt-in full AI control: detect, install, design, and apply end-to-end). Actions: animate, add motion, add framer motion, make it professional, polish UI, design landing page, build animated components, motion-ui. Triggers: 'add animations', 'install framer motion', 'make this look professional', 'animate this', 'use 21st.dev', '--auto'."
---

# motion-ui — Animated, Professional UI with Framer Motion + 21st.dev

Turns a plain React-based project into a polished, animated interface. It (1) verifies the
project can host Framer Motion, (2) installs it, and (3) builds professional components, sourcing
from **21st.dev** (Magic MCP when available, built-in patterns otherwise). The user stays in
control by default; a single `--auto` flag hands full control to the AI.

## When to use

Use when the user wants to add motion/animation, "make it look professional," build a polished
landing page or component, or explicitly mentions Framer Motion or 21st.dev. Also triggers on
`--auto` for end-to-end autonomous UI work.

**Skip** for: pure backend work, non-JS projects, Vue/Svelte/Angular (Framer Motion is React-only —
the detector emits the correct alternative instead).

## Control modes

| Mode | How to enter | Behavior |
| --- | --- | --- |
| **Confirm** (default) | normal request | Propose each step — install, design direction, every component — and **wait for approval** before acting. User edits/approves at each gate. |
| **Auto** | user includes `--auto` (or says "full auto / you decide everything") | No stops: detect → install → choose a design direction → generate & apply components → report. Still respects the compatibility gate and reduced-motion. |

Always state which mode you're in at the start. In Confirm mode, never install or write files
without an explicit yes. Switching to Auto requires the user's flag/phrase — never assume it.

## Workflow

### Step 1 — Detect compatibility (always, both modes)
Run the detector and read its JSON verdict:

```bash
node "<skills>/motion-ui/scripts/detect-stack.mjs" "<projectDir>"
```

It reports: `compatible`, `framework`, `hasReact`, `hasTailwind`, `packageManager`,
`installCommand`, `motionInstalled`, `importPath`, and `warnings`.

- If `compatible: false` → **stop**. Relay the `reason` (e.g. Vue → suggest `motion-v`, no
  package.json → not a JS project). Do not install.
- If `motionInstalled: true` → skip Step 2, note the existing import path, go to Step 3.

### Step 2 — Install Framer Motion
- **Confirm mode:** show the exact `installCommand` and the detected stack; ask before running.
- **Auto mode:** run it directly.

```bash
# example — use the detector's installCommand verbatim (matches the project's package manager)
npm install motion       # or: pnpm add motion / yarn add motion / bun add motion
```

`motion` is the current Framer Motion package; import from `motion/react`. (Legacy projects on
`framer-motion` keep that import — the detector tells you which.) Verify the install succeeded
(dependency appears in package.json) before proceeding.

### Step 3 — Source professional components (hybrid 21st.dev)
1. Detect the **Magic MCP**: `ToolSearch` query `magic 21st component ui`. If relevant tools exist,
   use them to fetch/generate components, then adapt the result to the project's stack, Tailwind
   tokens, and correct `motion/react` import.
2. If no Magic MCP: announce the fallback and build from `references/21st-components.md`.
3. For animation choices and tasteful defaults, use `references/motion-patterns.md`.
4. For palette / typography / overall style direction, compose with the **ui-ux-pro-max** and
   **ui-styling** skills rather than re-deriving them.

### Step 4 — Apply & verify
- **Confirm mode:** present each component (or a small batch) for approval before writing.
- **Auto mode:** write the files, wire them in, and report what changed.
- Always: honor `prefers-reduced-motion`, animate only transform/opacity, match existing tokens,
  keep components accessible. Run the project's typecheck/lint if available; offer to start the
  dev server (or use the `/run` skill) so the user can see it.

## Hard rules
- **Never skip Step 1.** No install without a passing compatibility check.
- **Never install in Confirm mode without explicit approval.**
- **Auto mode is opt-in only** — require the `--auto` flag or an explicit "you decide everything."
- Respect reduced-motion in every component, in both modes.
- Don't invent colors/fonts — read `tailwind.config.*` and global CSS first, or pull from sibling
  design skills.

## Files
- `scripts/detect-stack.mjs` — stack + compatibility + package-manager detector (run first).
- `references/motion-patterns.md` — Framer Motion recipe cookbook + accessibility + perf rules.
- `references/21st-components.md` — Magic MCP sourcing flow + built-in 21st-style fallback components.
