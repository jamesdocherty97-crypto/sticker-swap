# Owner Firebase Setup Checklist

This is an owner-only checklist for turning the local Sticker Swap public MVP into a safe real-user test. Do not show this as part of the public app flow.

Codex should not create Firebase projects, deploy rules, mutate production Firebase, or deploy the app. These steps are manual owner actions.

## Before You Start

- Use a fresh Firebase project for the public MVP.
- Do not reuse the old private app Firebase data.
- Production Firebase Anonymous Auth is required.
- `auth.uid` is the real owner key for user data.
- `displayName` is profile metadata only.
- The production database is fresh, so no data migration is required.
- Demo mode is separate and local at `index.html?demo=1`.
- `database.rules.json` is the local source of truth before deployment.
- Firebase web config is not an admin secret. Never paste service-account JSON into `firebase-config.js`.

## Manual Setup

1. Create a new Firebase project.
2. Create a Realtime Database.
3. Enable Authentication, then enable Anonymous sign-in.
4. Create/register a Web app in Firebase Project settings.
5. Copy the Firebase web config into `firebase-config.js` using `firebase-config.example.js` as the shape.
6. Deploy `database.rules.json` to the new Firebase project.
7. Test the rules in Firebase Console, Rules Playground, or the emulator.
8. Test create/join on two real devices or two separate browser profiles.
9. Test invite links from device A to device B.
10. Test sending, accepting, and confirming swaps.
11. Test delete own data and leave group.
12. Test iPhone Safari PWA install.
13. Test Android Chrome PWA install.
14. Deploy to Netlify only after real-device checks pass.

## Local Files

- `firebase-config.js` is the file the app loads.
- `firebase-config.example.js` shows the expected config object shape.
- `database.rules.json` is the rules file to deploy.
- `firebase.json` points Firebase CLI at `database.rules.json` for later owner deployment.
- `quick-test.html` opens demo mode and does not need Firebase.

## Netlify Deployment Shape

Deploy only after Firebase setup, rules deployment, emulator or Rules Playground checks, and two-device real-user flow testing have passed.

This is a static app:

- Build command: none.
- Publish directory: project folder root.
- Required files at publish root: `index.html`, `firebase-config.js`, `manifest.webmanifest`, `sw.js`, icons, and `assets/`.
- Do not deploy `firebase-config.example.js` as the live config.
- Confirm `firebase-config.js` contains the public Firebase web config for the fresh public MVP project, not emulator config and never service-account JSON.
- After Netlify deploy, test the live URL on iPhone Safari and Android Chrome before sharing with beta users.
- After deploy, update the `og:image` and `twitter:image` meta tags in `index.html` to the absolute live URL (e.g. `https://your-site.example/og-share.png`) and add `og:url`, otherwise share previews will not show the image.

## Suggested Owner Commands

Run these only after creating and selecting the intended Firebase project:

```bash
firebase deploy --only database
```

Optional local checks before any deploy:

```bash
node -e "JSON.parse(require('fs').readFileSync('database.rules.json','utf8'))"
```

No deploy has been run from this workspace.
