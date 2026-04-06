document.addEventListener("DOMContentLoaded", async function () {
    try {
        const dogs = await fetchAllDogs();
        const cards = document.querySelectorAll(".dog-card");

        cards.forEach(function (card, index) {
            const dog = dogs[index];

            if (!dog) {
                return;
            }

            const image = card.querySelector("img");
            const title = card.querySelector("h2");
            const link = card.querySelector("a");

            image.src = dog.first_image_url;
            image.alt = dog.name;
            title.textContent = dog.name;
            link.href = `dog.html?id=${index}`;
        });
    } catch (error) {
        console.error("Error loading dogs:", error);
    }
});