/**
 * Dashboard with Firebase Integration
 * Hierarchical structure: governorate → city → village
 */

import { FirebaseService, auth, getServicesPath } from './firebase-config.js';

// State
let currentData = [];
let currentGovernorate = null;
let currentCity = null;
let currentVillage = null;
let selectedVillageFilter = 'all';
let deleteId = null;
let deleteFirestoreId = null;

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
    // Check auth state
    FirebaseService.onAuthChange((user) => {
        if (user) {
            console.log('User logged in:', user.email);
            checkLocationSetup();
        } else {
            console.log('User logged out');
            loginScreen.style.display = 'flex';
            dashboardScreen.style.display = 'none';
        }
    });

    // Event listeners
    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);
    menuToggle.addEventListener('click', toggleSidebar);
    serviceForm.addEventListener('submit', handleSubmit);
    exportBtn.addEventListener('click', exportData);
    importBtn.addEventListener('click', () => importFile.click());
    importFile.addEventListener('change', importData);
    resetBtn.addEventListener('click', initializeFirebase);
    confirmDeleteBtn.addEventListener('click', confirmDelete);
    cancelDeleteBtn.addEventListener('click', () => deleteModal.classList.remove('show'));
    cancelBtn.addEventListener('click', resetForm);
    searchTable.addEventListener('input', filterTable);
    filterCategory.addEventListener('change', filterTable);

    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', handleNavigation);
    });
}

/**
 * Check if location is set up
 */
function checkLocationSetup() {
    const location = localStorage.getItem('adminLocation');

    if (!location) {
        // Show location setup dialog
        showLocationSetup();
    } else {
        const loc = JSON.parse(location);
        currentGovernorate = loc.governorate;
        currentCity = loc.cityId;
        currentVillage = loc.villageId;
        showDashboard();
    }
}

/**
 * Show location setup
 */
function showLocationSetup() {
    // For now, redirect to location.html
    const confirmed = confirm('يجب اختيار الموقع أولاً. هل تريد اختيار الموقع الآن؟');
    if (confirmed) {
        window.location.href = 'location.html?return=dashboard.html';
    }
}

/**
 * Authentication
 */
async function handleLogin(e) {
    e.preventDefault();

    // Simple authentication for demo
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin123') {
        // Mock user
        localStorage.setItem('adminAuth', 'true');
        checkLocationSetup();
        showToast('تم تسجيل الدخول بنجاح!');
    } else {
        showToast('خطأ في اسم المستخدم أو كلمة المرور', 'error');
    }
}

async function handleLogout() {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminLocation');
    loginScreen.style.display = 'flex';
    dashboardScreen.style.display = 'none';
    loginForm.reset();
    showToast('تم تسجيل الخروج بنجاح!');
}

