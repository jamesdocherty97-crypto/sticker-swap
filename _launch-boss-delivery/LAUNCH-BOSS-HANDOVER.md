# Fable Launch-Boss Pass - Handover

Date: 2026-06-10 · Branch: `fable/launch-boss-pass` (4 commits on top of `main`)

## 1-2. Branch and push status

**PUSHED — UPDATE (second session).** Using the Chrome session you opened, the
branch `fable/launch-boss-pass` was created on GitHub and the complete file
tree was committed to it through the web UI (root files, `assets/`, `scripts/`,
zip removed). Verified afterwards: the remote tree is **byte-identical** to the
validated local branch (46 files), and a fresh `git clone` straight from GitHub
passes all 11 QA checks.

**Pull request #1 is open:**
https://github.com/jamesdocherty97-crypto/sticker-swap/pull/1

This folder still contains the git bundle and patches as a backup record. The
fetch/push commands below are no longer needed (kept for reference only).

One extra feature landed after the first handover draft: **demo partners now
auto-respond** (DEMO_MODE-only) - offers you send get accepted after a few
seconds and partners confirm their side after you do, so a single device can
experience the entire send → accept → both-confirm → books-update loop. Also,
the "App not configured" screen now has a one-tap "Try the demo" button.

A rendered mobile-size (390×844) inspection of demo mode was completed via the
browser: first-run, collection tab, swaps tab with all three seeded offer
states, accept flow, handover confirmation, swap completion, achievement
pop-up, and the auto-respond loop were all verified working live.

## 3. Files changed (37 files, +1140 / -7)

- **Commit 1 - Restore package.** The GitHub repo only had 12 files; the local
  package had the complete MVP. Restored: `database.rules.json`, `firebase.json`,
  `firebase-config.example.js`, `firebase-config.emulator.js`, `sw.js`,
  `package.json`, `scripts/` (QA + dev server), `icon-180/192/512.png`, the full
  `assets/` set, `.gitignore`, and the four missing docs (`OWNER-FIREBASE-SETUP`,
  `QA-CHECKLIST`, `ASSET-BRIEF`, `OPENAI-PLATFORM-HANDOVER`). Removed
  `sticker-swap-public-mvp.zip` from the repo (handover artifact, not source).
- **Commit 2 - Launch polish.** `index.html`, `README.md`, `OWNER-FIREBASE-SETUP.md`.
- **Commit 3 - Asset trim.** Removed 8 unreferenced legacy WebPs; updated `ASSET-BRIEF.md`.
- **Commit 4 - Config placeholder.** Committed the safe null `firebase-config.js`
  placeholder and updated `.gitignore`: a fresh clone previously failed two QA
  checks because the gitignored file is referenced by `index.html` and `sw.js`.

## 4. Product changes

- **Demo now demonstrates the whole swap lifecycle on first run**: an incoming
  offer from Sam, an outgoing offer to Ava, and an accepted swap with Mo where
  he has already confirmed his side. Seeds are computed from the actual demo
  collections, so every sticker id is consistent and promised spares are
  genuinely reserved. Verified with a headless node harness (3 swaps, all
  giver/needer/reservation invariants hold).
- **First-run**: the create/join screen now shows the 5-step promise
  (create/join → add name → track → mark spares → find swaps) plus the
  unofficial-fan-tool disclaimer.
- **Copy fixes**: accept toast now says "You accepted X's offer - swap in
  person, then confirm" (it previously credited the wrong person); invite share
  text upgraded to the friendlier "we're tracking our albums and finding swaps
  together" wording.
- **Consumer-facing errors** no longer mention "deploy the Firebase rules" -
  owner language stays in owner docs.
- **README.md** was a one-line stub; now a proper repo overview (demo in 10
  seconds, architecture, owner go-live pointer, QA commands, file map).

## 5. Firebase / auth / rules changes

None needed - and that's a finding, not an omission. The restored
`database.rules.json` is already UID-keyed, member-gated, deny-by-default, and
encodes the full swap state machine (proposed→accepted→both-confirm→done→applied)
server-side. Identity is Anonymous Auth with `auth.uid` keys; display names are
metadata. No nickname-keyed writes exist (QA enforces this).

## 6. Visual / PWA changes

- Trimmed 8 unreferenced legacy assets (generic football-action art the visual
  direction explicitly avoids). They remain in this local package and the zip.
- Added owner note (head comment + setup doc): `og:image`/`twitter:image` must
  become absolute URLs after deploy or share previews won't render.
- Manifest, icons (incl. maskable), favicon, and service-worker cache all
  verified correct; every referenced asset exists.

## 7. Demo changes

