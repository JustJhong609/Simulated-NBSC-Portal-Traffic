#!/bin/bash

echo "🔧 Fixing Vercel Deployment Issue..."
echo ""

# Navigate to frontend directory
cd "$(dirname "$0")/../frontend"

echo "📦 Installing dependencies..."
npm install

echo ""
echo "🧹 Cleaning build artifacts..."
rm -rf dist
rm -rf node_modules/.vite

echo ""
echo "🏗️  Building production bundle..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build completed successfully!"
    echo ""
    echo "📋 Build Summary:"
    echo "   - Output directory: dist/"
    echo "   - Build files generated"
    echo ""
    echo "🚀 Next steps:"
    echo "   1. Test locally: npm run preview"
    echo "   2. Commit changes: git add . && git commit -m 'fix: resolve useMemo dependency issue in BarangayAnalytics'"
    echo "   3. Push to trigger Vercel deployment: git push"
    echo ""
else
    echo ""
    echo "❌ Build failed! Check errors above."
    exit 1
fi
