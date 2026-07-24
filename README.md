<div align="center">
  <img src="assets/icons/wand.svg" width="56" alt="" />
  <h1>motion-ui</h1>
  <p><strong>Drop the right animation engine — Framer Motion, GSAP, anime.js, or Three.js — into your project and build professional, animated UI from 21st.dev, with you in control or fully on autopilot.</strong></p>
</div>

Most "add some animation" requests end one of two ways: a half-installed dependency that breaks the build, or motion bolted on so heavily it feels cheap. **motion-ui** does it properly. It first checks your stack, **picks an engine that actually fits it**, installs it the right way for your package manager, then builds polished components sourced from **21st.dev** — using the 21st.dev **Magic MCP** when it's connected, and built-in recipes when it isn't. You stay in control by default; one flag hands the whole job to the AI.

Built for **Claude Code** (Windows / macOS / Linux).

---

## <img src="assets/icons/sparkles.svg" width="20" align="absmiddle" alt="" /> What it does

- **Four engines, matched to your stack** — **Framer Motion** (React declarative motion), **GSAP** (timelines + ScrollTrigger), **anime.js v4** (lightweight), and **Three.js** (3D/WebGL). GSAP, anime.js, and Three.js run in *any* JS project — React, Next.js, Vite, Vue, Svelte, Astro, or vanilla; Framer Motion is React-only.
- **Compatibility gate first** — detects your stack, package manager, TypeScript, Tailwind, and any existing install *before* touching anything, then reports which engines are usable. No more blanket "React or bust" — a Vue or vanilla project still gets GSAP, anime.js, and Three.js.
- **Clean install** — the correct command for npm / pnpm / yarn / bun, with the right extras auto-added (`@gsap/react`, `@react-three/fiber` + `drei`, `@types/*` on TypeScript). Respects a legacy `framer-motion` install if you already have one.
- **Hybrid 21st.dev sourcing** — uses the **Magic MCP** to fetch/generate real components when it's connected; falls back to built-in recipe cookbooks when it isn't. Never blocks.
- **Two control modes** — **Confirm** (default): proposes every step and waits for your yes. **Auto** (`--auto`, opt-in): detect → pick engine → install → design → apply end-to-end, no stops.
- **Quality baked in** — every component honors `prefers-reduced-motion` (idle 3D loops paused too), animates only transform/opacity for 2D, disposes GPU resources for Three.js, stays accessible, and matches your existing design tokens.

---

## <img src="assets/icons/download.svg" width="20" align="absmiddle" alt="" /> Install

### <img src="assets/icons/monitor.svg" width="17" align="absmiddle" alt="" /> Claude Code — Windows (one-liner)

Open **PowerShell** and run:

```powershell
irm https://raw.githubusercontent.com/IPedrax/motion-ui/main/install.ps1 | iex
```

This installs the skill into `%USERPROFILE%\.claude\skills\motion-ui`. Restart Claude Code and you're ready.

### <img src="assets/icons/terminal.svg" width="17" align="absmiddle" alt="" /> Claude Code — macOS / Linux

```bash
mkdir -p ~/.claude/skills \
  && curl -L https://raw.githubusercontent.com/IPedrax/motion-ui/main/motion-ui.skill -o /tmp/motion-ui.zip \
  && unzip -o /tmp/motion-ui.zip -d ~/.claude/skills \
  && rm /tmp/motion-ui.zip
```

> **Prefer to let Claude install it?** Paste this into a new chat:
> *"Install this Claude skill for me from https://github.com/IPedrax/motion-ui and walk me through anything you need."*

---

## <img src="assets/icons/check.svg" width="20" align="absmiddle" alt="" /> Optional — 21st.dev Magic MCP

motion-ui works **without** any extra setup (built-in recipes). To unlock live, generated components, connect the **21st.dev Magic MCP**:

1. Get a free API key at **[21st.dev/magic/console](https://21st.dev/magic/console)**.
2. Add the server (user scope, all projects):

   ```bash
   claude mcp add magic --scope user -- npx -y @21st-dev/magic@latest API_KEY=YOUR_KEY
   ```
3. Restart Claude Code. motion-ui detects it automatically and prefers it over the fallback.

The Magic MCP runs only while Claude Code is open — it is **not** a startup service.

---

## <img src="assets/icons/chat.svg" width="20" align="absmiddle" alt="" /> How to use it

Just ask, from inside a project:

- *"add animations to this landing page"*
- *"install framer motion and make this look professional"*
- *"add a scroll-triggered reveal with GSAP"*
- *"animate this SVG with anime.js"*
- *"drop a 3D hero into this page with Three.js"*
- *"animate the hero and feature grid using 21st.dev"*

**Full control (default):** it proposes the install and each component, and waits for your approval at every gate.

**Full autopilot (opt-in):** add `--auto` (or say *"you decide everything"*) and it runs the whole job — detect, install, pick a direction, generate, and apply — without stopping.

```
add a polished animated pricing section --auto
```

---

## <img src="assets/icons/settings.svg" width="20" align="absmiddle" alt="" /> How it works

**Detect compatibility → Pick the engine → Install → Source components (Magic MCP or fallback) → Apply & verify.**

The compatibility gate is the point: motion-ui only installs an engine your stack can actually use, and picks by the job — Framer Motion for React component motion, GSAP for scroll/timeline work, anime.js for a light touch, Three.js for 3D. Sourcing is hybrid so the skill is useful whether or not you've connected Magic, and the autonomy is a single explicit flag so "full AI control" never happens by accident.

Full details: [`motion-ui/SKILL.md`](motion-ui/SKILL.md) · Framer Motion cookbook: [`references/motion-patterns.md`](motion-ui/references/motion-patterns.md) · GSAP · anime.js · Three.js cookbook: [`references/animation-libraries.md`](motion-ui/references/animation-libraries.md) · sourcing & fallback components: [`references/21st-components.md`](motion-ui/references/21st-components.md).

---

## <img src="assets/icons/file.svg" width="20" align="absmiddle" alt="" /> License

[MIT](LICENSE) — animation patterns built on [Framer Motion](https://motion.dev), [GSAP](https://gsap.com), [anime.js](https://animejs.com), and [Three.js](https://threejs.org); components sourced from [21st.dev](https://21st.dev).
