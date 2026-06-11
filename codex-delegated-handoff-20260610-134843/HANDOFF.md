# Codex Delegated Tasks Handoff

Local completed branch:

`/Users/jiddle/Documents/Sticker Swap Public MVP/codex-github-work-2`

Branch:

`codex/delegated-tasks`

Base:

`fable/launch-boss-pass`

Final local commit:

`e5b21a8 codex: optimize store screenshot payloads`

## What Is In This Folder

- `0001-...patch` through `0009-...patch`: binary-safe patch series from `fable/launch-boss-pass` to `codex/delegated-tasks`.
- `codex-delegated-tasks.bundle`: git bundle containing the completed branch commits.
- `PR-BODY.md`: suggested pull request body.

## Preferred Publish Path

From the completed local worktree:

```bash
cd "/Users/jiddle/Documents/Sticker Swap Public MVP/codex-github-work-2"
git push -u origin codex/delegated-tasks
```

Then open a PR:

- Base: `fable/launch-boss-pass`
- Head: `codex/delegated-tasks`
- Title: `codex: delegated production tasks`
- Body: use `PR-BODY.md`

## Patch Apply Path

From another checkout on `fable/launch-boss-pass`:

```bash
git checkout fable/launch-boss-pass
git checkout -b codex/delegated-tasks
git am --3way --keep-cr *.patch
```

Then run:

```bash
npm run qa
```

## Bundle Import Path

From another checkout:

```bash
git fetch "/Users/jiddle/Documents/Sticker Swap Public MVP/codex-delegated-handoff-20260610-134843/codex-delegated-tasks.bundle" codex/delegated-tasks:codex/delegated-tasks
git checkout codex/delegated-tasks
```

Then push and open the PR as above.

## Why Codex Did Not Open The PR

The local package is complete and verified, but this environment could not authenticate/write to GitHub:

- HTTPS push requires a password/token and the shell cannot prompt for it.
- SSH push failed because no usable GitHub SSH key is available.
- GitHub connector branch creation returned `403 Resource not accessible by integration`.

No Firebase creation, mutation, rules deployment, app deployment, force push, or secret handling was performed.
