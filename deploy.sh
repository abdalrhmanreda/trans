#!/bin/bash

# Firebase Deployment Script for Village Services Directory
# Run this to deploy your site to Firebase Hosting

echo "🚀 Starting deployment to Firebase Hosting..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null
then
    echo "❌ Firebase CLI not found!"
    echo "📦 Installing Firebase CLI..."
    npm install -g firebase-tools
fi

echo "✓ Firebase CLI found"
echo ""

# Check if logged in
echo "🔐 Checking Firebase login..."
firebase projects:list > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Not logged in to Firebase"
    echo "🔑 Please login:"
    firebase login
fi

echo "✓ Logged in to Firebase"
echo ""

# Deploy
echo "📤 Deploying to Firebase Hosting..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
firebase deploy --only hosting

# Check if deployment was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "✅ Deployment successful!"
    echo ""
    echo "🌐 Your site is live at:"
    echo "   https://our-vallage.web.app"
    echo "   https://our-vallage.firebaseapp.com"
    echo ""
    echo "📊 Dashboard:"
    echo "   https://our-vallage.web.app/dashboard.html"
    echo ""
    echo "🎉 Done! Your site is now live on Firebase!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
else
    echo ""
    echo "❌ Deployment failed!"
    echo "Please check the error messages above"
    exit 1
fi
