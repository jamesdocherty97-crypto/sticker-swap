# Public MVP Brief

This project is the public MVP conversion of Sticker Swap.

The private app source was used as a reference only. This project should remain generic, mobile-first, and suitable for public web launch.

Core promise:

Create a group. Track your stickers. Find swaps with friends.

Do not reintroduce:

- Private friend-group names or references.
- Personal portraits or photos.
- Country-specific visual theming.
- Private pop-ups or inside jokes.
- Risky sports-brand artwork or logos.
- Promo extras unless they are deliberately scoped for a later public release.

Preserve:

- 980 base sticker IDs.
- Copy-count data model.
- Per-sticker and merge-only writes.
- Group comparison and swap matching.
- PWA/web-first deployment path.

Firebase launch notes:

- Use a new Firebase project for the public MVP.
- Do not use old private Firebase data for public launch.
- Production groups require Firebase Anonymous Auth.
- `auth.uid` is the production owner key.
- Display names are metadata only.
- Demo mode is local and separate.
- Follow `OWNER-FIREBASE-SETUP.md` before any Netlify deployment.
