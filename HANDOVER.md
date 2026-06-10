# Sticker Swap Public MVP Handover

## Overview

This is a standalone public MVP web app for small sticker-collecting groups.

Users create or join an invite-code group, choose a display name, track stickers in their book, mark spare copies, and send useful in-app swap offers to friends in the group.

The implementation is intentionally simple:

- Single-file app: `index.html`
- Quick demo launcher: `quick-test.html`
- No build step
- Firebase Anonymous Auth
- Firebase Realtime Database
- PWA manifest and service worker
- Generic replacement artwork
- Owner setup checklist: `OWNER-FIREBASE-SETUP.md`

## Production Data Shape

Production data is UID-keyed under each invite code:

```text
groups/{groupCode}/meta
groups/{groupCode}/members/{uid}
groups/{groupCode}/collections/{uid}/{stickerId}
groups/{groupCode}/wish/{uid}/{stickerId}
groups/{groupCode}/presence/{uid}
groups/{groupCode}/swaps/{swapId}
groups/{groupCode}/feed/{feedId}
```

Sticker values remain copy counts:

- missing: absent
- in book: `1`
- spare copies: `2+`

The app still supports old string values when reading demo/local data:

- `owned` maps to `1`
- `doubler` maps to `2`

## Identity Invariants

- Production boots Firebase Auth and signs in anonymously.
- `auth.uid` is the current user ID.
- `members/{uid}.displayName` is display metadata only.
- Production collection, wish, presence, swap, and feed writes do not use nicknames as keys.
- Demo mode keeps local profile switching and stays separate at `index.html?demo=1`.

## Swap Lifecycle

Group-chat exports and direct completion buttons are removed.

The public MVP uses in-app swap offers:

- Proposed offers reserve promised spares.
- Accept means both people agree to the swap.
- Confirm means the physical handover happened.
- Each participant can confirm only their own side in the app.
- A swap reaches `done` only after both sides confirm.
- Collection changes are applied only after the swap is `done`.
- Each participant applies their own completed swap delta to their own collection, then marks `fromApplied` or `toApplied`.

Realtime Database rules now enforce the production swap lifecycle where practical:

- New offers must have `fromUid === auth.uid` and start as `proposed`.
- Proposed offers can only move to `accepted` by the recipient.
- Proposed offers can be removed by either participant, covering sender cancel and recipient decline.
- The recipient can decline a proposed offer.
- Either participant can cancel an active proposed or accepted offer.
- Accepted offers can only set `fromDone` by `fromUid` or `toDone` by `toUid`.
- `done` is only allowed when the other side was already confirmed.
- Done swaps can set only the current participant's applied flag (`fromApplied` or `toApplied`) while writing their own collection changes.

Remaining RTDB limitations:

- The app listens to `groups/{groupCode}/swaps`, so every group member can read the group swap list. For stricter participant-only reads, split swaps into per-user inbox/outbox indexes or move this surface to Firestore.
- Rules validate `give` and `get` sticker IDs, but do not perfectly freeze those arrays during an otherwise valid status transition. The app preserves offer contents; stricter server enforcement would need a split immutable offer payload or a Cloud Function.
- Applying a done swap is client-driven. The app uses DB applied flags plus a local fallback marker to avoid repeat application, but a future emulator-backed refactor should test multi-device retry edge cases.

## Firebase

`firebase-config.js` is a local placeholder. For real testing, replace it with the new public MVP project’s Firebase web config using the shape in `firebase-config.example.js`.

The Firebase web config is not a Firebase Admin credential and must never contain service-account JSON. It is safe to serve in a public web app, but it is project-specific, so keep real local values out of shared template copies until intentionally deploying.

Owner setup:

1. Create a new Firebase project.
2. Create a Realtime Database.
3. Enable Anonymous sign-in under Authentication.
4. Copy the Firebase web config into `firebase-config.js`.
5. Deploy `database.rules.json`.
6. Test rules in Firebase Console, Rules Playground, or the emulator.
7. Test create/join on two real devices.
8. Test invite links.
9. Test sending, accepting, and confirming swaps.
10. Test delete own data and leave group.
11. Test iPhone Safari PWA install.
12. Test Android Chrome PWA install.
13. Deploy to Netlify only after real-device checks pass.

Technical notes:

- Firebase Anonymous Auth is required for production groups.
- `auth.uid` is the real owner key.
- `displayName` is metadata only.
- Production database is fresh, so no data migration is required.
- Demo mode is separate and local.
- Realtime Database rules are the local source of truth before deployment.
- Do not use old private Firebase data for public launch.

No deploy has been run from this workspace.

## Verification

Suggested checks:

```bash
npm run qa
npm run check:rules
npm run check:syntax
npm run check:stale
npm run check:swaps
npm run check:pwa
npm run check:demo
```

Manual smoke:

- Open `quick-test.html`.
- Confirm demo loads without Firebase.
- For local Firebase behavior without production, copy `firebase-config.emulator.js` to `firebase-config.js`, run `npm run emulators`, run `npm run serve`, then open `http://127.0.0.1:4173/index.html?emulator=1`.
- Create a production Firebase project.
- Test create group, join group, profile creation, sticker writes, offer send, accept, confirm, leave, and delete.

## Known Launch Tasks

- Deploy rules to the owner’s fresh Firebase project.
- Real-phone QA with two browsers or devices.
- Decide whether to tighten swap reads by writing per-user swap indexes.
- Run Firebase emulator QA for join, profile, own collection/wish/presence, feed, and swap transitions.
- Consider future iOS polish or a native wrapper only after public web MVP behavior is stable.
