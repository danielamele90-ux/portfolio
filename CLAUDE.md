# Daniela Mele — Portfolio

Personal portfolio of Daniela Mele, Product Designer (mid level) in Berlin.
Live: https://portfolio-ten-tau-62nq9qv66v.vercel.app (Vercel Hobby, auto-deploys from `main`).
Planning, decisions and the content manual live in Notion: "Portfolio Manual" (under Freelance → The Process).

@AGENTS.md

## Working with Daniela

- Talk to her in Italian; all site copy is in English.
- **Ask before changing anything.** A question about method is not a go-ahead. She approves copy before it goes live.
- **Preview first.** Build new work on a branch; Vercel publishes it at
  `https://portfolio-git-<branch>-danielamele90-ux.vercel.app` (send her that branch link, not a single-deploy link).
  Merge to `main` only after she says "vai".
- Feedback format she uses: *page · element · what's wrong · what you want*.
- Never invent facts, numbers or quotes. If a case study step (A–G) didn't happen, say so in one line.

## Copy rules

- **No em dashes (—) in visible text.** Use ";", "." or ":" instead.
- Positioning: "Product Designer focused on complex user journeys". No "services" in titles; no niche label (e.g. "AI agents designer") until a project proves it.
- Case study backbone: A Business problem → B Research → C Prioritisation → D Hypothesis + metrics → E Design → F Testing → G Handoff/rollout. Weight varies per project.
- Section headings: small lowercase label with a dot (e.g. `problem.`) + a statement heading that says what happened.
- Every case study opens with an executive summary: Problem → Decision → Result + 1 visual.

## Design system

- Fonts: Inter (body, `--font-inter`), Bricolage Grotesque (display, `font-display`).
- Palette tokens in `app/globals.css`: White `#FFFFFF`, Primary `#594074`, Grey `#333333` (text), 60 `#6E6878` (muted), Neutral `#EAE6E0` (surface), Secondary `#DD6E1F`, Footer `#645375`.
- Secondary orange: large text, accents and graphics only (too little contrast for small text on white).
- **Motion hierarchy:** one expressive moment per page (homepage: the hero ribbon). Everything else small and calm. Every animation must respect `prefers-reduced-motion`.

## Structure

- `app/page.tsx` — homepage: hero (`HeroRibbon`, `FlowText` subtitle), work cards, About (animated portrait), `HowIWork` cards, footer.
- `app/data/projects.ts` — cards + executive summaries. `app/data/caseStudies.ts` — full case study content (MAB, The Morrow Hotel).
- `app/work/[slug]/page.tsx` — case study page. MeetFIT and App for Expat families (KZE) are placeholders.
- `app/components/` — `SiteHeader` (sticky, "Get in touch"), `SiteFooter` (contacts, beating heart), `CaseSections`, `SummaryVisual`, `CoverImage` (supports `rotate`), `HeroRibbon`, `FlowText`, `HowIWork`.
- Images in `public/images/` as WebP. Originals are in Daniela's Desktop folder "Claude website".
- Branch `hero-animation` keeps an alternative hero (falling "Product Designer" letters), not merged.

## Checks before pushing

```bash
npx next typegen && npx tsc --noEmit && npm run lint && npm run build
```

In sandboxes without access to Google Fonts, `next build` fails on `next/font/google`; that is an environment limit, not a code error (Vercel builds fine). Check desktop and 390px mobile: no horizontal scroll.

## Open items (Nov 2026)

- MAB live coded prototype (Daniela drives it; see manual How-to C). Card tag "Live prototype" stays.
- Connect the Aruba domain in Vercel on Nov 17–18 (don't touch MX records).
- Decide before launch (Nov 20): complete or hide the MeetFIT and Expat families placeholders.
- MAB: add how she judged AI solution A vs B (waiting for her reasoning).
