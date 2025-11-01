# GitHub Actions Setup for EAS Build

This repository includes a GitHub Actions workflow that automatically triggers EAS builds when you push code to the `main` branch.

## 🔑 Required Setup: EXPO_TOKEN

To enable automated builds, you need to configure an `EXPO_TOKEN` secret in your GitHub repository.

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

## 🚀 How the Workflow Works

The workflow automatically triggers when:
- ✅ Code is pushed to the `main` branch
- ✅ A pull request is opened/updated targeting `main`
- ✅ Manually triggered via GitHub Actions UI

### What it does:

1. **Checks out your code**
2. **Sets up Node.js 20**
3. **Installs Bun** (your package manager)
4. **Installs dependencies** with `bun install`
5. **Sets up EAS CLI**
6. **Triggers Android build** with the `preview` profile
7. **Provides build summary**

## 📱 Build Profiles

The workflow uses the `preview` profile by default. You can modify this in `.github/workflows/eas-build.yml`:

```yaml
- name: 🏗️ Build Android (Preview)
  run: eas build --platform android --profile preview --non-interactive --no-wait
```

### Available profiles (from `eas.json`):
- `development` - Development builds with dev client
- `preview` - Internal distribution builds
- `production` - Production builds for app stores

## 🔧 Customizing the Workflow

### Build for iOS as well:

Add this step after the Android build:

```yaml
- name: 🏗️ Build iOS (Preview)
  run: eas build --platform ios --profile preview --non-interactive --no-wait
```

### Build for both platforms simultaneously:

```yaml
- name: 🏗️ Build All Platforms (Preview)
  run: eas build --platform all --profile preview --non-interactive --no-wait
```

### Wait for build to complete:

Remove the `--no-wait` flag:

```yaml
- name: 🏗️ Build Android (Preview)
  run: eas build --platform android --profile preview --non-interactive
```

## 📊 Monitoring Builds

After pushing code:

1. Go to **Actions** tab in your GitHub repository
2. Click on the latest workflow run
3. View build logs and status
4. Check detailed build progress at: https://expo.dev/accounts/dappergamer786/projects/iarabeauty-clone/builds

## 🐛 Troubleshooting

### "EXPO_TOKEN is not set"
- Make sure you've added the `EXPO_TOKEN` secret in GitHub repository settings
- The secret name must be exactly `EXPO_TOKEN` (case-sensitive)

### "Build failed"
- Check the workflow logs in the Actions tab
- Review the EAS build logs at expo.dev
- Ensure your `eas.json` configuration is correct

### "Permission denied"
- Ensure the EXPO_TOKEN has the necessary permissions
- Try generating a new token with full access

## 📝 Manual Trigger

You can manually trigger a build without pushing code:

1. Go to **Actions** tab
2. Select **EAS Build** workflow
3. Click **Run workflow**
4. Select the branch and click **Run workflow**

## 🎯 Next Steps

After setting up the `EXPO_TOKEN`:

1. Push any change to the `main` branch
2. Go to the **Actions** tab to see the workflow running
3. Monitor the build progress
4. Download the built APK from expo.dev once complete

---

**Need help?** Check the [Expo documentation](https://docs.expo.dev/build/building-on-ci/) for more information about building on CI/CD.

