# 🚀 Deployment Guide - GitHub Pages

This guide explains how to deploy the NBSC Portal Traffic Dashboard to GitHub Pages.

## 📋 Prerequisites

1. GitHub repository already created
2. Git installed locally
3. Node.js and npm installed

## 🔧 Deployment Setup (Already Configured)

The following files have been configured for GitHub Pages deployment:

### 1. Frontend Package.json
- Added `homepage` field pointing to your GitHub Pages URL
- Added `predeploy` and `deploy` scripts
- Installed `gh-pages` package

### 2. Vite Configuration
- Set `base` path to `/Simulated-NBSC-Portal-Traffic/`
- Configured build output directory

### 3. GitHub Actions Workflow
- Created `.github/workflows/deploy.yml`
- Automated deployment on push to main branch

## 📦 Manual Deployment Method

### Option 1: Using npm script (Recommended)
```bash
# From the root directory
npm run deploy

# Or from the frontend directory
cd frontend
npm run deploy
```

This will:
1. Build the production bundle
2. Push the `dist` folder to the `gh-pages` branch
3. Deploy automatically to GitHub Pages

### Option 2: Using GitHub Actions (Automated)

Simply push your changes to the `main` branch:

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

The GitHub Actions workflow will automatically:
1. Build the project
2. Deploy to GitHub Pages

## ⚙️ GitHub Repository Settings

**IMPORTANT:** You need to enable GitHub Pages in your repository settings:

1. Go to your repository on GitHub: `https://github.com/JustJhong609/Simulated-NBSC-Portal-Traffic`

2. Click on **Settings** → **Pages**

3. Under **Build and deployment**:
   - **Source**: Choose "GitHub Actions" (recommended)
   
   OR if using gh-pages branch:
   - **Source**: Choose "Deploy from a branch"
   - **Branch**: Select `gh-pages` and `/ (root)`

4. Click **Save**

5. Wait a few minutes for deployment to complete

## 🌐 Access Your Deployed Site

Once deployed, your dashboard will be available at:

```
https://JustJhong609.github.io/Simulated-NBSC-Portal-Traffic/
```

## 🔍 Important Notes

### Backend API Limitation
⚠️ **The backend (Express server) cannot run on GitHub Pages** because GitHub Pages only hosts static files.

**Solutions:**

1. **For Demo/Prototype (Current Setup):**
   - The app will use the generated `simulated_traffic.json` file
   - Data is static but the dashboard fully functional
   - Perfect for demonstration and portfolio

2. **For Production with Live Backend:**
   - Deploy backend separately to:
     - **Heroku** (Free tier available)
     - **Render** (Free tier available)
     - **Railway** (Free tier available)
     - **Vercel** (Serverless functions)
     - **Netlify Functions**
   - Update the API endpoint in `Dashboard.jsx` to point to your backend URL

### Making the App Work with Static Data

To ensure the app works on GitHub Pages, update the Dashboard component to load data from the static JSON file:

```javascript
// In Dashboard.jsx, modify fetchTrafficData:
const fetchTrafficData = async () => {
  try {
    setLoading(true)
    // For GitHub Pages deployment - load static data
    const response = await fetch('/Simulated-NBSC-Portal-Traffic/data/simulated_traffic.json')
    const data = await response.json()
    setTrafficData(data)
    setError(null)
  } catch (err) {
    setError('Failed to fetch traffic data: ' + err.message)
    console.error('Error fetching traffic data:', err)
  } finally {
    setLoading(false)
  }
}
```

## 🔄 Update Workflow

1. **Make changes locally**
2. **Test locally:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```
4. **Deploy:**
   ```bash
   npm run deploy
   # OR
   git push origin main  # (if using GitHub Actions)
   ```

## 🐛 Troubleshooting

### Issue: 404 Page Not Found
- Check that the `base` path in `vite.config.js` matches your repository name
- Ensure GitHub Pages is enabled in repository settings

### Issue: Blank Page
- Check browser console for errors
- Verify the `homepage` field in `package.json` is correct
- Ensure all assets are loading with the correct base path

### Issue: CSS/JS Not Loading
- Clear browser cache
- Check that Vite build completed successfully
- Verify the `base` path includes leading and trailing slashes

### Issue: Map Not Displaying
- Ensure Leaflet CSS is properly imported
- Check that the data file is accessible
- Verify Leaflet.heat plugin is loaded

## 📊 Deployment Checklist

- [ ] All changes committed to Git
- [ ] GitHub Pages enabled in repository settings
- [ ] `base` path configured in `vite.config.js`
- [ ] `homepage` field set in `package.json`
- [ ] Data file copied to `frontend/public/data/` (if using static data)
- [ ] Build completes without errors: `npm run build`
- [ ] Deployment successful: `npm run deploy`
- [ ] Site accessible at GitHub Pages URL

## 🎯 Next Steps After Deployment

1. **Test the deployed site** thoroughly
2. **Share the URL** with stakeholders
3. **Monitor GitHub Actions** for deployment status
4. **Consider backend deployment** if dynamic data is needed
5. **Update README.md** with the live demo link

## 📝 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [gh-pages npm package](https://www.npmjs.com/package/gh-pages)

---

**Built with ❤️ for NBSC Digital Innovation**
