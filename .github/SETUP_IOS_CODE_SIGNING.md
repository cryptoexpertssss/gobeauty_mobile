# iOS Code Signing Setup for GitHub Actions

This guide explains how to set up iOS code signing for building IPA files in GitHub Actions.

## 📋 Prerequisites

Before you begin, you need:

1. **Apple Developer Account** (paid membership required - $99/year)
2. **Mac computer** with Xcode installed
3. **Access to your GitHub repository settings**

## 🔑 Required GitHub Secrets

You need to add the following secrets to your GitHub repository:

| Secret Name | Description |
|-------------|-------------|
| `APPLE_CERTIFICATE_BASE64` | Base64-encoded .p12 certificate file |
| `APPLE_CERTIFICATE_PASSWORD` | Password for the .p12 certificate |
| `APPLE_PROVISIONING_PROFILE_BASE64` | Base64-encoded provisioning profile |
| `APPLE_TEAM_ID` | Your Apple Developer Team ID |
| `KEYCHAIN_PASSWORD` | A random password for the temporary keychain |
| `EXPO_TOKEN` | Expo access token (for prebuild step) |

---

## 📝 Step-by-Step Setup Guide

### Step 1: Create an App ID

1. Go to [Apple Developer Portal](https://developer.apple.com/account/)
2. Navigate to **Certificates, Identifiers & Profiles**
3. Click **Identifiers** → **+** (plus button)
4. Select **App IDs** → **Continue**
5. Select **App** → **Continue**
6. Fill in:
   - **Description**: `GoBeauty`
   - **Bundle ID**: `app.gobeauty` (must match `app.json`)
7. Select capabilities your app needs (e.g., Push Notifications, In-App Purchase)
8. Click **Continue** → **Register**

### Step 2: Create a Distribution Certificate

1. On your Mac, open **Keychain Access**
2. Go to **Keychain Access** → **Certificate Assistant** → **Request a Certificate from a Certificate Authority**
3. Fill in:
   - **User Email Address**: Your email
   - **Common Name**: Your name or company name
   - **CA Email Address**: Leave empty
   - Select **Saved to disk**
4. Click **Continue** and save the `.certSigningRequest` file

5. Go back to [Apple Developer Portal](https://developer.apple.com/account/)
6. Navigate to **Certificates, Identifiers & Profiles** → **Certificates**
7. Click **+** (plus button)
8. Select **Apple Distribution** → **Continue**
9. Upload the `.certSigningRequest` file you created
10. Click **Continue** → **Download** the certificate (`.cer` file)

11. Double-click the downloaded `.cer` file to install it in Keychain Access

### Step 3: Export Certificate as .p12

1. Open **Keychain Access** on your Mac
2. Select **My Certificates** from the left sidebar
3. Find your **Apple Distribution** certificate
4. Right-click → **Export "Apple Distribution: ..."**
5. Save as: `distribution_certificate.p12`
6. **Set a password** (you'll need this for GitHub secrets)
7. Click **Save**
8. Enter your Mac password to allow the export

### Step 4: Create a Provisioning Profile

1. Go to [Apple Developer Portal](https://developer.apple.com/account/)
2. Navigate to **Certificates, Identifiers & Profiles** → **Profiles**
3. Click **+** (plus button)
4. Select **Ad Hoc** (for testing) or **App Store** (for production) → **Continue**
5. Select your App ID (`app.gobeauty`) → **Continue**
6. Select your Distribution certificate → **Continue**
7. Select devices to include (for Ad Hoc only) → **Continue**
8. Enter Profile Name: `GoBeauty AdHoc` → **Generate**
9. **Download** the provisioning profile (`.mobileprovision` file)

### Step 5: Convert Files to Base64

On your Mac, open Terminal and run:

```bash
# Convert certificate to base64
base64 -i distribution_certificate.p12 | pbcopy
# The base64 string is now in your clipboard
```

Save this value - you'll use it for `APPLE_CERTIFICATE_BASE64`.

```bash
# Convert provisioning profile to base64
base64 -i GoBeauty_AdHoc.mobileprovision | pbcopy
# The base64 string is now in your clipboard
```

Save this value - you'll use it for `APPLE_PROVISIONING_PROFILE_BASE64`.

### Step 6: Find Your Team ID

1. Go to [Apple Developer Portal](https://developer.apple.com/account/)
2. Click on your name in the top right
3. Your **Team ID** is displayed (e.g., `A1B2C3D4E5`)
4. Copy this value - you'll use it for `APPLE_TEAM_ID`

### Step 7: Add Secrets to GitHub

1. Go to your GitHub repository: `https://github.com/YOUR_USERNAME/YOUR_REPO`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret:

**APPLE_CERTIFICATE_BASE64:**
- Name: `APPLE_CERTIFICATE_BASE64`
- Value: Paste the base64 string from Step 5 (certificate)

**APPLE_CERTIFICATE_PASSWORD:**
- Name: `APPLE_CERTIFICATE_PASSWORD`
- Value: The password you set when exporting the .p12 file

**APPLE_PROVISIONING_PROFILE_BASE64:**
- Name: `APPLE_PROVISIONING_PROFILE_BASE64`
- Value: Paste the base64 string from Step 5 (provisioning profile)

**APPLE_TEAM_ID:**
- Name: `APPLE_TEAM_ID`
- Value: Your Team ID from Step 6 (e.g., `A1B2C3D4E5`)

**KEYCHAIN_PASSWORD:**
- Name: `KEYCHAIN_PASSWORD`
- Value: Any random strong password (e.g., `$(openssl rand -base64 32)`)

**EXPO_TOKEN:**
- Name: `EXPO_TOKEN`
- Value: Your Expo access token (run `eas token:create`)

---

## 🚀 Testing the Workflow

1. Push a commit to the `main` branch
2. Go to **Actions** tab in your GitHub repository
3. Watch the **Build iOS IPA** workflow run
4. Once complete, download the IPA from **Artifacts**

---

## 🐛 Troubleshooting

### "No signing certificate found"

**Solution:** Make sure you've added `APPLE_CERTIFICATE_BASE64` and `APPLE_CERTIFICATE_PASSWORD` secrets correctly.

### "No provisioning profile found"

**Solution:** Verify that `APPLE_PROVISIONING_PROFILE_BASE64` is set and the profile matches your bundle ID.

### "User interaction is not allowed"

**Solution:** This usually means the keychain password is incorrect. Check `KEYCHAIN_PASSWORD` secret.

### "Code signing is required for product type 'Application'"

**Solution:** Ensure your provisioning profile includes the device/distribution certificate you're using.

### Certificate expired

**Solution:** 
1. Create a new certificate in Apple Developer Portal
2. Export it as .p12
3. Convert to base64
4. Update `APPLE_CERTIFICATE_BASE64` secret in GitHub

### Provisioning profile expired

**Solution:**
1. Create a new provisioning profile in Apple Developer Portal
2. Download it
3. Convert to base64
4. Update `APPLE_PROVISIONING_PROFILE_BASE64` secret in GitHub

---

## 📱 Installing the IPA on Your Device

### Method 1: Using Xcode

1. Download the IPA from GitHub Actions artifacts
2. Connect your iOS device to your Mac
3. Open **Xcode** → **Window** → **Devices and Simulators**
4. Select your device
5. Drag and drop the IPA file into the **Installed Apps** section

### Method 2: Using Diawi

1. Go to [diawi.com](https://www.diawi.com/)
2. Upload your IPA file
3. Share the generated link with testers
4. Open the link on iOS device and install

### Method 3: Using Apple Configurator

1. Download [Apple Configurator](https://apps.apple.com/app/apple-configurator/id1037126344)
2. Connect your device
3. Select your device → **Add** → **Apps**
4. Select the IPA file

---

## 🔄 Renewing Certificates and Profiles

**Distribution Certificates** are valid for **1 year**.
**Provisioning Profiles** are valid for **1 year**.

Set a calendar reminder to renew them before expiration!

---

## 📚 Additional Resources

- [Apple Developer Documentation](https://developer.apple.com/documentation/)
- [Code Signing Guide](https://developer.apple.com/support/code-signing/)
- [Expo Code Signing](https://docs.expo.dev/app-signing/app-credentials/)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

---

**Need help?** Check the workflow logs in the Actions tab for detailed error messages.

