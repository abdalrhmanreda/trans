# 🚌 دليل المواصلات - Village Transportation Directory

A beautiful, modern, and mobile-friendly web application for listing village transportation drivers including microbus, tuk-tuk, and tricycle drivers.

## ✨ Features

- **📱 Mobile-First Design**: Fully responsive and optimized for mobile devices
- **🎨 Modern UI**: Beautiful gradients, glassmorphism effects, and smooth animations
- **🔍 Smart Search**: Real-time search across driver names, areas, and notes
- **🏷️ Category Filters**: Easy filtering by vehicle type (Microbus, TukTuk, Tricycle)
- **📞 Quick Actions**: Direct call and WhatsApp buttons for each driver
- **⚡ Fast Performance**: Pure vanilla JavaScript, no dependencies
- **♿ Accessibility**: Semantic HTML and keyboard shortcuts support
- **🌐 RTL Support**: Full Arabic language support with right-to-left layout

## 🚀 Quick Start

### Option 1: Open Directly
Simply open `index.html` in your web browser. No server required!

### Option 2: Use a Local Server (Recommended)

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

**Using Node.js (npx):**
```bash
npx http-server -p 8000

# Then visit: http://localhost:8000
```

**Using PHP:**
```bash
php -S localhost:8000

# Then visit: http://localhost:8000
```

## 📁 Project Structure

```
trans/
├── index.html          # Main HTML file
├── styles.css          # All styles and responsive design
├── script.js           # Application logic and interactions
├── data.js             # Driver database (easy to edit)
└── README.md           # This file
```

## 📝 How to Add/Edit Drivers

### Adding a New Driver

1. Open `data.js` in any text editor
2. Add a new object to the `driversData` array:

```javascript
{
    id: 16,  // Unique ID (increment from last)
    name: "اسم السائق",
    phone: "01234567890",
    vehicleType: "microbus",  // or "tuk-tuk" or "tricycle"
    workingArea: "منطقة العمل",
    notes: "ملاحظات إضافية (اختياري)"
}
```

3. Save the file and refresh the page

### Editing Existing Driver

1. Open `data.js`
2. Find the driver by searching for their name
3. Modify any field (name, phone, workingArea, notes)
4. Save and refresh

### Removing a Driver

1. Open `data.js`
2. Find and delete the entire driver object
3. Save and refresh

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #667eea;      /* Main color */
    --secondary-color: #764ba2;    /* Secondary color */
    --success-color: #4facfe;      /* Call button color */
    /* ... and more */
}
```

### Vehicle Types

To add a new vehicle type, edit `vehicleTypeConfig` in `data.js`:

```javascript
const vehicleTypeConfig = {
    "new-type": {
        name: "اسم المركبة",
        icon: "fas fa-car",  // Font Awesome icon
        color: "#ff6b6b"
    }
};
```

## ⌨️ Keyboard Shortcuts

- **Ctrl/Cmd + K**: Focus search bar
- **Escape**: Clear search (when search is focused)

## 📱 Mobile Features

- Touch-optimized buttons
- Swipe-friendly cards
- Optimized for small screens
- Direct calling with one tap
- WhatsApp integration

## 🌐 Hosting Options

### Free Hosting Services

1. **GitHub Pages**
   - Create a GitHub repository
   - Push your files
   - Enable GitHub Pages in settings
   
2. **Netlify**
   - Drag and drop your folder
   - Get instant hosting
   
3. **Vercel**
   - Import from GitHub
   - Auto-deploy on updates

4. **Firebase Hosting**
   - Use Firebase CLI
   - Deploy with `firebase deploy`

## 🔄 Future Enhancements

Possible features to add:

- [ ] Admin panel for managing drivers
- [ ] Driver ratings and reviews
- [ ] Real-time availability status
- [ ] Route planning
- [ ] Price calculator
- [ ] Driver photos
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Export to PDF
- [ ] Share driver contact

## 🛠️ Technical Details

**Technologies:**
- HTML5
- CSS3 (CSS Grid, Flexbox, Custom Properties)
- Vanilla JavaScript (ES6+)
- Font Awesome 6.4.0
- Google Fonts (Cairo)

**Browser Support:**
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is open source and available for free use.

## 🤝 Contributing

Feel free to fork, modify, and use this project for your village or community!

## 📞 Support

For questions or issues, contact the village administration.

---

Made with ❤️ for our village community
