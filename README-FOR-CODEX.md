# Sticker Swap Public MVP

This is a separate public-facing MVP project.

Positioning:

Create a group. Track your stickers. Find swaps with friends.

## Files

- `index.html` - the single-file mobile web app.
- `quick-test.html` - click-to-open demo launcher with sample data and no Firebase required.
- `firebase-config.js` - local placeholder config. Replace for real Firebase testing. This is a public web config file, not an admin credential.
- `firebase-config.example.js` - copy shape for the owner config.
- `firebase-config.emulator.js` - local-only config for Firebase Emulator Suite testing.
- `database.rules.json` - Firebase Realtime Database rules for UID-keyed group data.
- `firebase.json` - Firebase rules metadata for later owner deployment. Do not deploy until the owner creates the new Firebase project.
- `manifest.webmanifest`, `sw.js`, `icon*`, `assets/` - PWA shell and generic app artwork.
- `ASSET-BRIEF.md` - public-safe visual asset plan and prompts for future launch images.
- `QA-CHECKLIST.md` - local QA commands, emulator path, and manual beta test scripts.
- `package.json`, `scripts/` - tiny Node-only local QA and static serving helpers.
- `sticker-checklist-reference.md` - stable ID note for the embedded checklist.
- `HANDOVER.md` - implementation and launch notes.
- `OWNER-FIREBASE-SETUP.md` - owner-only setup checklist for Firebase and pre-Netlify testing.

## Public MVP Scope

Included:

- Create or join an invite-code group.
- Firebase Anonymous Auth on production app boot.
- UID-keyed member profiles, collections, wishlists, presence, swaps, and feed items.
- Nicknames as display metadata only.
- Track owned stickers and spare copies.
- Send in-app swap offers, accept them as agreements, and confirm physical handovers before collection changes apply.
- Share invite link.
- Leave group on this device.
- Delete your own group data.

Deferred:

- Personalised artwork.
- Group-chat exports.
- Promo extras.
- Native app wrapper.
- Marketplace, payments, and chat.
- Framework rewrite.

## Local Testing

Open `quick-test.html` for the clickable demo. It launches `index.html?demo=1`, uses sample local data, and makes no Firebase calls.

Production mode needs a real Firebase web config in `firebase-config.js`. Until then, `index.html` shows a friendly “App not configured” screen. Public users do not get a Firebase setup wizard.

Useful local commands:

```bash
npm run qa
npm run serve
```

For individual checks:

```bash
npm run check:rules
npm run check:syntax
npm run check:stale
npm run check:swaps
npm run check:pwa
npm run check:demo
```

For local Firebase Emulator Suite testing, follow `QA-CHECKLIST.md`. The short version is:

```bash
cp firebase-config.emulator.js firebase-config.js
npm run emulators
npm run serve
```

Then open `http://127.0.0.1:4173/index.html?emulator=1`.

## Firebase Owner Setup

Follow `OWNER-FIREBASE-SETUP.md` when preparing a real public test:

1. Create a new Firebase project.
2. Create a Realtime Database.
3. Enable Anonymous Auth.
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

Netlify deployment shape: no build command, publish the project folder root, and make sure the live `firebase-config.js` contains the fresh public MVP Firebase web config. See `OWNER-FIREBASE-SETUP.md` for the owner-only checklist.

No production database exists yet, so no migration is required.

Technical notes:

- Firebase Anonymous Auth is required for production groups.
- `auth.uid` is the real owner key.
- `displayName` is metadata only.
- Demo mode is separate and local.
- Realtime Database rules are the local source of truth before deployment.
- Do not use old private Firebase data for public launch.

## Rules Notes

The current Realtime Database rules deny root access, require Firebase Auth for production group data, and keep owner data keyed by `auth.uid`.

Swap writes are participant-restricted and status transitions are enforced where practical. Accepting a swap does not update collections; both participants must confirm the in-person handover before completed swap changes apply. One known limitation remains: because the app listens to the group `swaps` node, group members can read the group swap list. Use per-user swap indexes or Firestore if participant-only swap reads become a launch requirement.
