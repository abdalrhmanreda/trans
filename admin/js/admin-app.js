/**
 * Admin Dashboard - Qaryetna
 */

import { FirebaseService, auth } from '../../js/firebase-service.js';

const admin = {
    data: {
        governorates: [],
        cities: [],
        villages: [],
        categories: [],
        services: [],
        currentEdit: null
    },

    async init() {
        // Check auth state
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                await this.loadDashboard();
            } else {
                this.showLogin();
            }
        });

        // Setup login form
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            this.showLoading(true);
            const result = await FirebaseService.login(email, password);
            this.showLoading(false);

            if (result.success) {
                this.showToast('تم تسجيل الدخول بنجاح');
            } else {
                this.showToast('خطأ في تسجيل الدخول: ' + result.error);
            }
        });
    },

    showLogin() {
        document.getElementById('loginScreen').style.display = 'flex';
        document.getElementById('dashboard').classList.remove('show');
    },

    async loadDashboard() {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('dashboard').classList.add('show');

        this.showLoading(true);
        await this.loadAllData();
        this.updateStats();
        this.renderGovernorates();
        this.showLoading(false);
    },

    async loadAllData() {
        const [gov, cities, villages, cats, services] = await Promise.all([
            FirebaseService.getAllGovernorates(),
            FirebaseService.getAllCities(),
            FirebaseService.getAllVillages(),
            FirebaseService.getAllServiceCategories(),
            FirebaseService.getAllServices()
        ]);

        if (gov.success) this.data.governorates = gov.data;
        if (cities.success) this.data.cities = cities.data;
        if (villages.success) this.data.villages = villages.data;
        if (cats.success) this.data.categories = cats.data;
        if (services.success) this.data.services = services.data;
    },

    updateStats() {
        const stats = document.getElementById('stats');
        stats.innerHTML = `
            <div class="stat-card">
                <div class="stat-value">${this.data.governorates.length}</div>
                <div class="stat-label">محافظة</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${this.data.cities.length}</div>
                <div class="stat-label">مدينة</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${this.data.villages.length}</div>
                <div class="stat-label">قرية</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${this.data.categories.length}</div>
                <div class="stat-label">نوع خدمة</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${this.data.services.filter(s => s.isActive).length}</div>
                <div class="stat-label">خدمة نشطة</div>
            </div>
        `;
    },

    showSection(section) {
        // Update tabs
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        event.currentTarget.classList.add('active');

        // Update sections
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById(`${section}-section`).classList.add('active');

        // Render data
        if (section === 'governorates') this.renderGovernorates();
        else if (section === 'cities') this.renderCities();
        else if (section === 'villages') this.renderVillages();
        else if (section === 'categories') this.renderCategories();
        else if (section === 'services') this.renderServices();
    },

    renderGovernorates() {
        const tbody = document.querySelector('#governoratesTable tbody');
        tbody.innerHTML = this.data.governorates.map((item, i) => `
            <tr>
                <td>${i + 1}</td>
                <td>${item.name}</td>
                <td>${item.icon || '🏛️'}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="admin.edit('governorate', '${item.id}')">
                        <i class="fas fa-edit"></i> تعديل
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="admin.delete('governorate', '${item.id}', '${item.name}')">
                        <i class="fas fa-trash"></i> حذف
                    </button>
                </td>
            </tr>
        `).join('');
    },

    renderCities() {
        const tbody = document.querySelector('#citiesTable tbody');
        tbody.innerHTML = this.data.cities.map((item, i) => {
            const gov = this.data.governorates.find(g => g.id === item.governorateId);
            return `
                <tr>
                    <td>${i + 1}</td>
                    <td>${item.name}</td>
                    <td>${gov?.name || '-'}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="admin.edit('city', '${item.id}')">
                            <i class="fas fa-edit"></i> تعديل
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="admin.delete('city', '${item.id}', '${item.name}')">
                            <i class="fas fa-trash"></i> حذف
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    },

    renderVillages() {
        const tbody = document.querySelector('#villagesTable tbody');
        tbody.innerHTML = this.data.villages.map((item, i) => {
            const city = this.data.cities.find(c => c.id === item.cityId);
            const gov = this.data.governorates.find(g => g.id === item.governorateId);
            return `
                <tr>
                    <td>${i + 1}</td>
                    <td>${item.name}</td>
                    <td>${city?.name || '-'}</td>
                    <td>${gov?.name || '-'}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="admin.edit('village', '${item.id}')">
                            <i class="fas fa-edit"></i> تعديل
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="admin.delete('village', '${item.id}', '${item.name}')">
                            <i class="fas fa-trash"></i> حذف
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    },

    renderCategories() {
        const tbody = document.querySelector('#categoriesTable tbody');
        tbody.innerHTML = this.data.categories.map((item, i) => `
            <tr>
                <td>${i + 1}</td>
                <td>${item.name}</td>
                <td><i class="${item.icon}"></i> ${item.icon}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="admin.edit('category', '${item.id}')">
                        <i class="fas fa-edit"></i> تعديل
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="admin.delete('category', '${item.id}', '${item.name}')">
                        <i class="fas fa-trash"></i> حذف
                    </button>
                </td>
            </tr>
        `).join('');
    },

    renderServices() {
        const tbody = document.querySelector('#servicesTable tbody');
        tbody.innerHTML = this.data.services.map((item, i) => {
            const cat = this.data.categories.find(c => c.id === item.categoryId);
            const village = this.data.villages.find(v => v.id === item.villageId);
            return `
                <tr>
                    <td>${i + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.phone}</td>
                    <td>${cat?.name || '-'}</td>
                    <td>${village?.name || '-'}</td>
                    <td>
                        <span style="padding: 0.25rem 0.5rem; border-radius: 0.25rem; background: ${item.isActive ? '#10b981' : '#ef4444'}; color: white;">
                            ${item.isActive ? 'نشط' : 'معطل'}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="admin.edit('service', '${item.id}')">
                            <i class="fas fa-edit"></i> تعديل
                        </button>
                        <button class="btn ${item.isActive ? 'btn-warning' : 'btn-success'} btn-sm" onclick="admin.toggleService('${item.id}', ${!item.isActive})">
                            <i class="fas fa-power-off"></i> ${item.isActive ? 'تعطيل' : 'تفعيل'}
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="admin.delete('service', '${item.id}', '${item.name}')">
                            <i class="fas fa-trash"></i> حذف
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    },

    openModal(type, editId = null) {
        this.data.currentEdit = editId ? this.data[type === 'governorate' ? 'governorates' : type === 'city' ? 'cities' : type === 'village' ? 'villages' : type === 'category' ? 'categories' : 'services'].find(item => item.id === editId) : null;

        const title = document.getElementById('modalTitle');
        const body = document.getElementById('modalBody');

        if (type === 'governorate') {
            title.textContent = editId ? 'تعديل محافظة' : 'إضافة محافظة';
            body.innerHTML = `
                <div class="form-group">
                    <label>الاسم</label>
                    <input type="text" id="govName" value="${this.data.currentEdit?.name || ''}" required>
                </div>
                <div class="form-group">
                    <label>الأيقونة (Emoji)</label>
                    <input type="text" id="govIcon" value="${this.data.currentEdit?.icon || '🏛️'}" maxlength="2">
                </div>
                <button class="btn btn-success" onclick="admin.saveGovernorate()">حفظ</button>
            `;
        } else if (type === 'city') {
            title.textContent = editId ? 'تعديل مدينة' : 'إضافة مدينة';
            body.innerHTML = `
                <div class="form-group">
                    <label>الاسم</label>
                    <input type="text" id="cityName" value="${this.data.currentEdit?.name || ''}" required>
                </div>
                <div class="form-group">
                    <label>المحافظة</label>
                    <select id="cityGov" required>
                        <option value="">اختر...</option>
                        ${this.data.governorates.map(g => `
                            <option value="${g.id}" ${this.data.currentEdit?.governorateId === g.id ? 'selected' : ''}>${g.name}</option>
                        `).join('')}
                    </select>
                </div>
                <button class="btn btn-success" onclick="admin.saveCity()">حفظ</button>
            `;
        } else if (type === 'village') {
            title.textContent = editId ? 'تعديل قرية' : 'إضافة قرية';
            body.innerHTML = `
                <div class="form-group">
                    <label>الاسم</label>
                    <input type="text" id="villageName" value="${this.data.currentEdit?.name || ''}" required>
                </div>
                <div class="form-group">
                    <label>المحافظة</label>
                    <select id="villageGov" onchange="admin.filterCitiesForVillage()" required>
                        <option value="">اختر...</option>
                        ${this.data.governorates.map(g => `
                            <option value="${g.id}" ${this.data.currentEdit?.governorateId === g.id ? 'selected' : ''}>${g.name}</option>
                        `).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>المدينة</label>
                    <select id="villageCity" required>
                        <option value="">اختر...</option>
                    </select>
                </div>
                <button class="btn btn-success" onclick="admin.saveVillage()">حفظ</button>
            `;
            setTimeout(() => this.filterCitiesForVillage(), 100);
        } else if (type === 'category') {
            title.textContent = editId ? 'تعديل نوع خدمة' : 'إضافة نوع خدمة';
            body.innerHTML = `
                <div class="form-group">
                    <label>الاسم</label>
                    <input type="text" id="catName" value="${this.data.currentEdit?.name || ''}" required>
                </div>
                <div class="form-group">
                    <label>الأيقونة (Font Awesome class)</label>
                    <input type="text" id="catIcon" value="${this.data.currentEdit?.icon || 'fas fa-briefcase'}" placeholder="fas fa-briefcase">
                </div>
                <button class="btn btn-success" onclick="admin.saveCategory()">حفظ</button>
            `;
        } else if (type === 'service') {
            title.textContent = editId ? 'تعديل مقدم خدمة' : 'إضافة مقدم خدمة';
            body.innerHTML = `
                <div class="form-group">
                    <label>الاسم</label>
                    <input type="text" id="serviceName" value="${this.data.currentEdit?.name || ''}" required>
                </div>
                <div class="form-group">
                    <label>الهاتف</label>
                    <input type="text" id="servicePhone" value="${this.data.currentEdit?.phone || ''}" pattern="01[0-9]{9}" placeholder="01xxxxxxxxx" required>
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="serviceWhatsapp" ${this.data.currentEdit?.whatsapp !== false ? 'checked' : ''}>
                        واتساب متاح
                    </label>
                </div>
                <div class="form-group">
                    <label>نوع الخدمة</label>
                    <select id="serviceCategory" required>
                        <option value="">اختر...</option>
                        ${this.data.categories.map(c => `
                            <option value="${c.id}" ${this.data.currentEdit?.categoryId === c.id ? 'selected' : ''}>${c.name}</option>
                        `).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>المحافظة</label>
                    <select id="serviceGov" onchange="admin.filterCitiesForService()" required>
                        <option value="">اختر...</option>
                        ${this.data.governorates.map(g => `
                            <option value="${g.id}" ${this.data.currentEdit?.governorateId === g.id ? 'selected' : ''}>${g.name}</option>
                        `).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>المدينة</label>
                    <select id="serviceCity" onchange="admin.filterVillagesForService()" required>
                        <option value="">اختر...</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>القرية</label>
                    <select id="serviceVillage" required>
                        <option value="">اختر...</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>ملاحظات</label>
                    <textarea id="serviceNotes" rows="3" style="width: 100%; font-family: 'Cairo';">${this.data.currentEdit?.notes || ''}</textarea>
                </div>
                <button class="btn btn-success" onclick="admin.saveService()">حفظ</button>
            `;
            setTimeout(() => {
                this.filterCitiesForService();
                setTimeout(() => this.filterVillagesForService(), 100);
            }, 100);
        }

        document.getElementById('modal').classList.add('show');
    },

    closeModal() {
        document.getElementById('modal').classList.remove('show');
        this.data.currentEdit = null;
    },

    filterCitiesForVillage() {
        const govSelect = document.getElementById('villageGov');
        const citySelect = document.getElementById('villageCity');
        const govId = govSelect.value;

        const cities = this.data.cities.filter(c => c.governorateId === govId);
        citySelect.innerHTML = '<option value="">اختر...</option>' + cities.map(c => `
            <option value="${c.id}" ${this.data.currentEdit?.cityId === c.id ? 'selected' : ''}>${c.name}</option>
        `).join('');
    },

    filterCitiesForService() {
        const govSelect = document.getElementById('serviceGov');
        const citySelect = document.getElementById('serviceCity');
        const govId = govSelect.value;

        const cities = this.data.cities.filter(c => c.governorateId === govId);
        citySelect.innerHTML = '<option value="">اختر...</option>' + cities.map(c => `
            <option value="${c.id}" ${this.data.currentEdit?.cityId === c.id ? 'selected' : ''}>${c.name}</option>
        `).join('');
    },

    filterVillagesForService() {
        const citySelect = document.getElementById('serviceCity');
        const villageSelect = document.getElementById('serviceVillage');
        const cityId = citySelect.value;

        const villages = this.data.villages.filter(v => v.cityId === cityId);
        villageSelect.innerHTML = '<option value="">اختر...</option>' + villages.map(v => `
            <option value="${v.id}" ${this.data.currentEdit?.villageId === v.id ? 'selected' : ''}>${v.name}</option>
        `).join('');
    },

    async saveGovernorate() {
        const name = document.getElementById('govName').value;
        const icon = document.getElementById('govIcon').value;

        if (!name) return;

        this.showLoading(true);
        const data = { name, icon };

        let result;
        if (this.data.currentEdit) {
            result = await FirebaseService.updateGovernorate(this.data.currentEdit.id, data);
        } else {
            result = await FirebaseService.addGovernorate(data);
        }

        this.showLoading(false);

        if (result.success) {
            this.showToast('تم الحفظ بنجاح');
            this.closeModal();
            await this.loadAllData();
            this.updateStats();
            this.renderGovernorates();
        } else {
            this.showToast('خطأ: ' + result.error);
        }
    },

    async saveCity() {
        const name = document.getElementById('cityName').value;
        const governorateId = document.getElementById('cityGov').value;

        if (!name || !governorateId) return;

        this.showLoading(true);
        const data = { name, governorateId };

        let result;
        if (this.data.currentEdit) {
            result = await FirebaseService.updateCity(this.data.currentEdit.id, data);
        } else {
            result = await FirebaseService.addCity(data);
        }

        this.showLoading(false);

        if (result.success) {
            this.showToast('تم الحفظ بنجاح');
            this.closeModal();
            await this.loadAllData();
            this.updateStats();
            this.renderCities();
        } else {
            this.showToast('خطأ: ' + result.error);
        }
    },

    async saveVillage() {
        const name = document.getElementById('villageName').value;
        const governorateId = document.getElementById('villageGov').value;
        const cityId = document.getElementById('villageCity').value;

        if (!name || !governorateId || !cityId) return;

        this.showLoading(true);
        const data = { name, governorateId, cityId };

        let result;
        if (this.data.currentEdit) {
            result = await FirebaseService.updateVillage(this.data.currentEdit.id, data);
        } else {
            result = await FirebaseService.addVillage(data);
        }

        this.showLoading(false);

        if (result.success) {
            this.showToast('تم الحفظ بنجاح');
            this.closeModal();
            await this.loadAllData();
            this.updateStats();
            this.renderVillages();
        } else {
            this.showToast('خطأ: ' + result.error);
        }
    },

    async saveCategory() {
        const name = document.getElementById('catName').value;
        const icon = document.getElementById('catIcon').value;

        if (!name) return;

        this.showLoading(true);
        const data = { name, icon };

        let result;
        if (this.data.currentEdit) {
            result = await FirebaseService.updateServiceCategory(this.data.currentEdit.id, data);
        } else {
            result = await FirebaseService.addServiceCategory(data);
        }

        this.showLoading(false);

        if (result.success) {
            this.showToast('تم الحفظ بنجاح');
            this.closeModal();
            await this.loadAllData();
            this.updateStats();
            this.renderCategories();
        } else {
            this.showToast('خطأ: ' + result.error);
        }
    },

    async saveService() {
        const name = document.getElementById('serviceName').value;
        const phone = document.getElementById('servicePhone').value;
        const whatsapp = document.getElementById('serviceWhatsapp').checked;
        const categoryId = document.getElementById('serviceCategory').value;
        const governorateId = document.getElementById('serviceGov').value;
        const cityId = document.getElementById('serviceCity').value;
        const villageId = document.getElementById('serviceVillage').value;
        const notes = document.getElementById('serviceNotes').value;

        if (!name || !phone || !categoryId || !governorateId || !cityId || !villageId) {
            this.showToast('الرجاء ملء جميع الحقول المطلوبة');
            return;
        }

        this.showLoading(true);
        const data = { name, phone, whatsapp, categoryId, governorateId, cityId, villageId, notes };

        let result;
        if (this.data.currentEdit) {
            result = await FirebaseService.updateService(this.data.currentEdit.id, data);
        } else {
            result = await FirebaseService.addService(data);
        }

        this.showLoading(false);

        if (result.success) {
            this.showToast('تم الحفظ بنجاح');
            this.closeModal();
            await this.loadAllData();
            this.updateStats();
            this.renderServices();
        } else {
            this.showToast('خطأ: ' + result.error);
        }
    },

    edit(type, id) {
        this.openModal(type, id);
    },

    async delete(type, id, name) {
        if (!confirm(`هل أنت متأكد من حذف "${name}"؟`)) return;

        this.showLoading(true);
        let result;

        if (type === 'governorate') {
            result = await FirebaseService.deleteGovernorate(id);
        } else if (type === 'city') {
            result = await FirebaseService.deleteCity(id);
        } else if (type === 'village') {
            result = await FirebaseService.deleteVillage(id);
        } else if (type === 'category') {
            result = await FirebaseService.deleteServiceCategory(id);
        } else if (type === 'service') {
            result = await FirebaseService.deleteService(id);
        }

        this.showLoading(false);

        if (result.success) {
            this.showToast('تم الحذف بنجاح');
            await this.loadAllData();
            this.updateStats();

            if (type === 'governorate') this.renderGovernorates();
            else if (type === 'city') this.renderCities();
            else if (type === 'village') this.renderVillages();
            else if (type === 'category') this.renderCategories();
            else if (type === 'service') this.renderServices();
        } else {
            this.showToast('خطأ في الحذف: ' + result.error);
        }
    },

    async toggleService(id, isActive) {
        this.showLoading(true);
        const result = await FirebaseService.toggleServiceStatus(id, isActive);
        this.showLoading(false);

        if (result.success) {
            this.showToast(isActive ? 'تم تفعيل الخدمة' : 'تم تعطيل الخدمة');
            await this.loadAllData();
            this.updateStats();
            this.renderServices();
        } else {
            this.showToast('خطأ: ' + result.error);
        }
    },

    async logout() {
        await FirebaseService.logout();
        this.showToast('تم تسجيل الخروج');
    },

    showLoading(show) {
        document.getElementById('loading').classList.toggle('show', show);
    },

    showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
};

// Export to global
window.admin = admin;

// Initialize
admin.init();
