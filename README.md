# 🏘️ قريتنا - Qaryetna

**Egyptian Local Services Directory**  
دليل الخدمات المحلية المصرية

---

## 📂 Project Structure

```
قريتنا/
├── index.html                 # Landing page (start here)
│
├── public/                    # User-facing application
│   └── index.html            # Browse services by location
│
├── admin/                     # Admin tools
│   ├── dashboard.html        # Manage all data
│   └── import-data.html      # Import governorates & cities
│
├── js/                        # JavaScript files
│   ├── firebase-service.js   # Firebase integration
│   ├── firebase-config.js    # Firebase configuration
│   ├── admin-app.js          # Admin dashboard logic
│   ├── dashboard.js          # Dashboard helpers
│   └── ...
│
├── css/                       # Stylesheets
│   ├── styles.css            # Public styles
│   └── dashboard.css         # Admin styles
│
├── data/                      # Data files
│   └── cities.json           # 27 governorates + 100+ cities
│
└── docs/                      # Documentation
    ├── README.md             # Main guide
    ├── START_HERE.html       # Visual guide
    └── HOW_TO_USE.html       # Detailed instructions
```

---

## 🚀 Quick Start

### 1. Open Landing Page
```
Open: index.html
```

### 2. Import Data (One Time)
- Click "📥 استيراد البيانات" (Import Data)
- Login with admin credentials
- Click "ابدأ الاستيراد"
- Wait ~1 minute

### 3. Manage Data
- Click "🎛️ لوحة التحكم" (Dashboard)
- Add villages, categories, and services

### 4. Share with Users
- Share `public/index.html` with users
- They can browse services by location

---

## 🎯 Features

✅ **Location Hierarchy**: Governorate → City → Village → Service  
✅ **Auto Import**: 27 governorates + 100+ cities from JSON  
✅ **Cascading Dropdowns**: Smart location filtering  
✅ **Service Categories**: Organize by type  
✅ **Contact Integration**: Phone + WhatsApp  
✅ **Arabic RTL**: Full Arabic interface  
✅ **Firebase Backend**: Firestore + Authentication  

---

## 📱 Application Pages

| Page | Path | Purpose |
|------|------|---------|
| **Landing** | `index.html` | Navigation hub |
| **Public** | `public/index.html` | User interface |
| **Dashboard** | `admin/dashboard.html` | Admin panel |
| **Import** | `admin/import-data.html` | Data importer |

---

## 🗄️ Firebase Collections

| Collection | Count | Source |
|------------|-------|--------|
| `governorates` | 27 | Auto-imported |
| `cities` | 100+ | Auto-imported |
| `villages` | Manual | Added via dashboard |
| `service_categories` | Manual | Added via dashboard |
| `services` | Manual | Added via dashboard |

---

## 🔐 Security

**Current (Setup Mode)**:
```javascript
// Any authenticated user can write
allow write: if isAuthenticated();
```

**After Setup**:
```bash
# Restore admin-only access
cp firestore.rules.backup firestore.rules
firebase deploy --only firestore:rules
```

---

## 🚢 Deployment

```bash
# Deploy everything
firebase deploy

# Deploy only rules
firebase deploy --only firestore:rules

# Deploy only hosting
firebase deploy --only hosting
```

---

## 📖 Documentation

- **README**: `docs/README.md`
- **Visual Guide**: `docs/START_HERE.html`
- **Detailed Help**: `docs/HOW_TO_USE.html`

---

## ⚠️ Important Notes

1. **One-time import**: Run `admin/import-data.html` only once
2. **Villages manual**: Add via dashboard after importing
3. **Restore security**: Use `firestore.rules.backup` after setup
4. **Data source**: `data/cities.json` (27 governorates)

---

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Backend**: Firebase (Firestore + Auth)
- **Hosting**: Firebase Hosting
- **Data**: JSON → Firestore

---

## 📞 Links

- **Firebase Console**: https://console.firebase.google.com/project/our-vallage
- **Data Source**: `data/cities.json`
- **Backup Rules**: `firestore.rules.backup`

---

**Built for Egyptian communities 🇪🇬**
