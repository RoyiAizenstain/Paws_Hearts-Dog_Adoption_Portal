document.addEventListener("DOMContentLoaded", async function () {
    try {
        const id = getDogIdFromURL();
        const dog = await fetchDogById(id);

        if (!dog) {
            window.location.href = "index.html";
            return;
        }

        document.getElementById("page-title").textContent = `Adopt ${dog.name}`;
        document.getElementById("dog-image").src = dog.first_image_url;
        document.getElementById("dog-image").alt = dog.name;
        document.getElementById("dog-name").textContent = dog.name;

        const form = document.getElementById("adoption-form");

        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const fullname = document.getElementById("fullname").value;
            const phone = document.getElementById("phone").value;

            await fetch(`${API_BASE_URL}/dogs/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, fullname, phone })
            });

            window.location.href = `thankyou.html?id=${id}`;
        });
    } catch (error) {
        console.error("Error loading adoption page:", error);
    }
});