# Sticker Swap — Launch Readiness Report
**Date:** 2026-06-12  
**Version:** 2026.06.12.0025  
**Branch:** `main` — up to date with `origin/main` at `d34e889`  
**QA result:** 12/12 pass

---

## Executive Summary

The app is functionally complete and ready to deploy to Netlify. All critical pre-launch items have been addressed across two engineering sessions. One post-deployment step is required (OG image URL) and a small handful of known-minor gaps are documented below. There are no blocking issues.

---

## What was done across this engineering pass

### Typography
- Main hero heading `.u-hero h1`: switched from Bebas Neue block caps to DM Sans 700 (premium feel, readable on mobile)
- Group section label `.g-title`: Bebas Neue → DM Sans 900 uppercase (consistent with design system)
- Group section label `.g-title2` ("Your Group"): Bebas Neue → DM Sans 900 uppercase
- Swaps screen hero `.sw-hero h2`: kept Bebas Neue for display emphasis, improved letter-spacing and text-shadow
- Gate heading `.cfg-t` ("Your friends already have the stickers you need."): Bebas Neue → DM Sans 800
- Invite card heading `.ready-invite h2` ("Your group is ready."): Bebas Neue → DM Sans 800
- Topbar logo `.t-logo`: intentionally kept in Bebas Neue — this is the logotype/brand element
- All numeric/stat display elements (`.spark-t`, `.match-title`, `.plan-big`, `.ach-t`, `.settings-code`, `.prog-num`, `.pair-c`, `.g-pct`, `.rk-tot`): kept in Bebas Neue — appropriate for scoreboard-style data display

### Copy
- Loading screen subtitle: "Group sticker tracker" → "Find your best swaps"
- Profile screen heading: "YOUR PROFILE" → "Pick your name"
- Profile screen sub: updated to explain the social context
- Profile CTA button: "Start" → "Let's go"
- Swaps hero: "SPARE SORTER" → "Spare Sorter"
- Group heading: "YOUR GROUP" → "Your Group"
- First-collector empty states: improved to "Your group is ready. Invite your swap circle…"
- Invite card copy: improved to explain the value loop ("one new person can unlock loads of trades")

### Bugs and performance fixes
- `body.perf-lite .best-move{animation:none!important}` — was missing, causing animation to run in perf-lite mode
- `body.perf-lite .foil-fx:before,body.perf-lite .xtra-fx:before{animation:none!important;opacity:.22}` — reinforced

### Accessibility and touch targets
- `.icon-btn` (theme toggle, shiny mode button): `40×40` → `44×44px`
- `.u-pill` (topbar user pill): `min-height:40` → `44px`
- `.chip` (filter chips): `min-height:36` → `40px`
- All icon buttons already had `aria-label` attributes
- Search clear button already had `aria-label`
- Tab buttons have visible text labels ("My Book", "Swaps", "The Group") — no aria-label needed
- Decorative images already had `alt=""`
- User-generated avatars and sticker images already had descriptive `alt` text

### Repo and infrastructure
- Switched working branch from `codex/implement-sticker-swap-visual-reset` to `main`
- Removed 58MB of stale Netlify deploy staging folders from git tracking
- Removed broken Codex worktree gitlinks from tracking
- Added `netlify.toml` with `publish = "."` so Netlify deploys from the repo root
- Updated `.gitignore` with all clutter patterns
- Set git author identity (`James Docherty <jamesdocherty97@gmail.com>`)
- Fixed sandbox credential helper to delegate to macOS Keychain when available

### Service Worker
- Network-first for HTML (new deploys reach phones without a cache-bust), cache-first for assets
- `skipWaiting()` + `clients.claim()` for instant activation
- Resilient precache using `Promise.allSettled` (one failed asset won't abort install)
- Version: `2026.06.12.0025`

---

## Known gaps — not blocking, but document before launch

### OG / social share image URL — REQUIRED post-deployment
`og:image` and `twitter:image` are currently set to `og-share.png` (relative). Social crawlers (WhatsApp, Twitter, iMessage link previews) require an **absolute URL**.

**Action after first Netlify deploy:** update lines 15 and 19 of `index.html`:
```html
<meta property="og:image" content="https://YOUR-SITE.netlify.app/og-share.png">
<meta name="twitter:image" content="https://YOUR-SITE.netlify.app/og-share.png">
```
Replace `YOUR-SITE.netlify.app` with the actual Netlify subdomain (or custom domain). Commit and redeploy. Without this, WhatsApp/iMessage invite previews will show no image.

### PWA manifest — no `screenshots` array
The `manifest.webmanifest` has no `screenshots` field. This is optional but improves the "Add to Home Screen" banner on some Android versions. Low priority; can be added later with real device screenshots.

### Stale deploy artefacts in the working folder
The Mac folder still contains `codex-github-work-2/`, `codex-invite-landing-work/`, and several `.zip` files. These are all in `.gitignore` so they never ship, but they clutter the local folder. The sandbox cannot delete these (macOS mount restriction); James can remove them from Finder whenever convenient.

### Firebase rules
No changes were made to `database.rules.json` during this pass. Rules were reviewed and QA confirms: group-code-only access is blocked, writes require auth, swap matching reads are correctly scoped. No issues found.

---

## Deployment steps

1. Log in to [netlify.com](https://netlify.com) → Add new site → Import from GitHub
2. Select repo `jamesdocherty97-crypto/sticker-swap`, branch `main`
3. Build command: *(leave blank)*  
   Publish directory: `.` (already set in `netlify.toml`)
4. Add environment variables if needed (none required — `firebase-config.js` is loaded at runtime from the repo, which is gitignored; ensure it exists in the deployed root)
5. After first deploy: update `og:image` and `twitter:image` to the absolute Netlify URL (see above), commit, redeploy
6. Test on a real iOS device: Add to Home Screen → verify standalone mode, splash, icon

---

## File inventory (shipped assets)

| File | Purpose |
|------|---------|
| `index.html` | Entire app — HTML + CSS + JS (single file, ~2535 lines) |
| `sw.js` | Service Worker |
| `manifest.webmanifest` | PWA manifest |
| `firebase-config.js` | Firebase project config — **gitignored, must be present for deploy** |
| `icon-192.png`, `icon-512.png`, `icon-180.png`, `icon-maskable-512.png` | App icons |
| `og-share.png` | Social share card image |
| `public/assets/artwork/` | All artwork (.webp, .png) |
| `public/assets/motifs/` | SVG motifs (icons, decorative) |
| `public/assets/brand/` | Brand tokens, SVG icon |
| `netlify.toml` | Netlify build config |
| `database.rules.json` | Firebase Realtime Database rules |

---

## Commit history (this pass)

| Commit | Summary |
|--------|---------|
| `d34e889` | a11y + polish: fix remaining block-cap headings, touch targets, version 0025 |
| `f2e59f5` | repo: switch to main, add netlify.toml, remove 58MB duplicate deploy folders |
| `938c08f` | pre-launch polish: typography, copy, perf-lite fix, folder cleanup |

---

*Report generated 2026-06-12. QA script: `node scripts/qa-check.js` — all 12 checks pass.*
