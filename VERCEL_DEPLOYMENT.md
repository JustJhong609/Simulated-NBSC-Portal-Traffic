# 🚀 Vercel Deployment Guide - NBSC Portal Traffic Dashboard

This guide will walk you through deploying your full-stack NBSC Portal Traffic Dashboard to Vercel.

## ✨ Why Vercel?

✅ **Full-stack support** - Hosts both React frontend AND Node.js backend  
✅ **Serverless functions** - Backend API runs as serverless functions  
✅ **Zero configuration** - Automatic builds and deployments  
✅ **Free tier** - Perfect for projects like this  
✅ **Custom domains** - Easy to add your own domain  
✅ **Automatic HTTPS** - Built-in SSL certificates  

## 📋 Prerequisites

1. **GitHub account** (you already have this ✅)
2. **Vercel account** (free) - Sign up at https://vercel.com
3. **Repository pushed to GitHub** ✅

---

## 🎯 Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended for First Time)

#### Step 1: Sign Up/Login to Vercel
1. Go to https://vercel.com
2. Click "Sign Up" or "Login"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

#### Step 2: Import Your Repository
1. On Vercel dashboard, click **"Add New Project"**
2. Click **"Import Git Repository"**
3. Find and select: `JustJhong609/Simulated-NBSC-Portal-Traffic`
4. Click **"Import"**

#### Step 3: Configure Project Settings

**Framework Preset:** Select `Vite` or leave as `Other`

**Root Directory:** Leave as `./` (root)

**Build Settings:**
- **Build Command:** 
  ```bash
  cd frontend && npm install && npm run build
  ```
- **Output Directory:** 
  ```
  frontend/dist
  ```
- **Install Command:** 
  ```bash
  npm install && cd frontend && npm install && cd ../backend && npm install
  ```

**Environment Variables:** (Optional - only if you want to use BigDataCloud API)
- Name: `BIGDATACLOUD_API_KEY`
- Value: `bdc_a7726c310b0d4a08be3452e8808f5b5e`

#### Step 4: Deploy!
1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://simulated-nbsc-portal-traffic.vercel.app`

---

### Method 2: Deploy via Vercel CLI (Alternative)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login
```bash
vercel login
```

#### Step 3: Deploy from Project Root
```bash
cd /workspaces/Simulated-NBSC-Portal-Traffic
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- What's your project's name? **simulated-nbsc-portal-traffic**
- In which directory is your code located? **/**
- Want to override settings? **Y**
  - Build Command: `cd frontend && npm install && npm run build`
  - Output Directory: `frontend/dist`
  - Development Command: Leave empty

#### Step 4: Deploy to Production
```bash
vercel --prod
```

---

## 📁 Project Structure for Vercel

Your repository is already configured with:

```
/
├── frontend/              # React app
│   ├── dist/             # Build output (created on deploy)
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── backend/               # Express API
│   ├── server.js
│   ├── routes/
│   ├── services/
│   └── package.json
├── data/                  # Data files
│   └── simulated_traffic.json
├── vercel.json           # Vercel configuration ✅
├── .vercelignore         # Files to ignore ✅
└── package.json          # Root package.json
```

---

## ⚙️ Configuration Files Explained

### `vercel.json`
This file tells Vercel how to build and route your application:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    },
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ]
}
```

**What it does:**
- Builds frontend as static site
- Runs backend as serverless function
- Routes `/api/*` requests to backend
- Routes everything else to frontend

---

## 🔧 Post-Deployment Configuration

### 1. Custom Domain (Optional)
1. Go to your project on Vercel
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions

### 2. Environment Variables
If you need to add/change environment variables:
1. Go to **Settings** → **Environment Variables**
2. Add variables for Production, Preview, and Development
3. Redeploy for changes to take effect

### 3. Auto-Deploy on Git Push
Vercel automatically deploys when you push to GitHub:
- **Push to `main`** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull Requests** → Preview deployment with unique URL

---

## 🌐 Access Your Deployed Dashboard

After deployment, you'll get:

**Production URL:** `https://your-project-name.vercel.app`  
**Backend API:** `https://your-project-name.vercel.app/api/traffic`

Example:
```
https://simulated-nbsc-portal-traffic.vercel.app
https://simulated-nbsc-portal-traffic.vercel.app/api/traffic
```

---

## ✅ Features on Vercel Deployment

✅ **Frontend (React + Vite)** - Fully functional dashboard  
✅ **Backend (Express API)** - Working API endpoints  
✅ **Interactive Map** - Leaflet with markers and popups  
✅ **Heatmap Layer** - Toggle on/off  
✅ **Statistics Panel** - Real-time metrics  
✅ **Time Filters** - Filter by time range  
✅ **Responsive Design** - Works on all devices  
✅ **HTTPS** - Automatic SSL certificate  

---

## 🔄 Update Your Deployed Site

### Via Git Push (Automatic)
```bash
# Make your changes
git add .
git commit -m "Your update message"
git push origin main
```
Vercel automatically detects the push and redeploys!

### Via Vercel CLI
```bash
vercel --prod
```

### Via Vercel Dashboard
1. Go to your project
2. Click **Deployments**
3. Click **"Redeploy"** on any previous deployment

---

## 🐛 Troubleshooting

### Issue: Build Fails
**Solution:**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify build command is correct

### Issue: API Not Working
**Solution:**
- Check `vercel.json` routes configuration
- Ensure backend files are committed to Git
- Check function logs in Vercel dashboard

### Issue: 404 Errors
**Solution:**
- Verify output directory is `frontend/dist`
- Check that `vercel.json` routes are correct
- Ensure all files are committed to Git

### Issue: Environment Variables Not Working
**Solution:**
- Add variables in Vercel dashboard settings
- Redeploy after adding variables
- Check variable names match your code

---

## 📊 Monitoring & Analytics

Vercel provides built-in analytics:

1. **Deployments** - View all deployment history
2. **Analytics** - Traffic and performance metrics
3. **Logs** - Function logs and errors
4. **Speed Insights** - Performance monitoring

Access via: Project → **Analytics** tab

---

## 💰 Vercel Pricing

**Hobby Plan (Free):**
- ✅ Perfect for this project
- Unlimited personal projects
- 100GB bandwidth/month
- Serverless functions included
- Automatic HTTPS
- Preview deployments

**Pro Plan ($20/month):**
- For commercial projects
- Higher bandwidth
- Team collaboration

---

## 🎯 Quick Deploy Checklist

- [ ] Vercel account created
- [ ] Repository linked to Vercel
- [ ] Build command configured
- [ ] Output directory set to `frontend/dist`
- [ ] Environment variables added (if needed)
- [ ] First deployment successful
- [ ] Site accessible via Vercel URL
- [ ] API endpoints working
- [ ] Map displaying correctly
- [ ] All features functional

---

## 📝 Deployment Commands Reference

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs [deployment-url]

# Link to existing project
vercel link

# Pull environment variables
vercel env pull
```

---

## 🔗 Useful Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Vercel Documentation:** https://vercel.com/docs
- **Vercel CLI Docs:** https://vercel.com/docs/cli
- **Your Deployments:** https://vercel.com/[your-username]

---

## 🎓 Next Steps After Deployment

1. **Share your live URL** with stakeholders
2. **Test all features** thoroughly
3. **Set up custom domain** (optional)
4. **Monitor analytics** and performance
5. **Enable Vercel Analytics** for detailed insights
6. **Update README** with live demo link

---

**🎉 Your NBSC Portal Traffic Dashboard is now production-ready on Vercel!**

---

**Built with ❤️ for NBSC Digital Innovation**