async function showDashboard() {
    loginScreen.style.display = 'none';
    dashboardScreen.style.display = 'block';

    // Load data from Firestore
    await loadData();
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
async function loadData() {
    const result = await FirebaseService.getAllServices(currentGovernorate, currentCity, currentVillage);
    if (result.success) {
        currentData = result.data;
        console.log('Loaded from Firestore:', currentData.length, 'services');
    } else {
        console.error('Error loading data:', result.error);
        currentData = [];
        showToast('خطأ في تحميل البيانات', 'error');
    }
}

/**
 * Initialize Firebase with default data
 */
async function initializeFirebase() {
    if (!confirm('هل أنت متأكد من إعادة تحميل البيانات الافتراضية؟ سيتم حذف جميع البيانات الحالية!')) {
        return;
    }

    showToast('جاري التحميل...', 'info');

    if (typeof servicesData !== 'undefined' && servicesData.length > 0) {
        const result = await FirebaseService.initializeDefaultData(
            currentGovernorate,
            currentCity,
            currentVillage,
            servicesData
        );

        if (result.success) {
            showToast(`تم تحميل ${result.count} مقدم خدمة!`);
            await loadData();
            updateStatistics();
            renderTable();
        } else {
            showToast('خطأ في التحميل: ' + result.error, 'error');
        }
    } else {
        showToast('البيانات الافتراضية غير متوفرة!', 'error');
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
                    <button class="btn-edit" data-id="${service.id}" data-firestore="${service.firestoreId}">
                        <i class="fas fa-edit"></i>
                        تعديل
                    </button>
                    <button class="btn-delete" data-id="${service.id}" data-firestore="${service.firestoreId}" data-name="${service.name}">
                        <i class="fas fa-trash"></i>
                        حذف
                    </button>
                </div>
            </td>
        `;
        servicesTableBody.appendChild(row);
    });

    // Add event listeners to buttons
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', () => editService(btn.dataset.id, btn.dataset.firestore));
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => deleteService(btn.dataset.id, btn.dataset.firestore, btn.dataset.name));
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
async function handleSubmit(e) {
    e.preventDefault();

    const editId = document.getElementById('editId').value;
    const firestoreId = serviceForm.dataset.firestoreId;

    const serviceData = {
        id: editId ? parseInt(editId) : getNextId(),
        name: document.getElementById('serviceName').value,
        phone: document.getElementById('servicePhone').value,
        serviceType: document.getElementById('serviceType').value,
        workingArea: document.getElementById('serviceArea').value,
        notes: document.getElementById('serviceNotes').value
    };

    if (firestoreId) {
        // Update
        const result = await FirebaseService.updateService(
            currentGovernorate,
            currentCity,
            currentVillage,
            firestoreId,
            serviceData
        );

        if (result.success) {
            showToast('تم تحديث البيانات بنجاح!');
        } else {
            showToast('خطأ في التحديث: ' + result.error, 'error');
            return;
        }
    } else {
        // Add
        const result = await FirebaseService.addService(
            currentGovernorate,
            currentCity,
            currentVillage,
            serviceData
        );

        if (result.success) {
            showToast('تمت إضافة مقدم الخدمة بنجاح!');
        } else {
            showToast('خطأ في الإضافة: ' + result.error, 'error');
            return;
        }
    }

    await loadData();
    updateStatistics();
    renderTable();
    resetForm();
}

function editService(id, firestoreId) {
    const service = currentData.find(s => s.firestoreId === firestoreId);
    if (!service) return;

    // Fill form
    document.getElementById('editId').value = service.id;
    serviceForm.dataset.firestoreId = firestoreId;
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

function deleteService(id, firestoreId, name) {
    deleteId = id;
    deleteFirestoreId = firestoreId;
    document.getElementById('deleteName').textContent = name;
    deleteModal.classList.add('show');
}

async function confirmDelete() {
    if (deleteFirestoreId === null) return;

    const result = await FirebaseService.deleteService(
        currentGovernorate,
        currentCity,
        currentVillage,
        deleteFirestoreId
    );

    if (result.success) {
        showToast('تم الحذف بنجاح!');
        await loadData();
        updateStatistics();
        renderTable();
    } else {
        showToast('خطأ في الحذف: ' + result.error, 'error');
    }

    deleteModal.classList.remove('show');
    deleteId = null;
    deleteFirestoreId = null;
}

function resetForm() {
    serviceForm.reset();
    document.getElementById('editId').value = '';
    delete serviceForm.dataset.firestoreId;
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
async function exportData() {
    const data = await FirebaseService.exportData(currentGovernorate, currentCity, currentVillage);
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `services-${currentGovernorate}-${currentCity}-${currentVillage}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('تم تصدير البيانات بنجاح!');
}

async function importData(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!confirm('تحذير: سيتم استبدال جميع البيانات الحالية! هل أنت متأكد؟')) {
        importFile.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = async function (event) {
        try {
            const data = JSON.parse(event.target.result);
            if (Array.isArray(data)) {
                const result = await FirebaseService.importData(
                    currentGovernorate,
                    currentCity,
                    currentVillage,
                    data
                );

                if (result.success) {
                    showToast(`تم استيراد ${result.count} مقدم خدمة بنجاح!`);
                    await loadData();
                    updateStatistics();
                    renderTable();
                } else {
                    showToast('خطأ في الاستيراد: ' + result.error, 'error');
                }
            } else {
                showToast('ملف JSON غير صحيح!', 'error');
            }
        } catch (error) {
            showToast('خطأ في قراءة الملف!', 'error');
        }
    };
    reader.readAsText(file);
    importFile.value = '';
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
    const isAuth = localStorage.getItem('adminAuth');
    if (isAuth) {
        checkLocationSetup();
    }
    init();
}

document.addEventListener('DOMContentLoaded', initializeDashboard);
