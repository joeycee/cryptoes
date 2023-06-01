// Retrieve the query parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const coinName = urlParams.get("coin");

// Manipulate the DOM and display the search query
const searchQueryElement = document.getElementById("searchQuery");
// searchQueryElement.textContent = "Search Query: " + coinName;

// Call the searchCryptocurrency function with the coinName parameter
searchCryptocurrency(coinName);

// Function to search for cryptocurrency and display results
function searchCryptocurrency(coin) {
  fetch(`https://api.coingecko.com/api/v3/coins/${coin}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let coin_name = data.name;
      let coin_id = data.id;
      let coin_creation_date = data.genesis_date;
      let coin_description = data.description.en;
      let image_url = data.image.large;
      let current_price = data.market_data.current_price.usd;
      let price_change_24h = data.market_data.price_change_24h;

      let signal;

      if (price_change_24h > 0) {
        signal = "📈"; // Price is increasing
      } else {
        signal = "📉"; // Price is decreasing or staying the same
      }

      var regex = /<a\b[^>]*>(.*?)<\/a>/gi;
      var description_result = coin_description.replace(regex, "");

      // Create HTML elements to display the data

      const imageElement = document.createElement("img");
      imageElement.src = image_url;
      imageElement.alt = coin_name + " Logo";

      const coinNameElement = document.createElement("h1");
      coinNameElement.textContent = coin_name;

      const coinIdElement = document.createElement("p");
      coinIdElement.textContent = "Coin ID: " + coin_id;

      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = "Description: " + description_result;

      // const creationDateElement = document.createElement("p");
      // creationDateElement.textContent = "Creation Date: " + coin_creation_date;

      const priceElement = document.createElement("p");
      priceElement.textContent = "Current Price: $" + current_price + " USD";

      const priceChangeElement = document.createElement("p");

      priceChangeElement.textContent =
        "Price Change (24h): " + signal + "$" + price_change_24h;

      // Append the elements to the searchQueryElement div
      searchQueryElement.appendChild(imageElement);
      searchQueryElement.appendChild(coinNameElement);
      searchQueryElement.appendChild(coinIdElement);
      searchQueryElement.appendChild(priceElement);
      searchQueryElement.appendChild(priceChangeElement);
      searchQueryElement.appendChild(descriptionElement);
    })
    .catch((error) => {
      // Handle errors
      console.log("Error:", error);
      const errorMessage = document.createElement("p");
      errorMessage.textContent =
        "That coin does not exsist! please search again!";
      searchQueryElement.appendChild(errorMessage);
    });
}
