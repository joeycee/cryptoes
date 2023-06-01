const cryptoContainer = document.querySelector("#cryptoContainer");
// Get references to the search input and button

const searchButton = document.querySelector("#searchButton");

// Fetching crypto data
function fetchCryptocurrencyData() {
  fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`)
    .then((response) => response.json())
    .then((data) => {
      console.log("API Success");
      // Process the fetched cryptocurrency data
      const jsonData = data.slice(0, 30);
      const extractedData = jsonData.map(
        ({ symbol, name, image, current_price, price_change_24h }) => ({
          symbol,
          name,
          image,
          current_price,
          price_change_24h,
        })
      );

      extractedData.forEach((crypto) => {
        // Create a div element for each cryptocurrency
        const cryptoElement = document.createElement("div");
        cryptoElement.classList.add("crypto");

        // Create and set the innerHTML of the cryptoElement
        cryptoElement.innerHTML = `
          <img src="${crypto.image}" alt="${crypto.name}">
          <h2>${crypto.name} (${crypto.symbol})</h2>
          <p>Current Price: $${crypto.current_price}</p>
          <p>Price Change (24h): $${crypto.price_change_24h}</p>
        `;

        // Add click event listener to the cryptoElement
        cryptoElement.addEventListener("click", () => {
          // Redirect to the new page with query parameter
          const url = `results.html?coin=${encodeURIComponent(
            crypto.name.toLower()
          )}`;
          window.location.href = url;
        });

        // Append the cryptoElement to the cryptoContainer
        cryptoContainer.appendChild(cryptoElement);
      });

      console.log(extractedData);
    })
    .catch((error) => {
      console.error("Error fetching cryptocurrency data:", error);
    });
}

function searchCryptocurrency(coin) {
  fetch(`https://api.coingecko.com/api/v3/coins/${coin}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      let coin_name = data.name;
      let coin_id = data.id;
      let coin_description = data.description.en;
      let coin_creation_date = data.genesis_date;
      let image_url = data.image.small;
      let current_price = data.current_price;
      let price_change_24h = data.price_change_24h;

      console.log(coin_name, coin_id, coin_description);
    });
}

fetchCryptocurrencyData();

// searchButton.addEventListener("click", function (e) {
//   e.preventDefault(); // Prevent form submission
//   console.log("click");
//   const searchInput = document.querySelector("#searchInput");
//   const coinName = searchInput.value;
//   console.log(coinName);
//   // searchCryptocurrency(coinName);

// });

// Add an event listener to the search button
document
  .getElementById("searchButton")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    console.log("click");

    const searchInput = document.getElementById("searchInput");
    const coinID = searchInput.value;

    // Redirect to the new page with query parameter
    const url = `results.html?coin=${encodeURIComponent(coinID)}`;
    window.location.href = url;
  });
