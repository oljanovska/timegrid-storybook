# Timegrid Design System · Storybook

Living documentation for Timegrid (Apiko's Hubstaff replacement): tokens, components and key screens in **Light** and **Dark**.
Figma source: *Apiko Timy* → page **Timegrid · Design System**.

## Run locally
```bash
npm install
npm run storybook        # http://localhost:6006
```

## Structure
| Path | What |
| --- | --- |
| `src/tokens/tokens.json` | Tokens exported from Figma variables (Timegrid · Theme, Timegrid · Layout) + text styles |
| `src/tokens/tokens.css` | Generated CSS variables — `npm run tokens` |
| `src/styles.css` | Component styles, only token variables |
| `src/components/` | React components |
| `src/stories/` | Foundations, Components, Screens |

Theme: put `data-theme="light" | "dark" | "system"` on any ancestor.

## Deploy to GitHub Pages (free)
1. Create a repo on GitHub (e.g. `timegrid-storybook`) and push this folder to the `main` branch.
2. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` builds and publishes automatically (workflow in `.github/workflows/storybook.yml`).
4. Link: `https://<your-github-username>.github.io/timegrid-storybook/`

> Public repos get Pages for free. For a private repo Pages needs a paid GitHub plan (Pro/Team), and the site itself is still public unless you use Enterprise.
