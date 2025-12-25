/**
 * Dashboard JavaScript - Full Admin Panel
 * Handles authentication, CRUD operations, and data management
 */

// State
let isLoggedIn = false;
let currentData = [];
let deleteId = null;

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const dashboardScreen = document.getElementById('dashboardScreen');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.dashboard-section');
const serviceForm = document.getElementById('serviceForm');
const servicesTableBody = document.getElementById('servicesTableBody');
const searchTable = document.getElementById('searchTable');
const filterCategory = document.getElementById('filterCategory');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importFile = document.getElementById('importFile');
const resetBtn = document.getElementById('resetBtn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const deleteModal = document.getElementById('deleteModal');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const cancelBtn = document.getElementById('cancelBtn');

/**
 * Initialize
 */
function init() {
    // Check login status
    checkLogin();

    // Event listeners
    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);
    menuToggle.addEventListener('click', toggleSidebar);
    serviceForm.addEventListener('submit', handleSubmit);
    exportBtn.addEventListener('click', exportData);
    importBtn.addEventListener('click', () => importFile.click());
    importFile.addEventListener('change', importData);
    resetBtn.addEventListener('click', resetToDefaults);
    confirmDeleteBtn.addEventListener('click', confirmDelete);
    cancelDeleteBtn.addEventListener('click', () => deleteModal.classList.remove('show'));
    cancelBtn.addEventListener('click', resetForm);
    searchTable.addEventListener('input', filterTable);
    filterCategory.addEventListener('change', filterTable);

    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', handleNavigation);
    });

    // Load data from localStorage or use default
    loadData();

    // Debug: If no data loaded, force reload from data.js
    if (currentData.length === 0) {
        console.warn('No data found, loading defaults from data.js');
        resetToDefaults();
    }
}

/**
 * Reset to default data from data.js
 */
function resetToDefaults() {
    if (typeof servicesData !== 'undefined' && servicesData.length > 0) {
        currentData = [...servicesData];
        saveData();
        updateStatistics();
        renderTable();
        showToast('تم تحميل البيانات الافتراضية!');
        console.log('Reset to defaults:', currentData.length, 'services');
    } else {
        console.error('servicesData is not available!');
    }
}

/**
 * Authentication
 */
function checkLogin() {
    isLoggedIn = localStorage.getItem('dashboard_logged_in') === 'true';
    if (isLoggedIn) {
        showDashboard();
    }
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple authentication (in production, use proper backend auth)
    if (username === 'admin' && password === 'admin123') {
        isLoggedIn = true;
        localStorage.setItem('dashboard_logged_in', 'true');
        showDashboard();
        showToast('تم تسجيل الدخول بنجاح!');
    } else {
        showToast('اسم المستخدم أو كلمة المرور غير صحيحة!', 'error');
    }
}

function handleLogout() {
    isLoggedIn = false;
    localStorage.removeItem('dashboard_logged_in');
    loginScreen.style.display = 'flex';
    dashboardScreen.style.display = 'none';
    loginForm.reset();
    showToast('تم تسجيل الخروج بنجاح!');
}

function showDashboard() {
    loginScreen.style.display = 'none';
    dashboardScreen.style.display = 'block';
    updateStatistics();
    renderTable();
}

/**
 * Navigation
 */
function toggleSidebar() {
    sidebar.classList.toggle('open');
}

function handleNavigation(e) {
    e.preventDefault();
    const sectionId = this.dataset.section;

    // Update active nav
    navItems.forEach(item => item.classList.remove('active'));
    this.classList.add('active');

    // Show section
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(`${sectionId}-section`).classList.add('active');

    // Close sidebar on mobile
    if (window.innerWidth <= 1024) {
        sidebar.classList.remove('open');
    }
}

/**
 * Data Management
 */
function loadData() {
    const savedData = localStorage.getItem('servicesData');
    if (savedData) {
        try {
            currentData = JSON.parse(savedData);
        } catch (e) {
            // If localStorage data is corrupted, use default
            currentData = typeof servicesData !== 'undefined' ? [...servicesData] : [];
        }
    } else {
        // No saved data, use default from data.js
        currentData = typeof servicesData !== 'undefined' ? [...servicesData] : [];
        // Save it immediately
        if (currentData.length > 0) {
            saveData();
        }
    }

    console.log('Loaded data:', currentData.length, 'services');
}

function saveData() {
    localStorage.setItem('servicesData', JSON.stringify(currentData));
    // Also update the window.servicesData for the main site
    if (typeof servicesData !== 'undefined') {
        servicesData.length = 0;
        servicesData.push(...currentData);
    }
}

/**
 * Statistics
 */
function updateStatistics() {
    // Total
    document.getElementById('totalProviders').textContent = currentData.length;

    // By category
    const categoryCounts = {
        transportation: 0,
        craftsmen: 0,
        suppliers: 0,
        educational: 0,
        religious: 0
    };

    currentData.forEach(service => {
        const category = serviceTypeConfig[service.serviceType]?.category;
        if (category && categoryCounts.hasOwnProperty(category)) {
            categoryCounts[category]++;
        }
    });

    document.getElementById('transportCount').textContent = categoryCounts.transportation;
    document.getElementById('craftsmenCount').textContent = categoryCounts.craftsmen;
    document.getElementById('educationalCount').textContent = categoryCounts.educational;

    // Breakdown
    const breakdown = {};
    currentData.forEach(service => {
        const type = service.serviceType;
        breakdown[type] = (breakdown[type] || 0) + 1;
    });

    const breakdownList = document.getElementById('breakdownList');
    breakdownList.innerHTML = '';

    Object.keys(breakdown).sort().forEach(type => {
        const config = serviceTypeConfig[type];
        if (config) {
            const item = document.createElement('div');
            item.className = 'breakdown-item';
            item.innerHTML = `
                <div class="breakdown-item-left">
                    <i class="${config.icon}"></i>
                    <span>${config.name}</span>
                </div>
                <div class="breakdown-item-right">${breakdown[type]}</div>
            `;
            breakdownList.appendChild(item);
        }
    });
}

