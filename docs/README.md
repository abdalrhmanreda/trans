# 🏘️ قريتنا - Qaryetna

**دليل الخدمات المحلية** | Egyptian Local Services Directory

---

## 🚀 Quick Start (3 Steps)

### 1️⃣ Import Data (One Time Only)
Open [`import-data.html`](./import-data.html):
- Login with admin credentials
- Click "ابدأ الاستيراد" (Start Import)
- Waits ~1 minute to import **27 governorates + 100+ cities**

### 2️⃣ Manage Data
Open [`dashboard.html`](./dashboard.html):
- **Add Villages**: القرى → إضافة قرية
- **Add Categories**: أنواع الخدمات → إضافة نوع خدمة  
- **Add Services**: مقدمو الخدمات → إضافة مقدم خدمة

### 3️⃣ Share with Users
Share [`index.html`](./index.html) - users browse services by location

---

## 📱 Application Files

| File | Purpose |
|------|---------|
| **index.html** | Public user interface |
| **dashboard.html** | Admin management panel |
| **import-data.html** | Data import tool (use once) |
| **START_HERE.html** | Visual guide & links |
| **HOW_TO_USE.html** | Detailed instructions |

---

## 🎯 How It Works

### Location Hierarchy
```
Governorate (محافظة)
  └── City (مدينة)
       └── Village (قرية)
            └── Service Provider (مقدم خدمة)
                 └── Category (نوع الخدمة)
```

### Features
✅ Cascading location dropdowns (smart filtering)  
✅ Import 27 governorates + 100+ cities from JSON  
✅ Manual village management  
✅ Service categories (plumber, doctor, electrician, etc.)  
✅ Phone + WhatsApp contact integration  
✅ Arabic RTL interface  
✅ Firebase backend (Firestore + Auth)  

---

## 🔐 Security Rules

### Current (Setup Mode) ⚠️
```javascript
match /{document=**} {
  allow read: if true;
  allow write: if isAuthenticated();
}
```
**Temporary!** Any authenticated user can modify data.

### After Setup (Restore Security)
```bash
cp firestore.rules.backup firestore.rules
firebase deploy --only firestore:rules
```
This restores admin-only write permissions.

---

## 🗄️ Firebase Collections

| Collection | Description |
|------------|-------------|
| `governorates` | Egyptian governorates (27) |
| `cities` | Cities/districts (~100+) |
| `villages` | Villages/neighborhoods (manual) |
| `service_categories` | Service types (manual) |
| `services` | Service providers (manual) |

---

## 🚢 Deployment

```bash
# Deploy everything
firebase deploy

# Deploy only Firestore rules
firebase deploy --only firestore:rules

# Deploy only hosting
firebase deploy --only hosting
```

---

## ⚠️ Important Notes

1. **One-time import**: Don't run `import-data.html` twice (duplicates data)
2. **Villages are manual**: Add via dashboard after importing cities
3. **Restore security**: Use `firestore.rules.backup` after setup
4. **Data source**: `cities.json` contains all Egyptian governorates & cities

---

## 📞 Firebase Console

**Project**: https://console.firebase.google.com/project/our-vallage/overview

---

**Built for Egyptian local communities** 🇪🇬
