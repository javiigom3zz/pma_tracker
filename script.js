const map = L.map('map').setView([37.5, -6.7], 10); // Centrado en Huelva

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

let marcadores = {};

async function cargarUbicaciones() {
  const res = await fetch('https://TU_BACKEND_URL/api/ubicaciones'); // Reemplaza con tu URL real
  const datos = await res.json();

  for (const id in datos) {
    const { lat, lon } = datos[id];

    if (marcadores[id]) {
      marcadores[id].setLatLng([lat, lon]);
    } else {
      marcadores[id] = L.marker([lat, lon]).addTo(map).bindPopup(`Vehículo ${id}`);
    }
  }
}

setInterval(cargarUbicaciones, 5000);
