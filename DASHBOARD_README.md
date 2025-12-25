# 🎛️ Admin Dashboard - دليل الخدمات

Complete admin panel for managing the Village Services Directory.

## 🔐 Access Dashboard

**URL**: `dashboard.html`

**Login Credentials**:
- Username: `admin`
- Password: `admin123`

## ✨ Features

### 📊 **Overview Dashboard**
- Total providers count
- Category-wise statistics
- Service type breakdown
- Real-time data updates

### 📋 **Service Management**
- View all service providers in a table
- Search by name, phone, or area
- Filter by category
- Edit existing entries
- Delete unwanted entries
- Responsive table design

### ➕ **Add/Edit Services**
- User-friendly form
- All service types available
- Input validation
- Phone number format check
- Optional notes field

### 💾 **Import/Export**
- Export data as JSON (backup)
- Import data from JSON file
- Date-stamped exports
- Data validation on import

## 🎨 Design Features

- ✅ **Teal/Emerald Theme** - Matches main site
- ✅ **Responsive Design** - Works on all devices
- ✅ **Modern UI** - Clean and professional
- ✅ **Smooth Animations** - Pleasant user experience
- ✅ **Toast Notifications** - Success/error messages
- ✅ **Modal Confirmations** - Prevent accidental deletions

## 🔧 Technical Details

### Data Storage
- **LocalStorage**: All data is stored in browser localStorage
- **Persistence**: Data survives page refreshes
- **Sync**: Changes sync to main website automatically

### File Structure
```
dashboard.html      # Main dashboard page
dashboard.css       # Dashboard-specific styles
dashboard.js        # Dashboard logic & CRUD operations
data.js            # Shared data configuration
```

### Key Functions

#### Authentication
```javascript
handleLogin(e)      // Login with credentials
handleLogout()      // Logout and clear session
checkLogin()        // Check if already logged in
```

#### CRUD Operations
```javascript
handleSubmit(e)     // Add or update service
editService(id)     // Load service into form
deleteService(id)   // Show delete confirmation
confirmDelete()     // Actually delete the record
```

#### Data Management
```javascript
loadData()          // Load from localStorage
saveData()          // Save to localStorage
exportData()        // Download JSON backup
importData(e)       // Import from JSON file
```

#### UI Updates
```javascript
updateStatistics()  // Update dashboard stats
renderTable()       // Render services table
filterTable()       // Search and filter
showToast()         // Show notification
```

## 📱 Responsive Breakpoints

- **Desktop**: Full sidebar + table view
- **Tablet (< 1024px)**: Collapsible sidebar
- **Mobile (< 768px)**: Stacked layout, horizontal scroll table
- **Small (< 480px)**: Minimal UI, icons only

## 🎯 Usage Guide

### Adding a New Service
1. Login to dashboard
2. Click "إضافة مقدم خدمة" in sidebar
3. Fill in all required fields:
   - Name
   - Phone (11 digits)
   - Service Type
   - Working Area
   - Notes (optional)
4. Click "حفظ"

### Editing a Service
1. Go to "إدارة الخدمات"
2. Find the service in the table
3. Click "تعديل" button
4. Modify the information
5. Click "تحديث"

### Deleting a Service
1. Go to "إدارة الخدمات"
2. Find the service
3. Click "حذف" button
4. Confirm deletion in modal
5. Service is permanently removed

### Backup & Restore
1. **Backup**:
   - Go to "استيراد/تصدير"
   - Click "تصدير JSON"
   - File downloads with today's date

2. **Restore**:
   - Go to "استيراد/تصدير"
   - Click "اختيار ملف"
   - Select your backup JSON file
   - Data is restored immediately

## ⚠️ Important Notes

1. **Data Safety**:
   - LocalStorage can be cleared by browser
   - Make regular backups
   - Keep backup files safe

2. **Browser Compatibility**:
   - Modern browsers only
   - Requires localStorage support
   - JavaScript must be enabled

3. **Security**:
   - Simple authentication (for demo)
   - In production, use proper backend
   - Don't expose sensitive data

4. **Data Sync**:
   - Changes in dashboard update main site
   - Both use same localStorage
   - Refresh main site to see changes

## 🚀 Deployment

### Option 1: Local Files
- Just open `dashboard.html` in browser
- No server needed

### Option 2: Web Server
- Upload all files to web host
- Access via: `https://yourdomain.com/dashboard.html`
- Protect with `.htaccess` or server config

### Option 3: Add Password Protection
```apache
# .htaccess example
<Files "dashboard.html">
    AuthType Basic
    AuthName "Admin Area"
    AuthUserFile /path/to/.htpasswd
    Require valid-user
</Files>
```

## 🔄 Future Enhancements

Possible improvements:
- [ ] Multi-user support
- [ ] Role-based permissions
- [ ] Activity log
- [ ] Bulk operations
- [ ] CSV import/export
- [ ] Image upload for providers
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] Real-time collaboration
- [ ] Analytics dashboard

## 📞 Support

For questions or issues with the dashboard, contact the technical administrator.

---

**Version**: 1.0  
**Last Updated**: December 2024  
**Maintained by**: Village Technical Team
