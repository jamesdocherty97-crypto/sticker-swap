# Codex Implementation Notes — Final Art

All curated masters live in `public/assets/final-art/selected/`. Don't hunt through
Downloads — everything Codex needs is here. Originals remain in `~/Downloads` untouched.
Full rationale + dimensions in `selected-asset-handoff.md` (same folder).

## Asset → screen mapping

| Production file (selected/) | Screen / surface | Aspect | Notes |
| --- | --- | --- | --- |
| `app-icon-master.png` | App icon → `icon-512/192/180/maskable`, favicon | 1:1 | Master; resize down |
| `pwa-splash-background.png` | Splash / loading screen | portrait | Dark center for lockup |
| `invite-landing-hero.png` | Invite landing hero (reuse: create/join group hero) | crop → 16:9 | Phone right, text left |
| `best-move-card-artwork.png` | Best Move / suggested-trade card | ~1.9:1 wide | Center composition |
| `accepted-offer-confirm-handover-artwork.png` | Accepted offer / confirm handover modal | 16:9 | Hands + album |
| `achievement-milestone-modal-artwork.png` | Achievement / milestone modal | portrait → crop | Centered hero card |
| `group-progress-artwork.png` | Group progress / collection background | ~1.3:1 | Blank cards, safest |
| `store-screenshot-background.png` | Store screenshots / marketing backdrop | 3:2 | Background only |

## Recommended CSS (object-fit / object-position)

```css
/* Wide hero/scene art behind HTML copy */
.hero-art, .best-move-art, .handover-art {
  width: 100%; height: 100%;
  object-fit: cover;
}
/* App icon-style master is centered already */
.invite-hero        { object-position: right center; } /* keep phone, crop left */
.best-move-art      { object-position: center; }
.handover-art       { object-position: center; }
.achievement-art    { object-position: center; }       /* hero card is centered */
.splash-bg          { object-fit: cover; object-position: center; }
```

## Dark gradient overlays (keep text in HTML/CSS, not baked into art)

```css
/* Left-anchored copy (invite hero) */
.invite-hero-wrap::before {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(90deg, rgba(6,20,24,.92) 0%, rgba(6,20,24,.55) 45%, rgba(6,20,24,0) 75%);
}
/* Centered copy / CTA (handover, best move, achievement) */
.modal-art-wrap::after {
  content: ""; position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, rgba(6,20,24,0) 40%, rgba(6,20,24,.85) 100%);
}
```
Use the midnight-pitch tone from `public/assets/brand/tokens.css` for overlay colours so
overlays match the brand rather than the hard-coded `#06141 8` above.

## Crop / prep still needed
- **invite-landing-hero.png** — source is 4:3. Crop to 16:9 keeping the phone on the right;
  add the left dark gradient for headline + CTA. This is the only asset needing real crop work.
- **achievement-milestone-modal-artwork.png** — portrait. Crop to the central column for a
  landscape/centered modal (subject is centered, so safe).
- All others are usable as-is with `object-fit: cover`.

## Filled vs. still-placeholder slots

**Now covered by final art (8):** app icon, splash background, invite hero, best move,
confirm handover, achievement/milestone, group progress, store-screenshot background.

**Still placeholder / no dedicated final art yet (keep current placeholders):**
- `empty-no-stickers`, `empty-no-spares`, `empty-no-swaps` — group-progress-artwork can be
  reused as a temporary background, but no purpose-built empties were generated.
- `incoming-offer-artwork` — no dedicated asset. Reuse best-move or confirm-handover until one exists.
- `swap-complete-artwork` — reuse achievement/milestone as a stand-in.
- `social-share-og-background` (1200×630) — existing `og-share.png` is legacy baked-text and
  NOT reset-final; no replacement generated. Keep placeholder, composite text in HTML/CSS or
  export after legal review.
- `profile-setup-background`, `collection-tab-hero`, `join-group-hero`, `create-group-hero` —
  reuse invite hero / splash / group-progress; no separate finals.

## Next steps for Codex
1. Generate the icon set from `app-icon-master.png` (512/192/180 + maskable, ~10% inset) and
   wire into `manifest.webmanifest` / `index.html`.
2. Crop `invite-landing-hero.png` to 16:9 + add left gradient; wire into the invite state.
3. Wire best-move, confirm-handover, achievement, group-progress behind their states with the
   overlay CSS above (text stays HTML/CSS).
4. Convert all selected PNG masters to WebP/AVIF and move final copies to
   `public/assets/artwork/` (the convention in `ASSET-BRIEF.md`); add to the `sw.js` cache list.
5. Leave the placeholder slots above as-is for now — flagged, not blocking launch.
6. Re-run `npm run qa` after wiring to confirm `all referenced local assets exist`.

## Project structure created
```
public/assets/final-art/
  selected/                 8 curated masters (production filenames)
  rejected-reference/       2 superseded/duplicate references
  selected-asset-handoff.md
  codex-implementation-notes.md
```
