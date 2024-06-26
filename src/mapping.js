document
  .getElementById("dropdownButton")
  .addEventListener("click", function () {
    const menu = document.getElementById("dropdownMenu");
    menu.classList.toggle("hidden");
  });

// Close the dropdown menu if the user clicks outside of it
window.addEventListener("click", function (event) {
  const button = document.getElementById("dropdownButton");
  const menu = document.getElementById("dropdownMenu");
  if (!button.contains(event.target) && !menu.contains(event.target)) {
    menu.classList.add("hidden");
  }
});

// Initialize the map
var mymap = L.map("mapid").setView([13.9314, 121.6152], 13);

// Add a tile layer (OpenStreetMap)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

// Add a marker at a specific location in Lucena City (just for example)
var marker = L.marker([13.9314, 121.6152])
  .addTo(mymap)
  .bindPopup("Welcome to parada")
  .openPopup();

function searchAndNavigate() {
  var input = document.getElementById("searchInput").value;

  // Use a geocoding service (e.g., Nominatim) to convert input to coordinates
  fetch("https://nominatim.openstreetmap.org/search?format=json&q=" + input)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data && data.length > 0) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        mymap.setView([lat, lon], 13); // Set view to the first result's coordinates with zoom level 13
      } else {
        alert("Location not found. Please try again.");
      }
    })
    .catch(function (error) {
      console.error("Error fetching data:", error);
    });
}
