# Sticker Swap - Launch Readiness Assessment

Date: 2026-06-10 · Assessor: Claude (launch boss) · Scope: full repo at
`codex/delegated-tasks` tip (PR #2), which contains everything in PR #1.

## 1. GitHub state - complete

Everything is on GitHub. Verified this session: `origin/fable/launch-boss-pass`
and `origin/codex/delegated-tasks` are byte-identical to the validated local
branches; the codex branch contains the fable tip as an ancestor (clean stack);
a fresh `git clone` of the codex branch passes all 11 QA checks; the safe null
`firebase-config.js` placeholder is committed; service-worker cache is at v8.

Open PRs: **#1** `fable/launch-boss-pass → main` (the launch pass) and
**#2** `codex/delegated-tasks → fable/launch-boss-pass` (delegated production
tasks). Merge #2 first, then #1.

Deliberately NOT in the repo: the delivery folder (bundles, patches, handover
docs, this assessment) and the old handover zip. Nothing is missing.

## 2. Verdict up front

**The software is in good shape and the repo is launch-candidate quality, but
the product is not yet launch-validated.** Every production code path that
matters - anonymous auth, group join, live swap lifecycle on two devices, iOS
Safari PWA install - has been exercised only against rules analysis, static QA,
and demo mode. Until the owner runs the two-device test in
OWNER-FIREBASE-SETUP.md against a real Firebase project, "ready to launch" is
an informed prediction, not a fact. That test is the single gating item.

Readiness grades: code quality B+ · data security (friend-group scale) A- ·
product/UX A- · PWA readiness B+ · operational readiness C+ (untested in
production conditions) · legal/IP posture B+.

## 3. Strengths (genuine, not flattery)