Seeded lifecycle states above; demo feed gets a "Sam sent you a swap offer"
item. Demo remains 100% local (boot returns before any Firebase work - QA-checked).
`DEMO-STATES-TODO.md` was unnecessary; the states were implemented instead.

## 8-9. Validation run and results

`npm run qa` (all 11 checks), plus `check:pwa`, `check:rules`, `check:demo`
groups - **all PASS** after every commit. Also: final stale-term sweep
(Mark done / Complete now / serviceAccount / private_key / .DS_Store /
Saltire / tartan) - clean; icon.svg well-formed; asset-reference audit - every
file referenced by `index.html`/`sw.js` exists; custom headless test of the
demo seeding logic - consistent.

## 10. Checks not run

- **No rendered visual inspection.** No browser was reachable from the session
  (Chrome extension not connected), so the 390×844 / 360×740 review was done at
  code-and-CSS level only. Please eyeball `quick-test.html` once on a phone-size
  window.
- **No emulator/Rules Playground run** (would require Firebase tooling against
  a project; owner step 7 in OWNER-FIREBASE-SETUP.md covers it).

## 11. Overridden recommendations

- **`firebase-config.js` is now committed as the null placeholder**, overriding
  the package's `.gitignore` decision. Reason: cloning the repo fresh failed
  the "service worker cached assets exist" and "all referenced local assets
  exist" QA checks without it. The committed file is inert
  (`window.STICKER_SWAP_FIREBASE_CONFIG = null`); the `.gitignore` comment now
  warns owners not to commit real project values. Verified: a clone from the
  delivery bundle passes all 11 checks.
- **ASSET-BRIEF "keep legacy assets for continuity"** - overridden; removed
  from the repo (still preserved locally) to keep the public codebase lean and
  off the generic-football look.
- **Real player names kept in the checklist.** They're factual checklist data,
  the product's core utility, with neutral section labels (SPC "Album
  Specials", "Champions Gallery") and no likenesses, badges, or official marks.
  Flagging it here because it's the main residual IP judgement call.

## 12. Remaining risks

- Swap list is group-readable (documented RTDB limitation; fine for friendly
  groups, revisit if the app grows).
- Share-image meta tags need the absolute URL swap at deploy time.
- Demo seed offers depend on the deterministic demo data; "Reset demo" in
  settings restores them if a tester mangles state.

## 13. Manual owner steps

1. Push the branch (commands above) and open the PR.
2. Skim the diff, especially `index.html` (one ~50-line block + small copy edits).
3. Open `quick-test.html` on a phone-size window; check Swaps tab shows the
   incoming/outgoing/accepted offers.
4. When ready to go live: follow `OWNER-FIREBASE-SETUP.md` end-to-end.

## 14. Suggested PR title

`Launch-candidate pass: restore full MVP package, demo swap lifecycle, launch polish`

## 15. Suggested PR description

> The GitHub repo was missing most of the MVP package (rules, service worker,
> QA scripts, icons, assets, owner docs); this restores it from the verified
> local handover package, then layers launch polish on top: the demo now seeds
> the full offer→accept→confirm-both-sides swap lifecycle with consistent
> sample data, first-run shows the 5-step promise, consumer error copy no
> longer leaks owner setup language, the accept toast credits the right
> person, the README is real, and eight unreferenced legacy assets are
> trimmed. All 11 static QA checks pass; demo remains fully local; rules
> unchanged (already UID-keyed and lifecycle-enforcing). No deploys, no
> Firebase mutations, no secrets.

## 16. Exact next action

Run the three `git fetch`/`git push` commands in section 1-2, then open the PR
against `main`.


---

## Session 3 addendum - polish pass 2 (live on PR #1)

Sixth commit pushed to the branch and verified byte-identical on GitHub:

- **PWA install**: `beforeinstallprompt` captured; "Install the app" button in
  Group settings on supporting browsers; iOS gets Add-to-Home-Screen guidance;
  hidden once installed.
- **Native share**: Invite link and the new **"Share status"** button use the
  system share sheet when available (clipboard fallback). Share-status copy
  leads with how many swaps are waiting for the group - the viral hook.
- **Best Move "View trade"** button opens the full trade sheet for that partner.
- **DEMO badge** in the top bar whenever demo mode is active.
- **a11y**: toast and saved indicators are now aria-live status regions.
- **CODEX-TASKS.md** (repo root + copy in this folder): delegated production
  brief for OpenAI Codex - image regeneration specs per asset with IP
  guardrails, og-share rebuild spec, favicon task, store screenshots, light
  theme + accessibility sweeps, README demo GIF, store listing copy, with
  acceptance criteria and reporting rules.

Validation: all 11 QA checks pass; demo-seed harness consistent; rendered
phone-size check of the new UI (DEMO badge, settings buttons, View trade)
completed live from the GitHub branch.
