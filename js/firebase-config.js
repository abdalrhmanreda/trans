/**
 * Firebase Configuration and Integration
 * Handles Firestore database and Authentication
 */

// Import Firebase modules (using CDN version)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js';

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
const analytics = getAnalytics(app);

console.log('Firebase initialized successfully');

/**
 * Get user location for public site
 */
function getUserLocation() {
    const saved = localStorage.getItem('userLocation');
    if (saved) {
        return JSON.parse(saved);
    }
    return null;
}

/**
 * Get collection path for services
 * Structure: governorates/{governorate}/cities/{city}/villages/{village}/services
 */
function getServicesPath(governorate, city, village) {
    return `governorates/${governorate}/cities/${city}/villages/${village}`;
}

// Services collection constant
const SERVICES_COLLECTION = 'services';

/**
 * Firebase Service Class
 */
class FirebaseService {
    /**
     * Authentication
     */
    static async login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Logged in:', userCredential.user.email);
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    }

    static async logout() {
        try {
            await signOut(auth);
            console.log('Logged out successfully');
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, error: error.message };
        }
    }

    static onAuthChange(callback) {
        return onAuthStateChanged(auth, callback);
    }

    /**
     * Get all services from a specific village
     */
    static async getAllServices(governorate, city, village) {
        try {
            // If no parameters, try to get from user location
            if (!governorate || !city || !village) {
                const location = getUserLocation();
                if (!location) {
                    return { success: false, error: 'Location not set' };
                }
                governorate = location.governorate;
                city = location.cityId;
                village = location.villageId;
            }

            const villagePath = getServicesPath(governorate, city, village);
            const servicesRef = collection(db, villagePath, SERVICES_COLLECTION);
            const querySnapshot = await getDocs(servicesRef);
            const services = [];

            querySnapshot.forEach((doc) => {
                services.push({
                    firestoreId: doc.id,
                    ...doc.data()
                });
            });

            console.log(`Loaded ${services.length} services from ${governorate}/${city}/${village}`);
            return { success: true, data: services };
        } catch (error) {
            console.error('Error getting services:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get all services from all villages in a governorate
     */
    static async getAllServicesInGovernorate(governorate) {
        try {
            // This would require getting all cities and villages
            // For now, return empty - will be implemented when needed
            console.log('Getting all services in governorate:', governorate);
            return { success: true, data: [] };
        } catch (error) {
            console.error('Error getting governorate services:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Add a new service to specific village
     */
    static async addService(governorate, city, village, serviceData) {
        try {
            const villagePath = getServicesPath(governorate, city, village);
            const servicesRef = collection(db, villagePath, SERVICES_COLLECTION);

            // Add location info to service data
            const dataWithLocation = {
                ...serviceData,
                city: city,
                village: village,
                governorate: governorate,
                createdAt: new Date().toISOString()
            };

            const docRef = await addDoc(servicesRef, dataWithLocation);
            console.log('Service added to', governorate, city, village, ':', docRef.id);
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('Error adding service:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Update an existing service
     */
    static async updateService(governorate, city, village, firestoreId, serviceData) {
        try {
            const villagePath = getServicesPath(governorate, city, village);
            const serviceRef = doc(db, villagePath, SERVICES_COLLECTION, firestoreId);

            // Update with location info
            const dataWithLocation = {
                ...serviceData,
                city: city,
                village: village,
                governorate: governorate,
                updatedAt: new Date().toISOString()
            };

            await updateDoc(serviceRef, dataWithLocation);
            console.log('Service updated in', governorate, city, village, ':', firestoreId);
            return { success: true };
        } catch (error) {
            console.error('Error updating service:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Delete a service
     */
    static async deleteService(governorate, city, village, firestoreId) {
        try {
            const villagePath = getServicesPath(governorate, city, village);
            const serviceRef = doc(db, villagePath, SERVICES_COLLECTION, firestoreId);
            await deleteDoc(serviceRef);
            console.log('Service deleted from', governorate, city, village, ':', firestoreId);
            return { success: true };
        } catch (error) {
            console.error('Error deleting service:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Initialize database with default data
     */
    static async initializeDefaultData(governorate, city, village, defaultData) {
        try {
            const villagePath = getServicesPath(governorate, city, village);

            // Check if data already exists
            const servicesRef = collection(db, villagePath, SERVICES_COLLECTION);
            const existing = await getDocs(servicesRef);

            if (!existing.empty) {
                console.log('Data already exists for this village');
                return { success: true, message: 'Data already exists' };
            }

            // Add all default services
            const promises = defaultData.map(service =>
                addDoc(servicesRef, {
                    ...service,
                    governorate,
                    city,
                    village,
                    createdAt: new Date().toISOString()
                })
            );

            await Promise.all(promises);
            console.log('Default data initialized:', defaultData.length, 'services');
            return { success: true, count: defaultData.length };
        } catch (error) {
            console.error('Error initializing data:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Export all data from a village
     */
    static async exportData(governorate, city, village) {
        const result = await this.getAllServices(governorate, city, village);
        if (result.success) {
            return result.data;
        }
        return [];
    }

    /**
     * Import data to a village (replaces existing)
     */
    static async importData(governorate, city, village, data) {
        try {
            const villagePath = getServicesPath(governorate, city, village);
            const servicesRef = collection(db, villagePath, SERVICES_COLLECTION);

            // Get existing services
            const existing = await getDocs(servicesRef);

            // Delete existing
            const deletePromises = [];
            existing.forEach(doc => {
                deletePromises.push(deleteDoc(doc.ref));
            });
            await Promise.all(deletePromises);

            // Add new data
            const promises = data.map(service => {
                const { firestoreId, ...serviceData } = service;
                return addDoc(servicesRef, {
                    ...serviceData,
                    governorate,
                    city,
                    village,
                    importedAt: new Date().toISOString()
                });
            });

            await Promise.all(promises);
            console.log('Data imported:', data.length, 'services');
            return { success: true, count: data.length };
        } catch (error) {
            console.error('Error importing data:', error);
            return { success: false, error: error.message };
        }
    }
}

// Export for use in dashboard and public site
export { FirebaseService, auth, db, getServicesPath };
