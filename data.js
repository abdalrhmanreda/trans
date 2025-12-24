/**
 * Transportation Drivers Database
 * 
 * To add a new driver, simply add an object to the driversData array below.
 * 
 * Driver object structure:
 * {
 *   id: unique number,
 *   name: "Driver Name",
 *   phone: "Phone number (will be used for calling)",
 *   vehicleType: "microbus" | "tuk-tuk" | "tricycle",
 *   workingArea: "Area description",
 *   notes: "Optional notes" (can be empty string)
 * }
 */

const driversData = [
    // Microbus Drivers
    {
        id: 1,
        name: "أحمد محمد علي",
        phone: "01098584630",
        vehicleType: "microbus",
        workingArea: "القرية - المدينة",
        notes: "متاح طوال اليوم، رحلات منتظمة كل ساعة"
    },
    {
        id: 2,
        name: "محمود حسن",
        phone: "01098765432",
        vehicleType: "microbus",
        workingArea: "القرية - المحافظة",
        notes: "رحلات صباحية ومسائية فقط"
    },
    {
        id: 3,
        name: "خالد السيد",
        phone: "01123456789",
        vehicleType: "microbus",
        workingArea: "القرية - القاهرة",
        notes: "رحلة واحدة صباحاً ورحلة مسائية"
    },
    {
        id: 4,
        name: "عبد الله إبراهيم",
        phone: "01234567890",
        vehicleType: "microbus",
        workingArea: "القرية - الإسكندرية",
        notes: "رحلات يومي الجمعة والسبت"
    },

    // Tuk-Tuk Drivers
    {
        id: 5,
        name: "سعيد أحمد",
        phone: "01156789012",
        vehicleType: "tuk-tuk",
        workingArea: "داخل القرية وما حولها",
        notes: "متاح 24 ساعة، أسعار مخفضة لكبار السن"
    },
    {
        id: 6,
        name: "جمال عبد الناصر",
        phone: "01267890123",
        vehicleType: "tuk-tuk",
        workingArea: "القرية - القرى المجاورة",
        notes: "متخصص في نقل البضائع الخفيفة"
    },
    {
        id: 7,
        name: "محمد صلاح",
        phone: "01078901234",
        vehicleType: "tuk-tuk",
        workingArea: "جميع أنحاء القرية",
        notes: "متاح من الساعة 6 صباحاً حتى 10 مساءً"
    },
    {
        id: 8,
        name: "حسين علي",
        phone: "01189012345",
        vehicleType: "tuk-tuk",
        workingArea: "القرية - السوق المركزي",
        notes: "رحلات يومية للسوق صباحاً"
    },
    {
        id: 9,
        name: "طارق مصطفى",
        phone: "01290123456",
        vehicleType: "tuk-tuk",
        workingArea: "داخل القرية",
        notes: "أسعار ثابتة، توك توك حديث ومكيف"
    },

    // Tricycle Drivers
    {
        id: 10,
        name: "عبد الرحمن حسن",
        phone: "01501234567",
        vehicleType: "tricycle",
        workingArea: "داخل القرية",
        notes: "متخصص في نقل البضائع والمواد الغذائية"
    },
    {
        id: 11,
        name: "ياسر محمود",
        phone: "01612345678",
        vehicleType: "tricycle",
        workingArea: "القرية - المزارع",
        notes: "نقل المحاصيل والمنتجات الزراعية"
    },
    {
        id: 12,
        name: "وليد السعيد",
        phone: "01023456789",
        vehicleType: "tricycle",
        workingArea: "جميع أنحاء القرية",
        notes: "متاح للرحلات الداخلية والنقل الخفيف"
    },
    {
        id: 13,
        name: "رامي عادل",
        phone: "01134567890",
        vehicleType: "tricycle",
        workingArea: "القرية - المناطق الريفية",
        notes: "أسعار مناسبة، متاح معظم الأوقات"
    },
    {
        id: 14,
        name: "فتحي أحمد",
        phone: "01245678901",
        vehicleType: "tricycle",
        workingArea: "داخل القرية والنجوع",
        notes: "يمكنه الوصول للمناطق الضيقة"
    },
    {
        id: 15,
        name: "مصطفى كمال",
        phone: "01056789012",
        vehicleType: "tricycle",
        workingArea: "القرية بالكامل",
        notes: "خدمة سريعة وأسعار تنافسية"
    }
];

/**
 * Vehicle Type Configuration
 * This object contains the display names and icons for each vehicle type
 */
const vehicleTypeConfig = {
    microbus: {
        name: "ميكروباص",
        icon: "fas fa-bus",
        color: "#667eea"
    },
    "tuk-tuk": {
        name: "توك توك",
        icon: "fas fa-motorcycle",
        color: "#764ba2"
    },
    tricycle: {
        name: "تروسيكل",
        icon: "fas fa-bicycle",
        color: "#4facfe"
    }
};
