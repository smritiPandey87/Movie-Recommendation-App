// // fetch("https://www.omdbapi.com/?apikey=183d627f&s=action&page=1")
// //   .then((response) => response.json())
// //   .then((data) => console.log(data))
// //   .catch((error) => console.error(error));

document.addEventListener("DOMContentLoaded", () => {
  const movieListContainer = document.getElementById("movie-list");
  const searchInput = document.getElementById("searchInput");
  const paginationContainer = document.getElementById("pagination");
  const movieModal = document.getElementById("movieModal");
  const movieDetails = document.getElementById("movieDetails");
  const closeModal = document.querySelector(".close-modal");
  const API_KEY = "183d627f";
  const DEFAULT_QUERY = "action";

  function addToWatchlist(movie) {
    let watchlistArr = JSON.parse(localStorage.getItem("watchlistItems")) || [];

    const isAlreadyInWatchlist = watchlistArr.some(
      (item) => item.imdbID === movie.imdbID
    );

    if (isAlreadyInWatchlist) {
      alert("This movie is already in your watchlist.");
    } else {
      watchlistArr.push(movie);
      localStorage.setItem("watchlistItems", JSON.stringify(watchlistArr));
      alert("Movie added to your watchlist!");
    }
  }

  closeModal.addEventListener("click", () => {
    movieModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === movieModal) {
      movieModal.style.display = "none";
    }
  });

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
                 <button class="watchlist-icon" data-id="${movie.imdbID}">
              &#9733; 
             </button>
                 <button class="watch-btn" data-title="${movie.Title}">Watch</button>
                 <button class="share-btn" data-title="${movie.Title}">Share</button>
                 
              </div>
            `;
            card.querySelector(".watchlist-icon");
            card.addEventListener("click", () => {
              addToWatchlist(movie);
            });

            card.addEventListener("click", () => {
              fetchMovieDetails(movie.imdbID);
            });

            card.addEventListener("click", () => {
              fetchMovieDetails(movie.imdbID);
            });

            movieListContainer.appendChild(card);
          });

          setupPagination(query, data.totalResults, page);
        } else {
          movieListContainer.innerHTML = `<p>No movies found.</p>`;
        }
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        movieListContainer.innerHTML = `<p>Failed to load movies. Please try again later.</p>`;
      });
  }

  function fetchMovieDetails(imdbID) {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`)
      .then((response) => response.json())
      .then((movie) => {
        if (movie.Response === "True") {
          movieDetails.innerHTML = `
            <h2>${movie.Title}</h2>
            <p><strong>Year:</strong> ${movie.Year}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Director:</strong> ${movie.Director}</p>
            <p><strong>Actors:</strong> ${movie.Actors}</p>
            <p><strong>Plot:</strong> ${movie.Plot}</p>
            <img src="${movie.Poster}" alt="${movie.Title}" />
           1
          `;
          movieModal.style.display = "block";
        } else {
          alert("Movie details not found!");
        }
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }

  function setupPagination(query, totalResults, currentPage) {
    const totalPages = Math.ceil(totalResults / 10);
    const maxVisiblePages = 8;
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

const sliders = document.querySelector(".carouselBox");
var scrollPerClick;
var ImagePadding = 5;

showMovieData();

async function showMovieData() {
  const api_key = "183d627f";

  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${api_key}&s=action&page=1`
  );
  const result = await response.json();

  result.Search.map(function (cur, index) {
    const container = document.createElement("div");
    container.classList.add("slider-item");

    const image = document.createElement("img");
    image.classList.add(`img-${index}`, "slider-img");
    image.src = cur.Poster;
    image.alt = "Movie Poster";

    container.appendChild(image);

    sliders.appendChild(container);
  });

  scrollPerClick = document.querySelector(".img-0").clientWidth + ImagePadding;
}

document.querySelector("#scroll-right").addEventListener("click", function () {
  sliders.scrollLeft += scrollPerClick;
});

document.querySelector("#scroll-left").addEventListener("click", function () {
  sliders.scrollLeft -= scrollPerClick;
});
