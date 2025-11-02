# GitHub Actions Setup for Native Mobile Builds

This repository includes GitHub Actions workflows that automatically build **Android APK** and **iOS IPA** files directly in GitHub Actions when you push code to the `main` branch.

## 🎯 No EAS Required!

These workflows build your app **natively** - no Expo Application Services (EAS) subscription needed! Both APK and IPA files are built directly in GitHub Actions and available for download.

## 📱 Available Workflows

| Workflow | File | Platforms | Output |
|----------|------|-----------|--------|
| **Build Android APK** | `.github/workflows/android-build.yml` | Android | APK file |
| **Build iOS IPA** | `.github/workflows/ios-build.yml` | iOS | IPA file |
| **Build All Platforms** | `.github/workflows/build-all.yml` | Android + iOS | APK + IPA |

## 🔢 Automatic Versioning

Every build automatically includes a version number in the format: **GoBeauty v{version}.{build_number}**

- **Version** comes from `app.json` (e.g., `1.0.0`)
- **Build Number** is the GitHub Actions run number (auto-incremented)
- **Example:** `GoBeauty v1.0.0.42` (version 1.0.0, build #42)

**Artifact names include the version:**
- Android: `GoBeauty-v1.0.0.42-android.zip`
- iOS: `GoBeauty-v1.0.0.42-ios.zip`

**To update the base version:** Edit the `version` field in `app.json`

---

## 🤖 Android Build Setup

### Workflow File
`.github/workflows/android-build.yml`

### 🔑 Required Setup: EXPO_TOKEN

The EXPO_TOKEN is needed for the `expo prebuild` step. If you don't have one, you can remove the Expo setup step from the workflow.

### Step 1: Generate an Expo Access Token

1. **Login to your Expo account:**
   ```bash
   eas login
   ```

2. **Generate a new access token:**
   ```bash
   eas token:create
   ```
   
   Or visit: https://expo.dev/accounts/[your-username]/settings/access-tokens

3. **Copy the generated token** (you'll only see it once!)

### Step 2: Add Token to GitHub Secrets

1. Go to your GitHub repository: https://github.com/cryptoexpertssss/gobeauty_mobile

2. Click **Settings** → **Secrets and variables** → **Actions**

3. Click **New repository secret**

4. Set:
   - **Name:** `EXPO_TOKEN`
   - **Value:** Paste the token you copied from Step 1

5. Click **Add secret**

### 🚀 How the Android Workflow Works

The workflow automatically triggers when:
- ✅ Code is pushed to the `main` branch
- ✅ A pull request is opened/updated targeting `main`
- ✅ Manually triggered via GitHub Actions UI

**What it does:**

1. **Checks out your code**
2. **Sets up Node.js 20**
3. **Sets up Java 17** (required for Android builds)
4. **Installs Bun** (your package manager)
5. **Installs dependencies** with `bun install`
6. **Runs Expo prebuild** to generate native Android code
7. **Builds APK** using Gradle
8. **Uploads APK** as a downloadable artifact
9. **Provides build summary**

## 🔧 Customizing the Workflow

The workflow builds a **release APK** using Gradle. You can customize the build by modifying `.github/workflows/android-build.yml`:

### Build a debug APK instead:

Change the Gradle command from `assembleRelease` to `assembleDebug`:

```yaml
- name: 🏗️ Build Android APK
  working-directory: android
  run: ./gradlew assembleDebug --no-daemon
```

### Add additional Gradle tasks:

You can run tests or other tasks before building:

```yaml
- name: 🧪 Run tests
  working-directory: android
  run: ./gradlew test --no-daemon

- name: 🏗️ Build Android APK
  working-directory: android
  run: ./gradlew assembleRelease --no-daemon
```

## 📱 Alternative: Using EAS Build

If you prefer to use Expo Application Services (EAS) instead of native Gradle builds, you can use the following commands locally or in a different workflow:

### Available profiles (from `eas.json`):
- `development` - Development builds with dev client
- `preview` - Internal distribution builds
- `production` - Production builds for app stores

### Build with EAS (requires EAS subscription):

```bash
# Build for Android
eas build --platform android --profile preview

# Build for iOS
eas build --platform ios --profile preview

# Build for both platforms
eas build --platform all --profile preview
```

**Note:** The GitHub Actions workflows in this repository use **native builds** (Gradle for Android, Xcode for iOS), not EAS Build, to avoid requiring an EAS subscription.

---

## 📱 iOS Build Setup

### Workflow File
`.github/workflows/ios-build.yml`

### 🔑 Required Setup: Code Signing

iOS builds require code signing certificates and provisioning profiles. **See the complete setup guide:**

👉 **[iOS Code Signing Setup Guide](.github/SETUP_IOS_CODE_SIGNING.md)**

**Required GitHub Secrets:**
- `APPLE_CERTIFICATE_BASE64` - Your distribution certificate (base64 encoded)
- `APPLE_CERTIFICATE_PASSWORD` - Password for the certificate
- `APPLE_PROVISIONING_PROFILE_BASE64` - Your provisioning profile (base64 encoded)
- `APPLE_TEAM_ID` - Your Apple Developer Team ID
- `KEYCHAIN_PASSWORD` - A random password for the temporary keychain
- `EXPO_TOKEN` - Expo access token (same as Android)

### 🚀 How the iOS Workflow Works

The workflow automatically triggers when:
- ✅ Code is pushed to the `main` branch
- ✅ A pull request is opened/updated targeting `main`
- ✅ Manually triggered via GitHub Actions UI

**What it does:**

1. **Checks out your code**
2. **Sets up Node.js 20**
3. **Installs Bun** (your package manager)
4. **Installs dependencies** with `bun install`
5. **Runs Expo prebuild** to generate native iOS code
6. **Installs CocoaPods dependencies**
7. **Imports code signing certificate** into temporary keychain
8. **Installs provisioning profile**
9. **Builds and archives the app** using Xcode
10. **Exports IPA file** for device installation
11. **Uploads IPA** as a downloadable artifact
12. **Cleans up keychain** for security

### 📦 Output

- **File**: `GoBeauty.ipa`
- **Type**: Ad-hoc distribution (installable on registered devices)
- **Download**: From GitHub Actions artifacts

### 📱 Installing the IPA

After downloading the IPA from artifacts:

**Method 1: Using Xcode**
1. Connect your iOS device to your Mac
2. Open Xcode → Window → Devices and Simulators
3. Drag and drop the IPA onto your device

**Method 2: Using Diawi**
1. Go to [diawi.com](https://www.diawi.com/)
2. Upload the IPA
3. Share the link with testers

**Method 3: Using Apple Configurator**
1. Download Apple Configurator from the Mac App Store
2. Connect your device
3. Add the IPA to your device

---

## 🚀 Building Both Platforms

### Workflow File
`.github/workflows/build-all.yml`

### When to Use

Use this workflow when you need to build **both Android and iOS** simultaneously:
- 🎯 Release preparation
- 🧪 Comprehensive CI testing
- 📦 Creating builds for multiple platforms at once

### How to Trigger

This workflow is configured for **manual trigger only** to avoid unnecessary builds:

1. Go to **Actions** tab in your GitHub repository
2. Select **Build All Platforms** workflow
3. Click **Run workflow**
4. Select the branch
5. Click **Run workflow**

### What it Produces

- ✅ **Android APK** (artifact: `android-apk`)
- ✅ **iOS IPA** (artifact: `ios-ipa`)

Both artifacts are available for download once the workflow completes.

### ⚠️ Important Notes

- **macOS runners** are more expensive than Linux runners
- Building both platforms takes longer than individual builds
- For single-platform builds, use the individual workflows instead

---

## 📊 Monitoring Builds

After pushing code:

1. Go to **Actions** tab in your GitHub repository
2. Click on the latest workflow run
3. View build logs and status
4. Download the APK artifact once the build completes

## 🐛 Troubleshooting

### Android Issues

**"EXPO_TOKEN is not set"**
- Make sure you've added the `EXPO_TOKEN` secret in GitHub repository settings
- The secret name must be exactly `EXPO_TOKEN` (case-sensitive)

**"Gradle build failed"**
- Check Java version (should be 17)
- Ensure `android` directory was generated by `expo prebuild`
- Review the build logs for specific Gradle errors

**"Permission denied" on gradlew**
- The workflow automatically makes gradlew executable
- If this persists, check the repository file permissions

### iOS Issues

**"No signing certificate found"**
- Verify `APPLE_CERTIFICATE_BASE64` and `APPLE_CERTIFICATE_PASSWORD` secrets are set
- Ensure the certificate is valid and not expired
- Check that the certificate is a Distribution certificate

**"No provisioning profile found"**
- Verify `APPLE_PROVISIONING_PROFILE_BASE64` secret is set
- Ensure the profile matches your bundle ID (`app.gobeauty`)
- Check that the profile includes your distribution certificate

**"Code signing is required"**
- Ensure all code signing secrets are properly configured
- Verify your provisioning profile includes the correct devices (for Ad-hoc)
- Check that `APPLE_TEAM_ID` matches your Apple Developer account

**"User interaction is not allowed"**
- This usually means the keychain password is incorrect
- Verify `KEYCHAIN_PASSWORD` secret is set correctly

**"CocoaPods installation failed"**
- Check the CocoaPods cache
- Try clearing the cache and re-running the workflow
- Ensure your `Podfile` is valid

### General Issues

**"Build failed"**
- Check the workflow logs in the Actions tab for detailed error messages
- Ensure your dependencies are correctly installed
- Verify all required secrets are configured

## 📝 Manual Trigger

You can manually trigger any workflow without pushing code:

1. Go to **Actions** tab
2. Select the desired workflow:
   - **Build Android APK** - For Android only
   - **Build iOS IPA** - For iOS only
   - **Build All Platforms** - For both platforms
3. Click **Run workflow**
4. Select the branch and click **Run workflow**

## 🎯 Next Steps

### For Android Builds

1. Set up `EXPO_TOKEN` secret (see above)
2. Push any change to the `main` branch
3. Go to the **Actions** tab to see the workflow running
4. Download the built APK from the **Artifacts** section once complete

### For iOS Builds

1. **Complete iOS code signing setup** - See [SETUP_IOS_CODE_SIGNING.md](.github/SETUP_IOS_CODE_SIGNING.md)
2. Add all required secrets to GitHub repository
3. Push any change to the `main` branch
4. Go to the **Actions** tab to see the workflow running
5. Download the built IPA from the **Artifacts** section once complete
6. Install on your device using one of the methods described above

### For Both Platforms

1. Complete setup for both Android and iOS
2. Use the **Build All Platforms** workflow (manual trigger)
3. Download both APK and IPA from artifacts

---

## 📚 Additional Resources

- [iOS Code Signing Setup](.github/SETUP_IOS_CODE_SIGNING.md) - Complete guide for iOS builds
- [Expo Documentation](https://docs.expo.dev/build/building-on-ci/) - Building on CI/CD
- [GitHub Actions Documentation](https://docs.github.com/en/actions) - GitHub Actions guide
- [Apple Developer Portal](https://developer.apple.com/account/) - Manage certificates and profiles

---

**Need help?** Check the workflow logs in the Actions tab for detailed error messages, or refer to the troubleshooting section above.

