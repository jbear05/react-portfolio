# Jair Garcia Fonseca · Portfolio

My personal site, designed as a set of engineering drawings: drafting paper by
day, blueprint by night. It covers my internships, a numbered sheet for each
featured project with a schematic of how it works, and a live "work graph" in
the hero that maps everything I've built to the tools I used.

Live at [jairgarciafonsecaportfolio.vercel.app](https://jairgarciafonsecaportfolio.vercel.app/).

## Highlights

- **Work graph.** A dial-shaped canvas in the hero: roles and projects on the
  inner ring, the tools they used on the outer ring, with construction lines
  and protractor ticks. It tours itself when idle, traces any node you hover or
  tap, pauses offscreen and respects reduced-motion settings.
- **Experience timeline.** Internships as lettered "revisions" on a rail that
  fills as you scroll, with teaching and leadership roles underneath.
- **Project sheets with schematics.** Every featured project has a hand-built,
  theme-aware SVG diagram that draws itself in as you scroll, with a
  screenshot tab where one exists.
- **Paper and blueprint themes.** Follows your OS setting, remembers your
  choice and switches with a circular reveal (View Transitions API).
- **Details:** a fixed drawing frame with zone markers, a title-block footer
  stamped with the build date, a cursor-follow preview on the project index
  and a spam trap on the contact form.
- **Accessible and fast:** no axe-core violations in either theme, keyboard
  and screen-reader friendly, lazy-loaded EmailJS and no icon font.

## Stack

Vite · React 18 · Framer Motion · EmailJS · plain CSS with custom properties ·
Archivo and IBM Plex Mono from Google Fonts.

## Editing content

All copy lives in `src/data`, so updating the site never means touching
components:

| File | What's in it |
| --- | --- |
| `src/data/profile.js` | Name, links, status line, experience, teaching and leadership, about text, quick facts, coursework, toolbox |
| `src/data/projects.js` | Featured projects (sheets) and the "Other builds" index |
| `src/data/graph.js` | The hero's work graph: each role and project, and the tools it used |

- **New job:** add it to the top of `experience` in `profile.js` (wrap numbers
  in `**double asterisks**` to bold them), and add a matching `role` entry to
  `graph.js`.
- **New featured project:** add an entry to `featured`. The `figure` key picks
  a schematic from `src/components/figures` (add a new one there, or reuse
  one). `screenshot` is optional and adds a Screenshot tab.
- **New smaller project:** add an entry to `archive`. Give it an `image` to
  get the hover preview.
- **Images** go in `public/projects/`.

## Running locally

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## Contact form

The form sends through [EmailJS](https://www.emailjs.com/). Copy `.env.example`
to `.env` and fill in your service ID, template ID and public key. The template
receives `name`, `email` and `message`. When deploying, add the same three
variables in your host's settings (for example, Vercel → Project → Settings →
Environment Variables).

## Deploying

Any static host works. On Vercel, import the repo and keep the defaults
(framework: Vite, output: `dist`).

`index.html` points the canonical and social-preview URLs at
`https://jairgarciafonsecaportfolio.vercel.app/`. If the site moves, update
them, since LinkedIn and X ignore relative image URLs.
