import { getAllMovies } from "../api/apiTMDB.js";

export async function Home(container, favoriteIds, onToggleFavorite) {
  const movies = await getAllMovies();

  //se puede hacer con desestructuración también y se repetiría menos movie.key (movie.id, movie.title, etc)
  // y se podría poner directamente id, title, etc.
  const moviesHTML = movies
    .map(function (movie) {
      const isFavorite = favoriteIds.includes(movie.id);
      const heartIcon = isFavorite ? "❤️" : "🤍";

      return `
        <div class="movie-wrapper">
          <a href="/movie/${movie.id}" data-link class="movie-card">
            <img src="https://image.tmdb.org/t/p/w500${
              movie.poster_path
            }" alt="${movie.title}" />
            <div class="movie-info">
              <h3>${movie.title}</h3>
              <p>${movie.release_date}</p>
              <p>⭐ ${movie.vote_average.toFixed(1)}</p>
            </div>
          </a>
          <button class="fav-btn" data-id="${movie.id}" title="Toggle favorite">
            ${heartIcon}
          </button>
        </div>
      `;
    })
    .join(""); //con map se obtiene un array de strings (cada pelicula) y luego se junta cada html con join para meterlo todo junto como bloque HTML

  container.innerHTML = `<section class="movies-grid">${moviesHTML}</section>`;

  // Añadir eeventos a los botones favoritos
  const favButtons = container.querySelectorAll(".fav-btn");

  favButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const movieId = Number(button.dataset.id); //obtiene el id de la peli que está guardado en el botón
      onToggleFavorite(movieId);
    });
  });
}
