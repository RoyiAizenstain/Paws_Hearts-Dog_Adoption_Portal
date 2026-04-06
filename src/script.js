const API_BASE_URL = "https://44610655-f654-4551-9a9e-47bdc9fb1f76.mock.pstmn.io";

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

async function fetchAllDogs() {
    const response = await fetch(`${API_BASE_URL}/dogs`);

    if (!response.ok) {
        throw new Error("Failed to fetch dogs");
    }

    return await response.json();
}

async function fetchDogById(id) {
    const response = await fetch(`${API_BASE_URL}/dogs/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch dog");
    }

    return await response.json();
}