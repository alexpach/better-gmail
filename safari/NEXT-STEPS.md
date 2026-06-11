# Next Steps: Safari Extension

You've successfully created a Safari-compatible version of Better Gmail Sidebar! Here's what to do next:

## Immediate (To Test Locally)

### 1. Get Access to a Mac
Safari extensions **must** be built on macOS using Xcode. You cannot test or build on Linux/Windows.

### 2. Install Development Tools
```bash
# On macOS, install Xcode from the App Store (free)
# Then install Command Line Tools
xcode-select --install
```

### 3. Convert to Safari Extension
```bash
# Navigate to where you have better-gmail-safari
cd /path/to/better-gmail-safari

# Run the converter
xcrun safari-web-extension-converter . \
  --project-location ../better-gmail-safari-xcode \
  --app-name "Better Gmail Sidebar" \
  --bundle-identifier "com.yourname.better-gmail-sidebar" \
  --swift
```

### 4. Build and Test
```bash
# Open the project
open ../better-gmail-safari-xcode/Better\ Gmail\ Sidebar.xcodeproj

# In Xcode:
# 1. Select your development team under Signing & Capabilities
# 2. Press Cmd+R to build and run
# 3. Enable the extension in Safari → Settings → Extensions
# 4. Test on Gmail
```

See **SAFARI-BUILD.md** for detailed instructions.

## Short Term (1-2 weeks)

### 5. Test All Features
Use the checklist in SAFARI-BUILD.md:
- Unread filter
- All 5 star colors
- Options page (drag-and-drop, toggles)
- Light/dark theme icons
- Keyboard navigation

### 6. Fix Safari-Specific Issues
Some things that might need adjustment:
- Storage API (`chrome.storage` vs `browser.storage`)
- Background script behavior differences
- CSS compatibility with Safari

### 7. Polish the App Wrapper
The Xcode project includes a native macOS app. Consider adding:
- A welcome screen explaining how to use the extension
- Link to options page
- Version info and about screen

## Medium Term (1-2 months)

### 8. Join Apple Developer Program
- Cost: $99/year
- Required for Mac App Store distribution
- Sign up at: https://developer.apple.com/programs/

### 9. Prepare App Store Listing
Update **PUBLISHING.md** with Safari-specific information:
- App Store screenshots (macOS style, not just browser)
- App icon (1024x1024 for App Store)
- Privacy policy (link to GitHub or host separately)
- Support email

### 10. Submit to Mac App Store
Follow the complete guide in **SAFARI-BUILD.md** section "Publishing to Mac App Store":
1. Archive the app in Xcode
2. Upload to App Store Connect
3. Fill out app metadata
4. Submit for review (typically 1-3 days)

## Long Term

### 11. Maintain Cross-Platform Compatibility
Keep the Chrome and Safari versions in sync:
- Shared codebase for content.js, options.js, background.js
- Only manifests differ
- Consider a build script to generate both versions from a single source

### 12. Consider iOS Support
Safari extensions can also run on iPhone/iPad:
- Modify Xcode project to target iOS
- Test on smaller screens
- Adjust UI if needed (though Gmail on mobile is different)

### 13. Monitor for Updates
- Safari API changes
- Gmail UI changes
- User feedback and bug reports

## Quick Reference

**Key Files:**
- `manifest.json` - Safari-compatible manifest (already updated)
- `SAFARI-BUILD.md` - Complete build and distribution guide
- `README.md` - User-facing documentation (Safari-specific)
- All other .js/.html/.css files work unchanged

**Important Links:**
- Safari Web Extensions: https://developer.apple.com/safari/extensions/
- App Store Connect: https://appstoreconnect.apple.com
- Extension Docs: https://developer.apple.com/documentation/safariservices/safari_web_extensions

**Support:**
- If you encounter issues, check SAFARI-BUILD.md "Common Issues" section
- For API compatibility, see: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs

## Differences from Chrome Version

| Aspect | Chrome | Safari |
|--------|--------|--------|
| Manifest | `service_worker` | `scripts` array |
| Distribution | Chrome Web Store | Mac App Store |
| Requirements | None | macOS + Xcode + $99/year |
| Build Process | Zip and upload | Xcode build + archive |
| Installation | Browser extension | Native app with extension |
| Updates | Automatic from store | Through App Store |
| API namespace | `chrome.*` | `browser.*` (but `chrome.*` works) |

## Checklist

Before publishing:
- [ ] Tested on macOS with Xcode
- [ ] All features working in Safari
- [ ] No console errors
- [ ] Light/dark theme working
- [ ] Options page fully functional
- [ ] Joined Apple Developer Program
- [ ] Created App Store Connect listing
- [ ] Prepared screenshots and metadata
- [ ] Privacy policy accessible
- [ ] Submitted for review

---

**Ready to start?** Open SAFARI-BUILD.md and follow the "Quick Start" section!
