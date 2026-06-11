# Sticker Swap Asset Brief

Sticker Swap now uses the **Matchday Foil Table** visual system.

The product should feel like friends finishing a sticker album together around a table on a floodlit match night: midnight pitch atmosphere, cream sticker paper, foil shine, packs, album slots, and swap motion. The sticker table is the hero; football-adjacent energy stays generic and atmospheric.

## Core Motifs

- Sticker edge: cream paper, slight tilt, tactile collectible feel.
- Foil shine: gold/teal/coral light sweep, used sparingly for delight.
- Pack: unopened-pack anticipation for onboarding and empty states.
- Album slot: progress, missing spaces, and collection completion.
- Swap arrows: social motion between friends.

Reusable SVG motifs live in `public/assets/motifs/`. Brand tokens live in `public/assets/brand/tokens.css`.

## Legal/IP Guardrails

Assets and demo data must be fictional, generic, and public-safe.

Do not use:

- FIFA, UEFA, Panini, World Cup, publisher, club, national association, sponsor, kit, badge, flag, official ball, trophy, or tournament symbols.
- Real player names, faces, likenesses, official kits, or copied album/checklist layouts.
- National flags as brand identity.
- Readable generated text inside artwork.

Keep visible text in HTML/CSS so it can be reviewed, localized, and changed without regenerating artwork.

## Active PWA Assets

- `icon.svg`, `icon-180.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`: cream sticker card on midnight pitch with foil swap arrows.
- `manifest.webmanifest`: midnight pitch theme/background colors.
- `sw.js`: caches the PWA shell, active artwork, and public motif kit.

## Raster Artwork

Existing WebP scene assets under `assets/` remain compressed launch artwork. When new raster artwork is added, prefer WebP/AVIF-ready paths under `public/assets/artwork/`, keep files small, and document any source/legal notes outside the pixels.
