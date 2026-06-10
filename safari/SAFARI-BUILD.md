# Building Better Gmail Sidebar for Safari

Complete guide to converting and building this web extension for Safari.

## Prerequisites

- macOS 11 (Big Sur) or later
- Xcode 12 or later (free from Mac App Store)
- Apple Developer Account ($99/year, required for App Store distribution)
- Safari 14.0 or later for testing

## Quick Start: Automatic Conversion

The easiest way to create a Safari extension is using Apple's built-in converter:

```bash
# Navigate to the parent directory containing better-gmail-safari
cd /path/to/parent-directory

# Run the Safari Web Extension Converter
xcrun safari-web-extension-converter better-gmail-safari \
  --project-location ./better-gmail-safari-xcode \
  --app-name "Better Gmail Sidebar" \
  --bundle-identifier "com.yourname.better-gmail-sidebar" \
  --swift
```

### Converter Options Explained

- `--project-location`: Where to create the Xcode project
- `--app-name`: Display name of the app
- `--bundle-identifier`: Unique identifier (reverse-DNS format)
- `--swift`: Use Swift for the app wrapper (recommended)
- `--macos-only`: If you want macOS-only (no iOS)

## Step-by-Step Build Process

### 1. Run the Converter

```bash
xcrun safari-web-extension-converter better-gmail-safari
```

The converter will:
- Create an Xcode project
- Generate a native app wrapper
- Copy your extension files to the Resources folder
- Set up the manifest and entitlements

### 2. Open in Xcode

```bash
open better-gmail-safari-xcode/Better\ Gmail\ Sidebar.xcodeproj
```

Or use Finder to navigate and double-click the `.xcodeproj` file.

### 3. Configure Signing & Capabilities

1. Select the project in the navigator (left sidebar)
2. Select the app target (not the extension target)
3. Go to "Signing & Capabilities" tab
4. Select your development team from the dropdown
5. Xcode will automatically manage the provisioning profile

**For the Extension target:**
1. Select the extension target (usually named "Better Gmail Sidebar Extension")
2. Repeat signing configuration
3. Verify "App Sandbox" is enabled
4. Verify the entitlement `com.apple.security.app-sandbox` is present

### 4. Build and Run

1. Select "My Mac" as the run destination
2. Press **Cmd+R** or click the Play button
3. The app will launch

### 5. Enable in Safari

1. Open Safari
2. Go to **Safari → Settings → Extensions** (or press Cmd+,)
3. Find "Better Gmail Sidebar" in the list
4. Check the box to enable it
5. Click on the extension name to configure permissions
6. Ensure "mail.google.com" is allowed

### 6. Test on Gmail

1. Open `https://mail.google.com`
2. You should see the Unread and star color rows in the left sidebar
3. Click the toolbar icon to open Options
4. Test drag-and-drop reordering and toggles

## Development Workflow

### Making Changes

1. Edit files in the `better-gmail-safari` folder (the original source)
2. Re-run the converter (overwrites Xcode project) **OR**
3. Edit files directly in Xcode under Resources folder

**Recommended:** Keep the source folder as the source of truth and re-run the converter when needed.

### Rebuilding After Changes

```bash
# Clean build folder
Cmd+Shift+K in Xcode

# Build
Cmd+B

# Run
Cmd+R
```

### Debugging

1. In Safari, right-click the extension icon → **Inspect Extension**
2. Or go to **Develop → Web Extension Background Pages → Better Gmail Sidebar**
3. Use Console to see logs from `content.js` and `background.js`
4. Set breakpoints in the Safari Web Inspector

## Publishing to Mac App Store

### 1. Prepare App Metadata

- App name: "Better Gmail Sidebar"
- Category: Productivity
- Description: (See PUBLISHING.md for copy)
- Screenshots: 1280x800 or larger (capture Gmail with extension active)
- Keywords: gmail, sidebar, productivity, email, unread, stars

