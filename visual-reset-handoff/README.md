# Sticker Swap Visual Reset Handoff Pack

## PR / Branch Summary

- Branch: `master`
- Visual reset commit: `3196f04 Replace brand with Matchday Foil Table system`
- Direction: Matchday Foil Table: midnight pitch, cream sticker paper, foil shine, table-based social swap motion, generic football-adjacent atmosphere.
- Removed/refactored from active app surfaces: tournament/country/flag/real-player demo album content, old red/chrome icon direction, old theme/background colors.
- Not generated here: final replacement raster artwork. Screenshot fixtures and the OG preview are placeholders for review/handoff only.

## Exact Changed Files In Visual Reset Commit

- `ASSET-BRIEF.md`
- `assets/02_pwa_splash_background.webp`
- `assets/06_collection_empty_state.webp`
- `assets/07_spares_empty_state.webp`
- `assets/09_best_move_card_art.webp`
- `assets/11_confirm_handover_art.webp`
- `assets/12_group_progress_art.webp`
- `assets/empty-calm-state.webp`
- `assets/milestone-clean.webp`
- `assets/onboard-portrait.webp`
- `database.rules.json`
- `icon-180.png`
- `icon-192.png`
- `icon-512.png`
- `icon-maskable-512.png`
- `icon.svg`
- `index.html`
- `manifest.webmanifest`
- `og-share.png`
- `package.json`
- `public/assets/README.md`
- `public/assets/artwork/README.md`
- `public/assets/brand/app-icon.svg`
- `public/assets/brand/tokens.css`
- `public/assets/motifs/album-slot.svg`
- `public/assets/motifs/foil-shine.svg`
- `public/assets/motifs/pack.svg`
- `public/assets/motifs/sticker-edge.svg`
- `public/assets/motifs/swap-arrows.svg`
- `quick-test.html`
- `scripts/qa-check.js`
- `scripts/serve.js`
- `sw.js`

## Handoff Pack Files

- `visual-reset-handoff/README.md`
- `visual-reset-handoff/asset-manifest.json`
- `visual-reset-handoff/fixture.html`
- `visual-reset-handoff/screenshots/*.png`

## npm / Test / Build Results

All commands passed after the visual reset commit:

- `npm run format` - PASS (`manifest.webmanifest parses`, `index.html module script parses`)
- `npm run typecheck` - PASS (`manifest.webmanifest parses`, `index.html module script parses`)
- `npm test` - PASS (full QA suite)
- `npm run build` - PASS (full QA suite)
- `npm run qa` - PASS (full QA suite)

Full QA checks passed:

- `database.rules.json parses`
- `manifest.webmanifest parses`
- `index.html module script parses`
- `quick-test opens demo mode`
- `production not-configured state exists`
- `demo boot returns before Firebase config`
- `service worker cached assets exist`
- `all referenced local assets exist`
- `no stale nickname-keyed production writes`
- `forbidden quick-complete labels absent`
- `rules are not open by group code alone`

## Screenshots

Screenshots are in `visual-reset-handoff/screenshots/`. They are fixture captures using the committed brand tokens/motifs. Dynamic app states that require live group data are represented as clearly scoped handoff fixtures, not final raster art.

| Surface | Screenshot |
| --- | --- |
| App icon / manifest icon preview | `screenshots/01-app-icon-manifest-preview.png` |
| Splash/loading | `screenshots/02-splash-loading.png` |
| Landing page mobile | `screenshots/03-landing-page-mobile.png` |
| Landing page desktop | `screenshots/04-landing-page-desktop.png` |
| Invite page | `screenshots/05-invite-page.png` |
| Create group | `screenshots/06-create-group.png` |
| Join group | `screenshots/07-join-group.png` |
| Profile setup | `screenshots/08-profile-setup.png` |
| Collection tab | `screenshots/09-collection-tab.png` |
| No stickers empty state | `screenshots/10-no-stickers-empty-state.png` |
| No spares empty state | `screenshots/11-no-spares-empty-state.png` |
| No swaps empty state | `screenshots/12-no-swaps-empty-state.png` |
| Best move card | `screenshots/13-best-move-card.png` |
| Incoming offer | `screenshots/14-incoming-offer.png` |
| Accepted / confirm handover | `screenshots/15-accepted-confirm-handover.png` |
| Swap complete | `screenshots/16-swap-complete.png` |
| Group progress | `screenshots/17-group-progress.png` |
| Achievement modal | `screenshots/18-achievement-modal.png` |
| Social / OG preview placeholder | `screenshots/19-social-og-preview-placeholder.png` |

## Asset Manifest

See `visual-reset-handoff/asset-manifest.json`.

It includes:

- filename
- required dimensions
- current placeholder path
- final destination path
- whether text is HTML/CSS or baked
- crop notes

## Missing Surfaces / Assumptions

- There are no separate route files for invite/create/join; they are implemented as states inside the single static PWA shell. The screenshot pack shows these as fixture states.
- Incoming offer, accepted handover, swap complete, and achievement modal are dynamic states driven by app data/events. The screenshots show handoff fixtures using the reset system.
- The existing `og-share.png` is still a legacy baked-text raster. It is documented in the manifest as not reset-final. The handoff includes an HTML/CSS placeholder preview only; no final social raster was generated.
- Existing WebP scene assets under `assets/` are treated as launch placeholders. The manifest proposes future destinations under `public/assets/artwork/` for final replaceable artwork.
- The final visual reset commit intentionally did not stage old handoff folders, zips, scratch files, or unused legacy assets.
