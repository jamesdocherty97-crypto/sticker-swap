# Sticker Swap — Selected Asset Handoff (corrected)

Curated final art for the **Matchday Foil Table** system. Masters live in
`public/assets/final-art/selected/`; production WebP/icons are wired into the app
(`public/assets/artwork/*.webp`, root `icon-*.png`, `og-share.png`). Downloads originals
preserved. Selection was by visual content, not filename (sources were generic
`ChatGPT Image …` exports). An earlier mapping was corrected after a labelled re-inspection.

QA standard: generic faceless silhouettes, generic card/foil shapes, abstract pitch lines,
hands exchanging stickers. No logos, badges, club/national marks, flags, trophies, readable
baked text, or betting/payment cues in the artwork.

| Production file | Source (Downloads) | Dims | Visual | Use |
| --- | --- | --- | --- | --- |
| app-icon-master.png | …07_04_10 PM (1).png | 1254² | Rounded icon: 3 overlapping foil cards + gold swap arrows, dark-teal pitch | App icon (→ 512/192/180/maskable + favicon) |
| invite-landing-hero.png | …05_00_29 PM (5).png | 1448×1086 (webp→16:9) | Phone with group/avatar UI, avatar nodes, floating foil cards | Invite landing hero |
| pwa-splash-background.png | …05_00_37 PM (1).png | 853×1844 | Foil cards on midnight pitch, portrait, calm centre | PWA splash / loading bg |
| group-progress-artwork.png | …05_00_37 PM (5).png | 1422×1106 | Three blank cream cards in a swap-cycle triangle | Group progress / collection bg / empties |
| best-move-card-artwork.png | …05_00_44 PM (1).png | 1536×1024 | Two facing card stacks + glowing gold swap arrows, featured cards | Best Move / suggested trade |
| achievement-milestone-modal-artwork.png | …05_00_44 PM (6).png | 1422×1106 | Glowing featured card + supporting cards + gold confetti burst | Achievement / milestone modal |
| accepted-offer-confirm-handover-artwork.png | …07_04_10 PM (5).png | 1672×941 | Two hands exchanging cards over an open album, gold arrows | Accepted offer / confirm handover |
| store-screenshot-background.png | …05_00_52 PM (1).png | 1731×909 | Hands picking cards over pitch + album, wide | Store screenshots / marketing |

**Extra source not wired:** `…05_00_52 PM (2).png` (852×1846, portrait hands over album) —
good future `incoming-offer` art.

**Rejected / reference (`rejected-reference/`):**
- `app-icon-earlier-variant.png` (…05_00_29 PM (1).png) — earlier icon, superseded by master.
- `swap-cycle-weaker-duplicate.png` — earlier mislabel; the swap-cycle is actually the
  selected `group-progress-artwork`. File retained only because this mount blocks deletes.

**Ignored:** `content.png` (personal photo).

All wired WebP were regenerated directly from the corrected `selected/` masters (quality 86),
so the live `public/assets/artwork/*.webp` match this table exactly.
