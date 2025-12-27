/**
 * Firebase Service - Our Village
 * Manages all Firestore operations
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCnYGlrhzDgy8ukSPmh_YulMwmKb07Yeqc",
    authDomain: "our-vallage.firebaseapp.com",
    projectId: "our-vallage",
    storageBucket: "our-vallage.firebasestorage.app",
    messagingSenderId: "174447317174",
    appId: "1:174447317174:web:209f6cef38cd4cee321617",
    measurementId: "G-HDETNKDVLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

console.log('🔥 Firebase initialized - Our Village');

/**
 * Collections
 */
const COLLECTIONS = {
    GOVERNORATES: 'governorates',
    CITIES: 'cities',
    VILLAGES: 'villages',
    SERVICE_CATEGORIES: 'service_categories',
    SERVICES: 'services'
};

/**
 * Firebase Service Class
 */
class FirebaseService {

    // ==================== AUTH ====================

    static async login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async logout() {
        try {
            await signOut(auth);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static onAuthChange(callback) {
        return onAuthStateChanged(auth, callback);
    }

    // ==================== GOVERNORATES ====================

    static async getAllGovernorates() {
        try {
            const snapshot = await getDocs(collection(db, COLLECTIONS.GOVERNORATES));
            const governorates = [];
            snapshot.forEach(doc => {
                governorates.push({ id: doc.id, ...doc.data() });
            });
            return { success: true, data: governorates };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async addGovernorate(data) {
        try {
            const docRef = await addDoc(collection(db, COLLECTIONS.GOVERNORATES), {
                name: data.name,
                icon: data.icon || '🏛️',
                createdAt: new Date().toISOString()
            });
            return { success: true, id: docRef.id };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async updateGovernorate(id, data) {
        try {
            await updateDoc(doc(db, COLLECTIONS.GOVERNORATES, id), {
                ...data,
                updatedAt: new Date().toISOString()
            });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async deleteGovernorate(id) {
        try {
            await deleteDoc(doc(db, COLLECTIONS.GOVERNORATES, id));
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // ==================== CITIES ====================

    static async getCitiesByGovernorate(governorateId) {
        try {
            const q = query(
                collection(db, COLLECTIONS.CITIES),
                where('governorateId', '==', governorateId)
            );
            const snapshot = await getDocs(q);
            const cities = [];
            snapshot.forEach(doc => {
                cities.push({ id: doc.id, ...doc.data() });
            });
            return { success: true, data: cities };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async getAllCities() {
        try {
            const snapshot = await getDocs(collection(db, COLLECTIONS.CITIES));
            const cities = [];
            snapshot.forEach(doc => {
                cities.push({ id: doc.id, ...doc.data() });
            });
            return { success: true, data: cities };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async addCity(data) {
        try {
            const docRef = await addDoc(collection(db, COLLECTIONS.CITIES), {
                name: data.name,
                governorateId: data.governorateId,
                createdAt: new Date().toISOString()
            });
            return { success: true, id: docRef.id };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async updateCity(id, data) {
        try {
            await updateDoc(doc(db, COLLECTIONS.CITIES, id), {
                ...data,
                updatedAt: new Date().toISOString()
            });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async deleteCity(id) {
        try {
            await deleteDoc(doc(db, COLLECTIONS.CITIES, id));
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // ==================== VILLAGES ====================

    static async getVillagesByCity(cityId) {
        try {
            const q = query(
                collection(db, COLLECTIONS.VILLAGES),
                where('cityId', '==', cityId)
            );
            const snapshot = await getDocs(q);
            const villages = [];
            snapshot.forEach(doc => {
                villages.push({ id: doc.id, ...doc.data() });
            });
            return { success: true, data: villages };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async getAllVillages() {
        try {
            const snapshot = await getDocs(collection(db, COLLECTIONS.VILLAGES));
            const villages = [];
            snapshot.forEach(doc => {
                villages.push({ id: doc.id, ...doc.data() });
            });
            return { success: true, data: villages };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async addVillage(data) {
        try {
            const docRef = await addDoc(collection(db, COLLECTIONS.VILLAGES), {
                name: data.name,
                cityId: data.cityId,
                governorateId: data.governorateId,
                createdAt: new Date().toISOString()
            });
            return { success: true, id: docRef.id };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async updateVillage(id, data) {
        try {
            await updateDoc(doc(db, COLLECTIONS.VILLAGES, id), {
                ...data,
                updatedAt: new Date().toISOString()
            });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async deleteVillage(id) {
        try {
            await deleteDoc(doc(db, COLLECTIONS.VILLAGES, id));
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // ==================== SERVICE CATEGORIES ====================

    static async getAllServiceCategories() {
        try {
            const snapshot = await getDocs(collection(db, COLLECTIONS.SERVICE_CATEGORIES));
            const categories = [];
            snapshot.forEach(doc => {
                categories.push({ id: doc.id, ...doc.data() });
            });
            return { success: true, data: categories };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async addServiceCategory(data) {
        try {
            const docRef = await addDoc(collection(db, COLLECTIONS.SERVICE_CATEGORIES), {
                name: data.name,
                icon: data.icon,
                createdAt: new Date().toISOString()
            });
            return { success: true, id: docRef.id };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async updateServiceCategory(id, data) {
        try {
            await updateDoc(doc(db, COLLECTIONS.SERVICE_CATEGORIES, id), {
                ...data,
                updatedAt: new Date().toISOString()
            });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async deleteServiceCategory(id) {
        try {
            await deleteDoc(doc(db, COLLECTIONS.SERVICE_CATEGORIES, id));
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // ==================== SERVICES ====================

    static async getServicesByVillage(villageId) {
        try {
            const q = query(
                collection(db, COLLECTIONS.SERVICES),
                where('villageId', '==', villageId),
                where('isActive', '==', true)
            );
            const snapshot = await getDocs(q);
            const services = [];
            snapshot.forEach(doc => {
                services.push({ id: doc.id, ...doc.data() });
            });
            return { success: true, data: services };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async getAllServices() {
        try {
            const snapshot = await getDocs(collection(db, COLLECTIONS.SERVICES));
            const services = [];
            snapshot.forEach(doc => {
                services.push({ id: doc.id, ...doc.data() });
            });
            return { success: true, data: services };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async addService(data) {
        try {
            const docRef = await addDoc(collection(db, COLLECTIONS.SERVICES), {
                name: data.name,
                phone: data.phone,
                whatsapp: data.whatsapp !== false,
                categoryId: data.categoryId,
                governorateId: data.governorateId,
                cityId: data.cityId,
                villageId: data.villageId,
                notes: data.notes || '',
                isActive: true,
                createdAt: new Date().toISOString()
            });
            return { success: true, id: docRef.id };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async updateService(id, data) {
        try {
            await updateDoc(doc(db, COLLECTIONS.SERVICES, id), {
                ...data,
                updatedAt: new Date().toISOString()
            });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async toggleServiceStatus(id, isActive) {
        try {
            await updateDoc(doc(db, COLLECTIONS.SERVICES, id), {
                isActive: isActive,
                updatedAt: new Date().toISOString()
            });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async deleteService(id) {
        try {
            await deleteDoc(doc(db, COLLECTIONS.SERVICES, id));
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // ==================== HELPER METHODS ====================

    static async getGovernorateById(id) {
        try {
            const docSnap = await getDoc(doc(db, COLLECTIONS.GOVERNORATES, id));
            if (docSnap.exists()) {
                return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
            }
            return { success: false, error: 'Not found' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async getCityById(id) {
        try {
            const docSnap = await getDoc(doc(db, COLLECTIONS.CITIES, id));
            if (docSnap.exists()) {
                return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
            }
            return { success: false, error: 'Not found' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async getVillageById(id) {
        try {
            const docSnap = await getDoc(doc(db, COLLECTIONS.VILLAGES, id));
            if (docSnap.exists()) {
                return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
            }
            return { success: false, error: 'Not found' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Count services by governorate
    static async countServicesByGovernorate(governorateId) {
        try {
            const q = query(
                collection(db, COLLECTIONS.SERVICES),
                where('governorateId', '==', governorateId),
                where('isActive', '==', true)
            );
            const snapshot = await getDocs(q);
            return { success: true, count: snapshot.size };
        } catch (error) {
            return { success: false, error: error.message, count: 0 };
        }
    }
}

// Export
export { FirebaseService, auth, db, COLLECTIONS };
