/**
 * Alpine Ascents - Main Application Logic & SPA Engine
 * Handles SPA navigation, fade animations, live visitor counter, bottom ticker, authentication,
 * dynamic content population, interactive checklist, records search, video modal, and gallery lightbox.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initVisitorCounter();
  initLiveTicker();
  initSpaNavigation();
  initAuthentication();
  renderAllDynamicSections();
  initChecklistTracker();
  initRecordsFilter();
  initGalleryLightbox();
  initVideoPlayerModal();
  initQuickSearch();

  // Map is lazy-initialized on first visit to view-map (Leaflet fails if div is hidden at init)
  // initBookingEngine is safe to call immediately
  if (typeof initBookingEngine === 'function') {
    initBookingEngine();
  }
});

/* ============================================================
   0. PORTAL THEME ENGINE (MULTI-THEME PRESETS & PERSISTENCE)
   ============================================================ */
const THEME_CONFIG = {
  sunset: {
    name: 'Sunset Alpenglow',
    icon: 'fa-sun',
    colorClass: 'text-warning'
  },
  snow: {
    name: 'Snow Peak Light',
    icon: 'fa-snowflake',
    colorClass: 'text-primary'
  },
  forest: {
    name: 'Alpine Evergreen',
    icon: 'fa-tree',
    colorClass: 'text-success'
  },
  glacier: {
    name: 'Glacier Dark',
    icon: 'fa-icicles',
    colorClass: 'text-info'
  }
};

function initThemeEngine() {
  let currentTheme = localStorage.getItem('alpine_portal_theme');
  if (!currentTheme || currentTheme === 'snow') {
    currentTheme = 'sunset';
    try {
      localStorage.setItem('alpine_portal_theme', 'sunset');
    } catch (e) {}
  }
  setPortalTheme(currentTheme, false);
}

function setPortalTheme(themeKey, showToast = true) {
  if (!THEME_CONFIG[themeKey]) themeKey = 'sunset';

  // Apply data-theme attribute on root HTML element
  document.documentElement.setAttribute('data-theme', themeKey);
  try {
    localStorage.setItem('alpine_portal_theme', themeKey);
  } catch (e) {}

  // Update navbar button label & icon
  const activeIcon = document.getElementById('theme-active-icon');
  const activeLabel = document.getElementById('theme-active-label');
  const config = THEME_CONFIG[themeKey];

  if (activeIcon) {
    activeIcon.className = `fa-solid ${config.icon} ${config.colorClass}`;
  }
  if (activeLabel) {
    activeLabel.textContent = config.name;
  }

  // Update checkmarks and active state in dropdown
  document.querySelectorAll('.theme-option-btn').forEach(btn => {
    const isSelected = btn.getAttribute('data-theme-value') === themeKey;
    btn.classList.toggle('active-theme-choice', isSelected);
    const checkIcon = btn.querySelector('.check-icon');
    if (checkIcon) {
      checkIcon.style.opacity = isSelected ? '1' : '0';
    }
  });

  // Display notification toast if explicitly selected by user
  if (showToast) {
    showThemeToast(config.name, config.icon, config.colorClass);
  }
}
window.setPortalTheme = setPortalTheme;

