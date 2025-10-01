# 🚀 Quick Start: Deploy to Vercel

## ⚡ 3-Minute Deployment

### Method 1: One-Click Deploy (Easiest)

1. **Click this button:**
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JustJhong609/Simulated-NBSC-Portal-Traffic)

2. **Sign in** with GitHub

3. **Configure build settings:**
   ```
   Build Command: cd frontend && npm install && npm run build
   Output Directory: frontend/dist
   Install Command: npm install && cd frontend && npm install && cd ../backend && npm install
   ```

4. **Click "Deploy"**

5. **Done!** Your dashboard will be live in 2-3 minutes

---

### Method 2: Via Vercel Dashboard

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Import: `JustJhong609/Simulated-NBSC-Portal-Traffic`
5. Configure settings (see above)
6. Click **"Deploy"**

---

### Method 3: Via CLI (For Developers)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

---

## ✅ After Deployment

Your dashboard will be available at:
```
https://your-project-name.vercel.app
```

### Test These URLs:
- **Dashboard:** `https://your-project-name.vercel.app`
- **API:** `https://your-project-name.vercel.app/api/traffic`
- **Health Check:** `https://your-project-name.vercel.app/api/health`

---

## 🎯 What You Get on Vercel

✅ **Full-Stack Deployment**
- React frontend with Vite
- Node.js/Express backend API
- All features working

✅ **Automatic Features**
- HTTPS (SSL certificate)
- CDN for fast loading
- Serverless functions for API
- Auto-deploy on Git push

✅ **Free Tier Includes**
- Unlimited personal projects
- 100GB bandwidth/month
- Automatic scaling
- Preview deployments

---

## 📝 Optional: Environment Variables

If you want to use the BigDataCloud API (already included in code):

1. In Vercel Dashboard → **Settings** → **Environment Variables**
2. Add:
   - **Name:** `BIGDATACLOUD_API_KEY`
   - **Value:** `bdc_a7726c310b0d4a08be3452e8808f5b5e`
3. Redeploy

---

## 🔄 Update Your Live Site

Every time you push to GitHub, Vercel auto-deploys:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Wait 1-2 minutes - your site updates automatically! 🎉

---

## 🐛 Troubleshooting

### Build Fails?
- Check **Deployment Logs** in Vercel dashboard
- Ensure all files are committed to Git
- Verify build command is correct

### API Not Working?
- Check **Function Logs** in Vercel dashboard
- Verify `vercel.json` is committed
- Ensure backend files are pushed to Git

### Need Help?
See detailed guide: [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

---

## 🎓 Next Steps

1. ✅ Deploy to Vercel
2. ✅ Test all features
3. ✅ Share your live URL
4. ⭐ Star the repository
5. 🎨 Customize if needed

---

**That's it! Your NBSC Portal Traffic Dashboard is now live! 🚀**
