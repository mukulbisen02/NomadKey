// Initialize Leaflet Map & Set Center Point
let map = L.map("map").setView([28.6139, 77.209], 5); // Default India

// Tile layer (OSM)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

let marker;

// 🔹 Helper function to add marker
function addMarker(lat, lon, popupText) {
  if (marker) map.removeLayer(marker);

  marker = L.marker([lat, lon]).addTo(map).bindPopup(popupText).openPopup();

  map.setView([lat, lon], 13);
}

// ---------- SHOW PAGE: Add marker for saved listing location ----------
if (typeof listingLocation !== "undefined" && listingLocation !== "") {
  // Forward Geocoding to get lat/lon from address
  fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${listingLocation}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;

        addMarker(lat, lon, `<b>${listingLocation}</b>`);
      }
    })
    .catch((err) => console.log(err));
}

// ---------- SEARCH BOX: Forward Geocoding ----------
function searchLocation() {
  const addressInput = document.getElementById("address").value;
  if (!addressInput) return alert("Please enter an address");

  fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${addressInput}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;

        addMarker(lat, lon, `<b>${addressInput}</b>`);
      } else {
        alert("Location not found!");
      }
    })
    .catch((err) => console.log(err));
}

// ---------- REVERSE GEOCODING: Click on Map ----------
map.on("click", function (e) {
  const lat = e.latlng.lat;
  const lon = e.latlng.lng;

  fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
  )
    .then((res) => res.json())
    .then((data) => {
      const displayName = data.display_name || "No address found";

      addMarker(
        lat,
        lon,
        `<b>Address:</b> ${displayName}<br><b>Lat:</b> ${lat}<br><b>Lon:</b> ${lon}`
      );
    })
    .catch((err) => console.log(err));
});