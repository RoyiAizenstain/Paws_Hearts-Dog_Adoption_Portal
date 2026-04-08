document.addEventListener("DOMContentLoaded", async function () {
    spawnConfetti();

    try {
        const id = getDogIdFromURL();
        const dog = await fetchDogById(id);

        if (!dog) {
            window.location.href = "index.html";
            return;
        }

        document.getElementById("dog-image").src = dog.first_image_url;
        document.getElementById("dog-image").alt = dog.name;
        document.getElementById("dog-name").textContent = dog.name;
        document.getElementById("message").textContent = "Thank you for your enquiry!";
    } catch (error) {
        console.error("Error loading thank you page:", error);
    }
});

function spawnConfetti() {
    const container = document.getElementById("confetti-container");
    if (!container) return;

    const colors = ["#f97316", "#fbbf24", "#10b981", "#ef4444", "#8b5cf6", "#3b82f6"];
    const count = 60;

    for (let i = 0; i < count; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = (2.5 + Math.random() * 2) + "s";
        piece.style.animationDelay = (Math.random() * 1.5) + "s";
        piece.style.width = (6 + Math.random() * 8) + "px";
        piece.style.height = (10 + Math.random() * 10) + "px";
        container.appendChild(piece);
    }

    // Auto-cleanup after animation
    setTimeout(function () {
        container.innerHTML = "";
    }, 6000);
}
