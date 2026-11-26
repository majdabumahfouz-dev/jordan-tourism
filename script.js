
/* ==========================================
   JORDAN TOURISM
   Main JavaScript File
========================================== */


/* ==========================================
   1. MOBILE MENU
========================================== */

const menuButton = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

if (menuButton && navLinks) {
    menuButton.addEventListener("click", function () {
        navLinks.classList.toggle("show");
    });
}


/* ==========================================
   2. DARK MODE
========================================== */

const darkButton = document.getElementById("dark-toggle");

try {
    if (localStorage.getItem("jordanDarkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
} catch (error) {
    console.warn("تعذر قراءة إعداد الوضع الليلي.");
}

if (darkButton) {
    darkButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        const isDark = document.body.classList.contains("dark-mode");

        try {
            localStorage.setItem(
                "jordanDarkMode",
                isDark ? "enabled" : "disabled"
            );
        } catch (error) {
            console.warn("تعذر حفظ إعداد الوضع الليلي.");
        }
    });
}


/* ==========================================
   3. BACK TO TOP BUTTON
========================================== */

const backToTop = document.getElementById("back-to-top");

if (backToTop) {
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* ==========================================
   4. PLACE INFORMATION
   Used when a page adds a place by name only
========================================== */

const placesData = {
    "البتراء": {
        id: "petra",
        name: "البتراء",
        image: "images/petra.jpg",
        description: "المدينة الوردية الأثرية وأحد أشهر المواقع السياحية في الأردن.",
        link: "petra.html"
    },

    "جرش": {
        id: "jerash",
        name: "جرش",
        image: "images/jerash.jpg",
        description: "مدينة أثرية تشتهر بآثارها الرومانية المميزة.",
        link: "jerash.html"
    },

    "وادي رم": {
        id: "wadirum",
        name: "وادي رم",
        image: "images/wadi-rum.jpg",
        description: "صحراء طبيعية ساحرة تتميز بالجبال الرملية والمناظر الخلابة.",
        link: "wadirum.html"
    },

    "البحر الميت": {
        id: "deadsea",
        name: "البحر الميت",
        image: "images/dead-sea.jpg",
        description: "وجهة طبيعية مميزة تشتهر بمياهها شديدة الملوحة.",
        link: "deadsea.html"
    },

    "قلعة الكرك": {
        id: "karak",
        name: "قلعة الكرك",
        image: "images/karak-castle.jpg",
        description: "قلعة تاريخية بارزة في محافظة الكرك.",
        link: "karak.html"
    },

    "عجلون": {
        id: "ajloun",
        name: "عجلون",
        image: "images/ajloun-reserve.jpg",
        description: "منطقة تتميز بالغابات والطبيعة الخضراء وقلعة عجلون.",
        link: "ajloun.html"
    },

    "وادي بن حماد": {
        id: "wadi-ben-hammad",
        name: "وادي بن حماد",
        image: "images/wadi-ben-hammad.jpg",
        description: "وادي طبيعي يتميز بالمياه والتكوينات الصخرية.",
        link: "wadi-ben-hammad.html"
    },

    "أم قيس": {
        id: "umm-qais",
        name: "أم قيس",
        image: "images/umm-qais.jpg",
        description: "موقع أثري يتميز بإطلالاته وآثاره التاريخية.",
        link: "ummqais.html"
    },

    "أم الجمال": {
        id: "umm-al-jimal",
        name: "أم الجمال",
        image: "images/umm-al-jimal.jpg",
        description: "مدينة أثرية تشتهر بمبانيها الحجرية السوداء.",
        link: "ummaljimal.html"
    },

    "مادبا": {
        id: "madaba",
        name: "مادبا",
        image: "images/madaba.jpg",
        description: "مدينة تشتهر بالفسيفساء والآثار التاريخية.",
        link: "madaba.html"
    },

    "جبل نيبو": {
        id: "mount-nebo",
        name: "جبل نيبو",
        image: "images/mount-nebo.jpg",
        description: "موقع تاريخي وديني يتميز بإطلالته الواسعة.",
        link: "nebo.html"
    },

    "قصر عمرة": {
        id: "qasr-amra",
        name: "قصر عمرة",
        image: "images/qasr-amra.jpg",
        description: "قصر أموي أثري يشتهر برسوماته الجدارية.",
        link: "qasramra.html"
    }
};


/* ==========================================
   5. FAVORITES SYSTEM
========================================== */

// Read saved favorites

function getFavorites() {
    try {
        const savedFavorites = JSON.parse(
            localStorage.getItem("jordanFavorites") || "[]"
        );

        if (!Array.isArray(savedFavorites)) {
            return [];
        }

        return savedFavorites.map(function (place) {
            if (typeof place === "string") {
                return placesData[place] || {
                    id: place,
                    name: place,
                    image: "",
                    description: "",
                    link: "places.html"
                };
            }

            const matchingPlace = placesData[place.name] || {};

            return {
                id: place.id || matchingPlace.id || place.name,
                name: place.name || matchingPlace.name || "مكان سياحي",
                image: place.image || matchingPlace.image || "",
                description: place.description || matchingPlace.description || "",
                link: place.link || place.url || matchingPlace.link || "places.html"
            };
        });

    } catch (error) {
        console.warn("تعذر قراءة الأماكن المفضلة.");
        return [];
    }
}


// Save favorites

function saveFavorites(favorites) {
    try {
        localStorage.setItem(
            "jordanFavorites",
            JSON.stringify(favorites)
        );
    } catch (error) {
        alert("تعذر حفظ المفضلة. يرجى التأكد من إعدادات المتصفح.");
    }
}


// Add a place to favorites

function addFavorite(place) {
    let placeInfo;

    if (typeof place === "string") {
        placeInfo = placesData[place];

        if (!placeInfo) {
            alert("لم يتم العثور على بيانات هذا المكان.");
            return;
        }
    } else if (place && typeof place === "object") {
        placeInfo = {
            ...place,
            id: place.id || place.name,
            link: place.link || place.url || "places.html"
        };
    } else {
        return;
    }

    if (!placeInfo.id || !placeInfo.name) {
        alert("بيانات المكان غير مكتملة.");
        return;
    }

    const favorites = getFavorites();

    const alreadyExists = favorites.some(function (item) {
        return item.id === placeInfo.id || item.name === placeInfo.name;
    });

    if (alreadyExists) {
        alert("هذا المكان موجود بالفعل في المفضلة.");
        return;
    }

    favorites.push(placeInfo);
    saveFavorites(favorites);

    alert("تمت إضافة المكان إلى المفضلة بنجاح.");
}


// Remove one place from favorites

function removeFavorite(id) {
    const favorites = getFavorites();

    const updatedFavorites = favorites.filter(function (place) {
        return place.id !== id && place.name !== id;
    });

    saveFavorites(updatedFavorites);
    showFavorites();
}


// Remove all favorites

function clearAllFavorites() {
    const confirmation = confirm(
        "هل أنت متأكد من حذف جميع الأماكن المفضلة؟"
    );

    if (confirmation) {
        saveFavorites([]);
        showFavorites();
    }
}


// Display favorites

function showFavorites() {
    const container = document.getElementById("favorites-container");
    const counter = document.getElementById("favorites-count");

    if (!container) {
        return;
    }

    const favorites = getFavorites();

    if (counter) {
        counter.textContent = favorites.length;
    }

    container.innerHTML = "";

    if (favorites.length === 0) {
        const emptyMessage = document.createElement("div");
        emptyMessage.className = "empty-favorites";

        const heading = document.createElement("h3");
        heading.textContent = "لا توجد أماكن مفضلة حتى الآن";

        const paragraph = document.createElement("p");
        paragraph.textContent = "أضف الأماكن التي تعجبك حتى تظهر هنا.";

        const link = document.createElement("a");
        link.href = "places.html";
        link.className = "btn";
        link.textContent = "استكشف الأماكن السياحية";

        emptyMessage.append(heading, paragraph, link);
        container.appendChild(emptyMessage);

        return;
    }

    favorites.forEach(function (place) {
        const card = document.createElement("article");
        card.className = "place-card card";

        if (place.image) {
            const image = document.createElement("img");
            image.src = place.image;
            image.alt = place.name;
            image.loading = "lazy";
            card.appendChild(image);
        }

        const content = document.createElement("div");
        content.className = "card-content";

        const heading = document.createElement("h3");
        heading.textContent = place.name;

        const description = document.createElement("p");
        description.textContent = place.description || "";

        const link = document.createElement("a");
        link.href = place.link || "places.html";
        link.className = "btn";
        link.textContent = "عرض التفاصيل";

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "btn btn-secondary";
        removeButton.textContent = "حذف من المفضلة";

        removeButton.addEventListener("click", function () {
            removeFavorite(place.id);
        });

        content.append(
            heading,
            description,
            link,
            removeButton
        );

        card.appendChild(content);
        container.appendChild(card);
    });
}



/* ==========================================
   6. SEARCH AND FILTER PLACES
========================================== */

const searchInput = document.getElementById("place-search");
const provinceFilter = document.getElementById("province-filter");
const tourismFilter = document.getElementById("tourism-filter");

const placesContainer = document.getElementById("places-container");
const noResults = document.getElementById("no-results");


// Normalize Arabic text for better search

function normalizeArabic(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[َّ-ْـ]/g, "")
        .replace(/[أإآٱ]/g, "ا")
        .replace(/ى/g, "ي");
}


