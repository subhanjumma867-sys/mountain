/**
 * Alpine Ascents - Interactive Global Map & Geolocation Engine
 * Powered by Leaflet.js and HTML5 Geolocation API
 */

let alpineMap = null;
let userMarker = null;
let clubMarkers = [];
let userLocation = null;

// Haversine formula for calculating distance in kilometers between two GPS coordinates
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Initialize Leaflet Map
function initMountaineeringMap() {
  const mapElement = document.getElementById('mountaineering-map');
  if (!mapElement || alpineMap) return;

  // Center on Europe/Alps initially with a global perspective
  alpineMap = L.map('mountaineering-map', {
    scrollWheelZoom: false,
    zoomControl: true
  }).setView([28.0, 15.0], 3);

  // Modern cartographic tile layer (OpenStreetMap / CartoDB Dark with fallback)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(alpineMap);
  window.alpineMap = alpineMap;

  // Custom marker icon generator
  const createClubIcon = (isHQ = false) => {
    return L.divIcon({
      className: 'custom-alpine-pin',
      html: `<div class="marker-pin ${isHQ ? 'marker-hq' : ''}"><i class="fa-solid fa-mountain"></i></div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -32]
    });
  };

  // Plot organizations
  if (window.MOUNTAINEERING_DATA && window.MOUNTAINEERING_DATA.organizations) {
    window.MOUNTAINEERING_DATA.organizations.forEach(club => {
      const isHQ = club.id === 'alpine-ascents';
      const marker = L.marker([club.lat, club.lng], {
        icon: createClubIcon(isHQ),
        title: club.name
      }).addTo(alpineMap);

      const popupContent = `
        <div class="alpine-map-popup">
          <div class="popup-badge">${club.type}</div>
          <h6 class="popup-title">${club.name}</h6>
          <p class="popup-location"><i class="fa-solid fa-location-dot text-primary me-1"></i> ${club.city}, ${club.country}</p>
          <p class="popup-desc">${club.focus}</p>
          <div class="popup-details">
            <small class="text-light-body"><i class="fa-solid fa-clock-rotate-left me-1"></i> Est. ${club.founded}</small>
          </div>
          <div class="popup-actions mt-2 pt-2 border-top">
            <a href="${club.website}" target="_blank" rel="noopener" class="btn btn-sm btn-primary py-1 px-2 text-white">
              <i class="fa-solid fa-arrow-up-right-from-square me-1"></i> Official Portal
            </a>
            <a href="tel:${club.phone}" class="btn btn-sm btn-outline-secondary py-1 px-2 ms-1">
              <i class="fa-solid fa-phone me-1"></i> Contact
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      clubMarkers.push({ data: club, marker: marker });
    });
  }

  // Populate clubs directory cards next to the map
  renderClubsDirectory();
}

