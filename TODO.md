# Better Gmail Sidebar — Remaining TODO

Focused list of next improvements, trimmed to active items only.

## DOM Robustness (Deferred)
No changes for this version per scope decision.

## Manifest & UX
- [x] Add an `action` that opens Options and uses the same icon set.
- [x] Validate MV3 compliance and keep permissions minimal (content script + storage only).

## Code Hygiene
- [x] Remove unused `getStarredClasses`.
- [ ] Optional: add ESLint/Prettier with a minimal config (no build step needed).
- [x] Add brief comments to document key selectors.

## Documentation
- [x] README: confirm install steps, features, privacy; note toolbar action.
- [x] README: include brief support/issue details.

---

Suggested Implementation Order
1. Manifest & UX
2. Documentation
3. Code Hygiene polish (optional tooling)
