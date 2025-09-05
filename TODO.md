# Better Gmail Sidebar — Remaining TODO

Focused list of next improvements, trimmed to active items only.

## Stability & Resilience
- [ ] Add a lightweight `MutationObserver` on `.TK` (left sidebar) to detect removals/refreshes.
- [ ] Throttle/debounce reinsertions (≈250–500ms) to prevent excessive work.
- [ ] On detected removal/missing nodes, re-run insertion for custom rows once per stabilization cycle.

## DOM Robustness
- [ ] Prefer cloning a nearby native row (e.g., Starred or a label) to inherit Gmail classes.
- [ ] Replace brittle hardcoded class sets where safe; keep current classes as fallback.
- [ ] Centralize selectors/classnames in a small helper to ease future updates.

## Manifest & UX
- [ ] Consider an `action` that opens Options/help and uses the same icon set.
- [ ] Validate MV3 compliance and keep permissions minimal.

## Code Hygiene
- [ ] Remove unused `getStarredClasses` or repurpose it for the cloning approach.
- [ ] Optional: add ESLint/Prettier with a minimal config (no build step needed).
- [ ] Keep functions small and focused; document key selectors in code comments.

## Documentation
- [ ] README: add install steps (Load unpacked), feature list, screenshots, and a privacy note.
- [ ] README: add a brief support/issue section.

---

Suggested Implementation Order
1. Stability & Resilience
2. DOM Robustness
3. Manifest & UX
4. Documentation
