# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Mostly other developers: open-source people, peers, and friends who clicked through from GitHub, Codeberg, X or a chat. They want to know who Aurora is, what they build, and how to reach them. Hiring managers are a secondary audience, not the target.

## Product Purpose

Aurora's personal site at convolutionary.dev. It works as a bio, a project index backed by live GitHub repos, a home for future writing, and a contact point. It succeeds when a visiting dev gets a sense of the person, finds the projects, and has an obvious way to get in touch.

## Positioning

A self-taught developer who has been programming since 2017, works across the stack (Go, Rust, TypeScript, Python, Java; React/Next, Nest, Spring), and does automation and browser tooling (Puppeteer, Selenium). The site has personality: the Mac OS 8 desktop is a known part of its identity.

## Capabilities and Constraints

- CRA (react-scripts 5), React 18, hash router, deployed to GitHub Pages by `.github/workflows/deploy.yml`. Tailwind 3 is in the project but only used for utility spacing.
- Live repo list from `api.github.com/users/convolutionary/repos` (unauthenticated, so rate limited; needs a failure state).
- Contact form posts to web3forms, with a honeypot and a 60s client cooldown.
- Blog route `/blog/:id`. There's only one post and it's a placeholder.
- Confirmed direction (2026-09-26): a hybrid. A clean main page comes first, and the Mac OS 8 desktop stays as a secondary mode or easter egg.

## Brand Commitments

- Name: Aurora. Domain: convolutionary.dev. Handles: github/convolutionary, codeberg/Dyslexic, x/Nocixa. Email cerfnet@anche.no.
- Voice: lowercase and casual is fine; dry and direct, no hype.
- Existing assets: profile photo `src/assets/discord/abjhfjljklks1.jpg`, pfp.png, banner.gif, Chicago font, PGP key `src/pgp.txt`, language/framework logos.

## Evidence on Hand

- Real: GitHub repos (live), tech list in `src/components/images.js`, programming since 2017.
- Not real: no testimonials, clients, employer history or metrics. Don't invent them. "Coffee cups" style stats are gone.
- Telegram link has no handle, so it stays out until the user provides one.

## Product Principles

1. Show real work (repos, writing) instead of claims about yourself.
2. Personality lives in the details and the retro mode, not in making the main page hard to read.
3. Everything on the page is true and current. Placeholders don't ship.
