document.addEventListener("DOMContentLoaded", async function () {
    const favCount = document.getElementById("fav-count");

    function updateFavCount() {
        favCount.textContent = getFavorites().length;
    }

    updateFavCount();

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

            const heart = document.createElement("button");
            heart.className = "heart-btn";
            heart.type = "button";
            heart.textContent = isFavorite(index) ? "❤️" : "🤍";
            heart.setAttribute("aria-label", "Toggle favorite");
            heart.addEventListener("click", function (e) {
                e.preventDefault();
                const nowFav = toggleFavorite(index);
                heart.textContent = nowFav ? "❤️" : "🤍";
                heart.classList.add("pop");
                setTimeout(function () { heart.classList.remove("pop"); }, 300);
                updateFavCount();
            });
            card.appendChild(heart);
        });
    } catch (error) {
        console.error("Error loading dogs:", error);
    }
});