// Filter places

function filterPlaces() {

    if (!placesContainer) {
        return;
    }

    const cards = placesContainer.querySelectorAll(".place-card");

    const searchValue = searchInput
        ? normalizeArabic(searchInput.value)
        : "";

    const provinceValue = provinceFilter
        ? provinceFilter.value
        : "";

    const tourismValue = tourismFilter
        ? tourismFilter.value
        : "";

    let visibleCount = 0;

    cards.forEach(function (card) {

        const name = normalizeArabic(card.dataset.name || "");
        const province = card.dataset.province || "";
        const tourism = card.dataset.tourism || "";

        const matchesName = name.includes(searchValue);

        const matchesProvince =
            provinceValue === "" || province === provinceValue;

        const matchesTourism =
            tourismValue === "" || tourism === tourismValue;

        const isVisible =
            matchesName && matchesProvince && matchesTourism;

        card.style.display = isVisible ? "" : "none";

        if (isVisible) {
            visibleCount++;
        }

    });

    // Show message when there are no results

    if (noResults) {
        noResults.style.display =
            visibleCount === 0 ? "block" : "none";
    }

}


// Search while typing

if (searchInput) {
    searchInput.addEventListener("input", filterPlaces);
}


// Filter by province

if (provinceFilter) {
    provinceFilter.addEventListener("change", filterPlaces);
}


// Filter by tourism type

if (tourismFilter) {
    tourismFilter.addEventListener("change", filterPlaces);
}


// Apply filters when page loads

filterPlaces();



/* ==========================================
   7. INITIALIZE FAVORITES
========================================== */

showFavorites();