// Render clubs list in the directory view
function renderClubsDirectory(sortedClubs = null) {
  const container = document.getElementById('clubs-directory-list');
  if (!container || !window.MOUNTAINEERING_DATA) return;

  const clubsToRender = sortedClubs || window.MOUNTAINEERING_DATA.organizations;

  let html = '';
  clubsToRender.forEach((club, index) => {
    const distanceBadge = club.distanceKm !== undefined ? 
      `<span class="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1"><i class="fa-solid fa-compass me-1"></i> ${club.distanceKm.toFixed(0)} km away</span>` :
      `<span class="badge bg-secondary-subtle text-light-body px-2 py-1">Est. ${club.founded}</span>`;

    html += `
      <div class="card club-card mb-3 border-0 shadow-sm" data-club-id="${club.id}" onclick="focusClubOnMap(${club.lat}, ${club.lng})">
        <div class="card-body p-3">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="badge bg-primary-subtle text-primary">${club.type}</span>
            ${distanceBadge}
          </div>
          <h6 class="card-title fw-bold mb-1 text-light-heading d-flex align-items-center">
            ${club.id === 'alpine-ascents' ? '<i class="fa-solid fa-crown text-warning me-1"></i>' : ''}
            ${club.name}
          </h6>
          <p class="text-light-body small mb-2"><i class="fa-solid fa-location-dot text-danger me-1"></i> ${club.city}, ${club.country}</p>
          <p class="card-text small text-light-body mb-2">${club.focus}</p>
          <div class="d-flex gap-2">
            <button class="btn btn-xs btn-outline-primary py-1 px-2 rounded-pill small" onclick="event.stopPropagation(); focusClubOnMap(${club.lat}, ${club.lng})">
              <i class="fa-solid fa-map-pin me-1"></i> View on Map
            </button>
            <a href="${club.website}" target="_blank" rel="noopener" class="btn btn-xs btn-outline-dark py-1 px-2 rounded-pill small" onclick="event.stopPropagation();">
              <i class="fa-solid fa-globe me-1"></i> Website
            </a>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Pan & Zoom map to specific club
function focusClubOnMap(lat, lng) {
  if (!alpineMap) return;
  alpineMap.flyTo([lat, lng], 10, { duration: 1.5 });
  const matched = clubMarkers.find(cm => Math.abs(cm.data.lat - lat) < 0.001 && Math.abs(cm.data.lng - lng) < 0.001);
  if (matched) {
    matched.marker.openPopup();
  }
}

// HTML5 Geolocation API: Locate User & Find Closest Mountain Organization
function detectUserGeoLocation() {
  const statusEl = document.getElementById('geo-status-indicator');
  const findBtn = document.getElementById('btn-detect-location');

  if (findBtn) {
    findBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Pinpointing GPS Coordinates...';
    findBtn.disabled = true;
  }

  if (statusEl) {
    statusEl.innerHTML = '<div class="alert alert-info py-2 px-3 small mb-0"><i class="fa-solid fa-satellite-dish me-2 fa-spin"></i> Contacting GPS satellites & browser Geolocation API...</div>';
  }

  if (!navigator.geolocation) {
    handleGeoError({ code: 0, message: "Geolocation is not supported by your browser." });
    return;
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 60000
  };

  navigator.geolocation.getCurrentPosition(
    position => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;
      const accuracy = position.coords.accuracy;

      userLocation = { lat: userLat, lng: userLng };

      // Update Ticker with live detected coordinates
      updateTickerLocation(`Lat: ${userLat.toFixed(3)}°, Lng: ${userLng.toFixed(3)}° (GPS Active)`);

      // Plot user on map with glowing radar marker
      plotUserOnMap(userLat, userLng);

      // Calculate distances to all clubs
      const clubsWithDist = window.MOUNTAINEERING_DATA.organizations.map(club => {
        const dist = calculateDistanceKm(userLat, userLng, club.lat, club.lng);
        return { ...club, distanceKm: dist };
      });

      // Sort by proximity
      clubsWithDist.sort((a, b) => a.distanceKm - b.distanceKm);
      const closestClub = clubsWithDist[0];

      // Update UI with closest club notification
      if (statusEl) {
        statusEl.innerHTML = `
          <div class="alert alert-success py-2 px-3 small mb-0 shadow-sm">
            <i class="fa-solid fa-circle-check text-success me-1"></i>
            <strong>GPS Location Found:</strong> ${userLat.toFixed(4)}°, ${userLng.toFixed(4)}°.<br>
            Nearest Club: <strong>${closestClub.name}</strong> (${closestClub.city}, ${closestClub.country}) — <strong>${closestClub.distanceKm.toFixed(0)} km</strong> away.
          </div>
        `;
      }

      if (findBtn) {
        findBtn.innerHTML = '<i class="fa-solid fa-location-crosshairs text-success me-1"></i> Location Synced!';
        findBtn.disabled = false;
      }

      // Re-render directory sorted by nearest
      renderClubsDirectory(clubsWithDist);

      // Fit map bounds to show both user and closest club
      if (alpineMap) {
        const bounds = L.latLngBounds([
          [userLat, userLng],
          [closestClub.lat, closestClub.lng]
        ]);
        alpineMap.fitBounds(bounds, { padding: [60, 60], maxZoom: 8 });
      }
    },
    error => {
      handleGeoError(error);
    },
    options
  );
}

// Plot User's Live Marker
function plotUserOnMap(lat, lng) {
  if (!alpineMap) return;

  if (userMarker) {
    alpineMap.removeLayer(userMarker);
  }

  const userIcon = L.divIcon({
    className: 'custom-user-radar-pin',
    html: `
      <div class="user-pulse-container">
        <div class="user-pulse-ring"></div>
        <div class="user-center-dot"><i class="fa-solid fa-street-view"></i></div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });

  userMarker = L.marker([lat, lng], { icon: userIcon })
    .addTo(alpineMap)
    .bindPopup(`
      <div class="p-2 text-center">
        <strong class="text-primary"><i class="fa-solid fa-person-hiking me-1"></i> Your Current Location</strong>
        <p class="small text-light-body mb-0">Lat: ${lat.toFixed(4)}°, Lng: ${lng.toFixed(4)}°</p>
      </div>
    `)
    .openPopup();
}

// Handle Geolocation Errors or Fallback
function handleGeoError(err) {
  console.warn("Geolocation warning/fallback:", err);
  const statusEl = document.getElementById('geo-status-indicator');
  const findBtn = document.getElementById('btn-detect-location');

  if (findBtn) {
    findBtn.innerHTML = '<i class="fa-solid fa-location-crosshairs me-1"></i> Retry Geolocation';
    findBtn.disabled = false;
  }

  // Graceful fallback to Chamonix, France (the Alpine capital)
  const defaultLat = 45.9237;
  const defaultLng = 6.8694;

  if (statusEl) {
    statusEl.innerHTML = `
      <div class="alert alert-warning py-2 px-3 small mb-0">
        <i class="fa-solid fa-triangle-exclamation me-1"></i>
        Browser location permission unavailable or timed out. Defaulted reference to <strong>Chamonix-Mont-Blanc, France</strong>.
      </div>
    `;
  }

  plotUserOnMap(defaultLat, defaultLng);
  updateTickerLocation("Chamonix Valley, Alps (45.92°N, 6.86°E - Default Station)");
}

// Expose globally
window.initMountaineeringMap = initMountaineeringMap;
window.detectUserGeoLocation = detectUserGeoLocation;
window.focusClubOnMap = focusClubOnMap;
