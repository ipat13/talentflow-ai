# 🔧 Vercel Environment Variables Setup Guide

## ✅ Issues Fixed Locally
1. **SyntaxError: Invalid or unexpected token** - Fixed (non-standard CSS properties)
2. **Server crashes** - Fixed (removed server-side console.log)
3. **Firebase initialization** - Now works with test values

## 🚀 Steps to Configure Vercel

### 1. Access Vercel Dashboard
- Go to: https://vercel.com/dashboard
- Login with your Vercel account
- Select project: **talentflow-ai**

### 2. Navigate to Environment Variables
- Click **Settings** (gear icon)
- Select **Environment Variables** from left menu
- You'll see: **Production** and **Preview** sections

### 3. Add ALL Required Variables
**Add these EXACT variables to BOTH Production AND Preview:**

#### Firebase Configuration (Client-side)
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDexample1234567890abcdefghijklmnopqrstuvwxyz
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=talentflow-ai.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=talentflow-ai
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=talentflow-ai.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890abcdef
```

#### Firebase Admin (Server-side)
```
FIREBASE_PROJECT_ID=talentflow-ai
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-example@talentflow-ai.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7VJTUt9Us8cKj\nMzEfYyjiWA4R4/M2bS1GBM...\n-----END PRIVATE KEY-----\n
```

#### DeepSeek AI
```
DEEPSEEK_API_KEY=sk-example1234567890abcdefghijklmnopqrstuvwxyz
```

#### Apify (LinkedIn Scraping)
```
APIFY_API_KEY=apify_api_example1234567890abcdef
```

### 4. Important Notes
- **Use REAL values**: Replace example values with your actual API keys
- **Multi-line values**: For `FIREBASE_PRIVATE_KEY`, paste entire key with `\n` line breaks
- **Add to both**: Production AND Preview environments
- **Case sensitive**: Variable names must match exactly

### 5. Redeploy After Configuration
1. Click **Save** after adding all variables
2. Go to **Deployments** tab
3. Find latest deployment → Click **Redeploy**
4. Wait 2-3 minutes for new deployment

### 6. Verify Deployment
After redeploying:
- Visit: https://talentflow-q5sevsqx0-ipat13s-projects.vercel.app
- Should show new "comfy" design without authentication
- Test login functionality

## 🔧 Troubleshooting

### If still seeing authentication:
1. **Check variable names**: Ensure exact match with `.env.local`
2. **Redeploy required**: Environment variables only apply to new deployments
3. **Check logs**: Vercel Dashboard → Deployments → Click deployment → View Logs

### If Firebase errors:
1. **Verify Firebase project**: Ensure project exists in Firebase Console
2. **Check service account**: Service account email must have proper permissions
3. **Get real Firebase config**:
   - Go to Firebase Console: https://console.firebase.google.com
   - Select your project
   - Click ⚙️ → Project settings
   - Scroll to "Your apps" section
   - Copy config values

### If build fails:
1. **Check build logs** in Vercel Dashboard
2. **Test locally first**: `npm run build`
3. **Common issues**:
   - Missing environment variables
   - Syntax errors (already fixed)
   - Memory limits

## 📋 Quick Reference

**Project URL**: https://talentflow-q5sevsqx0-ipat13s-projects.vercel.app  
**Vercel Dashboard**: https://vercel.com/dashboard  
**Environment Variables Path**: Settings → Environment Variables  
**Firebase Console**: https://console.firebase.google.com  

## 🎯 Expected Result
After configuring environment variables and redeploying:
- ✅ Public access to new "comfy" design
- ✅ Firebase authentication working
- ✅ DeepSeek AI integration functional
- ✅ LinkedIn scraping via Apify operational

## ⏱️ Time Estimate
- **Configuration**: 5-10 minutes
- **Redeploy**: 2-3 minutes
- **Testing**: 5 minutes

## 📞 Support
- Vercel Docs: https://vercel.com/docs
- Firebase Docs: https://firebase.google.com/docs
- Next.js Docs: https://nextjs.org/docs

---

**Critical**: Must use **real API keys**, not the example values shown above. The example values are for reference only and will not work in production.