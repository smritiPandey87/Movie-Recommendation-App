// fetch("https://www.omdbapi.com/?apikey=183d627f&s=action&page=1")
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));

// document.addEventListener("DOMContentLoaded", () => {
//   const movieListContainer = document.getElementById("movie-list");

//   fetch("https://www.omdbapi.com/?apikey=183d627f&s=action&page=1")
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.Response === "True" && data.Search) {
//         data.Search.forEach((movie) => {
//           const card = document.createElement("div");
//           card.className = "movie-card";

//           card.innerHTML = `
//             <img src="${
//               movie.Poster !== "N/A"
//                 ? movie.Poster
//                 : "https://m.media-amazon.com/images/M/MV5BNDA3YzcwY2YtMGFmOC00OWEzLTgyOTAtZDNlNTdiODQ1MjgxXkEyXkFqcGc@._V1_SX300.jpg"
//             }" alt="${movie.Title}" />
//             <h3>${movie.Title}</h3>
//             <p>${movie.Year}</p>
//           `;

//           movieListContainer.appendChild(card);
//         });
//       } else {
//         movieListContainer.innerHTML = `<p>No movies found.</p>`;
//       }
//     })
//     .catch((error) => {
//       console.error("Error fetching movies:", error);
//       movieListContainer.innerHTML = `<p>Failed to load movies. Please try again later.</p>`;
//     });
// });

document.addEventListener("DOMContentLoaded", () => {
  const movieListContainer = document.getElementById("movie-list");

  fetch("https://www.omdbapi.com/?apikey=183d627f&s=action&page=1")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
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
          `;

          movieListContainer.appendChild(card);
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
