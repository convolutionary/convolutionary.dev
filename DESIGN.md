# Design

Two worlds, one site.

- **`/` — the manual.** A late-80s computer manual about Aurora. This is the main page.
- **`/desktop` — the machine.** A faithful Mac OS 8 Platinum Finder, reached from Appendix A or `#/desktop`. Its styles all hang off `html.os`, so they never leak into the manual.

## Desktop (`src/components/desktop/`, `Home.jsx`)

Platinum, as the Appearance Manager drew it:
- `#ddd` window frames with bevels and a 1px hard shadow.
- Pinstriped title bars on the active window only, with close, zoom and collapse boxes and a grow box.
- Menu highlight is `#333399`; selection and hover are `#ccccff`.
- Chicago at 12px everywhere.
- Icons sit in the right column, with Trash at the bottom right. Desktop labels have white backgrounds and invert when selected. Alias names are italic.
- Default pattern: `assets/patterns/desktop.png`. The Appearance panel switches between Mac OS Default, Dithered Sky (WebGL), Classic Gray and Solid Teal, and the choice is kept in localStorage.
- Window defaults are fractions of the free desktop, so the layout spreads at any size.
- At ≤700px, windows stack and nothing drags.

## Manual (`src/manual/`)

**Material.** White stock and black ink, plus one gray for notes and captions. No accent color. Links are underlined ink; on hover they invert (ink ground, paper text), the Mac highlight. Selection inverts the same way.

| token | value | use |
|---|---|---|
| `--paper` | `#fdfdfc` | ground |
| `--ink` | `#141414` | text, rules, figures |
| `--ink-2` | `#555553` | captions, margin notes, meta (≈7:1) |
| `--hair` | `#cdcdc8` | table row rules, callout rules |
| `--tint` | `#eeeeeb` | disabled fields |

**Type.** EB Garamond Variable (self-hosted via `@fontsource-variable`), body at 1.25rem/1.5 with oldstyle figures. Tables use lining tabular figures and all-small-caps headers. Chicago appears *only* on on-screen chrome, i.e. `.mac-btn`. The cover title tops out at 6rem.

**Structure.**
- Sticky running head: name on the left, contents on the right (numeral plus short title).
- Cover: title, italic tagline, links row, a 1-bit portrait figure, and a hairline foot line.
- Chapters: a 2px rule, then a grid with a `14rem` margin column (big numeral and an italic note) and the body. Paragraphs are capped at 34em.
- Ruled tables: 2px top rule, hairline rows, 1px ink bottom rule. Captions read "Table n-n" and sit above the table.
- The contact form is a numbered procedure. Fields are 1px ink boxes with square corners. The default button has the Toolbox heavy ring.
- The index at the end has dotted leaders and anchor refs. Colophon last.

**Figures.** True 1-bit PNGs in `src/assets/manual/`:
- `portrait-1bit.png` comes from `src/assets/discord/abjhfjljklks1.jpg` via ffmpeg: gray mix, curves, error diffusion, monob. It displays `pixelated`.
- `desktop-1bit.png` is a 1280×800 capture of `/desktop`, thresholded at 150 to monob. It displays smoothed.

**Motion.** There's one moment. Clicking Figure A-1 draws the Mac zoom rect from the figure to the full viewport (`utils/zoomRect`), then routes to `/desktop`. It's skipped under reduced motion. The only other motion is the instant invert on hover.

**Don't.** No cards, eyebrow labels, gradients, shadows (except the default-button ring), second accent color, or Chicago in running text.

## Content

Facts live in `src/data/content.js`, the repo list in `useRepos` and the mail logic in `useMailForm`, all shared by both worlds. Rules: nothing invented, and no placeholders ship.
