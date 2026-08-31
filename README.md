# Ajit Narayan Jadhav — Portfolio

A single-page, static portfolio site. Plain HTML/CSS/JS — no build step, no
dependencies to install. Just push it to GitHub and turn on Pages.

## Before you publish — 3 things to fill in

1. **LinkedIn URL** — in `index.html`, search for `your-linkedin` won't appear;
   instead find `linkedin.com/in/ajit-jadhav` (two places: the hero section
   isn't one of them, it's in the Contact section) and replace with your real
   LinkedIn URL.
2. **GitHub URL** — find `github.com/your-username` in `index.html` (Contact
   section) and replace with your real GitHub profile URL.
3. **Profile photo** — the hero currently shows an "AJ" initials badge. To use
   a real photo:
   - Add your image file to the `assets/` folder, e.g. `assets/profile.jpg`
   - In `index.html`, find the `avatar__frame` div near the top of the `<body>`
     and replace the `<span class="avatar__initials">AJ</span>` line with:
     ```html
     <img src="assets/profile.jpg" alt="Ajit Narayan Jadhav" class="avatar__img">
     ```

Optional: replace `assets/Ajit_Jadhav_Resume.pdf` with an updated resume any
time — just keep the filename the same, or update the `href` in the
"download resume" button in `index.html` if you rename it.

## Publish it on GitHub Pages (free, ~5 minutes)

1. **Create a new repository** on GitHub — e.g. named `portfolio` (or
   `your-username.github.io` if you want it at the root of your GitHub domain
   instead of a subpath).

2. **Push these files to it.** From this folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
   git push -u origin main
   ```

3. **Turn on GitHub Pages:**
   - Go to your repo on GitHub → **Settings** → **Pages** (left sidebar).
   - Under "Build and deployment", set **Source** to **Deploy from a branch**.
   - Set **Branch** to `main` and folder to `/ (root)`, then **Save**.

4. **Wait ~1 minute**, then refresh that same Pages settings screen — GitHub
   will show your live link:
   - `https://YOUR-USERNAME.github.io/portfolio/` (if your repo is named
     `portfolio`), or
   - `https://YOUR-USERNAME.github.io/` (if your repo is named
     `YOUR-USERNAME.github.io`)

That link works for anyone, no login required. Share it directly, or add it
to your resume and LinkedIn.

## Making future edits

Any time you want to change something (add a project, update a job, tweak
colors), edit the files and push again:
```bash
git add .
git commit -m "Update portfolio"
git push
```
GitHub Pages redeploys automatically within a minute or two.

## File structure

```
portfolio/
├── index.html          all page content and structure
├── css/style.css        all styling (colors, layout, animations)
├── js/script.js         scroll reveal, nav, and the typing effect
├── assets/
│   └── Ajit_Jadhav_Resume.pdf   linked from the "download resume" button
└── README.md            this file
```

## Customizing

- **Colors:** all colors are defined as CSS variables at the top of
  `css/style.css` (the `:root` block) — change them there and they update
  everywhere.
- **Fonts:** loaded from Google Fonts in `index.html` (`<link>` tags in
  `<head>`) — JetBrains Mono for headings/labels, IBM Plex Sans for body text.
- **Sections:** each section in `index.html` is a `<section>` with a clear id
  (`about`, `skills`, `experience`, `projects`, `education`, `contact`) —
  copy an existing block (e.g. a `.repo-card` or a `.timeline__item`) to add
  another project or job.
