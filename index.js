// fetch("https://www.omdbapi.com/?apikey=183d627f&s=action&page=1")
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));
const searchIcon = document.getElementById("searchIcon");
const searchContainer = document.querySelector(".search-container");

document.addEventListener("DOMContentLoaded", () => {
  const movieListContainer = document.getElementById("movie-list");

  fetch("https://www.omdbapi.com/?apikey=183d627f&s=action&page=1")
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True" && data.Search) {
        data.Search.forEach((movie) => {
          const card = document.createElement("div");
          card.className = "movie-card";

          const posterUrl =
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://m.media-amazon.com/images/M/MV5BNDA3YzcwY2YtMGFmOC00OWEzLTgyOTAtZDNlNTdiODQ1MjgxXkEyXkFqcGc@._V1_SX300.jpg";

          card.innerHTML = `
            <img src="${posterUrl}" alt="${movie.Title}" />
            
              <div class="card-actions">
                 <p>${movie.Title}</p>
                <button class="watch-btn" data-title="${movie.Title}">Watch</button>
                <button class="share-btn" data-title="${movie.Title}">Share</button>
              </div>
            
          `;

          movieListContainer.appendChild(card);
        });

        document.querySelectorAll(".watch-btn").forEach((button) => {
          button.addEventListener("click", (e) => {
            const movieTitle = e.target.getAttribute("data-title");
            alert(`Now watching: ${movieTitle}`);
          });
        });

        document.querySelectorAll(".share-btn").forEach((button) => {
          button.addEventListener("click", (e) => {
            const movieTitle = e.target.getAttribute("data-title");
            const shareUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(
              movieTitle
            )}`;
            navigator.clipboard
              .writeText(`Check out this movie: ${movieTitle} - ${shareUrl}`)
              .then(() => {
                alert("Movie link copied to clipboard!");
              })
              .catch((err) => {
                console.error("Failed to copy text: ", err);
              });
          });
        });
      } else {
        console.error("No movies found:", data.Error);
        movieListContainer.innerHTML = `<p>No movies found.</p>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
      movieListContainer.innerHTML = `<p>Failed to load movies. Please try again later.</p>`;
    });
});

const searchInput = document.getElementById("searchInput");

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

function handleSearch(event) {
  console.log(`Searching for: ${event.target.value}`);
}

const debouncedSearch = debounce(handleSearch, 100);

searchInput.addEventListener("input", debouncedSearch);
