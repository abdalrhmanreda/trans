/**
 * Village Services Directory - Main JavaScript
 * Simple single-level filtering by service type
 */

// State Management
let currentServiceType = 'all';
let searchQuery = '';
let filteredServices = [];

// DOM Elements
const servicesGrid = document.getElementById('servicesGrid');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');
const filterButtons = document.querySelectorAll('.service-filter-btn');
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
        updateFilterCounts();
        renderServices();
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

    renderServices();
}

/**
 * Clear search
 */
function clearSearch() {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    renderServices();
}

/**
 * Handle filter button click
 */
function handleFilterClick(button) {
    const serviceType = button.dataset.serviceType;

    // Update active state
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Update current service type
    currentServiceType = serviceType;

    // Re-render services
    renderServices();
}

/**
 * Filter services based on service type and search query
 */
function filterServices() {
    filteredServices = servicesData.filter(service => {
        // Service type filter
        const typeMatch = currentServiceType === 'all' || service.serviceType === currentServiceType;

        // Search filter
        const serviceInfo = serviceTypeConfig[service.serviceType];
        const searchMatch = !searchQuery ||
            service.name.toLowerCase().includes(searchQuery) ||
            service.workingArea.toLowerCase().includes(searchQuery) ||
            service.notes.toLowerCase().includes(searchQuery) ||
            (serviceInfo && serviceInfo.name.toLowerCase().includes(searchQuery)) ||
            (serviceInfo && serviceInfo.categoryName.toLowerCase().includes(searchQuery));

        return typeMatch && searchMatch;
    });

    return filteredServices;
}

/**
 * Render services to the grid
 */
function renderServices() {
    filterServices();

    // Update results count
    updateResultsCount();

    // Clear grid
    servicesGrid.innerHTML = '';

    // Check if there are results
    if (filteredServices.length === 0) {
        noResults.style.display = 'block';
        servicesGrid.style.display = 'none';
        return;
    }

    noResults.style.display = 'none';
    servicesGrid.style.display = 'grid';

    // Render each service card
    filteredServices.forEach((service, index) => {
        const card = createServiceCard(service, index);
        servicesGrid.appendChild(card);
    });
}

/**
 * Create a service provider card element
 */
function createServiceCard(service, index) {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.style.animationDelay = `${index * 0.05}s`;

    const serviceInfo = serviceTypeConfig[service.serviceType];
    const initials = getInitials(service.name);
    const whatsappNumber = formatPhoneForWhatsApp(service.phone);
    const whatsappMessage = `مرحباً ${service.name}، أريد الاستفسار عن خدمتك (${serviceInfo.name})`;

    card.innerHTML = `
        <div class="service-header">
            <div class="service-avatar">${initials}</div>
            <div class="service-info">
                <h3>${service.name}</h3>
                <span class="service-type">
                    <i class="${serviceInfo.icon}"></i>
                    ${serviceInfo.name}
                </span>
            </div>
        </div>
        
        <div class="service-details">
            <div class="detail-item">
                <i class="fas fa-phone-alt"></i>
                <div class="detail-content">
                    <div class="detail-label">رقم الهاتف</div>
                    <div class="detail-value">${formatPhoneNumber(service.phone)}</div>
                </div>
            </div>
            
            <div class="detail-item">
                <i class="fas fa-map-marker-alt"></i>
                <div class="detail-content">
                    <div class="detail-label">منطقة العمل</div>
                    <div class="detail-value">${service.workingArea}</div>
                </div>
            </div>
            
            ${service.notes ? `
                <div class="detail-item">
                    <i class="fas fa-info-circle"></i>
                    <div class="detail-content">
                        <div class="detail-label">ملاحظات</div>
                        <div class="detail-value">${service.notes}</div>
                    </div>
                </div>
            ` : ''}
        </div>
        
        <div class="service-actions">
            <a href="tel:${service.phone}" class="action-btn call-btn">
                <i class="fas fa-phone"></i>
                <span>اتصال</span>
            </a>
            <a href="https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}" 
               target="_blank" 
               rel="noopener noreferrer"
               class="action-btn whatsapp-btn">
                <i class="fab fa-whatsapp"></i>
                <span>واتساب</span>
            </a>
        </div>
    `;

    return card;
}

/**
 * Get first letter from name
 */
function getInitials(name) {
    return name.trim()[0];
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
    const count = filteredServices.length;
    let filterName = 'جميع الخدمات';

    if (currentServiceType !== 'all' && serviceTypeConfig[currentServiceType]) {
        filterName = serviceTypeConfig[currentServiceType].name;
    }

    if (searchQuery) {
        resultsCount.textContent = `تم العثور على ${count} مقدم خدمة في "${filterName}" يطابق البحث "${searchQuery}"`;
    } else {
        resultsCount.textContent = `عرض ${count} مقدم خدمة في "${filterName}"`;
    }
}

/**
 * Update filter counts
 */
function updateFilterCounts() {
    filterButtons.forEach(btn => {
        const serviceType = btn.dataset.serviceType;
        const countElement = btn.querySelector('.filter-count');

        if (!countElement) return;

        let count;
        if (serviceType === 'all') {
            count = servicesData.length;
        } else {
            count = servicesData.filter(s => s.serviceType === serviceType).length;
        }

        countElement.textContent = count;
    });
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
