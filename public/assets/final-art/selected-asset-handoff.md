# Sticker Swap — Selected Asset Handoff

Curated final art for the **Matchday Foil Table** visual system. All files live in
`public/assets/final-art/selected/`. Originals are preserved untouched in `~/Downloads`
(ChatGPT image exports). Selection is by visual content, not filename — the source files
were named generically (e.g. `ChatGPT Image Jun 11, 2026 at ...`).

QA standard applied: generic faceless silhouettes, generic card/foil shapes, abstract
pitch lines and arrows only. No real logos, badges, club/national marks, flags, trophies,
readable baked text, player likenesses, or betting/payment cues.

---

## 1. app-icon-master.png  ★ latest set (7:04 PM)
- **Original:** `ChatGPT Image Jun 11, 2026 at 07_04_10 PM (1).png`
- **Dimensions:** 1254 × 1254 (1:1 square)
- **Visual:** Rounded-square app icon — three overlapping foil football-sticker cards
  (teal / gold / purple faceless silhouettes) with bright central gold swap arrows on a
  dark-teal pitch background with corner foil highlights.
- **Target use:** Master app icon → derive `icon-512`, `icon-192`, `icon-180`,
  `icon-maskable-512`, favicon.
- **Why selected:** Newest, most polished icon variant. Exactly matches the brief
  (3 cards + swap arrows + dark teal). Cleaner bevel and foil than the earlier 5:00 PM
  variant (kept in rejected-reference).
- **Crop/overlay:** None. Already icon-shaped. For maskable, inset artwork ~10% for the
  adaptive safe zone. Downscale with high-quality resampling.
- **Production-ready:** Yes (as master; needs resizing to icon set).

## 2. accepted-offer-confirm-handover-artwork.png  ★ latest set (7:04 PM)
- **Original:** `ChatGPT Image Jun 11, 2026 at 07_04_10 PM (5).png`
- **Dimensions:** 1672 × 941 (≈16:9)
- **Visual:** Two hands exchanging cream sticker cards over an open sticker album/book on
  a dark table, curved gold arrows showing the physical handover. Faceless silhouettes.
- **Target use:** Accepted-offer / confirm-handover modal + artwork.
- **Why selected:** Newest set, clean 16:9, and a textbook match for the handover brief
  (hands + open album + curved arrows).
- **Crop/overlay:** Safe to crop edges. Apply a dark gradient on the side that carries HTML
  copy. Use as a background behind the confirm CTA.
- **Production-ready:** Yes.

## 3. best-move-card-artwork.png
- **Original:** `ChatGPT Image Jun 11, 2026 at 05_00_52 PM (1).png`
- **Dimensions:** 1731 × 909 (≈1.9:1, wide)
- **Visual:** Two facing groups/stacks of foil cards with glowing gold curved swap arrows
  between them; one featured highlighted card per side — clear "you have one, they have one".
- **Target use:** Best Move / useful-trade card background.
- **Why selected:** Strongest "trade scene" — symmetrical, energetic, exactly the
  facing-stacks composition the brief calls for.
- **Crop/overlay:** Center-weighted; safe to crop ends to fit a card. Mild dark overlay if
  HTML text sits on top.
- **Production-ready:** Yes.

## 4. achievement-milestone-modal-artwork.png
- **Original:** `ChatGPT Image Jun 11, 2026 at 05_00_52 PM (2).png`
- **Dimensions:** 852 × 1846 (portrait)
- **Visual:** Glowing central featured foil card with two supporting cards behind, gold
  confetti and radial celebration burst. No text. Premium gold/teal.
- **Target use:** Achievement / milestone modal artwork.
- **Why selected:** Best celebration composition — featured hero card + supporting cards +
  gold burst, matches brief exactly.
- **Crop/overlay:** Portrait; for a landscape/centered modal, crop to the central column or
  place behind a centered card. Subject is centered so vertical crops are safe.
- **Production-ready:** Yes (crop to target aspect).

## 5. invite-landing-hero.png
- **Original:** `ChatGPT Image Jun 11, 2026 at 05_00_29 PM (5).png`
- **Dimensions:** 1448 × 1086 (≈4:3)
- **Visual:** Phone on the right showing a group/avatar UI with a swap arrow; floating foil
  sticker cards and connected avatar nodes; darker, text-safe left area.
- **Target use:** Invite landing hero (also reusable for join/create-group hero).
- **Why selected:** Only candidate with the phone + social/avatar/group UI the invite hero
  needs, with a usable dark left text area.
- **Crop/overlay:** NOT 16:9 — crop top/bottom to ~16:9 keeping the phone on the right.
  Extend/overlay a dark gradient on the left for headline + CTA copy.
- **Production-ready:** Near — needs a 16:9 crop + left gradient.

## 6. pwa-splash-background.png
- **Original:** `ChatGPT Image Jun 11, 2026 at 05_00_37 PM (1).png`
- **Dimensions:** 853 × 1844 (portrait)
- **Visual:** Foil sticker cards scattered across a dark-teal pitch with faint swap arrows;
  calm, dark, atmospheric.
- **Target use:** PWA splash / loading background (portrait).
- **Why selected:** Portrait, dark-centred, leaves room for a loading lockup — fits the
  splash crop note in the existing manifest.
- **Crop/overlay:** Center stays dark enough for a centered logo/spinner. Safe to crop for
  device aspect ratios.
- **Production-ready:** Yes.

## 7. group-progress-artwork.png
- **Original:** `ChatGPT Image Jun 11, 2026 at 05_00_44 PM (6).png`
- **Dimensions:** 1422 × 1106 (≈1.29:1)
- **Visual:** Three blank cream sticker cards arranged in a swap-cycle triangle with gold
  arrows on a dark-teal pitch. Clean and uncluttered (blank cards = no IP risk).
- **Target use:** Group progress / swap-cycle artwork (also a generic empty/collection
  background).
- **Why selected:** Cleanest of the swap-cycle variants; blank cards make it the safest,
  most reusable. A messier near-duplicate was rejected.
- **Crop/overlay:** Generous dark margins — crop freely; overlay HTML text anywhere.
- **Production-ready:** Yes.

## 8. store-screenshot-background.png
- **Original:** `ChatGPT Image Jun 11, 2026 at 05_00_44 PM (1).png`
- **Dimensions:** 1536 × 1024 (3:2)
- **Visual:** Many cream foil cards scattered across a green table with faint swap arrows —
  atmospheric "table" texture.
- **Target use:** Store screenshot backdrop / generic marketing background.
- **Why selected:** Useful atmospheric background with no overlap with the other selects;
  fills the store-screenshot slot.
- **Crop/overlay:** Pure background — overlay device frames or copy freely.
- **Production-ready:** Yes (background only).

---

## Rejected / reference (in `rejected-reference/`)
- `app-icon-earlier-variant.png` — earlier 5:00 PM app-icon take; superseded by the newer,
  more polished 7:04 PM master. Kept only for reference.
- `swap-cycle-weaker-duplicate.png` — messier near-duplicate of `group-progress-artwork.png`.

## Ignored in Downloads
- `content.png` — personal photo (person fishing). Not a project asset.

## Optimisation note
All selects are large PNGs (1.7–2.4 MB). Before shipping, export to WebP/AVIF and place
final replaceable artwork under `public/assets/artwork/` per `ASSET-BRIEF.md`. These PNGs
are the high-quality masters.
