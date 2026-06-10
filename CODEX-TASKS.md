# CODEX-TASKS - Delegated Production Work

You are OpenAI Codex, working as production assistant on Sticker Swap under the
launch boss (Claude). These tasks are mechanical, asset, and sweep work. Do them
precisely; do not redesign the product, change the data model, or touch the
swap lifecycle, Firebase rules, or identity code.

## Ground rules (non-negotiable)

1. Work on a branch off `fable/launch-boss-pass` (or `main` after the PR merges).
   Never force-push, never touch `main` directly, never deploy, never create or
   mutate Firebase, never commit secrets or service-account JSON.
2. `index.html?demo=1` and `quick-test.html` must keep working after every task.
3. Run `npm run qa` after every task - all 11 checks must PASS. If you add,
   rename, or remove any app-shell asset, update `APP_SHELL` in `sw.js` and
   bump `CACHE_NAME` (e.g. `sticker-swap-public-v6` → `v7`) in the same commit.
4. IP guardrails for ALL generated images: generic and fictional only. No
   Panini/FIFA/UEFA/club/national-association marks, no real player likenesses
   or recognisable faces, no real kits or badges, no national flags as brand
   identity, no readable text baked into images (except the disclaimer on
   og-share, see below), no betting/fantasy/live-score aesthetics. Tone:
   "kitchen-table sticker swap, floodlit match night behind you" - sticker is
   the hero, football is atmosphere. Palette: deep navy #061326, floodlight
   blue #0ea5e9, foil gold #f5c842, pitch-green accents #22c55e, sticker-white
   cards.
5. Keep existing filenames and paths so no code changes are needed. WebP for
   scene art, each ≤150 KB. Preserve aspect ratios listed below.
6. One task per commit, commit message prefix `codex:`.

## Task 1 - Image regeneration pass (highest value)

Regenerate any of the 18 `assets/*.webp` files that look weak at mobile size,
keeping the SAME filename and rough composition role:

| File | Role | Composition brief |
| --- | --- | --- |
| 01_app_icon.webp | icon source | blank foil sticker card, swap arrows, generic ball silhouette |
| 02_pwa_splash_background.webp | app background | open album on a table, floodlit night bokeh, dark navy, low contrast (must sit behind text) |
| 03_landing_hero.webp | create/join hero | hands exchanging two sticker cards across a table |
| 04/05_*_hero.webp | create/join variants | same world, different angle |
| 06_collection_empty_state.webp | collection hero | open album page with empty sticker slots |
| 07_spares_empty_state.webp | spares art | small stack of duplicate cards, one foil glinting |
| 08_swaps_empty_state.webp | swaps empty | two empty chairs at a swap table, calm |
| 09_best_move_card_art.webp | Best Move card | two cards mid-exchange, gold rim light |
| 10_incoming_offer_art.webp | offer pop-up | a card being offered toward the viewer |
| 11_confirm_handover_art.webp | handover pop-up | handshake over a table with cards |
| 12_group_progress_art.webp | group hero | album + scattered cards, subtle pitch lines |
| 13_completion_milestone_art.webp | milestone | completed album page, foil shine |
| 14_social_share_card_background.webp | share bg | 1200×630-safe navy/floodlight gradient scene |
| 15_store_screenshot_background.webp | store bg | portrait 1290×2796-safe atmospheric backdrop |
| empty-calm-state.webp | generic empty | calm table, soft paper texture |
| milestone-clean.webp | achievement bg | single foil card, clean dark backdrop |
| onboard-portrait.webp | onboarding bg | portrait table scene, top third calm enough for headline text |

Acceptance: visually consistent set, ≤150 KB each, no text in images,
`npm run check:pwa` passes, demo mode still looks right at 390×844.

## Task 2 - og-share.png rebuild

1200×630 PNG. Layout: left 60% = headline lockup "STICKER SWAP" (Bebas-style
condensed caps, gold) + subline "Create a group. Track your stickers. Find
swaps with friends." (white); right 40% = foil sticker card art from the same
world; bottom edge, small muted type: "Unofficial fan tool. Not affiliated with
any sticker publisher, federation, or tournament." Keep under 300 KB.

## Task 3 - Favicon set

Generate `favicon.ico` (16+32+48) from `icon.svg`. Add
`<link rel="icon" href="favicon.ico" sizes="any">` BEFORE the existing svg icon
link in `index.html`. Add the file to `APP_SHELL` in `sw.js` (and bump cache).

## Task 4 - Store screenshots (for later Android/iOS wrapping)

Produce 5 portrait screenshots (1290×2796) by framing real demo-mode captures
(390×844, 3x scale) onto 15_store_screenshot_background.webp with a short
caption each: 1) "Track your album" (collection), 2) "Find the best trade"
(Best Move), 3) "Offers, not accidents" (incoming offer), 4) "Confirm the
handover together" (accepted state), 5) "Finish the album together" (group).
Save to `store/` (new folder, NOT in APP_SHELL). Use exact in-app screenshots -
do not mock UI that doesn't exist.

## Task 5 - Light-theme contrast sweep

Toggle `body.light` and audit every surface at 390×844: fix any text below
WCAG AA against its background by adjusting only the `body.light` CSS variable
overrides or adding narrowly-scoped `body.light .x{...}` rules. No dark-theme
changes. Screenshot before/after for the PR.

## Task 6 - Accessibility sweep (markup only)

- Add `aria-label` to icon-only buttons that lack one (theme, shiny, nudge ✋).
- Add `alt=""` to purely decorative imgs, meaningful alt elsewhere.
- Ensure `.wish-star` is reachable: wrap in `<button>` styled identically, or
  add `role="button" tabindex="0"` + Enter/Space handler. Do not change visuals.
- Verify focus is visible on all interactive elements; add a minimal
  `:focus-visible` outline style if missing.

## Task 7 - README demo GIF

Record demo mode (390×844): tap a few stickers → open Swaps → accept the
incoming offer → confirm handover → swap completes with celebration. Export
≤4 MB GIF or ≤2 MB webp animation as `docs/demo.gif` (new folder, not cached),
embed at the top of README.md.

## Task 8 - Store listing copy (text only, save as store/LISTING.md)

Short description (≤80 chars), long description (≤4000 chars), keyword list.
Voice: warm, matchday, collector-to-collector. Must include the unofficial-fan-
tool disclaimer and never name real publishers/tournaments.

## Reporting

For each task: one commit, plus a line in `CODEX-REPORT.md` (create it):
task, files touched, QA result, anything skipped and why. Stop and leave a
note in CODEX-REPORT.md instead of guessing if a task conflicts with the
ground rules.
