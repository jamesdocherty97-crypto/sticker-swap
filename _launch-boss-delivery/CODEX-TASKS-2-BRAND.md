# CODEX-TASKS-2 - Brand Asset Round (image generation)

You are OpenAI Codex, production assistant on Sticker Swap. Round 2: brand
assets. The in-app brand system already shipped (inline `icon.svg` mark +
foil-gradient wordmark) - your job is the rendered/painted assets that code
can't produce. Same ground rules as CODEX-TASKS.md (branch off `main`, one
task per commit prefixed `codex:`, `npm run qa` must pass, update `sw.js`
APP_SHELL + bump CACHE_NAME if app-shell assets change, and the absolute IP
guardrails: generic/fictional only, no official marks, player likenesses,
kits, badges, or readable text in images except where specified).

## Brand definition (the source of truth)

- **The mark**: the existing `icon.svg` - tilted white sticker card with gold
  rim, teal+gold swap arrows, generic ball, on deep navy rounded square.
  Do not redesign it; render and enrich it. NOTE: your first flat redesign was reverted by review - the original mark (white card, gold rim, ball, crisp arrows) is the brand; B1 means a RICHER render of THAT composition, not a new shape.
- **The wordmark**: "STICKER SWAP" in Bebas-style condensed caps with a foil
  gold gradient (#e8b73a → #ffe9a3 → #f5c842 → #d9a52e → #ffe066).
- **Palette**: deep navy #061326, floodlight blue #0ea5e9, foil gold #f5c842,
  pitch green #22c55e, sticker white #f2f7ff.
- **World**: kitchen-table sticker swap, floodlit match night behind you.
  Sticker is the hero, football is atmosphere.

## Task B1 - Painterly icon render (replaces the PNG icon set)

Generate a rich painted/3D render of the icon.svg composition (foil glints on
the gold rim, subtle paper texture on the card, soft floodlight bloom on the
navy) and export: icon-512.png, icon-192.png, icon-180.png, and
icon-maskable-512.png (same art with safe-zone padding ~80px on a full-bleed
navy square). Each ≤150 KB except 512 ≤200 KB. Keep the silhouette identical
to icon.svg so the SVG fallback still matches. Update nothing else - the
manifest already points at these filenames.

## Task B2 - DONE (og-share.jpg shipped in your branding pass; reviewer kept it)

## Task B3 - Social launch pack (new folder `social/`, NOT in APP_SHELL)

- `social/launch-square.png` 1080×1080 and `social/launch-story.png`
  1080×1920: mark + wordmark + one line "Your friends already have the
  stickers you need." + disclaimer footer. Leave clear space for the link.
- `social/wordmark.png` 1600×400 transparent: foil wordmark alone.
- All text must be the specified lines only, rendered cleanly (no AI-garbled
  glyphs - composite real text over generated backgrounds, don't ask the
  image model to draw type).

## Task B4 - Splash/background harmony pass

`assets/02_pwa_splash_background.webp` sits behind the new lockup on every
screen. If the current art fights the mark (busy highlights top-left/center),
regenerate it calmer: darker center vignette, floodlight bloom kept to upper
corners. Same filename, ≤150 KB. Skip if it already reads clean behind the
loading screen at 390×844.

## Task B5 - Store screenshot refresh

Re-capture the 5 `store/*.webp` screenshots from `index.html?demo=1` AFTER
this brand pass is merged (the topbar/loading lockup changed), same filenames,
same 1290×2796 framing, same captions.

## Reporting

Append one line per task to CODEX-REPORT.md. If a generation can't meet a
guardrail, stop and note it rather than improvising.
