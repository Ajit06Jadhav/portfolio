# Ajit Narayan Jadhav — Portfolio (v2)

A single-page, static portfolio site — full-viewport snap-scrolling sections
with a floating nav so you can jump straight to any section. Plain
HTML/CSS/JS, no build step, no dependencies.

## What changed from v1

- **Mobile fixes:** the hero's JSON code block now wraps properly on narrow
  screens instead of needing horizontal scroll; the old top tab bar (which
  got cramped on small screens) is replaced with a slim persistent top bar
  plus a floating nav that becomes a compact bottom bar on mobile; touch
  targets are sized for fingers, not just cursors.
- **Structure:** the site now feels like separate pages — Home, About,
  Skills, Experience, Projects, Contact — each a full-screen section you snap
  between, either by scrolling or by clicking a dot in the floating nav.
- **AI skills:** added an "ai & workflow" group to Skills (OpenAI API,
  AI-assisted design, AI coding tools) and a line in About. Replace the
  placeholder wording once you confirm exactly what to say about the OpenAI
  work — see the note in `index.html` near `id="about"`.
- **Visual polish:** subtle dot-grid texture in the background, a soft glow
  on the hero name, refined type scale for smaller screens.

## Before you publish — same 3 things as before

1. **LinkedIn / GitHub URLs** — already filled in from your live site in the
   Contact section — double check they're still correct.
2. **Profile photo** — still an "AJ" initials badge. To use a real photo,
   add it to `assets/` (e.g. `assets/profile.jpg`) and in `index.html`,
   inside the `avatar__frame` div, replace:
   ```html
   <span class="avatar__initials">AJ</span>
   ```
   with:
   ```html
   <img src="assets/profile.jpg" alt="Ajit Narayan Jadhav" class="avatar__img">
   ```
3. **AI content** — the Skills chips and the About paragraph mentioning AI
   are intentionally generic right now. Once you confirm specifics (what you
   built with the OpenAI API, which AI tools you use), update:
   - The chip labels under `id="skills"` → `ai & workflow` group.
   - The third paragraph under `id="about"`.
   - Optionally, add an "AI-assisted" tag to whichever project actually used it.

## Publish updates to your existing GitHub Pages site

Since your repo is already live, this is just an update — copy these files
over your existing ones and push:

```bash
# from inside your existing /Project-Ajit/portfolio folder
# (back up or remove old css/js/index.html first if you want a clean swap)
git add .
git commit -m "Redesign: snap-scroll sections, mobile fixes, AI skills"
git push
```

GitHub Pages redeploys automatically within a minute or two — refresh
`https://ajit06jadhav.github.io/portfolio/` after that.

## File structure

```
portfolio/
├── index.html          all sections: home, about, skills, experience, projects, contact
├── css/style.css        snap-scroll layout, floating nav, responsive rules
├── js/script.js          section-jump nav, active-section tracking, hero typing effect
├── assets/
│   └── Ajit_Jadhav_Resume.pdf
└── README.md
```

## Customizing further

- **Add a project:** copy an existing `.repo-card` block under `id="projects"`.
- **Add a job:** copy a `.timeline__item` block under `id="experience"`.
- **Colors:** CSS variables at the top of `css/style.css` (the `:root` block).
- **Section order:** reorder the `<section class="panel">` blocks in
  `index.html` — then update the `data-jump` values in the floating nav
  (`<nav class="dotnav">`) to match if you rename any section `id`.
