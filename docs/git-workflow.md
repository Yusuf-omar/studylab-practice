# Git workflow

The upstream repository is `TechArc-io/studylab-practice`. Your fork belongs to you.

```bash
git remote -v
git fetch upstream
git switch main
git merge --ff-only upstream/main
git push origin main
git switch -c assignment/ASSIGNMENT-ID-short-description
```

Commit complete ideas with clear imperative messages. Before pushing:

```bash
git status
git diff --check
git diff --stat main...HEAD
npm run check
git push -u origin assignment/ASSIGNMENT-ID-short-description
```

On GitHub, open a pull request from that branch into `main` **in your fork**. Use a title such as `[ms-react-ui] Build accessible practice list`, wait for `Practice quality`, and request mentor review. Paste the PR URL into Astudylab.

After approval, merge the PR into your fork. Then update local `main` before starting the next assignment. Open `assignments/README.md` in your fork and change that assignment's progress cell from `- [ ]` to `- [x]`, then commit and push the tracker update to your fork's `main`. The canonical upstream remains the clean starter while your fork accumulates the reviewed evidence from the whole pathway.

GitHub rulesets on the canonical repository are not inherited by forks. Do not disable or rename the `Practice quality` workflow in your fork: Astudylab and your mentor use its green result as required evidence before approval.
