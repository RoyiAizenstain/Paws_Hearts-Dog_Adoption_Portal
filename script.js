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

async function fetchAllDogs() {
    const response = await fetch(`${API_BASE}/dogs`);

    if (!response.ok) {
        throw new Error("Failed to fetch dogs");
    }

    return await response.json();
}

async function fetchDogById(id) {
    const response = await fetch(`${API_BASE}/dogs/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch dog");
    }

    return await response.json();
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