/**
 * Table Management
 */
function renderTable(filter = '', category = 'all') {
    servicesTableBody.innerHTML = '';

    let filteredData = currentData;

    // Filter by category
    if (category !== 'all') {
        filteredData = filteredData.filter(service => {
            const serviceCategory = serviceTypeConfig[service.serviceType]?.category;
            return serviceCategory === category;
        });
    }

    // Filter by search
    if (filter) {
        const searchLower = filter.toLowerCase();
        filteredData = filteredData.filter(service =>
            service.name.toLowerCase().includes(searchLower) ||
            service.phone.includes(searchLower) ||
            service.workingArea.toLowerCase().includes(searchLower)
        );
    }

    filteredData.forEach((service, index) => {
        const row = document.createElement('tr');
        const serviceConfig = serviceTypeConfig[service.serviceType];

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${service.name}</td>
            <td>${service.phone}</td>
            <td>
                <i class="${serviceConfig.icon}"></i>
                ${serviceConfig.name}
            </td>
            <td>${service.workingArea}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-edit" onclick="editService(${service.id})">
                        <i class="fas fa-edit"></i>
                        تعديل
                    </button>
                    <button class="btn-delete" onclick="deleteService(${service.id}, '${service.name}')">
                        <i class="fas fa-trash"></i>
                        حذف
                    </button>
                </div>
            </td>
        `;
        servicesTableBody.appendChild(row);
    });
}

function filterTable() {
    const searchValue = searchTable.value;
    const categoryValue = filterCategory.value;
    renderTable(searchValue, categoryValue);
}

/**
 * CRUD Operations
 */
function handleSubmit(e) {
    e.preventDefault();

    const editId = document.getElementById('editId').value;
    const service = {
        id: editId ? parseInt(editId) : getNextId(),
        name: document.getElementById('serviceName').value,
        phone: document.getElementById('servicePhone').value,
        serviceType: document.getElementById('serviceType').value,
        workingArea: document.getElementById('serviceArea').value,
        notes: document.getElementById('serviceNotes').value
    };

    if (editId) {
        // Update
        const index = currentData.findIndex(s => s.id === parseInt(editId));
        if (index !== -1) {
            currentData[index] = service;
            showToast('تم تحديث البيانات بنجاح!');
        }
    } else {
        // Add
        currentData.push(service);
        showToast('تمت إضافة مقدم الخدمة بنجاح!');
    }

    saveData();
    updateStatistics();
    renderTable();
    resetForm();
}

function editService(id) {
    const service = currentData.find(s => s.id === id);
    if (!service) return;

    // Fill form
    document.getElementById('editId').value = service.id;
    document.getElementById('serviceName').value = service.name;
    document.getElementById('servicePhone').value = service.phone;
    document.getElementById('serviceType').value = service.serviceType;
    document.getElementById('serviceArea').value = service.workingArea;
    document.getElementById('serviceNotes').value = service.notes || '';

    // Update form title
    document.getElementById('formTitle').textContent = 'تعديل مقدم الخدمة';
    document.getElementById('formSubtitle').textContent = 'قم بتعديل البيانات';
    document.getElementById('submitBtnText').textContent = 'تحديث';

    // Navigate to form
    navItems.forEach(item => item.classList.remove('active'));
    document.querySelector('[data-section="add"]').classList.add('active');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById('add-section').classList.add('active');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteService(id, name) {
    deleteId = id;
    document.getElementById('deleteName').textContent = name;
    deleteModal.classList.add('show');
}

function confirmDelete() {
    if (deleteId === null) return;

    const index = currentData.findIndex(s => s.id === deleteId);
    if (index !== -1) {
        currentData.splice(index, 1);
        saveData();
        updateStatistics();
        renderTable();
        showToast('تم الحذف بنجاح!');
    }

    deleteModal.classList.remove('show');
    deleteId = null;
}

function resetForm() {
    serviceForm.reset();
    document.getElementById('editId').value = '';
    document.getElementById('formTitle').textContent = 'إضافة مقدم خدمة جديد';
    document.getElementById('formSubtitle').textContent = 'املأ البيانات التالية';
    document.getElementById('submitBtnText').textContent = 'حفظ';
}

function getNextId() {
    return currentData.length > 0 ? Math.max(...currentData.map(s => s.id)) + 1 : 1;
}

/**
 * Import/Export
 */
function exportData() {
    const dataStr = JSON.stringify(currentData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `services-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('تم تصدير البيانات بنجاح!');
}

function importData(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
        try {
            const data = JSON.parse(event.target.result);
            if (Array.isArray(data)) {
                currentData = data;
                saveData();
                updateStatistics();
                renderTable();
                showToast('تم استيراد البيانات بنجاح!');
            } else {
                showToast('ملف JSON غير صحيح!', 'error');
            }
        } catch (error) {
            showToast('خطأ في قراءة الملف!', 'error');
        }
    };
    reader.readAsText(file);
    importFile.value = ''; // Reset input
}

/**
 * Toast Notification
 */
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Initialize on page load
 */
function initializeDashboard() {
    // Check if data.js is loaded
    if (typeof servicesData === 'undefined' || typeof serviceTypeConfig === 'undefined') {
        console.error('data.js not loaded yet, retrying...');
        setTimeout(initializeDashboard, 100);
        return;
    }

    console.log('Initializing dashboard with', servicesData.length, 'services');
    init();
}

document.addEventListener('DOMContentLoaded', initializeDashboard);
