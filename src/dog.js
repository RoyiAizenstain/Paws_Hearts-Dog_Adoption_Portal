document.addEventListener("DOMContentLoaded", async function () {
    try {
        const id = getDogIdFromURL();
        const dogs = await fetchAllDogs();
        const dog = dogs[id];

        if (!dog) {
            window.location.href = "index.html";
            return;
        }

        document.getElementById("dog-heading").textContent = `${dog.name} Details`;
        document.getElementById("dog-image").src = dog.first_image_url;
        document.getElementById("dog-image").alt = dog.name;
        document.getElementById("dog-name").textContent = dog.name;
        document.getElementById("dog-breed").textContent = dog.breed;
        document.getElementById("dog-age").textContent = dog.age;
        document.getElementById("dog-sex").textContent = dog.sex;
        document.getElementById("dog-house-trained").textContent = formatBoolean(dog.house_trained);
        document.getElementById("dog-vaccinated").textContent = formatBoolean(dog.vaccinated);
        document.getElementById("dog-story").textContent = dog.story;

        document.getElementById("adopt-btn").href = `adopt.html?id=${id}`;

        const favBtn = document.getElementById("fav-btn");
        favBtn.textContent = isFavorite(id) ? "❤️" : "🤍";
        favBtn.addEventListener("click", function () {
            const nowFav = toggleFavorite(id);
            favBtn.textContent = nowFav ? "❤️" : "🤍";
            favBtn.classList.add("pop");
            setTimeout(function () { favBtn.classList.remove("pop"); }, 300);
        });

        const prevBtn = document.getElementById("prev-btn");
        const nextBtn = document.getElementById("next-btn");

        if (id === 0) {
            prevBtn.style.display = "none";
        } else {
            prevBtn.addEventListener("click", function () {
                window.location.href = `dog.html?id=${id - 1}`;
            });
        }

        if (id === dogs.length - 1) {
            nextBtn.style.display = "none";
        } else {
            nextBtn.addEventListener("click", function () {
                window.location.href = `dog.html?id=${id + 1}`;
            });
        }
    } catch (error) {
        console.error("Error loading dog details:", error);
    }
});