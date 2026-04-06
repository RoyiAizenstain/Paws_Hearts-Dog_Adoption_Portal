document.addEventListener("DOMContentLoaded", async function () {
    try {
        const id = getDogIdFromURL();
        const dog = await fetchDogById(id);

        if (!dog) {
            window.location.href = "index.html";
            return;
        }

        document.getElementById("dog-name").textContent = dog.name;
        document.getElementById("dog-preview-name").textContent = dog.name;
        document.getElementById("dog-image").src = dog.first_image_url;
        document.getElementById("dog-image").alt = dog.name;

        const form = document.getElementById("adopt-form");

        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const fullname = document.getElementById("fullname").value;
            const phone = document.getElementById("phone").value;

            await postAdoption(id, { email, fullname, phone });

            window.location.href = `thankyou.html?id=${id}`;
        });
    } catch (error) {
        console.error("Error loading adoption page:", error);
    }
});