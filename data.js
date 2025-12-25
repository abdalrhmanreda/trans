/**
 * Village Services Database
 * 
 * To add a new service provider, simply add an object to the servicesData array below.
 * 
 * Service provider object structure:
 * {
 *   id: unique number,
 *   name: "Provider Name",
 *   phone: "Phone number (will be used for calling)",
 *   serviceType: "service-category-key",
 *   workingArea: "Area description",
 *   notes: "Optional notes or specialization" (can be empty string)
 * }
 */

const servicesData = [
    // ========== TRANSPORTATION SERVICES ==========
    // Microbus Drivers
    {
        id: 1,
        name: "أحمد محمد علي",
        phone: "01098584630",
        serviceType: "microbus",
        workingArea: "القرية - المدينة",
        notes: "متاح طوال اليوم، رحلات منتظمة كل ساعة"
    },
    {
        id: 2,
        name: "محمود حسن",
        phone: "01098765432",
        serviceType: "microbus",
        workingArea: "القرية - المحافظة",
        notes: "رحلات صباحية ومسائية فقط"
    },
    {
        id: 3,
        name: "خالد السيد",
        phone: "01123456789",
        serviceType: "microbus",
        workingArea: "القرية - القاهرة",
        notes: "رحلة واحدة صباحاً ورحلة مسائية"
    },

    // Tuk-Tuk Drivers
    {
        id: 4,
        name: "سعيد أحمد",
        phone: "01156789012",
        serviceType: "tuk-tuk",
        workingArea: "داخل القرية وما حولها",
        notes: "متاح 24 ساعة، أسعار مخفضة لكبار السن"
    },
    {
        id: 5,
        name: "جمال عبد الناصر",
        phone: "01267890123",
        serviceType: "tuk-tuk",
        workingArea: "القرية - القرى المجاورة",
        notes: "متخصص في نقل البضائع الخفيفة"
    },
    {
        id: 6,
        name: "محمد صلاح",
        phone: "01078901234",
        serviceType: "tuk-tuk",
        workingArea: "جميع أنحاء القرية",
        notes: "متاح من الساعة 6 صباحاً حتى 10 مساءً"
    },

    // Tricycle Drivers
    {
        id: 7,
        name: "عبد الرحمن حسن",
        phone: "01501234567",
        serviceType: "tricycle",
        workingArea: "داخل القرية",
        notes: "متخصص في نقل البضائع والمواد الغذائية"
    },
    {
        id: 8,
        name: "ياسر محمود",
        phone: "01612345678",
        serviceType: "tricycle",
        workingArea: "القرية - المزارع",
        notes: "نقل المحاصيل والمنتجات الزراعية"
    },

    // Transport Vehicles
    {
        id: 9,
        name: "حسام النقل",
        phone: "01012341234",
        serviceType: "transport-vehicle",
        workingArea: "جميع المحافظات",
        notes: "نقل الأثاث والبضائع الثقيلة - عربة نصف نقل"
    },
    {
        id: 10,
        name: "كريم للنقل",
        phone: "01123451234",
        serviceType: "transport-vehicle",
        workingArea: "القرية والمناطق المجاورة",
        notes: "سيارة ربع نقل، نقل البضائع والأثاث"
    },

    // ========== CRAFTSMEN & TECHNICIANS ==========
    // Electricians
    {
        id: 11,
        name: "حسن الكهربائي",
        phone: "01234512345",
        serviceType: "electrician",
        workingArea: "القرية وما حولها",
        notes: "صيانة كهرباء منازل، تركيب لمبات وأسلاك"
    },
    {
        id: 12,
        name: "محمد فتحي",
        phone: "01098761234",
        serviceType: "electrician",
        workingArea: "جميع أنحاء القرية",
        notes: "خبرة 15 سنة، أعمال الكهرباء الثقيلة والخفيفة"
    },

    // Plumbers
    {
        id: 13,
        name: "أحمد السباك",
        phone: "01156784321",
        serviceType: "plumber",
        workingArea: "القرية والنجوع",
        notes: "سباكة وصيانة المياه، كشف تسريبات"
    },
    {
        id: 14,
        name: "عادل حسني",
        phone: "01267895432",
        serviceType: "plumber",
        workingArea: "داخل القرية",
        notes: "تركيب وصيانة مواسير، خدمة سريعة"
    },

    // Painters
    {
        id: 15,
        name: "كمال الدهان",
        phone: "01078906543",
        serviceType: "painter",
        workingArea: "القرية بالكامل",
        notes: "دهان داخلي وخارجي، ديكورات حديثة"
    },
    {
        id: 16,
        name: "سمير للدهانات",
        phone: "01189017654",
        serviceType: "painter",
        workingArea: "جميع المناطق",
        notes: "دهانات فاخرة، ورق حائط، ديكور"
    },

    // Tilers
    {
        id: 17,
        name: "محمود البلاط",
        phone: "01290128765",
        serviceType: "tiler",
        workingArea: "القرية والمناطق المجاورة",
        notes: "تركيب السيراميك والرخام والبورسلين"
    },
    {
        id: 18,
        name: "رضا السباح",
        phone: "01501239876",
        serviceType: "tiler",
        workingArea: "داخل القرية",
        notes: "معلم سباحة، خبرة 20 سنة"
    },

    // Plasterers
    {
        id: 19,
        name: "سيد المحارة",
        phone: "01612340987",
        serviceType: "plasterer",
        workingArea: "القرية وما حولها",
        notes: "محارة وبياض، تشطيبات ممتازة"
    },
    {
        id: 20,
        name: "حسين عبده",
        phone: "01023451098",
        serviceType: "plasterer",
        workingArea: "جميع أنحاء القرية",
        notes: "محارة داخلي وخارجي، واجهات"
    },

    // Carpenters
    {
        id: 21,
        name: "عبد الله النجار",
        phone: "01134562109",
        serviceType: "carpenter",
        workingArea: "القرية والنجوع",
        notes: "نجارة موبيليا، أبواب وشبابيك"
    },
    {
        id: 22,
        name: "خالد للنجارة",
        phone: "01245673210",
        serviceType: "carpenter",
        workingArea: "داخل القرية",
        notes: "تفصيل أثاث حسب الطلب، صيانة"
    },

    // Blacksmiths
    {
        id: 23,
        name: "حمدي الحداد",
        phone: "01056784321",
        serviceType: "blacksmith",
        workingArea: "القرية بالكامل",
        notes: "حدادة أبواب وشبابيك، بوابات حديد"
    },
    {
        id: 24,
        name: "سعد للحدادة",
        phone: "01167895432",
        serviceType: "blacksmith",
        workingArea: "القرية والمناطق المجاورة",
        notes: "حدادة مسلحة، شبابيك ألمنيوم"
    },

    // TV Technicians
    {
        id: 25,
        name: "وليد الصيانة",
        phone: "01278906543",
        serviceType: "tv-technician",
        workingArea: "جميع أنحاء القرية",
        notes: "صيانة تلفزيونات ورسيفرات، تركيب دش"
    },
    {
        id: 26,
        name: "طارق للإلكترونيات",
        phone: "01089017654",
        serviceType: "tv-technician",
        workingArea: "القرية وما حولها",
        notes: "صيانة أجهزة منزلية وإلكترونية"
    },

    // ========== SUPPLIERS & DISTRIBUTORS ==========
    // Gas Distributors
    {
        id: 27,
        name: "محمد الغاز",
        phone: "01190128765",
        serviceType: "gas-distributor",
        workingArea: "جميع أنحاء القرية",
        notes: "توصيل أسطوانات الغاز، خدمة سريعة"
    },
    {
        id: 28,
        name: "أحمد توزيع الغاز",
        phone: "01201239876",
        serviceType: "gas-distributor",
        workingArea: "القرية والنجوع",
        notes: "توصيل للمنازل، أسعار تنافسية"
    },

    // ========== EDUCATIONAL & RELIGIOUS SERVICES ==========
    // Teachers
    {
        id: 29,
        name: "أستاذ كريم",
        phone: "01512340987",
        serviceType: "teacher",
        workingArea: "القرية",
        notes: "مدرس رياضيات وعلوم، جميع المراحل"
    },
    {
        id: 30,
        name: "أستاذة سارة",
        phone: "01623451098",
        serviceType: "teacher",
        workingArea: "داخل القرية",
        notes: "مدرسة لغة عربية وإنجليزية"
    },
    {
        id: 31,
        name: "أستاذ محمود",
        phone: "01034562109",
        serviceType: "teacher",
        workingArea: "القرية وما حولها",
        notes: "مدرس فيزياء وكيمياء للثانوية العامة"
    },

    // Quran Teachers
    {
        id: 32,
        name: "الشيخ عبد الرحمن",
        phone: "01145673210",
        serviceType: "quran-teacher",
        workingArea: "القرية",
        notes: "تحفيظ قرآن للأطفال والكبار، إجازة"
    },
    {
        id: 33,
        name: "الشيخ أحمد",
        phone: "01256784321",
        serviceType: "quran-teacher",
        workingArea: "جميع أنحاء القرية",
        notes: "تحفيظ وتجويد، دروس يومية"
    },

    // ========== RELIGIOUS & SOCIAL SERVICES ==========
    // Marriage Officiants
    {
        id: 34,
        name: "الشيخ حسن",
        phone: "01067895432",
        serviceType: "marriage-officiant",
        workingArea: "القرية والقرى المجاورة",
        notes: "مأذون شرعي، عقود زواج"
    },
    {
        id: 35,
        name: "المأذون علي",
        phone: "01178906543",
        serviceType: "marriage-officiant",
        workingArea: "جميع المناطق",
        notes: "مأذون معتمد، خدمات زواج متكاملة"
    }
];