### 2. Update Version and Build Number

In Xcode:
1. Select the project
2. Select the app target
3. In "General" tab, update:
   - Version: `1.1.2` (matches manifest.json)
   - Build: `1` (increment for each submission)

### 3. Archive the App

1. In Xcode, select **Product → Archive**
2. Wait for the build to complete
3. The Organizer window will open

### 4. Distribute via App Store Connect

1. Click **Distribute App**
2. Select **App Store Connect**
3. Follow the wizard to upload
4. Go to [App Store Connect](https://appstoreconnect.apple.com)
5. Fill out app information
6. Submit for review

### 5. Review Process

- Apple reviews extensions for security and privacy
- Typically takes 1-3 days
- You'll receive email updates on status
- Be ready to respond to questions

## Entitlements and Permissions

Safari extensions require explicit entitlements in the `.entitlements` file:

```xml
<key>com.apple.security.app-sandbox</key>
<true/>
<key>com.apple.security.network.client</key>
<true/>
```

The converter creates this automatically. Verify in Xcode:
- Select extension target
- Go to "Signing & Capabilities"
- Check "App Sandbox" is enabled

## Common Issues

### Extension Doesn't Appear in Safari Settings

**Fix:**
1. Quit Safari completely (Cmd+Q)
2. In Xcode, clean build folder (Cmd+Shift+K)
3. Rebuild and run (Cmd+R)
4. Reopen Safari Settings → Extensions

### "Unsigned Extension" Error

**Fix:**
- Select all targets in Xcode
- Set "Signing & Capabilities" → Team to your developer account
- Rebuild

### Extension Loads but Doesn't Work on Gmail

**Fix:**
1. Check Safari → Settings → Extensions → Better Gmail Sidebar
2. Click "Edit Websites" or the extension name
3. Ensure `mail.google.com` is set to "Allow"
4. Reload Gmail

### Changes Not Reflected After Rebuild

**Fix:**
1. Quit Safari
2. Delete Safari's extension cache:
   ```bash
   rm -rf ~/Library/Safari/Extensions/
   ```
3. Rebuild and run from Xcode
4. Reopen Safari and re-enable the extension

## Testing Checklist

Before submission:

- [ ] Extension loads without errors in Safari
- [ ] All five star colors appear in sidebar
- [ ] Unread filter works
- [ ] Options page opens from toolbar icon
- [ ] Drag-and-drop reordering works
- [ ] Toggle switches enable/disable rows
- [ ] Reset button restores defaults
- [ ] Light/dark theme icons display correctly
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] No console errors in Web Inspector
- [ ] Works on fresh Gmail account
- [ ] Settings persist after quit/relaunch

## File Structure After Conversion

```
better-gmail-safari-xcode/
├── Better Gmail Sidebar.xcodeproj
├── Better Gmail Sidebar/            # App wrapper
│   ├── AppDelegate.swift
│   ├── ViewController.swift
│   └── Assets.xcassets
└── Better Gmail Sidebar Extension/  # Your extension
    ├── Resources/                   # Your code lives here
    │   ├── manifest.json
    │   ├── content.js
    │   ├── options.js
    │   ├── options.html
    │   ├── background.js
    │   └── icons/
    ├── SafariWebExtensionHandler.swift
    └── Info.plist
```

## Resources

- [Safari Web Extensions Documentation](https://developer.apple.com/documentation/safariservices/safari_web_extensions)
- [Converting a Web Extension for Safari](https://developer.apple.com/documentation/safariservices/safari_web_extensions/converting_a_web_extension_for_safari)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [WebExtensions API Compatibility](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs)

## Notes

- Safari uses the `browser.*` namespace but also supports `chrome.*` for compatibility
- Background scripts in Safari use persistent contexts (not service workers like Chrome)
- The app wrapper is required even though the extension does all the work
- Users install your app from the App Store, which contains the extension
- The app can show a welcome screen or settings (optional)
