/**
 * Transportation Directory - Main JavaScript
 * Handles all interactions, filtering, and search functionality
 */

// State Management
let currentCategory = 'all';
let searchQuery = '';
let filteredDrivers = [];

// DOM Elements
const driversGrid = document.getElementById('driversGrid');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');
const filterButtons = document.querySelectorAll('.filter-btn');
const resultsCount = document.getElementById('resultsCount');
const noResults = document.getElementById('noResults');
const loading = document.getElementById('loading');

/**
 * Initialize the application
 */
function init() {
    // Simulate loading
    setTimeout(() => {
        loading.style.display = 'none';
        renderDrivers();
        updateBadges();
        attachEventListeners();
    }, 500);
}

/**
 * Attach event listeners
 */
function attachEventListeners() {
    // Search input
    searchInput.addEventListener('input', handleSearch);

    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);

    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => handleFilterClick(btn));
    });
}

/**
 * Handle search input
 */
function handleSearch(e) {
    searchQuery = e.target.value.trim().toLowerCase();

    // Show/hide clear button
    clearSearchBtn.style.display = searchQuery ? 'flex' : 'none';

    renderDrivers();
}

/**
 * Clear search
 */
function clearSearch() {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    renderDrivers();
}

/**
 * Handle filter button click
 */
function handleFilterClick(button) {
    const category = button.dataset.category;

    // Update active state
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Update current category
    currentCategory = category;

    // Re-render drivers
    renderDrivers();
}

/**
 * Filter drivers based on category and search query
 */
function filterDrivers() {
    filteredDrivers = driversData.filter(driver => {
        // Category filter
        const categoryMatch = currentCategory === 'all' || driver.vehicleType === currentCategory;

        // Search filter
        const searchMatch = !searchQuery ||
            driver.name.toLowerCase().includes(searchQuery) ||
            driver.workingArea.toLowerCase().includes(searchQuery) ||
            driver.notes.toLowerCase().includes(searchQuery) ||
            vehicleTypeConfig[driver.vehicleType].name.toLowerCase().includes(searchQuery);

        return categoryMatch && searchMatch;
    });

    return filteredDrivers;
}

/**
 * Render drivers to the grid
 */
function renderDrivers() {
    filterDrivers();

    // Update results count
    updateResultsCount();

    // Clear grid
    driversGrid.innerHTML = '';

    // Check if there are results
    if (filteredDrivers.length === 0) {
        noResults.style.display = 'block';
        driversGrid.style.display = 'none';
        return;
    }

    noResults.style.display = 'none';
    driversGrid.style.display = 'grid';

    // Render each driver card
    filteredDrivers.forEach((driver, index) => {
        const card = createDriverCard(driver, index);
        driversGrid.appendChild(card);
    });
}

/**
 * Create a driver card element
 */
function createDriverCard(driver, index) {
    const card = document.createElement('div');
    card.className = 'driver-card';
    card.style.animationDelay = `${index * 0.05}s`;

    const vehicleInfo = vehicleTypeConfig[driver.vehicleType];
    const initials = getInitials(driver.name);
    const whatsappNumber = formatPhoneForWhatsApp(driver.phone);
    const whatsappMessage = `مرحباً ${driver.name}، أريد الاستفسار عن خدمة النقل`;

    card.innerHTML = `
        <div class="driver-header">
            <div class="driver-avatar">${initials}</div>
            <div class="driver-info">
                <h3>${driver.name}</h3>
                <span class="driver-vehicle">
                    <i class="${vehicleInfo.icon}"></i>
                    ${vehicleInfo.name}
                </span>
            </div>
        </div>
        
        <div class="driver-details">
            <div class="detail-item">
                <i class="fas fa-phone-alt"></i>
                <div class="detail-content">
                    <div class="detail-label">رقم الهاتف</div>
                    <div class="detail-value">${formatPhoneNumber(driver.phone)}</div>
                </div>
            </div>
            
            <div class="detail-item">
                <i class="fas fa-map-marker-alt"></i>
                <div class="detail-content">
                    <div class="detail-label">منطقة العمل</div>
                    <div class="detail-value">${driver.workingArea}</div>
                </div>
            </div>
            
            ${driver.notes ? `
                <div class="detail-item">
                    <i class="fas fa-info-circle"></i>
                    <div class="detail-content">
                        <div class="detail-label">ملاحظات</div>
                        <div class="detail-value">${driver.notes}</div>
                    </div>
                </div>
            ` : ''}
        </div>
        
        <div class="driver-actions">
            <a href="tel:${driver.phone}" class="action-btn call-btn">
                <i class="fas fa-phone"></i>
                <span>اتصال</span>
            </a>
            <a href="https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}" 
               target="_blank" 
               class="action-btn whatsapp-btn">
                <i class="fab fa-whatsapp"></i>
                <span>واتساب</span>
            </a>
        </div>
    `;

    return card;
}

/**
 * Get initials from name
 */
function getInitials(name) {
    const words = name.trim().split(' ');
    if (words.length >= 2) {
        return words[0][0] + words[1][0];
    }
    return words[0][0];
}

/**
 * Format phone number for display
 */
function formatPhoneNumber(phone) {
    // Format as: 0123 456 7890
    if (phone.length === 11) {
        return `${phone.substring(0, 4)} ${phone.substring(4, 7)} ${phone.substring(7)}`;
    }
    return phone;
}

/**
 * Format phone number for WhatsApp
 */
function formatPhoneForWhatsApp(phone) {
    // Remove any spaces or special characters
    let cleaned = phone.replace(/\D/g, '');

    // If starts with 0, replace with country code (assume Egypt +20)
    if (cleaned.startsWith('0')) {
        cleaned = '20' + cleaned.substring(1);
    }

    return cleaned;
}

/**
 * Update results count text
 */
function updateResultsCount() {
    const count = filteredDrivers.length;
    const categoryName = currentCategory === 'all' ? 'جميع الفئات' : vehicleTypeConfig[currentCategory].name;

    if (searchQuery) {
        resultsCount.textContent = `تم العثور على ${count} سائق في "${categoryName}" يطابق البحث "${searchQuery}"`;
    } else {
        resultsCount.textContent = `عرض ${count} سائق في "${categoryName}"`;
    }
}

/**
 * Update category badges with counts
 */
function updateBadges() {
    // Count all drivers
    const allCount = driversData.length;
    document.getElementById('badge-all').textContent = allCount;

    // Count by category
    const categoryCounts = {
        microbus: 0,
        'tuk-tuk': 0,
        tricycle: 0
    };

    driversData.forEach(driver => {
        if (categoryCounts.hasOwnProperty(driver.vehicleType)) {
            categoryCounts[driver.vehicleType]++;
        }
    });

    document.getElementById('badge-microbus').textContent = categoryCounts.microbus;
    document.getElementById('badge-tuk-tuk').textContent = categoryCounts['tuk-tuk'];
    document.getElementById('badge-tricycle').textContent = categoryCounts.tricycle;
}

/**
 * Keyboard shortcuts
 */
document.addEventListener('keydown', (e) => {
    // Focus search with Ctrl/Cmd + K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }

    // Clear search with Escape
    if (e.key === 'Escape' && document.activeElement === searchInput) {
        clearSearch();
    }
});

/**
 * Add smooth scroll behavior
 */
document.documentElement.style.scrollBehavior = 'smooth';

/**
 * Initialize when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
