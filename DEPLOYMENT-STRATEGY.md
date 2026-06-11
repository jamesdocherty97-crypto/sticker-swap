# Sticker Swap - Deployment Strategy (Lean)

**Status**: Production-Ready — single project, free tier
**Updated**: June 10, 2026
**Decision**: No monetisation, no backend refactor, no staging spend. Run lean on Firebase's free **Spark** plan until real traction justifies more. See "Decision rationale" below.

## Architecture Overview

One Firebase project, one Realtime Database instance. No separate staging instance. Local testing is done for free with the Firebase Emulator Suite and the Rules Playground.

```
┌─────────────────────────────────────────────┐
│ Firebase Project: stickerswap-1  (Spark/free)│
├─────────────────────────────────────────────┤
│                                             │
│   ┌─────────────────┐                       │
│   │  PRODUCTION     │   Real user data      │
│   │  (Live Users)   │                       │
│   │ stickerswap-1-  │   Auth: Anonymous     │
│   │ default-rtdb    │   Rules: database.    │
│   │                 │          rules.json   │
│   └─────────────────┘                       │
│          ↑                                  │
│     index.html (production config)          │
│                                             │
│   Local testing → Firebase Emulator Suite   │
│   Rule changes  → Rules Playground (free)   │
│                                             │
└─────────────────────────────────────────────┘
```

## Current Status: PRODUCTION READY

### Production Database
- **Name**: stickerswap-1 (default instance)
- **URL**: `https://stickerswap-1-default-rtdb.firebaseio.com`
- **Plan**: Spark (free) — do **not** upgrade to Blaze unless usage forces it
- **Auth**: Anonymous ✅ Enabled
- **Rules**: Deploy from `database.rules.json` (see below)
- **Config**: Live in `firebase-config.js`

**Deploy rules** (run locally):
```bash
firebase deploy --only database --project stickerswap-1
```

## Testing — free, no staging instance

You do not need a paid staging database. Two free options cover it:

1. **Firebase Emulator Suite** (already configured in `firebase.json`) — full local Auth + Realtime Database + UI. Run with `firebase emulators:start` and point the app at `firebase-config.emulator.js`. This is your safe place to test rule changes and flows before they touch live data.
2. **Rules Playground** (Firebase Console → Realtime Database → Rules → Playground) — validate any rule change against sample reads/writes before deploying. Free.

Workflow for a rule change: edit `database.rules.json` → test in the Emulator and/or Rules Playground → deploy to production.

## Cost

Run on the **Spark (free)** plan:
- 1 GB stored data
- 100K simultaneous-connection / read allowance and 10K writes per day (free-tier limits)

A friends-scale sticker-swap app will sit well inside these for months. Effective cost ≈ £0. Revisit Blaze only if you hit free-tier limits — which is itself the traction signal that would justify spending.

## Decision rationale (2026-06-10)

- **Monetisation — not now.** Freemium / cosmetics / marketplace-commission models only pay at thousands of monthly active users that don't exist yet; the conservative scenario actually runs at a loss once you add infra cost. Adding paywalls or payment processing pre-traction buys complexity and friction for ~£0 return. Revisit only at a real signal (~1,000+ engaged MAU).
- **Refactor — no.** Swapping Firebase for a "free" DB (Supabase/Mongo/etc.) is a full data-layer + auth rewrite to save single-digit dollars. Not worth it.
- **Staging — no.** The Emulator Suite + Rules Playground give the same safety for free.

## Backup Strategy

```bash
# Manual snapshot before any significant change
firebase database:get --project stickerswap-1 / > backup-prod-$(date +%Y%m%d).json
```
Firebase also keeps automatic backups on the project; restore from the Backups tab if needed.

## Deployment Checklist

- [ ] Test flows in the Emulator (create/join group, send + confirm swaps, invite links, delete data)
- [ ] Validate any rule change in the Rules Playground
- [ ] Deploy rules: `firebase deploy --only database --project stickerswap-1`
- [ ] Run QA on production with 2+ real devices (one real swap end-to-end)
- [ ] Deploy to Netlify with the production config; set `og:image`/`twitter:image` to the absolute live URL
- [ ] Post the link

## Quick Reference

| Task | Command |
|------|---------|
| Start local emulator | `firebase emulators:start` |
| Deploy prod rules | `firebase deploy --only database --project stickerswap-1` |
| Backup production | `firebase database:get --project stickerswap-1 / > backup.json` |
| Monitor usage | `firebase database:profile --project stickerswap-1` |

---

**See also**: FIREBASE_SETUP.md for current configuration, OWNER-FIREBASE-SETUP.md for the setup checklist.
