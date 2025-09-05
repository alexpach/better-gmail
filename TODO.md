# Better Gmail Sidebar — TODO

Use this list to implement improvements one at a time. Each item has clear acceptance criteria so we can validate changes incrementally.

## 1) Resilience: Re‑insertion Guard
- [ ] Add a lightweight `MutationObserver` scoped to the left sidebar container `.TK` to detect removals/refreshes.
- [ ] Throttle or debounce (e.g., 250–500ms) to avoid excessive work.
- [ ] On detected removal/missing nodes, re-run insertion for custom rows only once per stabilization cycle.
- [ ] Fallback: on `hashchange`, verify rows exist and re-insert if missing.

## 2) Reduce DOM Fragility
- [ ] Prefer cloning a nearby native row (e.g., Starred or a label) to inherit Gmail classes.
- [ ] Replace brittle hardcoded class sets where safe; keep current classes as a fallback path.
- [ ] Centralize selectors and classnames in a small helper to ease future updates.

## 3) Accessibility
- [x] Ensure containers are keyboard-focusable: add `tabindex="0"` and `role="link"` on the clickable wrapper.
- [x] Add key handlers for Enter/Space to trigger navigation.
- [x] Keep or set `aria-label` on the wrapper; hide inner anchors from tab order.

## 4) Localization (Removed)
- [x] Remove existing per-locale label handling; use English-only labels (e.g., "Unread").
- [x] Ensure tooltips and ARIA labels remain in English consistently.

## 5) Options (Optional, if desired)
- [ ] Add an Options page to enable/disable specific star rows and control their order.
- [ ] Persist preferences via `chrome.storage.sync`.
- [ ] Respect options at boot and during re-insertion.

## 6) Manifest & Packaging
- [ ] Add `short_name` and `icons` (16/32/48/128). Provide a 128×128 for Web Store.
- [ ] Consider an `action` linking to Options/help once options exist.
- [ ] Validate MV3 compliance and permissions remain minimal.

## 7) Code Hygiene
- [ ] Remove unused `getStarredClasses` or repurpose it for the cloning approach.
- [ ] Optional: add ESLint/Prettier with a minimal config (no build step needed yet).
- [ ] Keep functions small and focused; document key selectors.

## 8) README Improvements
- [ ] Add install steps (Load unpacked), feature list, screenshots, and a privacy note (no data collection, runs only on Gmail).
- [ ] Add a brief support/issue section.

## 9) Cross‑Browser (Optional)
- [ ] Test on Firefox; if publishing, add `browser_specific_settings.gecko.id` and verify MV3 support.

---

Suggested Implementation Order
1. Accessibility (quick wins, low risk)
2. Re‑insertion guard (stability)
3. Reduce DOM fragility via cloning
4. Manifest + README polish
5. Localization basics
6. Options (if product direction needs it)
