document.addEventListener("DOMContentLoaded", () => {
    const watchlistContainer = document.getElementById("watchlist-container");
    const watchlist = JSON.parse(localStorage.getItem("watchlistItems")) || [];
  
    if (watchlist.length === 0) {
      watchlistContainer.innerHTML = "<p>Your watchlist is empty.</p>";
      return;
    }
  
    watchlist.forEach((movie) => {
      const item = document.createElement("div");
      item.className = "watchlist-item";
      item.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title}">
        <p>${movie.Title}</p>
        <button class="remove-btn" data-id="${movie.imdbID}">Remove</button>
      `;
      watchlistContainer.appendChild(item);
  
      item.querySelector(".remove-btn").addEventListener("click", () => {
        const updatedWatchlist = watchlist.filter((m) => m.imdbID !== movie.imdbID);
        localStorage.setItem("watchlistItems", JSON.stringify(updatedWatchlist));
        item.remove();
      });
    });
  });
  