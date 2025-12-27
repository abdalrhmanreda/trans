/**
 * Public Interface Application
 * Qaryetna - Local Services Directory
 */

import { FirebaseService } from '../js/firebase-service.js';

const app = {
    state: {
        governorate: null,
        city: null,
        village: null,
        category: null,
        allCategories: [],
        allServices: []
    },

    async init() {
        this.showLoading(true);
        await this.loadGovernorates();
        this.showLoading(false);
    },

    async loadGovernorates() {
        const result = await FirebaseService.getAllGovernorates();
        if (result.success) {
            // Fetch service counts for each governorate
            const governoratesWithCounts = await Promise.all(
                result.data.map(async (gov) => {
                    const countResult = await FirebaseService.countServicesByGovernorate(gov.id);
                    return {
                        ...gov,
                        serviceCount: countResult.count || 0
                    };
                })
            );
            this.renderGovernorates(governoratesWithCounts);
        }
    },

    renderGovernorates(data) {
        // Separate popular governorates (define based on your criteria)
        const popularIds = ['gov_cairo', 'gov_alex', 'gov_giza'];
        const popular = data.filter(item => popularIds.includes(item.id));

        // Helper function to render service count with friendly UX
        const renderServiceCount = (count) => {
            const serviceCount = parseInt(count) || 0;

            if (serviceCount === 0) {
                // Friendly message instead of "0 services"
                return '<div class="service-count coming-soon"><i class="fas fa-clock"></i> قريبًا</div>';
            } else {
                return `<div class="service-count">${serviceCount} خدمة متاحة</div>`;
            }
        };

        // Render popular section
        const popularSection = document.getElementById('popularGovSection');
        const popularContainer = document.getElementById('popularGovList');

        if (popular.length > 0) {
            popularSection.style.display = 'block';
            popularContainer.innerHTML = popular.map(item => `
                <div class="card compact popular" onclick="app.selectGovernorate('${item.id}', '${this.escapeHtml(item.name)}', '${item.icon || '🏛️'}')">
                    <div class="popular-badge">مشهور</div>
                    <div class="location-icon">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div class="gov-name">${item.name}</div>
                    ${renderServiceCount(item.serviceCount)}
                </div>
            `).join('');
        }

        // Render all governorates with new design
        const container = document.getElementById('govList');
        container.innerHTML = data.map(item => `
            <div class="card compact" onclick="app.selectGovernorate('${item.id}', '${this.escapeHtml(item.name)}', '${item.icon || '🏛️'}')">
                <div class="location-icon">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="gov-name">${item.name}</div>
                ${renderServiceCount(item.serviceCount)}
            </div>
        `).join('');
        this.setupSearch('searchGov', 'govList');
    },

    async selectGovernorate(id, name, icon) {
        this.state.governorate = { id, name, icon };
        this.updateBreadcrumb();

        // Update selected governorate name in city page title
        const govNameSpan = document.getElementById('selectedGovName');
        if (govNameSpan) govNameSpan.textContent = name;

        this.showLoading(true);
        const result = await FirebaseService.getCitiesByGovernorate(id);
        this.showLoading(false);

        if (result.success && result.data.length > 0) {
            this.renderCities(result.data);
            this.showStep(2);
        } else {
            this.showAlert('لا توجد مدن مسجلة في هذه المحافظة');
        }
    },

    renderCities(data) {
        const container = document.getElementById('cityList');
        container.innerHTML = data.map(item => `
            <div class="card compact" onclick="app.selectCity('${item.id}', '${this.escapeHtml(item.name)}')">
                <div class="location-icon">
                    <i class="fas fa-city"></i>
                </div>
                <div class="gov-name">${item.name}</div>
            </div>
        `).join('');
        this.setupSearch('searchCity', 'cityList');
    },

    async selectCity(id, name) {
        this.state.city = { id, name };
        this.updateBreadcrumb();

        // Update selected city name in village page title
        const cityNameSpan = document.getElementById('selectedCityName');
        if (cityNameSpan) cityNameSpan.textContent = name;

        this.showLoading(true);
        const result = await FirebaseService.getVillagesByCity(id);
        this.showLoading(false);

        if (result.success && result.data.length > 0) {
            this.renderVillages(result.data);
            this.showStep(3);
        } else {
            this.showAlert('لا توجد قرى مسجلة في هذه المدينة');
        }
    },

    renderVillages(data) {
        const container = document.getElementById('villageList');
        container.innerHTML = data.map(item => `
            <div class="card compact" onclick="app.selectVillage('${item.id}', '${this.escapeHtml(item.name)}')">
                <div class="location-icon">
                    <i class="fas fa-map-marked-alt"></i>
                </div>
                <div class="gov-name">${item.name}</div>
            </div>
        `).join('');
        this.setupSearch('searchVillage', 'villageList');
    },

    async selectVillage(id, name) {
        this.state.village = { id, name };
        this.updateBreadcrumb();

        // Update selected village name in services page title
        const villageNameSpan = document.getElementById('selectedVillageName');
        if (villageNameSpan) villageNameSpan.textContent = name;

        this.showLoading(true);

        const [categoriesResult, servicesResult] = await Promise.all([
            FirebaseService.getAllServiceCategories(),
            FirebaseService.getServicesByVillage(id)
        ]);

        this.showLoading(false);

        if (categoriesResult.success) {
            this.state.allCategories = categoriesResult.data;
            this.renderCategories();
        }

        if (servicesResult.success) {
            this.state.allServices = servicesResult.data;
            this.renderServices();
        }

        this.showStep(4);
    },

    renderCategories() {
        const container = document.getElementById('categoryList');
        const allActiveClass = !this.state.category ? ' active' : '';

        container.innerHTML = `
            <div class="category-chip${allActiveClass}" onclick="app.selectCategory(null, event)">
                <i class="fas fa-th"></i> الكل
            </div>
            ${this.state.allCategories.map(item => {
            const activeClass = this.state.category === item.id ? ' active' : '';
            return `
                    <div class="category-chip${activeClass}" onclick="app.selectCategory('${item.id}', event)">
                        <i class="${item.icon}"></i> ${item.name}
                    </div>
                `;
        }).join('')}
        `;
    },

    selectCategory(id, event) {
        this.state.category = id;

        // Update active states
        document.querySelectorAll('.category-chip').forEach(chip => {
            chip.classList.remove('active');
        });

        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        }

        this.renderServices();
    },

    renderServices() {
        let services = this.state.allServices;

        if (this.state.category) {
            services = services.filter(s => s.categoryId === this.state.category);
        }

        const search = document.getElementById('searchService').value.toLowerCase();
        if (search) {
            services = services.filter(s =>
                s.name.toLowerCase().includes(search) ||
                (s.notes && s.notes.toLowerCase().includes(search))
            );
        }

        const container = document.getElementById('servicesList');
        const empty = document.getElementById('emptyServices');
        const title = document.getElementById('servicesTitle');

        if (this.state.category) {
            const cat = this.state.allCategories.find(c => c.id === this.state.category);
            title.textContent = cat ? cat.name : 'الخدمات';
        } else {
            title.textContent = `جميع الخدمات (${services.length})`;
        }

        if (services.length === 0) {
            container.innerHTML = '';
            empty.style.display = 'block';
            return;
        }

        empty.style.display = 'none';
        container.innerHTML = services.map(service => {
            const category = this.state.allCategories.find(c => c.id === service.categoryId);
            const phone = service.phone?.replace(/\D/g, '') || '';

            // Random mock data to match component visual
            const rating = (4.5 + Math.random() * 0.5).toFixed(1);
            const reviews = Math.floor(20 + Math.random() * 200);
            const experience = Math.floor(2 + Math.random() * 15);

            return `
                <div class="provider-card">
                    <div class="verification-badge">
                        <i class="fas fa-shield-check"></i>
                        <span>موثق</span>
                    </div>
                    
                    <div class="icon-wrapper">
                        <div class="icon-container">
                            <i class="${category?.icon || 'fas fa-briefcase'}"></i>
                        </div>
                    </div>
                    
                    <div class="provider-info">
                        <h2 class="provider-name">${service.name}</h2>
                        <span class="service-type">${category?.name || 'خدمة'}</span>
                    </div>
                    
                    <div class="details-section">
                        <div class="detail-row">
                            <i class="far fa-clock"></i>
                            <span>9:00 ص - 9:00 م ساعات العمل</span>
                        </div>
                        
                        <div class="areas-section">
                            <div class="areas-label">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>مناطق الخدمة</span>
                            </div>
                            <div class="area-chips">
                                <span class="area-chip">${this.state.village?.name || 'القرية'}</span>
                                <span class="area-chip">${this.state.city?.name || 'المدينة'}</span>
                            </div>
                        </div>
                        
                        ${service.notes ? `
                            <div class="detail-row" style="margin-top:0.5rem">
                                <i class="fas fa-info-circle"></i>
                                <span>${service.notes}</span>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="action-buttons">
                        ${service.whatsapp ? `
                            <a href="https://wa.me/2${phone}" target="_blank" class="btn btn-primary">
                                <i class="fab fa-whatsapp"></i>
                                <span>تواصل عبر واتساب</span>
                            </a>
                        ` : ''}
                        <a href="tel:${service.phone}" class="btn btn-secondary">
                            <i class="fas fa-phone"></i>
                            <span>اتصال هاتفي</span>
                        </a>
                    </div>
                </div>
            `;
        }).join('');
    },

    updateBreadcrumb() {
        const container = document.getElementById('breadcrumb');
        let html = '';


        if (this.state.governorate) {
            html += `<div class="breadcrumb-item">🇪🇬 محافظة ${this.state.governorate.name}</div>`;
        }
        if (this.state.city) {
            html += `<div class="breadcrumb-item">🏛️ ${this.state.city.name}</div>`;
        }
        if (this.state.village) {
            html += `<div class="breadcrumb-item">🏠 ${this.state.village.name}</div>`;
        }

        container.innerHTML = html;
    },

    showStep(num) {
        document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
        document.getElementById(`step${num}`).classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    goBack(step) {
        if (step === 1) {
            this.state.governorate = null;
            this.state.city = null;
            this.state.village = null;
        } else if (step === 2) {
            this.state.city = null;
            this.state.village = null;
        } else if (step === 3) {
            this.state.village = null;
        }
        this.updateBreadcrumb();
        this.showStep(step);
    },

    setupSearch(inputId, containerId) {
        const input = document.getElementById(inputId);
        if (!input) return;

        input.addEventListener('input', (e) => {
            const search = e.target.value.toLowerCase().trim();
            document.querySelectorAll(`#${containerId} .card`).forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(search) ? 'block' : 'none';
            });
        });
    },

    showLoading(show) {
        document.getElementById('loading').classList.toggle('show', show);
    },

    showAlert(message) {
        // Custom alert could be implemented here
        alert(message);
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// Setup search for services
document.addEventListener('DOMContentLoaded', () => {
    const searchService = document.getElementById('searchService');
    if (searchService) {
        searchService.addEventListener('input', () => app.renderServices());
    }
});

// Initialize
window.app = app;
app.init();
