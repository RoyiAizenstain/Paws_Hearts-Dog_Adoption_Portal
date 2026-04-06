document.addEventListener("DOMContentLoaded", async function () {
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