- **The swap lifecycle is the product, and it is done properly.** Offer →
  accept → both-confirm → books update, with promised spares reserved both
  visually and logically, conflict detection ("This spare is no longer
  available"), and the entire state machine enforced server-side in
  database.rules.json - not just in client code. This is unusually rigorous
  for an MVP.
- **Rules are deny-by-default, UID-keyed, member-gated, and validated** (typed
  fields, length caps, timestamp ranges, sticker-ID regex). No nickname-keyed
  writes anywhere; QA enforces this permanently.
- **Demo mode is a real sales asset**: fully local, seeds the whole lifecycle,
  partners auto-respond so one phone experiences the magic end-to-end.
  Verified live at phone size.
- **Graceful degradation**: missing config → friendly screen + working demo;
  resilient SW precache; offline banner; reduced-motion support; perf-lite.
- **Repo completeness**: owner setup, QA checklist, asset brief, handover,
  delegate brief and report, static QA harness. A new developer could continue
  safely tomorrow.

## 4. Critical findings (the honest list)

### 4.1 Launch blockers (must do before sharing any real link)

1. **No production validation.** Run OWNER-FIREBASE-SETUP.md end-to-end:
   fresh Firebase project, anon auth, rules deploy, Rules Playground spot
   checks, then the two-device swap test (iPhone Safari + Android Chrome).
   Everything below is secondary to this.
2. **og:image / twitter:image are relative URLs** - share previews will be
   blank until set to the absolute deployed URL (documented; 2-minute fix at
   deploy time).

### 4.2 Significant weaknesses (acceptable for friend-scale launch, fix soon)

3. **The offline banner over-promises.** It says changes "are saved here and
   sync when reconnected" - but RTDB web has no disk persistence: queued
   writes survive only while the tab is open. Mark stickers offline, kill the
   tab, lose the marks. Either soften the copy ("keep this tab open to sync")
   or accept the small deception knowingly. Cheapest honest fix: copy change.
4. **No group governance.** `joinOpen` is permanently true (the app never
   exposes closing it, though rules support it), there is no member cap, and
   the creator cannot remove a bad actor - only users can delete their own
   data. A leaked invite link is an open door, and any member can write
   160-char feed entries with no rate limit. Fine for families and friends;
   not fine if a group code ends up on social media. Recommended first
   post-launch feature: owner-only "close group" toggle + "remove member"
   (rules already know who `createdBy` is).
5. **Anonymous-auth identity is fragile.** Clear Safari website data, or
   switch devices, and the uid - and the whole collection - is unreachable
   (orphaned, not deleted). No recovery path. Acceptable MVP trade-off, but
   the app never warns users. Add one settings line ("Your book lives on this
   device") now; consider Firebase account-linking later.
6. **No abuse/quota protection.** No Firebase App Check, no rate limiting
   beyond RTDB quotas. A scripted client with a valid group code and anon auth
   could spam feeds/swaps. Enable App Check before any public promotion.
7. **The trade engine has no committed tests.** availableSparesFor /
   promisedOutgoingIds / buildCollectionPatch / threeWayLoops is the most
   intricate logic in the app and is verified only by my ad-hoc headless
   harness (not in the repo) and manual demo use. Commit a small node test to
   `scripts/` and wire it into `npm run qa`.

### 4.3 Known, accepted risks (documented judgement calls)

8. **Real player names in the checklist.** Names are factual data, section
   labels are neutralized (SPC/Album Specials/Champions Gallery), no images or
   marks are used, and the disclaimer is visible in-app, in the OG image, and
   in store copy. Residual risk is low but non-zero: the 980-sticker structure
   visibly mirrors the official album. If the owner wants zero risk, a
   "numbers-only" display mode is a contained change - I do not recommend it;
   it would gut usability.
9. **Swap list is group-readable** (any member sees all offers). Documented
   RTDB limitation; participant-only reads would need per-user indexes or
   Firestore. Fine at friend scale.
10. **Single 2,100-line index.html, ~30 globals, no framework.** Correct for
    the launch window; a real tax later. Refactor only after the window, and
    only if the product earns it.

### 4.4 Minor / polish

- Swaps tab badge shows "99+" (count of all theoretically obtainable
  stickers) - noisy as a notification signal; consider counting only pending
  offers.
- "Nudge" writes a feed entry but the recipient gets no push (no notifications
  in PWA scope on iOS) - the 👋 toast slightly implies more than it does.
- Expanding all ~50 teams renders ~1,000 cards; fine on modern phones,
  perf-lite exists, but old Androids may chug. Acceptable.
- PR #1's description has a few stray "- -" markers from the web editor.

## 5. Recommendations - priority ordered

**P0 - before any real user (owner, ~half a day):**
merge PR #2 then PR #1; run OWNER-FIREBASE-SETUP.md including the two-device
test; enable Firebase App Check; deploy as static site; set absolute
og:image/twitter:image; install-test on iPhone + Android; soft-launch with ONE
real friend group and watch the Firebase console during their first swaps.

**P1 - first two weeks, ordered by value:**
fix offline-banner copy (honesty, 10 minutes); add "your book lives on this
device" note in settings; owner controls (close group / remove member) with
matching rules; commit the trade-engine test harness into `npm run qa`; make
the Swaps badge count pending offers, not all possibilities.

**P2 - if the product earns it (after the collecting window):**
Android TWA via PWABuilder (assets and store copy already exist in `store/`),
then iOS wrapper; account linking to survive device loss; participant-only
swap reads (per-user indexes or Firestore); split index.html into modules with
a minimal build; localization (the collecting audience is global).

**Explicitly not recommended now:** framework rewrite, chat, marketplace,
push-notification infrastructure, native rebuild - all outside the window or
outside the product's promise.

## 6. Bottom line

Ship it - through the gate, not around it. The codebase is honest, safe by
default at its intended scale, and the swap loop is genuinely the magic it
promises. The two things standing between this repo and real users are one
afternoon of owner-side Firebase work and one real two-device swap. After
that, the riskiest unknowns are operational (device quirks, quota behaviour),
which is exactly what a one-group soft launch will surface cheaply.