function showThemeToast(themeName, iconClass, colorClass) {
  const existing = document.querySelector('.theme-toast-notify');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'theme-toast-notify';
  toast.innerHTML = `<i class="fa-solid ${iconClass} ${colorClass}"></i><span>Theme active: <strong>${themeName}</strong></span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    if (toast && toast.parentNode) {
      toast.remove();
    }
  }, 2800);
}

/* ============================================================
   1. VISITOR COUNTER AT TOP RIGHT (BESIDE LOGO/HEADER)
   ============================================================ */
function initVisitorCounter() {
  const counterEl = document.getElementById('visitor-count-number');
  const liveClimbersEl = document.getElementById('live-climbers-active');

  // Retrieve or initialize total visits in localStorage
  let totalVisits = parseInt(localStorage.getItem('alpine_portal_visitors') || '14820');
  
  // Increment on new session/visit
  if (!sessionStorage.getItem('alpine_counted_session')) {
    totalVisits += Math.floor(Math.random() * 3) + 1;
    localStorage.setItem('alpine_portal_visitors', totalVisits.toString());
    sessionStorage.setItem('alpine_counted_session', 'true');
  }

  // Animate counter
  if (counterEl) {
    animateValue(counterEl, totalVisits - 35, totalVisits, 1200);
  }

  // Simulate active climbers fluctuating realistically
  if (liveClimbersEl) {
    let currentLive = 142;
    liveClimbersEl.textContent = currentLive.toString();
    setInterval(() => {
      const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
      currentLive = Math.max(98, currentLive + delta);
      liveClimbersEl.textContent = currentLive.toString();
    }, 6000);
  }
}

function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = Math.floor(progress * (end - start) + start).toLocaleString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

/* ============================================================
   2. CONTINUOUS SCROLLING BOTTOM TICKER (DATE, TIME, GEOLOCATION)
   ============================================================ */
let detectedLocationString = "Locating via HTML5 GPS Satellites...";

function initLiveTicker() {
  const timeEl = document.getElementById('ticker-live-time');
  const dateEl = document.getElementById('ticker-live-date');
  const locationEl = document.getElementById('ticker-live-location');

  function updateClock() {
    const now = new Date();
    if (timeEl) {
      timeEl.textContent = now.toLocaleTimeString('en-US', { hour12: false });
    }
    if (dateEl) {
      dateEl.textContent = now.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    }
  }

  updateClock();
  setInterval(updateClock, 1000);

  // Attempt initial silent geolocation for ticker
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(2);
        const lng = pos.coords.longitude.toFixed(2);
        detectedLocationString = `GPS: ${lat}°N, ${lng}°E (Altitude Est. 540m)`;
        if (locationEl) locationEl.textContent = detectedLocationString;
      },
      () => {
        detectedLocationString = "Station: Chamonix-Mont-Blanc, FR (45.92°N, 6.86°E)";
        if (locationEl) locationEl.textContent = detectedLocationString;
      },
      { timeout: 7000 }
    );
  } else {
    detectedLocationString = "Global Basecamp Telemetry Active";
    if (locationEl) locationEl.textContent = detectedLocationString;
  }
}

function updateTickerLocation(newLocationStr) {
  detectedLocationString = newLocationStr;
  const locationEl = document.getElementById('ticker-live-location');
  if (locationEl) {
    locationEl.textContent = detectedLocationString;
  }
}
window.updateTickerLocation = updateTickerLocation;

/* ============================================================
   3. CLEAN SPA VIEW SWITCHING (PAGE BY PAGE ARCHITECTURE)
   ============================================================ */
let currentActiveViewId = 'view-home';

function switchSpaView(targetViewId) {
  const targetView = document.getElementById(targetViewId);
  if (!targetView) return;

  currentActiveViewId = targetViewId;

  // 1. Hide all views and show target view with smooth fade
  document.querySelectorAll('.spa-view').forEach(view => {
    view.classList.remove('active-view');
  });
  targetView.classList.add('active-view');

  // 2. Update navbar active indicators for direct links and dropdown items
  document.querySelectorAll('#mainNavLinks .dropdown').forEach(dd => dd.classList.remove('has-active'));

  document.querySelectorAll('#mainNavLinks .nav-link, #mainNavLinks .dropdown-item-alpine').forEach(link => {
    if (link.getAttribute('data-view') === targetViewId) {
      link.classList.add('active');
      const parentDropdown = link.closest('.dropdown');
      if (parentDropdown) {
        parentDropdown.classList.add('has-active');
      }
    } else {
      link.classList.remove('active');
    }
  });

  // 3. Scroll window to top
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  // Sync booking authentication UI when entering booking view
  if (targetViewId === 'view-booking' && typeof updateBookingAuthUI === 'function') {
    updateBookingAuthUI();
  }

  // 4. Lazy-init map on first visit, then always invalidate size so tiles render cleanly
  if (targetViewId === 'view-map') {
    setTimeout(() => {
      if (!window.alpineMap && typeof initMountaineeringMap === 'function') {
        initMountaineeringMap();
      }
      if (window.alpineMap) {
        window.alpineMap.invalidateSize(true);
      }
    }, 300);
  }

  // 5. Close mobile navigation menu if open
  const navbarCollapse = document.getElementById('navbarNav');
  if (navbarCollapse && navbarCollapse.classList.contains('show') && window.bootstrap) {
    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
    if (bsCollapse) bsCollapse.hide();
  }

  // 6. Update URL hash cleanly without page jump
  const viewHash = targetViewId.replace('view-', '');
  if (window.history && window.history.replaceState) {
    window.history.replaceState(null, null, '#' + viewHash);
  }
}
window.switchSpaView = switchSpaView;

// Sub-Tab Switcher for Disciplines View
function switchDisciplineTab(subtabId) {
  // Update pill buttons
  document.querySelectorAll('#disciplineTabPills .sub-nav-pill-btn').forEach(btn => {
    if (btn.getAttribute('data-subtab') === subtabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update content panes
  document.querySelectorAll('.discipline-subtab-pane').forEach(pane => {
    if (pane.id === subtabId) {
      pane.classList.remove('d-none');
      pane.classList.add('active');
    } else {
      pane.classList.add('d-none');
      pane.classList.remove('active');
    }
  });
}
window.switchDisciplineTab = switchDisciplineTab;

function initSpaNavigation() {
  const mainNavbar = document.getElementById('mainNavbar');
  const mainNavbarWrapper = document.getElementById('mainNavbarWrapper');

  // Handle Navbar styling on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      if (mainNavbar) mainNavbar.classList.add('navbar-scrolled');
      if (mainNavbarWrapper) mainNavbarWrapper.classList.add('wrapper-scrolled');
    } else {
      if (mainNavbar) mainNavbar.classList.remove('navbar-scrolled');
      if (mainNavbarWrapper) mainNavbarWrapper.classList.remove('wrapper-scrolled');
    }
  });

  // Global Keyboard Shortcut: Ctrl + K (or Cmd + K) opens Quick Search
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const searchModalEl = document.getElementById('quickSearchModal');
      if (searchModalEl && window.bootstrap) {
        const modal = bootstrap.Modal.getOrCreateInstance(searchModalEl);
        modal.show();
      }
    }
  });

  // Handle Hash Navigation (Defaults strictly to Home View)
  const routeByHash = () => {
    const rawHash = (window.location.hash || '').replace('#', '').trim();
    const targetId = rawHash ? (rawHash.startsWith('view-') ? rawHash : 'view-' + rawHash) : 'view-home';
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      switchSpaView(targetId);
    } else {
      switchSpaView('view-home');
    }
  };

  window.addEventListener('hashchange', routeByHash);
  // Ensure default view (Home) is activated on initial load
  routeByHash();
}

function initQuickSearch() {
  const searchModalEl = document.getElementById('quickSearchModal');
  const searchInput = document.getElementById('quickSearchInput');
  const resultsContainer = document.getElementById('quickSearchResults');
  const resultsCounter = document.getElementById('search-results-counter');

  if (!searchModalEl || !searchInput || !resultsContainer) return;

  searchModalEl.addEventListener('shown.bs.modal', () => {
    searchInput.focus();
    searchInput.select();
  });

  const searchableIndex = [];

  if (window.MOUNTAINEERING_DATA && window.MOUNTAINEERING_DATA.history) {
    window.MOUNTAINEERING_DATA.history.forEach(h => {
      searchableIndex.push({
        title: `${h.year}: ${h.title}`,
        desc: h.desc || '',
        view: 'view-history',
        icon: h.icon || 'fa-timeline',
        category: 'History'
      });
    });
  }

  if (window.MOUNTAINEERING_DATA && window.MOUNTAINEERING_DATA.typesAndStyles) {
    window.MOUNTAINEERING_DATA.typesAndStyles.forEach(s => {
      searchableIndex.push({
        title: s.title,
        desc: s.desc || '',
        view: 'view-disciplines',
        icon: s.icon || 'fa-layer-group',
        category: 'Disciplines'
      });
    });
  }

  if (window.MOUNTAINEERING_DATA && window.MOUNTAINEERING_DATA.clubs) {
    window.MOUNTAINEERING_DATA.clubs.forEach(c => {
      searchableIndex.push({
        title: `${c.name} (${c.country})`,
        desc: c.focus || c.desc || 'Alpine Club & High Altitude Base',
        view: 'view-map',
        icon: 'fa-map-location-dot',
        category: 'Clubs & Map'
      });
    });
  }

  searchableIndex.push(
    {
      title: 'Mount Everest (8,848m) South Col Expedition',
      desc: 'Guided high-altitude summit expedition with Sherpa support & oxygen',
      view: 'view-booking',
      icon: 'fa-compass',
      category: 'Expedition'
    },
    {
      title: 'Denali (6,190m) West Buttress Climb',
      desc: 'North America peak expedition with technical glacier traverse',
      view: 'view-booking',
      icon: 'fa-compass',
      category: 'Expedition'
    },
    {
      title: 'Mont Blanc (4,808m) Gouter Route Classic',
      desc: 'Chamonix valley alpine summit and glacial ridge traverse',
      view: 'view-booking',
      icon: 'fa-compass',
      category: 'Expedition'
    },
    {
      title: 'Crevasse Rescue & Glacier Safety Masterclass',
      desc: 'Z-pulley rigging, self-arrest, and avalanche beacon protocols',
      view: 'view-safety',
      icon: 'fa-shield-halved',
      category: 'Safety'
    }
  );

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m]);
  }

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) {
      if (resultsCounter) resultsCounter.textContent = 'Type to search';
      resultsContainer.innerHTML = `
        <a class="dropdown-item-alpine rounded-3 p-2 cursor-pointer" onclick="switchSpaView('view-records'); bootstrap.Modal.getInstance(document.getElementById('quickSearchModal')).hide();">
          <span class="item-icon"><i class="fa-solid fa-trophy"></i></span>
          <div>
            <span class="item-title">World Records & 8,000m Summits</span>
            <span class="item-desc">Fastest ascents, first winter peaks, and legendary feats</span>
          </div>
        </a>
        <a class="dropdown-item-alpine rounded-3 p-2 cursor-pointer" onclick="switchSpaView('view-map'); bootstrap.Modal.getInstance(document.getElementById('quickSearchModal')).hide();">
          <span class="item-icon"><i class="fa-solid fa-map-location-dot"></i></span>
          <div>
            <span class="item-title">Interactive Mountain Map & Clubs</span>
            <span class="item-desc">Everest, K2, Denali, Matterhorn GPS coordinates</span>
          </div>
        </a>
        <a class="dropdown-item-alpine rounded-3 p-2 cursor-pointer" onclick="switchSpaView('view-disciplines'); bootstrap.Modal.getInstance(document.getElementById('quickSearchModal')).hide();">
          <span class="item-icon"><i class="fa-solid fa-layer-group"></i></span>
          <div>
            <span class="item-title">Alpinism Disciplines & Safety Skills</span>
            <span class="item-desc">Alpine style, crevasse extraction, ice climbing essentials</span>
          </div>
        </a>
        <a class="dropdown-item-alpine rounded-3 p-2 cursor-pointer" onclick="switchSpaView('view-booking'); bootstrap.Modal.getInstance(document.getElementById('quickSearchModal')).hide();">
          <span class="item-icon"><i class="fa-solid fa-calendar-check"></i></span>
          <div>
            <span class="item-title">Expedition Booking Studio</span>
            <span class="item-desc">Reserve guided climbs to Denali, Mont Blanc, and Everest</span>
          </div>
        </a>
      `;
      return;
    }

    const matched = searchableIndex.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.desc.toLowerCase().includes(q) || 
      item.category.toLowerCase().includes(q)
    ).slice(0, 6);

    if (resultsCounter) {
      resultsCounter.textContent = `${matched.length} result${matched.length === 1 ? '' : 's'} found`;
    }

    if (matched.length === 0) {
      resultsContainer.innerHTML = `
        <div class="text-center py-4 text-white-50">
          <i class="fa-solid fa-compass fa-2x mb-2 text-secondary opacity-50"></i>
          <p class="small mb-0">No expedition matching "<strong>${escapeHtml(q)}</strong>"</p>
          <small class="text-white-50">Try searching for Everest, Denali, Alpine, Crevasse, or Winter</small>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = matched.map(item => `
      <a class="dropdown-item-alpine rounded-3 p-2 cursor-pointer" onclick="switchSpaView('${item.view}'); bootstrap.Modal.getInstance(document.getElementById('quickSearchModal')).hide();">
        <span class="item-icon"><i class="fa-solid ${item.icon}"></i></span>
        <div>
          <div class="d-flex align-items-center gap-2">
            <span class="item-title">${escapeHtml(item.title)}</span>
            <span class="badge bg-secondary bg-opacity-25 text-white-50" style="font-size: 0.65rem;">${item.category}</span>
          </div>
          <span class="item-desc">${escapeHtml(item.desc.substring(0, 110))}...</span>
        </div>
      </a>
    `).join('');
  });
}

