const API_BASE = "https://44610655-f654-4551-9a9e-47bdc9fb1f76.mock.pstmn.io";

function getDogIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"), 10);
    return isNaN(id) ? 0 : id;
}

function formatBoolean(value) {
    if (value === true) {
        return "Yes";
    }

    if (value === false) {
        return "No";
    }

    return "Unknown";
}

const DOGS_CACHE_KEY = "dogs_cache";
const FAVORITES_KEY = "favorites";

async function fetchAllDogs() {
    const cached = sessionStorage.getItem(DOGS_CACHE_KEY);
    if (cached) {
        return JSON.parse(cached);
    }

    const response = await fetch(`${API_BASE}/dogs`);

    if (!response.ok) {
        throw new Error("Failed to fetch dogs");
    }

    const dogs = await response.json();
    sessionStorage.setItem(DOGS_CACHE_KEY, JSON.stringify(dogs));
    return dogs;
}

function getFavorites() {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    try {
        const arr = JSON.parse(raw);
        return Array.isArray(arr) ? arr : [];
    } catch (e) {
        return [];
    }
}

function isFavorite(index) {
    return getFavorites().indexOf(index) !== -1;
}

function toggleFavorite(index) {
    const favs = getFavorites();
    const pos = favs.indexOf(index);
    if (pos === -1) {
        favs.push(index);
    } else {
        favs.splice(pos, 1);
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
    return isFavorite(index);
}

async function fetchDogById(id) {
    const response = await fetch(`${API_BASE}/dogs/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch dog");
    }

    const data = await response.json();
    // Mock may return the full array — index into it if so
    if (Array.isArray(data)) {
        return data[id];
    }
    return data;
}

async function postAdoption(arrayIndex, payload) {
    const response = await fetch(`${API_BASE}/dogs/${arrayIndex}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error("Failed to submit adoption");
    }

    return await response.json();
}