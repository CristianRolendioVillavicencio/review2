async function fetchReviews() {
    try {
        const response = await fetch('/.netlify/functions/fetchReviews');
        const data = await response.json();

        console.log("API response:", data);

        if (!data.result || !data.result.reviews) {
            throw new Error("No se encontraron reseñas.");
        }

        const reviews = data.result.reviews;
        const reviewsContainer = document.getElementById("reviews");

        reviews.forEach((review) => {
            const reviewElement = document.createElement("div");
            reviewElement.classList.add("review");
            reviewElement.innerHTML = `
                <p><strong>${review.author_name}</strong> (${review.rating} stars)</p>
                <p>${review.text}</p>
                <p><em>${review.relative_time_description}</em></p>
            `;
            reviewsContainer.appendChild(reviewElement);
        });
    } catch (error) {
        console.error("Error al obtener las reseñas:", error);
        const reviewsContainer = document.getElementById("reviews");
        reviewsContainer.innerHTML = "<p>Hubo un error al cargar las reseñas. Por favor, inténtalo de nuevo más tarde.</p>";
    }
}

fetchReviews();