/* ============================================================
   4. USER AUTHENTICATION & LOGIN/SIGNUP SIMULATION
   ============================================================ */
let currentUser = null;
window.currentUser = null;

function initAuthentication() {
  // Check if previously logged in
  const savedUser = localStorage.getItem('alpine_active_user');
  if (savedUser) {
    try {
      currentUser = JSON.parse(savedUser);
      window.currentUser = currentUser;
      updateNavbarAuthState();
    } catch (e) {}
  }

  // Handle Login form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const pass = document.getElementById('loginPassword').value.trim();

      if (!email || !pass) return;

      // Simulated login - restore saved profile if user previously customized photo/details
      let savedProfile = null;
      try {
        const registeredUsers = JSON.parse(localStorage.getItem('alpine_registered_users') || '{}');
        savedProfile = registeredUsers[email.toLowerCase()];
      } catch (err) {}

      currentUser = savedProfile || {
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        email: email,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        tier: 'IFMGA Alpine Member',
        joined: '2025'
      };

      localStorage.setItem('alpine_active_user', JSON.stringify(currentUser));
      window.currentUser = currentUser;
      updateNavbarAuthState();
      if (typeof updateBookingAuthUI === 'function') {
        updateBookingAuthUI();
      }

      // Close modal
      const modalEl = document.getElementById('authModal');
      if (modalEl && window.bootstrap) {
        bootstrap.Modal.getInstance(modalEl).hide();
      }

      showToast(`Welcome back, ${currentUser.name}! You are now authenticated.`);
    });
  }

  // Auth Tabs active indicator synchronization
  const authTabs = document.querySelectorAll('#authTabs .nav-link');
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      authTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
    tab.addEventListener('shown.bs.tab', () => {
      authTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // Name input validation: User CANNOT enter numbers
  const signupNameInput = document.getElementById('signupName');
  const signupNameError = document.getElementById('signupNameError');

  if (signupNameInput) {
    // 1. Block number keystrokes immediately
    signupNameInput.addEventListener('keydown', (e) => {
      // If typing a digit (0-9)
      if (e.key && e.key.length === 1 && /[0-9]/.test(e.key)) {
        e.preventDefault();
        showNumberError();
      }
    });

    // 2. Filter out any numbers pasted or entered via autofill/mobile virtual keyboards
    signupNameInput.addEventListener('input', () => {
      if (/[0-9]/.test(signupNameInput.value)) {
        signupNameInput.value = signupNameInput.value.replace(/[0-9]/g, '');
        showNumberError();
      } else {
        clearNumberError();
      }
    });

    function showNumberError() {
      signupNameInput.classList.add('is-invalid');
      if (signupNameError) {
        signupNameError.classList.remove('d-none');
      }
    }

    function clearNumberError() {
      signupNameInput.classList.remove('is-invalid');
      if (signupNameError) {
        signupNameError.classList.add('d-none');
      }
    }
  }

  // Handle Register form
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = signupNameInput ? signupNameInput.value.trim() : '';
      const email = document.getElementById('signupEmail').value.trim();
      const experience = document.getElementById('signupExperience').value;

      // Validation check: Name cannot be empty and CANNOT contain any numbers
      if (!name) {
        if (signupNameInput) signupNameInput.classList.add('is-invalid');
        if (signupNameError) {
          signupNameError.innerHTML = '<i class="fa-solid fa-triangle-exclamation me-1"></i> Full Name is required.';
          signupNameError.classList.remove('d-none');
        }
        if (signupNameInput) signupNameInput.focus();
        return;
      }

      if (/[0-9]/.test(name)) {
        if (signupNameInput) signupNameInput.classList.add('is-invalid');
        if (signupNameError) {
          signupNameError.innerHTML = '<i class="fa-solid fa-triangle-exclamation me-1"></i> Numbers are not allowed in name. Only alphabetic letters and spaces are permitted.';
          signupNameError.classList.remove('d-none');
        }
        if (signupNameInput) signupNameInput.focus();
        showToast('Validation Error: Numbers are not allowed in Full Name.');
        return;
      }

      if (!email) return;

      const chosenAvatar = document.getElementById('selectedSignupAvatar')?.value || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80';

      currentUser = {
        name: name,
        email: email,
        avatar: chosenAvatar,
        tier: `${experience.toUpperCase()} Alpinist`,
        joined: new Date().getFullYear().toString()
      };

      try {
        const registeredUsers = JSON.parse(localStorage.getItem('alpine_registered_users') || '{}');
        registeredUsers[email.toLowerCase()] = currentUser;
        localStorage.setItem('alpine_registered_users', JSON.stringify(registeredUsers));
      } catch (err) {}

      localStorage.setItem('alpine_active_user', JSON.stringify(currentUser));
      window.currentUser = currentUser;
      updateNavbarAuthState();
      if (typeof updateBookingAuthUI === 'function') {
        updateBookingAuthUI();
      }

      // Close modal
      const modalEl = document.getElementById('authModal');
      if (modalEl && window.bootstrap) {
        bootstrap.Modal.getInstance(modalEl).hide();
      }

      showToast(`Account created! Welcome to Alpine Ascents, ${currentUser.name}.`);
    });
  }

  // Auto-fill Demo Account Button
  const demoBtn = document.getElementById('btn-autofill-demo');
  if (demoBtn) {
    demoBtn.addEventListener('click', () => {
      document.getElementById('loginEmail').value = 'alex.mercer@alpineascents.com';
      document.getElementById('loginPassword').value = 'AlpineSummit2026!';
    });
  }

  // Toggle Password Visibility
  const togglePassBtn = document.getElementById('btn-toggle-password');
  if (togglePassBtn) {
    togglePassBtn.addEventListener('click', () => {
      const passInput = document.getElementById('loginPassword');
      if (passInput.type === 'password') {
        passInput.type = 'text';
        togglePassBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
      } else {
        passInput.type = 'password';
        togglePassBtn.innerHTML = '<i class="fa-solid fa-eye"></i>';
      }
    });
  }
}

