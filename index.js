

let position = [0,0];
const map = L.map('map').setView(position, 6);

L.tileLayer('https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.jpg?key=uQQV4HVr0JQbeMXWUr5w', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map);

const markerIcon = L.icon({
    iconUrl: "images/icon-location.svg",
    iconSize: [40, 50],
    // iconAnchor: [22,94],
})

const marker = L.marker(position, {icon: markerIcon}).addTo(map);
