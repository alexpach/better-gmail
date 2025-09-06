Changelog

All notable changes to Better Gmail Sidebar will be documented here.

1.1.1 — Options robustness fix
- Fixed: Options checkboxes no longer use invalid `querySelector` IDs for keys that may contain `:` (future-proof for dynamic star keys). Row‑scoped selectors used instead.
- Minor: Options CSS now uses variables for easier theming (no behavioral change).

1.1.0 — Options redesign and usability
- New Options UI styled like Chrome Settings (header, card, toggles, drag reorder).
- Instant apply: changes save automatically and update Gmail without refresh.
- “Saved” status pill in card header; no layout shift.
- Toolbar action opens Options.

1.0.3 — Icon and theming polish
- Theme-aware icons: white on dark backgrounds; #454746 on light.
- Minor UI polish and documentation updates.

1.0.2 — Packaging polish
- Added short_name and proper icons (16/24/32/48/128) for identity and store.
- Options page added; minimal permissions (`storage`) and Gmail host permissions.

1.0.0 — Initial version
- Adds quick Unread link and Star-color shortcuts to Gmail’s left sidebar.
- Keyboard accessible (Enter/Space), minimal footprint.
