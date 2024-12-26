// // fetch("https://www.omdbapi.com/?apikey=183d627f&s=action&page=1")
// //   .then((response) => response.json())
// //   .then((data) => console.log(data))
// //   .catch((error) => console.error(error));

document.addEventListener("DOMContentLoaded", () => {
  const movieListContainer = document.getElementById("movie-list");
  const searchInput = document.getElementById("searchInput");
  const paginationContainer = document.getElementById("pagination");
  const API_KEY = "183d627f";
  const DEFAULT_QUERY = "action";

  function fetchAndDisplayMovies(query, page = 1) {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        movieListContainer.innerHTML = "";
        paginationContainer.innerHTML = "";

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

          setupPagination(query, data.totalResults, page);

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
          movieListContainer.innerHTML = `<p>No movies found.</p>`;
        }
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        movieListContainer.innerHTML = `<p>Failed to load movies. Please try again later.</p>`;
      });
  }

  function setupPagination(query, totalResults, currentPage) {
    const totalPages = Math.ceil(totalResults / 10);
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (currentPage > 1) {
      const prevButton = document.createElement("button");
      prevButton.className = "pagination-btn prev-btn";
      prevButton.textContent = "Previous";
      prevButton.addEventListener("click", () => {
        fetchAndDisplayMovies(query, currentPage - 1);
      });
      paginationContainer.appendChild(prevButton);
    }

    for (let i = startPage; i <= endPage; i++) {
      const pageButton = document.createElement("button");
      pageButton.className = "pagination-btn";
      pageButton.textContent = i;
      pageButton.disabled = i === currentPage;
      pageButton.addEventListener("click", () => {
        fetchAndDisplayMovies(query, i);
      });
      paginationContainer.appendChild(pageButton);
    }

    if (currentPage < totalPages) {
      const nextButton = document.createElement("button");
      nextButton.className = "pagination-btn next-btn";
      nextButton.textContent = "Next";
      nextButton.addEventListener("click", () => {
        fetchAndDisplayMovies(query, currentPage + 3);
      });
      paginationContainer.appendChild(nextButton);
    }
  }

  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  function handleSearch(event) {
    const query = event.target.value.trim();
    if (query === "") {
      fetchAndDisplayMovies(DEFAULT_QUERY);
    } else {
      fetchAndDisplayMovies(query);
    }
  }

  fetchAndDisplayMovies(DEFAULT_QUERY);

  const debouncedSearch = debounce(handleSearch, 500);
  searchInput.addEventListener("input", debouncedSearch);
});