function updateNavbarAuthState() {
  const authContainer = document.getElementById('navbar-auth-section');
  if (!authContainer) return;

  if (currentUser) {
    authContainer.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <div class="dropdown">
          <button class="btn btn-dark-glass d-flex align-items-center gap-2 px-3 py-1 rounded-pill border border-primary-subtle dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" title="Alpinist Profile">
            <img src="${currentUser.avatar}" alt="${currentUser.name}" class="rounded-circle border border-primary" style="width: 28px; height: 28px; object-fit: cover;">
            <span class="small fw-semibold text-white d-none d-lg-inline">${currentUser.name}</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow border-0 p-2 mt-2" style="min-width: 240px; background: #101c2e; border: 1px solid rgba(255,255,255,0.1) !important;">
            <li class="px-3 py-2 border-bottom border-secondary border-opacity-25 mb-1 cursor-pointer" onclick="showUserProfileModal()" title="View Alpinist Profile">
              <small class="text-white-50 d-block">Signed in as</small>
              <strong class="text-white small text-truncate d-block">${currentUser.name}</strong>
              <span class="badge bg-primary text-dark mt-1 small fw-bold">${currentUser.tier}</span>
            </li>
            <li>
              <a class="dropdown-item text-white-70 py-2 d-flex align-items-center cursor-pointer" onclick="showUserProfileModal()">
                <i class="fa-solid fa-id-card me-2 text-primary"></i> My Profile & Booked Climbs
              </a>
            </li>
            <li>
              <a class="dropdown-item text-white-70 py-2 d-flex align-items-center cursor-pointer" onclick="showUserBookingsModal()">
                <i class="fa-solid fa-passport me-2 text-warning"></i> View Expedition Pass
              </a>
            </li>
            <li>
              <a class="dropdown-item text-white-70 py-2 d-flex align-items-center cursor-pointer" onclick="switchSpaView('view-safety')">
                <i class="fa-solid fa-clipboard-check me-2 text-info"></i> Gear Checklist
              </a>
            </li>
            <li><hr class="dropdown-divider border-secondary border-opacity-25"></li>
            <li>
              <button class="dropdown-item text-danger py-2 d-flex align-items-center" onclick="logoutUser()">
                <i class="fa-solid fa-right-from-bracket me-2"></i> Sign Out
              </button>
            </li>
          </ul>
        </div>
        <button class="btn btn-outline-danger btn-sm rounded-pill px-3 py-2 fw-semibold d-flex align-items-center gap-2 btn-navbar-signout" onclick="logoutUser()" id="btn-navbar-signout" title="Sign Out">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
          <span class="d-none d-sm-inline">Sign Out</span>
        </button>
      </div>
    `;
  } else {
    authContainer.innerHTML = `
      <button class="btn btn-outline-light btn-sm rounded-pill px-3 py-2 fw-semibold d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#authModal" id="btn-navbar-signin" title="Login to Portal">
        <i class="fa-regular fa-user"></i>
        <span class="d-none d-sm-inline">Login</span>
      </button>
    `;
  }
}

function logoutUser() {
  if (!currentUser) {
    showToast("You are already signed out.");
    return;
  }
  const prevName = currentUser.name;
  currentUser = null;
  window.currentUser = null;
  localStorage.removeItem('alpine_active_user');
  updateNavbarAuthState();
  if (typeof updateBookingAuthUI === 'function') {
    updateBookingAuthUI();
  }
  showToast(`Signed out successfully. Goodbye ${prevName}!`);
}
window.logoutUser = logoutUser;

function showUserProfileModal() {
  const activeUser = (typeof currentUser !== 'undefined' && currentUser) || window.currentUser;
  if (!activeUser) {
    showToast("Please log in to view your profile.");
    const authModalEl = document.getElementById('authModal');
    if (authModalEl && window.bootstrap) {
      bootstrap.Modal.getOrCreateInstance(authModalEl).show();
    }
    return;
  }

  const container = document.getElementById('user-profile-content');
  if (!container) return;

  const allBookings = JSON.parse(localStorage.getItem('alpine_user_bookings') || '[]');
  const userBookings = allBookings.filter(b => 
    (b.userEmail && b.userEmail.toLowerCase() === activeUser.email.toLowerCase()) ||
    (b.climberEmail && b.climberEmail.toLowerCase() === activeUser.email.toLowerCase())
  );

  let climbsHtml = '';
  if (userBookings.length === 0) {
    climbsHtml = `
      <div class="text-center py-5 px-3 border border-secondary border-opacity-25 rounded-4" style="background: rgba(255,255,255,0.03);">
        <div class="mb-3">
          <span class="p-3 rounded-circle d-inline-flex bg-primary bg-opacity-10 text-primary fs-3">
            <i class="fa-solid fa-mountain-sun"></i>
          </span>
        </div>
        <h5 class="fw-bold text-white mb-2">No Booked Climbs Yet</h5>
        <p class="text-white-50 small mb-3 max-w-md mx-auto">You have not reserved any alpine summits yet. Browse our peak catalog to reserve your first climb and clearance permit!</p>
        <button class="btn btn-primary btn-sm rounded-pill px-4 py-2 fw-bold" onclick="closeProfileAndGoBooking()">
          <i class="fa-solid fa-compass me-1"></i> Book a Climb Now
        </button>
      </div>
    `;
  } else {
    climbsHtml = userBookings.map((b) => `
      <div class="card p-3 mb-3 border border-primary border-opacity-30 rounded-4 shadow-sm" style="background: rgba(255,255,255,0.04);">
        <div class="d-flex justify-content-between align-items-start mb-2 flex-wrap gap-2">
          <div>
            <div class="d-flex align-items-center gap-2 mb-1">
              <span class="badge bg-warning text-dark fw-bold">${b.refCode}</span>
              <span class="badge bg-success text-white fw-semibold">
                <i class="fa-solid fa-check-circle me-1"></i> Confirmed & Permitted
              </span>
            </div>
            <h5 class="fw-bold text-white mb-1">
              <i class="fa-solid fa-mountain me-2 text-primary"></i>${b.expeditionName}
            </h5>
            <div class="small text-white-70">
              <span class="me-3"><i class="fa-solid fa-arrows-up-to-line me-1 text-warning"></i>${b.altitude}</span>
              <span class="me-3"><i class="fa-regular fa-calendar-check me-1 text-info"></i>${b.departureDate}</span>
              <span><i class="fa-solid fa-users me-1 text-success"></i>${b.climbers} Climber(s)</span>
            </div>
          </div>
          <div class="text-end">
            <div class="fs-5 fw-bold text-warning mb-0">$${(b.grandTotal || 0).toLocaleString()}</div>
            <small class="text-white-50">Reserved on ${b.date}</small>
          </div>
        </div>

        <div class="d-flex justify-content-between align-items-center pt-2 border-top border-secondary border-opacity-25 mt-2 flex-wrap gap-2">
          <small class="text-white-50">
            <i class="fa-solid fa-user-shield me-1 text-info"></i> Support: <strong class="text-white-70">${b.guideTier || 'Standard (2:1)'}</strong>
          </small>
          <button class="btn btn-outline-primary btn-sm rounded-pill px-3 py-1 fw-semibold" onclick="viewBookingPassByRef('${b.refCode}')">
            <i class="fa-solid fa-id-card-clip me-1"></i> View Official Pass
          </button>
        </div>
      </div>
    `).join('');
  }

  container.innerHTML = `
    <!-- Alpinist Header Banner with Photo Change Option -->
    <div class="p-3 rounded-4 mb-4 border border-secondary border-opacity-25" style="background: rgba(255,255,255,0.03);">
      <div class="d-flex align-items-center gap-3 flex-wrap">
        <div class="position-relative d-inline-block">
          <img id="profileCurrentAvatarImg" src="${activeUser.avatar}" alt="${activeUser.name}" class="rounded-circle border border-2 border-primary shadow" style="width: 76px; height: 76px; object-fit: cover;">
          <label for="profileAvatarFileInput" class="badge bg-primary text-dark rounded-circle position-absolute bottom-0 end-0 p-2 avatar-edit-badge" title="Upload new photo from device">
            <i class="fa-solid fa-camera fa-xs"></i>
          </label>
          <input type="file" id="profileAvatarFileInput" accept="image/*" class="d-none" onchange="handleUserAvatarUpload(event)">
        </div>

        <div class="flex-grow-1">
          <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
              <div class="d-flex align-items-center gap-2 flex-wrap">
                <h4 class="fw-bold text-white mb-0">${activeUser.name}</h4>
                <span class="badge bg-primary text-dark fw-bold">${activeUser.tier}</span>
              </div>
              <p class="text-white-50 small mb-1"><i class="fa-regular fa-envelope me-1"></i> ${activeUser.email}</p>
              <small class="text-white-50"><i class="fa-solid fa-calendar-days me-1"></i> Alpinist Member Since ${activeUser.joined || '2025'}</small>
            </div>
            <div>
              <button class="btn btn-outline-light btn-sm rounded-pill px-3 py-1 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#changeAvatarCollapse" aria-expanded="false" aria-controls="changeAvatarCollapse">
                <i class="fa-solid fa-pen-to-square me-1"></i> Change Photo
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Collapsible Avatar Selector -->
      <div class="collapse mt-3 pt-3 border-top border-secondary border-opacity-25" id="changeAvatarCollapse">
        <div class="p-3 rounded-3 border border-secondary border-opacity-25" style="background: rgba(255,255,255,0.02);">
          <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-1">
            <span class="small fw-semibold text-white">
              <i class="fa-solid fa-user-astronaut me-1 text-primary"></i> Pick Alpinist Avatar Preset
            </span>
            <button type="button" class="btn btn-link btn-sm text-primary p-0 text-decoration-none fw-semibold" onclick="document.getElementById('profileAvatarFileInput').click()">
              <i class="fa-solid fa-cloud-arrow-up me-1"></i> Upload File From Device
            </button>
          </div>
          <div class="d-flex align-items-center gap-2 flex-wrap mb-3">
            ${AVATAR_PRESETS.map((p) => `
              <button type="button" class="avatar-preset-btn ${activeUser.avatar === p.url ? 'active-preset' : ''}" onclick="selectPresetAvatar('${p.url}')" title="${p.name}">
                <img src="${p.url}" alt="${p.name}">
              </button>
            `).join('')}
          </div>
          <div>
            <label class="form-label small text-white-50 mb-1">Or paste custom image URL:</label>
            <div class="input-group input-group-sm">
              <input type="url" id="customAvatarUrlInput" class="form-control form-control-alpine" placeholder="https://example.com/your-photo.jpg">
              <button class="btn btn-primary fw-semibold px-3" type="button" onclick="applyCustomAvatarUrl()">
                <i class="fa-solid fa-check me-1"></i> Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="row g-2 mb-4 text-center">
      <div class="col-4">
        <div class="p-3 rounded-3 border border-secondary border-opacity-25" style="background: rgba(255,255,255,0.02);">
          <small class="text-white-50 d-block mb-1">Booked Climbs</small>
          <strong class="fs-4 text-warning">${userBookings.length}</strong>
        </div>
      </div>
      <div class="col-4">
        <div class="p-3 rounded-3 border border-secondary border-opacity-25" style="background: rgba(255,255,255,0.02);">
          <small class="text-white-50 d-block mb-1">Highest Target</small>
          <strong class="fs-4 text-primary">${userBookings.length > 0 ? userBookings[0].altitude : '8,848m'}</strong>
        </div>
      </div>
      <div class="col-4">
        <div class="p-3 rounded-3 border border-secondary border-opacity-25" style="background: rgba(255,255,255,0.02);">
          <small class="text-white-50 d-block mb-1">Medical Status</small>
          <strong class="fs-5 text-success">Cleared</strong>
        </div>
      </div>
    </div>

    <!-- Booked Climbs Section Title -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h6 class="fw-bold text-white mb-0">
        <i class="fa-solid fa-flag-checkered me-2 text-warning"></i>My Booked Expeditions (${userBookings.length})
      </h6>
      <button class="btn btn-primary btn-sm rounded-pill px-3 py-1 fw-semibold" onclick="closeProfileAndGoBooking()">
        <i class="fa-solid fa-plus me-1"></i> Book Another Climb
      </button>
    </div>

    <!-- Booked Climbs List -->
    <div class="user-bookings-list" style="max-height: 380px; overflow-y: auto;">
      ${climbsHtml}
    </div>
  `;

  const modalEl = document.getElementById('userProfileModal');
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}
window.showUserProfileModal = showUserProfileModal;

// Avatar Presets & Helpers
const AVATAR_PRESETS = [
  { name: 'Alpinist Alex', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
  { name: 'Climber Elena', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
  { name: 'Guide Tenzing', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
  { name: 'Explorer Maya', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },
  { name: 'Veteran Liam', url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80' },
  { name: 'Summit Sarah', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' }
];
window.AVATAR_PRESETS = AVATAR_PRESETS;

function handleSignupAvatarFile(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    showToast("Please choose a valid image file.");
    return;
  }
  if (file.size > 2.5 * 1024 * 1024) {
    showToast("Image is too large. Please select a photo under 2.5MB.");
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    const preview = document.getElementById('signupAvatarPreview');
    const hidden = document.getElementById('selectedSignupAvatar');
    if (preview) preview.src = e.target.result;
    if (hidden) hidden.value = e.target.result;
    document.querySelectorAll('#signup-tab-pane .avatar-preset-btn').forEach(b => b.classList.remove('active-preset'));
  };
  reader.readAsDataURL(file);
}
window.handleSignupAvatarFile = handleSignupAvatarFile;

function selectSignupPreset(url, btn) {
  const preview = document.getElementById('signupAvatarPreview');
  const hidden = document.getElementById('selectedSignupAvatar');
  if (preview) preview.src = url;
  if (hidden) hidden.value = url;
  document.querySelectorAll('#signup-tab-pane .avatar-preset-btn').forEach(b => b.classList.remove('active-preset'));
  if (btn) btn.classList.add('active-preset');
}
window.selectSignupPreset = selectSignupPreset;

function updateUserAvatar(newAvatarUrl) {
  if (!newAvatarUrl) return;
  const activeUser = (typeof currentUser !== 'undefined' && currentUser) || window.currentUser;
  if (!activeUser) {
    showToast("Please log in to update your avatar.");
    return;
  }

  activeUser.avatar = newAvatarUrl;
  currentUser = activeUser;
  window.currentUser = activeUser;
  localStorage.setItem('alpine_active_user', JSON.stringify(activeUser));

  try {
    const registeredUsers = JSON.parse(localStorage.getItem('alpine_registered_users') || '{}');
    if (activeUser.email) {
      registeredUsers[activeUser.email.toLowerCase()] = activeUser;
      localStorage.setItem('alpine_registered_users', JSON.stringify(registeredUsers));
    }
  } catch (e) {}

  // Update Profile Modal avatar
  const profileImg = document.getElementById('profileCurrentAvatarImg');
  if (profileImg) profileImg.src = newAvatarUrl;

  // Update active state in collapse preset buttons if open
  document.querySelectorAll('#changeAvatarCollapse .avatar-preset-btn').forEach(btn => {
    const img = btn.querySelector('img');
    if (img && img.src === newAvatarUrl) {
      btn.classList.add('active-preset');
    } else {
      btn.classList.remove('active-preset');
    }
  });

  // Update Navbar and Booking views immediately
  updateNavbarAuthState();
  if (typeof updateBookingAuthUI === 'function') {
    updateBookingAuthUI();
  }

  showToast("Profile picture updated successfully!");
}
window.updateUserAvatar = updateUserAvatar;

function handleUserAvatarUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    showToast("Please choose a valid image file.");
    return;
  }
  if (file.size > 2.5 * 1024 * 1024) {
    showToast("Image is too large. Please select a photo under 2.5MB.");
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    updateUserAvatar(e.target.result);
  };
  reader.readAsDataURL(file);
}
window.handleUserAvatarUpload = handleUserAvatarUpload;

function selectPresetAvatar(url) {
  updateUserAvatar(url);
}
window.selectPresetAvatar = selectPresetAvatar;

function applyCustomAvatarUrl() {
  const input = document.getElementById('customAvatarUrlInput');
  if (!input || !input.value.trim()) {
    showToast("Please enter an image URL.");
    return;
  }
  const url = input.value.trim();
  updateUserAvatar(url);
  input.value = '';
}
window.applyCustomAvatarUrl = applyCustomAvatarUrl;

function closeProfileAndGoBooking() {
  const profileModalEl = document.getElementById('userProfileModal');
  if (profileModalEl && window.bootstrap) {
    const modalInstance = bootstrap.Modal.getInstance(profileModalEl);
    if (modalInstance) modalInstance.hide();
  }
  switchSpaView('view-booking');
}
window.closeProfileAndGoBooking = closeProfileAndGoBooking;

function viewBookingPassByRef(refCode) {
  const allBookings = JSON.parse(localStorage.getItem('alpine_user_bookings') || '[]');
  const booking = allBookings.find(b => b.refCode === refCode);
  if (!booking) return;

  // Close profile modal if open
  const profileModalEl = document.getElementById('userProfileModal');
  if (profileModalEl && window.bootstrap) {
    const pModal = bootstrap.Modal.getInstance(profileModalEl);
    if (pModal) pModal.hide();
  }

  if (typeof populateExpeditionPassModal === 'function') {
    populateExpeditionPassModal(booking);
  }
  const passModalEl = document.getElementById('expeditionPassModal');
  if (passModalEl && window.bootstrap) {
    const passModal = bootstrap.Modal.getOrCreateInstance(passModalEl);
    passModal.show();
  }
}
window.viewBookingPassByRef = viewBookingPassByRef;

function showUserBookingsModal() {
  showUserProfileModal();
}
window.showUserBookingsModal = showUserBookingsModal;

/* ============================================================
   5. RENDER DYNAMIC SECTIONS CONTENT
   ============================================================ */
function renderAllDynamicSections() {
  renderHistoryTimeline();
  renderTypesAndStyles();
  renderTechniques();
  renderShelters();
  renderHazards();
  renderSuccessStories();
  renderInnovations();
  renderGuidelines();
  renderExpeditionsCatalog();
  renderGalleryGrid();
  initVideosData();
  renderVideoShowcase();
}

// 5.1 History Timeline
function renderHistoryTimeline() {
  const container = document.getElementById('history-timeline-container');
  if (!container || !window.MOUNTAINEERING_DATA) return;

  let html = '';
  window.MOUNTAINEERING_DATA.history.forEach((item, index) => {
    const isEven = index % 2 === 0;
    html += `
      <div class="timeline-item ${isEven ? 'timeline-left' : 'timeline-right'} mb-4 position-relative">
        <div class="timeline-dot shadow-sm"><i class="fa-solid ${item.icon}"></i></div>
        <div class="card timeline-card border-0 shadow-sm p-4 rounded-4">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="badge bg-warning text-dark fw-bold px-3 py-1 fs-6">${item.year}</span>
            <span class="badge bg-secondary-subtle text-light-body">${item.category}</span>
          </div>
          ${item.image ? `<div class="rounded-3 overflow-hidden mb-3 shadow-sm" style="height: 180px;"><img src="${item.image}" alt="${item.title}" class="w-100 h-100 object-fit-cover transition-scale"></div>` : ''}
          <h5 class="fw-bold text-light-heading mb-2">${item.title}</h5>
          <p class="text-light-body small mb-3">${item.desc}</p>
          <div class="d-flex align-items-center text-primary small fw-semibold">
            <i class="fa-solid fa-location-dot me-2"></i> ${item.highlight}
          </div>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

// 5.2 Types & Styles
function renderTypesAndStyles() {
  const container = document.getElementById('styles-cards-container');
  if (!container || !window.MOUNTAINEERING_DATA) return;

  let html = '';
  window.MOUNTAINEERING_DATA.typesAndStyles.forEach(style => {
    html += `
      <div class="col-md-6 col-lg-4">
        <div class="card style-card h-100 border-0 shadow-sm rounded-4 overflow-hidden p-4">
          ${style.image ? `<div class="rounded-3 overflow-hidden mb-3 shadow-sm" style="height: 170px;"><img src="${style.image}" alt="${style.title}" class="w-100 h-100 object-fit-cover transition-scale"></div>` : ''}
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="style-icon-box rounded-circle text-primary bg-primary-subtle d-flex align-items-center justify-content-center" style="width: 52px; height: 52px;">
              <i class="fa-solid ${style.icon} fa-xl"></i>
            </div>
            <span class="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2">${style.badge}</span>
          </div>
          <h5 class="fw-bold text-light-heading mb-1">${style.title}</h5>
          <small class="text-light-body d-block mb-3">${style.subtitle}</small>
          <p class="text-light-body small mb-3">${style.desc}</p>
          
          <div class="mb-3">
            <h6 class="small fw-bold text-success mb-2"><i class="fa-solid fa-circle-check me-1"></i> Key Advantages:</h6>
            <ul class="list-unstyled small text-light-body ps-2 mb-0">
              ${style.pros.map(p => `<li class="mb-1"><i class="fa-solid fa-angle-right text-success me-1"></i> ${p}</li>`).join('')}
            </ul>
          </div>

          <div class="mt-auto pt-3 border-top">
            <small class="text-light-body d-block mb-1"><strong>Iconic Routes:</strong></small>
            <span class="small text-primary fw-semibold"><i class="fa-solid fa-route me-1"></i> ${style.famousRoutes}</span>
          </div>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

// 5.3 Techniques
function renderTechniques() {
  const container = document.getElementById('techniques-accordion');
  if (!container || !window.MOUNTAINEERING_DATA) return;

  let html = '';
  window.MOUNTAINEERING_DATA.techniques.forEach((tech, idx) => {
    const isFirst = idx === 0;
    html += `
      <div class="accordion-item border-0 shadow-sm rounded-4 mb-3 overflow-hidden">
        <h2 class="accordion-header" id="headingTech${idx}">
          <button class="accordion-button ${isFirst ? '' : 'collapsed'} fw-bold text-light-heading p-3 p-md-4" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTech${idx}" aria-expanded="${isFirst}" aria-controls="collapseTech${idx}">
            <div class="d-flex align-items-center gap-3 w-100">
              <span class="tech-icon-badge text-primary bg-primary-subtle rounded-3 p-2 d-flex align-items-center justify-content-center" style="width: 42px; height: 42px;">
                <i class="fa-solid ${tech.icon}"></i>
              </span>
              <div>
                <span class="d-block fs-6 mb-0">${tech.title}</span>
                <small class="text-light-body fw-normal">${tech.category}</small>
              </div>
            </div>
          </button>
        </h2>
        <div id="collapseTech${idx}" class="accordion-collapse collapse ${isFirst ? 'show' : ''}" aria-labelledby="headingTech${idx}" data-bs-parent="#techniques-accordion">
          <div class="accordion-body p-4 pt-2">
            <p class="text-light-body small mb-3">${tech.summary}</p>
            <h6 class="small fw-bold text-primary text-uppercase mb-2"><i class="fa-solid fa-list-check text-primary me-2"></i> Step-by-Step Execution Protocol:</h6>
            <ol class="small text-light-body ps-3 mb-0">
              ${tech.steps.map(s => `<li class="mb-2">${s}</li>`).join('')}
            </ol>
          </div>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

// 5.4 Sheltering
function renderShelters() {
  const container = document.getElementById('sheltering-cards-container');
  if (!container || !window.MOUNTAINEERING_DATA) return;

  let html = '';
  window.MOUNTAINEERING_DATA.shelters.forEach(sh => {
    html += `
      <div class="col-md-6 col-lg-4">
        <div class="card shelter-card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
          <div class="position-relative" style="height: 220px;">
            <img src="${sh.image}" alt="${sh.title}" class="w-100 h-100 object-fit-cover transition-scale">
            <div class="position-absolute top-3 end-3 badge bg-dark bg-opacity-75 text-white px-3 py-2 border border-secondary border-opacity-50">
              <i class="fa-solid ${sh.icon} me-1 text-warning"></i> ${sh.badge}
            </div>
          </div>
          <div class="card-body p-4 d-flex flex-column">
            <h5 class="fw-bold text-light-heading mb-2">${sh.title}</h5>
            <div class="badge bg-secondary-subtle text-primary border border-secondary-subtle py-2 px-3 small mb-3 text-start">
              <i class="fa-solid fa-gauge-high me-1 text-primary"></i> ${sh.rating}
            </div>
            <p class="text-light-body small mb-3">${sh.desc}</p>
            <div class="mt-auto">
              <h6 class="small fw-bold text-primary mb-2">Engineered Specifications:</h6>
              <ul class="list-unstyled small text-light-body ps-1 mb-0">
                ${sh.features.map(f => `<li class="mb-1"><i class="fa-solid fa-check text-primary me-2"></i> ${f}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

// 5.5 Hazards
function renderHazards() {
  const container = document.getElementById('hazards-container');
  if (!container || !window.MOUNTAINEERING_DATA) return;

  let html = '';
  window.MOUNTAINEERING_DATA.hazards.forEach(hz => {
    html += `
      <div class="col-md-6 col-lg-4">
        <div class="card hazard-card h-100 border-0 shadow-sm rounded-4 p-4 border-top border-4 border-${hz.color}">
          ${hz.image ? `<div class="rounded-3 overflow-hidden mb-3 shadow-sm" style="height: 160px;"><img src="${hz.image}" alt="${hz.name}" class="w-100 h-100 object-fit-cover transition-scale"></div>` : ''}
          <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="badge bg-${hz.color}-subtle text-${hz.color} border border-${hz.color}-subtle px-3 py-2">
              <i class="fa-solid ${hz.icon} me-1"></i> ${hz.severity}
            </span>
            <small class="text-light-body fw-semibold">${hz.type}</small>
          </div>
          <h5 class="fw-bold text-light-heading mb-2">${hz.name}</h5>
          <p class="text-light-body small mb-3">${hz.desc}</p>
          <div class="mt-auto p-3 rounded-3 mitigation-box border">
            <strong class="d-block small text-primary mb-1"><i class="fa-solid fa-shield-halved text-success me-1"></i> Mitigation Protocol:</strong>
            <small class="text-light-body">${hz.mitigation}</small>
          </div>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

// 5.6 Success Stories
function renderSuccessStories() {
  const container = document.getElementById('success-stories-container');
  if (!container || !window.MOUNTAINEERING_DATA) return;

  let html = '';
  window.MOUNTAINEERING_DATA.successStories.forEach(story => {
    html += `
      <div class="col-md-6 col-lg-6">
        <div class="card story-card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
          <div class="row g-0 h-100">
            <div class="col-md-5 position-relative" style="min-height: 240px;">
              <img src="${story.image}" alt="${story.title}" class="w-100 h-100 object-fit-cover">
              <span class="position-absolute bottom-3 start-3 badge bg-warning text-dark fw-bold px-3 py-2">
                <i class="fa-solid fa-trophy me-1"></i> ${story.summit}
              </span>
            </div>
            <div class="col-md-7 d-flex flex-column p-4">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1"><i class="fa-solid fa-calendar-check me-1"></i> ${story.duration}</span>
                <small class="text-light-body">${story.teamSize}</small>
              </div>
              <h5 class="fw-bold text-light-heading mb-1">${story.title}</h5>
              <small class="text-light-body d-block mb-3">${story.subtitle}</small>
              <div class="story-quote-box p-3 rounded-3 mb-3 fst-italic small text-light-body">
                "${story.quote}"
                <div class="text-end fw-bold text-primary not-italic mt-1">— ${story.client}</div>
              </div>
              <div class="mt-auto">
                <h6 class="small fw-bold text-light-heading mb-1">Expedition Highlights:</h6>
                <ul class="list-unstyled small text-light-body mb-0">
                  ${story.highlights.slice(0, 3).map(h => `<li class="mb-1"><i class="fa-solid fa-mountain-sun text-warning me-1"></i> ${h}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

// 5.7 Latest Innovations
function renderInnovations() {
  const container = document.getElementById('innovations-container');
  if (!container || !window.MOUNTAINEERING_DATA) return;

  let html = '';
  window.MOUNTAINEERING_DATA.innovations.forEach(item => {
    html += `
      <div class="col-md-6 col-lg-4">
        <div class="card innovation-card h-100 border-0 shadow-sm rounded-4 p-4">
          ${item.image ? `<div class="rounded-3 overflow-hidden mb-3 shadow-sm" style="height: 150px;"><img src="${item.image}" alt="${item.title}" class="w-100 h-100 object-fit-cover transition-scale"></div>` : ''}
          <div class="d-flex align-items-center gap-3 mb-3">
            <div class="inno-icon-box text-primary bg-primary-subtle rounded-3 d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
              <i class="fa-solid ${item.icon} fa-lg"></i>
            </div>
            <div>
              <span class="badge bg-primary-subtle text-primary mb-1">${item.category}</span>
              <h6 class="fw-bold text-light-heading mb-0">${item.title}</h6>
            </div>
          </div>
          <p class="text-light-body small mb-3">${item.desc}</p>
          <div class="mt-auto p-2 px-3 rounded-2 bg-primary-subtle text-primary border border-primary-subtle small fw-semibold">
            <i class="fa-solid fa-arrow-trend-up me-1"></i> Field Impact: ${item.impact}
          </div>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

// 5.8 General Guidelines
function renderGuidelines() {
  const rulesContainer = document.getElementById('golden-rules-container');
  if (rulesContainer && window.MOUNTAINEERING_DATA) {
    let html = '';
    window.MOUNTAINEERING_DATA.guidelines.goldenRules.forEach((rule, idx) => {
      html += `
        <div class="col-md-6 col-lg-4">
          <div class="card h-100 border-0 shadow-sm rounded-4 p-4 golden-rule-card">
            <div class="d-flex align-items-center gap-3 mb-2">
              <span class="badge bg-primary text-white rounded-circle fs-6" style="width: 32px; height: 32px; line-height: 24px;">0${idx + 1}</span>
              <h6 class="fw-bold text-light-heading mb-0">${rule.title}</h6>
            </div>
            <p class="text-light-body small mb-0">${rule.detail}</p>
          </div>
        </div>
      `;
    });
    rulesContainer.innerHTML = html;
  }
}

// 5.9 Expeditions Catalog
function renderExpeditionsCatalog() {
  const container = document.getElementById('expeditions-catalog-container');
  if (!container || !window.MOUNTAINEERING_DATA) return;

  let html = '';
  window.MOUNTAINEERING_DATA.expeditions.forEach(exp => {
    html += `
      <div class="col-md-6 col-lg-4">
        <div class="card expedition-card h-100 border-0 shadow-sm rounded-4 overflow-hidden d-flex flex-column">
          <div class="position-relative" style="height: 230px;">
            <img src="${exp.image}" alt="${exp.name}" class="w-100 h-100 object-fit-cover transition-scale">
            <span class="position-absolute top-3 end-3 badge bg-dark bg-opacity-75 text-warning border border-warning-subtle px-3 py-2 fw-bold">
              <i class="fa-solid fa-mountain me-1"></i> ${exp.altitude}
            </span>
            <span class="position-absolute bottom-3 start-3 badge bg-primary px-3 py-1">
              ${exp.region}
            </span>
          </div>
          <div class="card-body p-4 d-flex flex-column">
            <h5 class="fw-bold text-light-heading mb-1">${exp.name}</h5>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <small class="text-light-body"><i class="fa-solid fa-clock me-1"></i> ${exp.duration}</small>
              <span class="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle">${exp.difficulty}</span>
            </div>
            <p class="text-light-body small mb-3">${exp.description.substring(0, 115)}...</p>
            <div class="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
              <div>
                <small class="text-light-body d-block">Starting from</small>
                <h5 class="fw-bold text-primary mb-0">$${exp.basePrice.toLocaleString()}</h5>
              </div>
              <button class="btn btn-primary rounded-pill px-3 py-2 btn-sm fw-semibold" onclick="selectExpeditionForBooking('${exp.id}')">
                <i class="fa-solid fa-calendar-plus me-1"></i> Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

// 5.10 Gallery Grid
function renderGalleryGrid(category = 'all') {
  const container = document.getElementById('gallery-items-container');
  if (!container || !window.MOUNTAINEERING_DATA) return;

  const items = category === 'all' 
    ? window.MOUNTAINEERING_DATA.gallery 
    : window.MOUNTAINEERING_DATA.gallery.filter(g => g.category === category);

  let html = '';
  items.forEach((item, idx) => {
    html += `
      <div class="col-sm-6 col-lg-4 col-xl-3 gallery-item-wrap mb-4">
        <div class="gallery-card position-relative rounded-4 overflow-hidden shadow" onclick="openLightbox(${idx}, '${category}')" role="button" tabindex="0" aria-label="View photo of ${item.title}">
          <div class="gallery-image-box">
            <img src="${item.src}" alt="${item.title}" class="gallery-img w-100 object-fit-cover" loading="lazy">
          </div>
          <div class="gallery-top-meta p-3 d-flex justify-content-between align-items-center position-absolute top-0 start-0 w-100">
            <span class="gallery-badge-pill">
              <i class="fa-solid fa-mountain text-primary me-1"></i>${item.altitude}
            </span>
            <span class="gallery-zoom-circle">
              <i class="fa-solid fa-expand"></i>
            </span>
          </div>
          <div class="gallery-overlay p-3 d-flex flex-column justify-content-end">
            <h6 class="gallery-title text-white fw-bold mb-1">${item.title}</h6>
            <div class="d-flex align-items-center justify-content-between">
              <small class="gallery-location text-white-70">
                <i class="fa-solid fa-location-dot text-primary me-1"></i>${item.location}
              </small>
              <small class="gallery-action-hint text-primary fw-semibold">
                View HD <i class="fa-solid fa-arrow-up-right-from-square ms-1 fa-xs"></i>
              </small>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

// 5.11 Video Showcase
function renderVideoShowcase() {
  const container = document.getElementById('videos-showcase-container');
  if (!container || !window.MOUNTAINEERING_DATA) return;

  initVideosData();

  let html = '';
  window.MOUNTAINEERING_DATA.videos.forEach((vid) => {
    const ytId = _extractYouTubeId(vid.embedUrl);
    const thumbSrc = vid.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80');

    html += `
      <div class="col-md-6 col-lg-4 mb-3">
        <div class="card video-card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative" onclick="playVideoModal('${vid.embedUrl}', '${encodeURIComponent(vid.title)}')" role="button" tabindex="0">
          <div class="position-relative" style="height: 210px;">
            <img src="${thumbSrc}" alt="${vid.title}" class="w-100 h-100 object-fit-cover" loading="lazy">
            <div class="video-play-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
              <div class="play-btn-circle rounded-circle shadow-lg d-flex align-items-center justify-content-center">
                <i class="fa-solid fa-play text-white ms-1"></i>
              </div>
            </div>
            <span class="badge bg-dark bg-opacity-75 position-absolute bottom-0 end-0 m-2 px-2 py-1 small"><i class="fa-regular fa-clock me-1"></i>${vid.duration || 'Video'}</span>
            <span class="badge bg-danger position-absolute bottom-0 start-0 m-2 px-2 py-1 small">${vid.category || 'Expedition'}</span>
          </div>
          <div class="card-body p-3 d-flex flex-column justify-content-between">
            <div>
              <h6 class="fw-bold text-light-heading mb-1">${vid.title}</h6>
              <p class="text-light-body small mb-2">${vid.summary || ''}</p>
            </div>
            <div class="d-flex align-items-center justify-content-between pt-2 border-top border-secondary border-opacity-25 mt-2">
              <small class="text-primary fw-semibold"><i class="fa-solid fa-circle-play me-1"></i> Watch Video</small>
              <small class="text-white-50"><i class="fa-solid fa-film me-1"></i> Documentary</small>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

/**
 * Clean up any stale localStorage override so videos in data.js are always directly used.
 */
function initVideosData() {
  try {
    localStorage.removeItem('alpine_custom_videos');
  } catch (e) {}
}
window.initVideosData = initVideosData;

/**
 * Extract a YouTube video ID from any common YouTube URL format.
 * Returns null if not a YouTube URL.
 */
function _extractYouTubeId(url) {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/,
    /youtube\.com\/v\/([A-Za-z0-9_-]{11})/
  ];
  for (const pattern of patterns) {
    const m = url.match(pattern);
    if (m) return m[1];
  }
  return null;
}
window._extractYouTubeId = _extractYouTubeId;

/* ============================================================
   6. INTERACTIVE GEAR CHECKLIST WITH PROGRESS BAR
   ============================================================ */
function initChecklistTracker() {
  const container = document.getElementById('gear-checklist-container');
  const progressText = document.getElementById('checklist-progress-text');
  const progressBar = document.getElementById('checklist-progress-bar');

  if (!container || !window.MOUNTAINEERING_DATA) return;

  const list = window.MOUNTAINEERING_DATA.guidelines.checklist;
  let html = '';

  list.forEach(item => {
    html += `
      <div class="col-md-6 col-lg-4 mb-2">
        <div class="p-3 checklist-item-box rounded-3 shadow-sm border d-flex align-items-center gap-3">
          <input class="form-check-input gear-checklist-item" type="checkbox" id="${item.id}" onchange="updateChecklistProgress()">
          <label class="form-check-label small fw-semibold text-light-heading mb-0 cursor-pointer" for="${item.id}">
            ${item.item}
          </label>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;

  updateChecklistProgress();
}

function updateChecklistProgress() {
  const checkboxes = document.querySelectorAll('.gear-checklist-item');
  const checked = document.querySelectorAll('.gear-checklist-item:checked');
  const progressText = document.getElementById('checklist-progress-text');
  const progressBar = document.getElementById('checklist-progress-bar');

  const total = checkboxes.length;
  const current = checked.length;
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;

  if (progressText) {
    progressText.textContent = `${current} / ${total} Items Verified (${percent}%)`;
  }
  if (progressBar) {
    progressBar.style.width = `${percent}%`;
    progressBar.setAttribute('aria-valuenow', percent);
    if (percent === 100) {
      progressBar.classList.remove('bg-primary');
      progressBar.classList.add('bg-success');
    } else {
      progressBar.classList.remove('bg-success');
      progressBar.classList.add('bg-primary');
    }
  }
}
window.updateChecklistProgress = updateChecklistProgress;

/* ============================================================
   7. RECORDS SEARCH & CATEGORY FILTERING
   ============================================================ */
let activeRecordsCategory = 'all';

function initRecordsFilter() {
  const searchInput = document.getElementById('records-search-input');
  const filterBtns = document.querySelectorAll('.records-filter-btn');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderRecords(searchInput.value.toLowerCase().trim(), activeRecordsCategory);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeRecordsCategory = btn.getAttribute('data-category');
      const searchVal = searchInput ? searchInput.value.toLowerCase().trim() : '';
      renderRecords(searchVal, activeRecordsCategory);
    });
  });

  renderRecords('', 'all');
}

function renderRecords(query = '', category = 'all') {
  const container = document.getElementById('records-table-body');
  if (!container || !window.MOUNTAINEERING_DATA) return;

  const records = window.MOUNTAINEERING_DATA.records.filter(r => {
    const matchesCategory = category === 'all' || r.category.toLowerCase().includes(category.toLowerCase());
    const matchesQuery = !query || 
      r.record.toLowerCase().includes(query) || 
      r.holder.toLowerCase().includes(query) || 
      r.location.toLowerCase().includes(query) || 
      r.details.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  if (records.length === 0) {
    container.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">No records found matching "${query}".</td></tr>`;
    return;
  }

  let html = '';
  records.forEach((r, idx) => {
    html += `
      <tr>
        <td class="fw-bold text-light-heading">
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle rounded-pill">#${idx + 1}</span>
            <span>${r.record}</span>
          </div>
        </td>
        <td class="text-primary fw-semibold">${r.holder}</td>
        <td><span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">${r.achievement}</span></td>
        <td class="text-light-body small"><i class="fa-solid fa-location-dot me-1 text-danger"></i> ${r.location} (${r.year})</td>
        <td class="small text-light-body">${r.details}</td>
      </tr>
    `;
  });
  container.innerHTML = html;
}

/* ============================================================
   8. GALLERY LIGHTBOX & VIDEO MODALS
   ============================================================ */
let activeLightboxCategory = 'all';

function initGalleryLightbox() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeLightboxCategory = btn.getAttribute('data-filter');
      renderGalleryGrid(activeLightboxCategory);
    });
  });
}

function openLightbox(index, category) {
  const items = category === 'all' 
    ? window.MOUNTAINEERING_DATA.gallery 
    : window.MOUNTAINEERING_DATA.gallery.filter(g => g.category === category);

  const item = items[index];
  if (!item) return;

  const content = document.getElementById('lightbox-content');
  if (content) {
    content.innerHTML = `
      <div class="text-center">
        <img src="${item.src}" alt="${item.title}" class="img-fluid rounded-3 mb-3 shadow" style="max-height: 70vh; object-fit: contain;">
        <h5 class="text-white fw-bold mb-1">${item.title}</h5>
        <p class="text-white-50 small mb-2"><i class="fa-solid fa-location-dot text-danger me-1"></i> ${item.location} • Elevation: ${item.altitude}</p>
        <p class="text-white-70 small mb-0">${item.caption}</p>
      </div>
    `;
  }

  const modalEl = document.getElementById('galleryLightboxModal');
  if (modalEl && window.bootstrap) {
    new bootstrap.Modal(modalEl).show();
  }
}
window.openLightbox = openLightbox;

function initVideoPlayerModal() {
  const modalEl = document.getElementById('videoPlayerModal');
  if (modalEl) {
    modalEl.addEventListener('hidden.bs.modal', () => {
      const iframe = document.getElementById('video-modal-iframe');
      if (iframe) iframe.src = '';
    });
  }
}

function playVideoModal(url, encodedTitle) {
  const iframe = document.getElementById('video-modal-iframe');
  const titleEl = document.getElementById('video-modal-title');

  let embedUrl = url;
  const ytId = typeof _extractYouTubeId === 'function' ? _extractYouTubeId(url) : null;
  if (ytId) {
    embedUrl = `https://www.youtube-nocookie.com/embed/${ytId}`;
  }

  if (iframe) {
    iframe.src = `${embedUrl}?autoplay=1`;
  }
  if (titleEl) {
    titleEl.textContent = decodeURIComponent(encodedTitle);
  }

  const modalEl = document.getElementById('videoPlayerModal');
  if (modalEl && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}
window.playVideoModal = playVideoModal;

/* ============================================================
   9. NOTIFICATION TOAST HELPER
   ============================================================ */
function showToast(message) {
  const toastEl = document.getElementById('alpineLiveToast');
  const toastBody = document.getElementById('alpineToastBody');
  if (toastEl && toastBody && window.bootstrap) {
    toastBody.textContent = message;
    const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
    toast.show();
  }
}
window.showToast = showToast;
