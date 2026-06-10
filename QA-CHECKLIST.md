# Sticker Swap Local QA Checklist

This is the minimum useful QA path before a public beta. It keeps the app static and lightweight, avoids deployment, and does not require a production Firebase project for demo checks.

## Local Commands

Run from this folder:

```bash
npm run qa
npm run check:rules
npm run check:syntax
npm run check:stale
npm run check:swaps
npm run check:pwa
npm run check:demo
npm run serve
```

What they cover:

- `npm run qa`: all local static checks.
- `npm run check:rules`: `database.rules.json` parses and rules are not open by group code alone.
- `npm run check:syntax`: `manifest.webmanifest` parses and extracted app JS syntax parses.
- `npm run check:stale`: searches for stale nickname-keyed production write paths.
- `npm run check:swaps`: searches for forbidden quick-complete/export labels.
- `npm run check:pwa`: manifest and service worker references point to real files.
- `npm run check:demo`: quick demo path, demo Firebase isolation, and not-configured state.
- `npm run serve`: serves the app at `http://127.0.0.1:4173/`.

## Firebase Emulator Suite

Use this when you want real Firebase Auth and Realtime Database behavior without creating or mutating a production Firebase project.

Prerequisites:

- Firebase CLI installed and signed in if your local CLI requires it.
- Java available for the Realtime Database emulator.

Setup:

1. Copy `firebase-config.emulator.js` to `firebase-config.js`.
2. Start the emulators:

```bash
npm run emulators
```

3. In a second terminal, serve the static app:

```bash
npm run serve
```

4. Open:

```text
http://127.0.0.1:4173/index.html?emulator=1
```

5. Emulator UI should be available at:

```text
http://127.0.0.1:4000/
```

Expected emulator behavior:

- Anonymous Auth creates local emulator users.
- Realtime Database uses `database.rules.json`.
- Create group, join group, profile, collections, wishlists, presence, feed, and swaps all write to the local emulator only.
- Demo mode at `index.html?demo=1` still does not touch Firebase.

Do not use old private Firebase data for emulator or public beta testing.

## Manual Two-Device QA Script

Use two phones, or one phone plus one desktop browser with a separate profile/private window.

1. Device A opens the served production/emulator app.
2. Device A creates a group.
3. Device A creates profile "Alex".
4. Device A copies or shares the invite link.
5. Device B opens the invite link.
6. Device B creates profile "Sam".
7. Device A adds several in-book stickers and at least two spares.
8. Device B adds missing stickers and at least two spares that Device A needs.
9. Device A opens Swaps and confirms Best Move appears.
10. Device A sends an offer.
11. Device B sees incoming proposed offer.
12. Device B accepts the offer.
13. Confirm neither collection changes immediately after accept.
14. Device A confirms handover.
15. Confirm collection still does not fully apply until Device B confirms.
16. Device B confirms handover.
17. Confirm both collections update only after both confirmations.
18. Test conflict: create another offer, then remove one promised spare before accepting/confirming. Confirm the UI warns that the spare is unavailable.
19. Device B declines or cancels an offer. Confirm no collection changes.
20. Device B leaves group or deletes own data. Confirm Device A no longer sees B as active data where appropriate.

## Swap Lifecycle QA

- Suggested match appears only when there is useful give/get data.
- Primary action is "Send offer".
- Incoming offer says accepting means agreeing, not completing.
- Outgoing offer shows "Waiting for Sam" style copy.
- Accepted offer says "Swap in person, then confirm".
- One-sided confirmation says the user confirmed and is waiting for the other person.
- Collections update only after both participants confirm.
- Cancelled/declined offers do not update collections.
- Promised spares are visually/logically reserved while offers are active.
- Conflict state appears if a promised spare is no longer available.
- Completed swaps appear as completed/history, not as active offers.

## Rules Testing Checklist

Use Firebase Console Rules Playground, emulator, or both.

- Unauthenticated user cannot read or write root.
- Unauthenticated user cannot read or write group data.
- Authenticated user can create a group meta record with their own UID.
- Authenticated user can join by writing only their own member record.
- Non-member cannot read full group data.
- Member can read group data.
- User can write only `members/{auth.uid}`.
- User can write only `collections/{auth.uid}`.
- User can write only `wish/{auth.uid}`.
- User can write only `presence/{auth.uid}`.
- Collection sticker values accept numbers 1-99 or deletion.
- Wishlist values accept `true` or deletion.
- Presence accepts timestamp-like numbers or deletion.
- Feed item requires `uid === auth.uid` and reasonable text length.
- Swap create requires `fromUid === auth.uid`.
- Recipient can accept or decline proposed offers.
- Each participant can confirm only their own handover side.
- Root and open group-code read/write are denied.

Known rules limitation:

- Rules do not perfectly freeze `give` and `get` arrays across every allowed swap transition. App code preserves those fields. A future stricter model should split immutable offer payload from status transition state or use Cloud Functions.

## Mobile Browser QA

iPhone Safari:

- Open demo and emulator/production modes.
- Create/join/profile flow fits one-handed.
- Bottom navigation is reachable and not blocked by safe area.
- Keyboard does not hide invite code/profile fields.
- Add/remove sticker tap targets feel large enough.
- Swaps tab works after scrolling and returning.
- Group settings is easy to find.
- Offline banner appears when network is disabled and clears when restored.

Android Chrome:

- Same flow as iPhone Safari.
- Back button behavior does not trap the user.
- Invite link opens the correct group.
- PWA install prompt or Add to Home Screen flow works.
- App resumes without losing local identity.

Desktop sanity:

- Keyboard focus is visible enough on inputs and buttons.
- Narrow responsive viewport remains usable.
- No text spills out of buttons/cards.

## PWA Checklist

- `manifest.webmanifest` parses.
- `icon.svg`, `icon-180.png`, `icon-192.png`, and `icon-512.png` exist.
- Apple touch icon is referenced.
- `sw.js` cache list references existing files only.
- Demo mode opens through `quick-test.html`.
- Local server mode loads app shell.
- Install on iPhone Safari and Android Chrome.
- Relaunch from home screen.
- Check theme color/status bar looks intentional.
- After a file change, bump service worker cache name if cached assets changed.

## Accessibility Basics

- Tap targets are roughly 44px or larger for core controls.
- Invite code and profile inputs have visible labels.
- Buttons have visible names or `aria-label` where icon-only.
- Keyboard focus reaches inputs, tabs, and key buttons.
- Color contrast is readable in dark and light modes.
- Reduced motion disables marquee, shimmer, and celebration animations.
- Meaningful user/avatar images have alt text.
- Decorative background images stay in CSS and do not need alt text.
- Error and empty states tell the user what to do next.

## Performance Basics

- No app framework or build dependency has been added.
- No giant runtime dependencies are required.
- Current scene images are about 200 KB each.
- `icon-512.png` is about 340 KB and should be considered for future optimisation.
- Service worker caches only app shell files and current scene assets.
- Initial mobile load should be tested over a throttled mobile connection before beta.
- Future scene assets should use WebP and the size targets in `ASSET-BRIEF.md`.

## Checks Not Covered By Local Static QA

- True Firebase rules behavior under concurrent users.
- Real mobile Safari PWA install quirks.
- Android home-screen install quirks.
- Two-device physical swap lifecycle timing.
- Network offline/online sync across real devices.
- Visual regression screenshots.
- Screen-reader walkthrough.

These are manual/emulator beta checks, not blockers for keeping the project simple.
