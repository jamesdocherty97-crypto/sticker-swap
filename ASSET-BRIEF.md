# Sticker Swap Asset Brief

Sticker Swap should feel like a matchday companion for finishing your sticker album with your group.

Core hook: "Your friends already have the stickers you need. Sticker Swap finds the best trade."

## Visual World

The app should never feel like a utility tracker, fantasy football product, live-score app, team-news app, or betting app. The world is stickers, friends, swaps, albums, packs, and completion, wrapped in floodlit match-night atmosphere.

Use these five repeatable motifs:

- The swap table: real-world, social, physical trading. Use for hero, Swaps, onboarding.
- The album page: progress, completion, collecting. Use for Collection and progress cards.
- The unopened pack: habit loop and "what did I get?" excitement. Use for empty states and onboarding.
- The foil sticker: delight, rarity, reward. Use for spares, milestones, completion.
- The floodlit pitch: big tournament energy without official branding. Use as background atmosphere, not as the main subject.

## Legal/IP Guardrails

Assets must be generic, fictional, and rights-safe.

Avoid:

- Panini, FIFA, UEFA, club, national association, tournament, sponsor, kit, badge, or official football marks.
- Real footballer likenesses, real kits, or recognisable player photos.
- National flags as brand identity.
- Stock-photo smiling groups.
- Generic action-player, live-score, fantasy football, news, betting, or marketplace imagery.
- Readable text inside generated images unless deliberately added later by the app.

## Numbered Asset Library

All generated source PNGs are preserved under `.codex/generated_images/`. The app uses the compressed WebP files in `assets/`.

| Asset | Purpose | Where used now | Size |
| --- | --- | --- | --- |
| `assets/01_app_icon.webp` | Generated app-icon candidate: blank sticker, foil swap arrows, generic ball | Asset source only. Existing deterministic PWA icons remain active. | about 73 KB |
| `assets/02_pwa_splash_background.webp` | Launch/background atmosphere: album under floodlit match-night lighting | App background and top bar | about 80 KB |
| `assets/03_landing_hero.webp` | Main promise: friends trading at the swap table | Create/join group screen | about 57 KB |
| `assets/04_create_group_hero.webp` | Starting a group around an album table | Profile/start screen | about 82 KB |
| `assets/05_join_group_hero.webp` | Joining by invite card | Library asset for future join-specific screen | about 86 KB |
| `assets/06_collection_empty_state.webp` | Album page and first-pack energy | Collection hero and generic empty states | about 85 KB |
| `assets/07_spares_empty_state.webp` | Unopened-pack and spare-card habit loop | Pack Luck / More tools card | about 78 KB |
| `assets/08_swaps_empty_state.webp` | No swaps yet, invite friends and track spares | Swaps empty states | about 85 KB |
| `assets/09_best_move_card_art.webp` | The emotional centre: two friends have the right trade | Swaps hero and Best Move card | about 78 KB |
| `assets/10_incoming_offer_art.webp` | Friend offers a sticker toward the viewer | Library asset for future incoming-offer card art | about 76 KB |
| `assets/11_confirm_handover_art.webp` | In-person physical handover after acceptance | Trade sheet and handover pop-ups | about 86 KB |
| `assets/12_group_progress_art.webp` | Group album progress around the swap table | Group hero, group cards, ticker, race, table-charge pop-ups | about 124 KB |
| `assets/13_completion_milestone_art.webp` | Foil sticker reward and completion delight | Achievement, milestone, team-complete, and swap-complete pop-ups | about 110 KB |
| `assets/14_social_share_card_background.webp` | Share-card background with blank cards and table action | Library asset for future share/social creative | about 52 KB |
| `assets/15_store_screenshot_background.webp` | App-store screenshot frame background | Library asset for future store screenshots | about 110 KB |

## Launch-Critical Additions

These assets were added after the public MVP creative audit on 10 June 2026.

| Asset | Purpose | Where used now | Size |
| --- | --- | --- | --- |
| `og-share.jpg` | Social and invite-link preview image | Open Graph and Twitter preview meta tags | about 90 KB |
| `assets/share-slide-background.webp` | Generated source/background for the social share image | Source asset for future share-card refreshes | about 58 KB |
| `assets/empty-calm-state.webp` | Calm before-state for no stickers, no spares, no swaps | Empty states across Collection, Swaps, and Group | about 67 KB |
| `assets/milestone-clean.webp` | Clean single-subject foil reward | Achievement, milestone, team-complete, and swap-complete pop-ups | about 62 KB |
| `assets/onboard-portrait.webp` | Portrait-safe onboarding background | Create/join and profile setup screens | about 117 KB |
| `icon-maskable-512.png` | Android adaptive icon with safe-zone padding | Manifest maskable icon | about 146 KB |

The active `icon-512.png` has also been optimised to about 132 KB and is no longer marked as maskable in the manifest.
The active `icon.svg` has been redrawn as the flat/vector fallback for the same silhouette: tilted blank sticker card, ball bottom-left, teal arrow, gold arrow.

## Legacy Assets (removed from repo)

Earlier-generation WebP assets (`empty-album-state`, `group-table-state`, `handover-swap-state`, `milestone-complete-state`, `pitch-texture`, `football-matchday-action`, `football-boot-ball-detail`, `football-goal-burst`) were unreferenced by the app and have been removed from the repository to keep it lean and on-brand. They are preserved in the owner's local handover package and zip if ever needed. Do not reintroduce generic ball/action assets as primary UI art.

## Implementation Notes

- Keep the app grounded in the physical swap table. Pitch/stadium energy should support the sticker world, not replace it.
- Use WebP for generated scene assets and keep each under roughly 150 KB where practical.
- Decorative background images do not need alt text. Add alt text only when an image is meaningful foreground content.
- Update `sw.js` whenever an app-shell asset is added or removed.
- Re-run checks after asset work: referenced files exist, manifest icons exist, service worker cache entries exist, no stale private/official asset names appear, and no old JPG hero references return.
- Keep the visible disclaimer in product surfaces and social assets: "Unofficial fan tool. Not affiliated with or endorsed by any sticker publisher, federation, or tournament."
