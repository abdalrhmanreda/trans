# 📖 دليل الخدمات - Village Services Directory

A beautiful, modern, and mobile-friendly web application for listing all village services including transportation, craftsmen, teachers, and more.

## ✨ Features

- **📱 Mobile-First Design**: Fully responsive and optimized for mobile devices
- **🎨 Modern UI**: Beautiful gradients, glassmorphism effects, and smooth animations
- **🔍 Smart Search**: Real-time search across provider names, areas, service types, and notes
- **🏷️ Category Dropdown**: Easy filtering through organized service categories
- **📞 Quick Actions**: Direct call and WhatsApp buttons for each service provider
- **⚡ Fast Performance**: Pure vanilla JavaScript, no dependencies
- **♿ Accessibility**: Semantic HTML and keyboard shortcuts support
- **🌐 RTL Support**: Full Arabic language support with right-to-left layout

## 🗂️ Service Categories

### 🚌 Transportation (المواصلات)
- Microbus (ميكروباص)
- Tuk-Tuk (توك توك)
- Tricycle (تروسيكل)
- Transport Vehicles (سيارة نقل)

### 🔧 Craftsmen & Technicians (الحرفيون والفنيون)
- Electricians (كهربائي)
- Plumbers (سباك)
- Painters (دهان)
- Tilers (سباح / بلاط)
- Plasterers (محارة)
- Carpenters (نجار)
- Blacksmiths (حداد)
- TV Technicians (صيانة تلفزيونات)

### 📦 Suppliers (الموردون)
- Gas Distributors (توصيل غاز)

### 🎓 Educational Services (التعليم)
- Teachers (مدرس)
- Quran Teachers (محفظ قرآن)

### 🕌 Religious Services (الخدمات الدينية)
- Marriage Officiants (مأذون شرعي)

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
├── data.js             # Services database (easy to edit)
└── README.md           # This file
```

## 📝 How to Add/Edit Service Providers

### Adding a New Service Provider

1. Open `data.js` in any text editor
2. Add a new object to the `servicesData` array:

```javascript
{
    id: 36,  // Unique ID (increment from last)
    name: "اسم مقدم الخدمة",
    phone: "01234567890",
    serviceType: "electrician",  // Choose from available types
    workingArea: "منطقة العمل",
    notes: "ملاحظات إضافية (اختياري)"
}
```

### Available Service Types

Use these exact values for `serviceType`:
- **Transportation**: `microbus`, `tuk-tuk`, `tricycle`, `transport-vehicle`
- **Craftsmen**: `electrician`, `plumber`, `painter`, `tiler`, `plasterer`, `carpenter`, `blacksmith`, `tv-technician`
- **Suppliers**: `gas-distributor`
- **Educational**: `teacher`, `quran-teacher`
- **Religious**: `marriage-officiant`

### Editing Existing Service Provider

1. Open `data.js`
2. Find the provider by searching for their name
3. Modify any field (name, phone, workingArea, notes)
4. Save and refresh

### Removing a Service Provider

1. Open `data.js`
2. Find and delete the entire provider object
3. Save and refresh

## 🎨 Adding a New Service Type

If you need to add a completely new service type:

1. Open `data.js`
2. Add your new type to `serviceTypeConfig`:

```javascript
"new-service": {
    name: "اسم الخدمة",
    icon: "fas fa-icon-name",  // Font Awesome icon
    category: "craftsmen",  // or create new category
    categoryName: "الحرفيون والفنيون"
}
```

3. If creating a new category, also update `categoryConfig`
4. Update `index.html` to add the option to the dropdown
5. Save and refresh

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

### Changing Fonts

The app uses Google Fonts (Cairo). To change:

1. Update the Google Fonts link in `index.html`
2. Update the font-family in `styles.css`

## ⌨️ Keyboard Shortcuts

- **Ctrl/Cmd + K**: Focus search bar
- **Escape**: Clear search (when search is focused)

## 📱 Mobile Features

- Touch-optimized buttons and dropdowns
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
   - Your site will be at: `https://yourusername.github.io/repo-name/`
   
2. **Netlify**
   - Drag and drop your folder on [netlify.com](https://netlify.com)
   - Get instant hosting with custom domain option
   
3. **Vercel**
   - Import from GitHub or upload files
   - Auto-deploy on updates
   - Free SSL certificate

4. **Firebase Hosting**
   - Use Firebase CLI
   - Deploy with `firebase deploy`

## 🔄 Future Enhancement Ideas

Possible features to add:

- [ ] Admin panel for managing service providers
- [ ] Provider ratings and reviews
- [ ] Real-time availability status
- [ ] Service provider photos
- [ ] Map integration
- [ ] Price list/calculator
- [ ] Multi-language support (English, French, etc.)
- [ ] Dark mode toggle
- [ ] Export/Print directory
- [ ] Share provider contact
- [ ] Online booking system
- [ ] Provider profile pages
- [ ] Comments and testimonials

## 🛠️ Technical Details

**Technologies:**
- HTML5
- CSS3 (CSS Grid, Flexbox, Custom Properties, Animations)
- Vanilla JavaScript (ES6+)
- Font Awesome 6.4.0 (Icons)
- Google Fonts (Cairo typeface)

**Browser Support:**
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile, Samsung Internet)

**Performance:**
- No external dependencies
- Lightweight (~50KB total)
- Fast loading
- Smooth animations at 60fps

## 📄 License

This project is open source and available for free use.

## 🤝 Contributing

Feel free to fork, modify, and use this project for your village or community!

### How to Contribute

1. Fork the repository
2. Make your changes
3. Test thoroughly
4. Submit a pull request with description

## 💡 Tips

- **Regular Updates**: Keep service provider information up-to-date
- **Backup**: Keep a backup of `data.js` before major changes
- **Testing**: Test on multiple devices and browsers
- **Accessibility**: Ensure all providers have complete information
- **Privacy**: Get consent before listing personal numbers

## 📞 Support

For questions, issues, or suggestions:
- Contact the village administration
- Open an issue on GitHub (if using version control)
- Reach out to the technical maintainer

## 🙏 Acknowledgments

- Icons by [Font Awesome](https://fontawesome.com)
- Fonts by [Google Fonts](https://fonts.google.com)
- Made with ❤️ for our village community

---

**Version**: 2.0 - Multi-Service Directory  
**Last Updated**: December 2024  
**Maintained by**: Village Technical Team