/**
 * Service Type Configuration
 * This object contains the display names, icons, and categories for each service type
 */
const serviceTypeConfig = {
    // Transportation Services
    "microbus": {
        name: "ميكروباص",
        icon: "fas fa-bus",
        category: "transportation",
        categoryName: "المواصلات"
    },
    "tuk-tuk": {
        name: "توك توك",
        icon: "fas fa-motorcycle",
        category: "transportation",
        categoryName: "المواصلات"
    },
    "tricycle": {
        name: "تروسيكل",
        icon: "fas fa-bicycle",
        category: "transportation",
        categoryName: "المواصلات"
    },
    "transport-vehicle": {
        name: "سيارة نقل",
        icon: "fas fa-truck",
        category: "transportation",
        categoryName: "المواصلات"
    },

    // Craftsmen & Technicians
    "electrician": {
        name: "كهربائي",
        icon: "fas fa-bolt",
        category: "craftsmen",
        categoryName: "الحرفيون والفنيون"
    },
    "plumber": {
        name: "سباك",
        icon: "fas fa-wrench",
        category: "craftsmen",
        categoryName: "الحرفيون والفنيون"
    },
    "painter": {
        name: "دهان",
        icon: "fas fa-paint-roller",
        category: "craftsmen",
        categoryName: "الحرفيون والفنيون"
    },
    "tiler": {
        name: "سباح / بلاط",
        icon: "fas fa-th",
        category: "craftsmen",
        categoryName: "الحرفيون والفنيون"
    },
    "plasterer": {
        name: "محارة",
        icon: "fas fa-trowel",
        category: "craftsmen",
        categoryName: "الحرفيون والفنيون"
    },
    "carpenter": {
        name: "نجار",
        icon: "fas fa-hammer",
        category: "craftsmen",
        categoryName: "الحرفيون والفنيون"
    },
    "blacksmith": {
        name: "حداد",
        icon: "fas fa-tools",
        category: "craftsmen",
        categoryName: "الحرفيون والفنيون"
    },
    "tv-technician": {
        name: "صيانة تلفزيونات",
        icon: "fas fa-tv",
        category: "craftsmen",
        categoryName: "الحرفيون والفنيون"
    },

    // Suppliers
    "gas-distributor": {
        name: "توصيل غاز",
        icon: "fas fa-burn",
        category: "suppliers",
        categoryName: "الموردون"
    },

    // Educational Services
    "teacher": {
        name: "مدرس",
        icon: "fas fa-chalkboard-teacher",
        category: "educational",
        categoryName: "الخدمات التعليمية"
    },
    "quran-teacher": {
        name: "محفظ قرآن",
        icon: "fas fa-book-quran",
        category: "educational",
        categoryName: "الخدمات التعليمية"
    },

    // Religious & Social Services
    "marriage-officiant": {
        name: "مأذون شرعي",
        icon: "fas fa-rings-wedding",
        category: "religious",
        categoryName: "الخدمات الدينية والاجتماعية"
    }
};

/**
 * Category Configuration
 * Groups services into main categories
 */
const categoryConfig = {
    "all": {
        name: "جميع الخدمات",
        icon: "fas fa-border-all"
    },
    "transportation": {
        name: "المواصلات",
        icon: "fas fa-bus"
    },
    "craftsmen": {
        name: "الحرفيون والفنيون",
        icon: "fas fa-tools"
    },
    "suppliers": {
        name: "الموردون",
        icon: "fas fa-boxes"
    },
    "educational": {
        name: "التعليم",
        icon: "fas fa-graduation-cap"
    },
    "religious": {
        name: "الخدمات الدينية",
        icon: "fas fa-mosque"
    }
};
