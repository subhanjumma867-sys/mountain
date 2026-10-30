/**
 * Alpine Ascents - Interactive Expedition Booking Engine
 * Real-time price calculation, multi-step validation, and official Expedition Pass generation
 */

let currentSelectedExpeditionId = 'everest';

// Initialize Booking Component
function initBookingEngine() {
  populateExpeditionSelector();
  bindBookingEventListeners();
  calculateBookingTotal();
  updateBookingAuthUI();
}

// Populate Expedition select dropdown
function populateExpeditionSelector() {
  const select = document.getElementById('booking-expedition-select');
  if (!select || !window.MOUNTAINEERING_DATA) return;

  let optionsHtml = '';
  window.MOUNTAINEERING_DATA.expeditions.forEach(exp => {
    optionsHtml += `<option value="${exp.id}" ${exp.id === currentSelectedExpeditionId ? 'selected' : ''}>${exp.name} (${exp.altitude}) - from $${exp.basePrice.toLocaleString()}</option>`;
  });
  select.innerHTML = optionsHtml;

  // Update details card for chosen expedition
  updateSelectedExpeditionInfo(currentSelectedExpeditionId);
}

// Select expedition from external cards (e.g. "Book This Expedition" button on catalogue cards)
function selectExpeditionForBooking(expId) {
  currentSelectedExpeditionId = expId;
  const select = document.getElementById('booking-expedition-select');
  if (select) {
    select.value = expId;
  }
  updateSelectedExpeditionInfo(expId);
  calculateBookingTotal();

  // Switch to booking view cleanly in SPA
  if (typeof switchSpaView === 'function') {
    switchSpaView('view-booking');
  }
}

// Update expedition preview info box
function updateSelectedExpeditionInfo(expId) {
  const exp = window.MOUNTAINEERING_DATA.expeditions.find(e => e.id === expId);
  if (!exp) return;

  const infoBox = document.getElementById('selected-expedition-preview');
  if (infoBox) {
    infoBox.innerHTML = `
      <div class="card border-0 shadow-sm bg-dark text-white rounded-4 overflow-hidden">
        <div class="position-relative" style="height: 180px;">
          <img src="${exp.image}" alt="${exp.name}" class="w-100 h-100 object-fit-cover">
          <div class="position-absolute top-0 start-0 w-100 h-100" style="background: linear-gradient(to top, rgba(11,19,32,0.95), transparent 60%);"></div>
          <span class="position-absolute top-3 end-3 badge bg-warning text-dark fw-bold px-3 py-2">
            <i class="fa-solid fa-mountain me-1"></i> ${exp.altitude}
          </span>
          <div class="position-absolute bottom-3 start-3 text-start p-3">
            <h5 class="fw-bold mb-0 text-white">${exp.name}</h5>
            <small class="text-white-50"><i class="fa-solid fa-map-location-dot me-1"></i> ${exp.region}</small>
          </div>
        </div>
        <div class="card-body p-3 p-md-4">
          <div class="row g-2 text-center mb-3">
            <div class="col-4">
              <div class="p-2 rounded bg-secondary-subtle bg-opacity-25">
                <small class="text-white-50 d-block">Duration</small>
                <strong class="text-white small">${exp.duration}</strong>
              </div>
            </div>
            <div class="col-4">
              <div class="p-2 rounded bg-secondary-subtle bg-opacity-25">
                <small class="text-white-50 d-block">Difficulty</small>
                <strong class="text-warning small">${exp.difficulty}</strong>
              </div>
            </div>
            <div class="col-4">
              <div class="p-2 rounded bg-secondary-subtle bg-opacity-25">
                <small class="text-white-50 d-block">Season</small>
                <strong class="text-white small">${exp.season.split(' ')[0]}</strong>
              </div>
            </div>
          </div>
          <p class="small text-white-70 mb-3">${exp.description}</p>
          <div class="alert alert-dark border border-secondary py-2 px-3 small mb-0 text-white-50">
            <i class="fa-solid fa-circle-exclamation text-warning me-1"></i>
            <strong>Prerequisite:</strong> ${exp.prerequisite}
          </div>
        </div>
      </div>
    `;
  }
}

// Bind live price change events
function bindBookingEventListeners() {
  const select = document.getElementById('booking-expedition-select');
  if (select) {
    select.addEventListener('change', (e) => {
      currentSelectedExpeditionId = e.target.value;
      updateSelectedExpeditionInfo(currentSelectedExpeditionId);
      calculateBookingTotal();
    });
  }

  const climbersInput = document.getElementById('booking-climbers-count');
  if (climbersInput) {
    climbersInput.addEventListener('input', calculateBookingTotal);
    climbersInput.addEventListener('change', calculateBookingTotal);
  }

  const guideRadios = document.querySelectorAll('input[name="guide-ratio-tier"]');
  guideRadios.forEach(radio => {
    radio.addEventListener('change', calculateBookingTotal);
  });

  const gearCheckboxes = document.querySelectorAll('.gear-addon-checkbox');
  gearCheckboxes.forEach(cb => {
    cb.addEventListener('change', calculateBookingTotal);
  });

  // Handle Form Submission
  const bookingForm = document.getElementById('expedition-booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', handleBookingSubmit);
  }
}

// Calculate Grand Total Price
function calculateBookingTotal() {
  const exp = window.MOUNTAINEERING_DATA.expeditions.find(e => e.id === currentSelectedExpeditionId);
  if (!exp) return;

  const climbersInput = document.getElementById('booking-climbers-count');
  const climberCount = climbersInput ? Math.max(1, parseInt(climbersInput.value) || 1) : 1;

  // Base price per climber
  const baseCost = exp.basePrice * climberCount;

  // Guide Tier modifier
  const guideRadio = document.querySelector('input[name="guide-ratio-tier"]:checked');
  let guideTierCostPerClimber = 0;
  let guideTierName = 'Standard Team (2:1 Ratio)';
  if (guideRadio) {
    guideTierCostPerClimber = parseInt(guideRadio.value) || 0;
    guideTierName = guideRadio.getAttribute('data-name') || guideTierName;
  }
  const totalGuideCost = guideTierCostPerClimber * climberCount;

  // Gear Add-ons
  let gearTotal = 0;
  const gearItems = [];
  const gearCheckboxes = document.querySelectorAll('.gear-addon-checkbox:checked');
  gearCheckboxes.forEach(cb => {
    const cost = parseInt(cb.value) || 0;
    const name = cb.getAttribute('data-name');
    gearTotal += (cost * climberCount);
    gearItems.push({ name: name, cost: cost });
  });

  // Park & Environmental Permit Fee (approx 8% of base)
  const permitFee = Math.round(baseCost * 0.08);

  // Grand Total
  const grandTotal = baseCost + totalGuideCost + gearTotal + permitFee;

  // Update UI Elements
  const elBase = document.getElementById('calc-base-price');
  const elGuide = document.getElementById('calc-guide-price');
  const elGear = document.getElementById('calc-gear-price');
  const elPermit = document.getElementById('calc-permit-price');
  const elGrand = document.getElementById('calc-grand-total');

  if (elBase) elBase.textContent = `$${baseCost.toLocaleString()}`;
  if (elGuide) elGuide.textContent = totalGuideCost > 0 ? `+$${totalGuideCost.toLocaleString()}` : 'Included';
  if (elGear) elGear.textContent = gearTotal > 0 ? `+$${gearTotal.toLocaleString()}` : '$0';
  if (elPermit) elPermit.textContent = `$${permitFee.toLocaleString()}`;
  if (elGrand) elGrand.textContent = `$${grandTotal.toLocaleString()}`;

  return {
    expedition: exp,
    climbers: climberCount,
    baseCost,
    guideTierName,
    totalGuideCost,
    gearTotal,
    gearItems,
    permitFee,
    grandTotal
  };
}

// Handle Booking Form Submit
function handleBookingSubmit(e) {
  e.preventDefault();

  const activeUser = (typeof currentUser !== 'undefined' && currentUser) || window.currentUser;

  // Authentication Guard: User MUST be logged in to book a climb
  if (!activeUser) {
    if (typeof showToast === 'function') {
      showToast("⚠️ Authentication Required: You must log in or register before booking an expedition.");
    }
    const authModalEl = document.getElementById('authModal');
    if (authModalEl && window.bootstrap) {
      bootstrap.Modal.getOrCreateInstance(authModalEl).show();
    }
    return;
  }

  const form = document.getElementById('expedition-booking-form');
  if (!form) return;

  // Validate form
  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
  }

  const calculation = calculateBookingTotal();
  const climberName = document.getElementById('booking-full-name').value.trim();
  const climberEmail = document.getElementById('booking-email').value.trim();
  const climberPhone = document.getElementById('booking-phone').value.trim();
  const climberExp = document.getElementById('booking-experience-level').value;
  const emergencyContact = document.getElementById('booking-emergency-contact').value.trim();
  const departureDate = document.getElementById('booking-departure-date').value || 'May 2027 (Peak Window)';

  // Generate Booking Reference ID
  const refCode = 'AA-' + Math.floor(100000 + Math.random() * 900000);
  const bookingDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const bookingRecord = {
    refCode,
    date: bookingDate,
    userEmail: activeUser.email,
    userName: activeUser.name,
    climberName: climberName || activeUser.name,
    climberEmail: climberEmail || activeUser.email,
    climberPhone,
    climberExp,
    emergencyContact,
    departureDate,
    expeditionName: calculation.expedition.name,
    altitude: calculation.expedition.altitude,
    climbers: calculation.climbers,
    guideTier: calculation.guideTierName,
    grandTotal: calculation.grandTotal
  };

  // Save to LocalStorage under user-associated bookings
  try {
    const existing = JSON.parse(localStorage.getItem('alpine_user_bookings') || '[]');
    existing.unshift(bookingRecord);
    localStorage.setItem('alpine_user_bookings', JSON.stringify(existing));
  } catch (err) {
    console.warn("Storage warning:", err);
  }

  // Populate Expedition Pass Modal
  populateExpeditionPassModal(bookingRecord);

  // Trigger Modal
  const modalEl = document.getElementById('expeditionPassModal');
  if (modalEl && window.bootstrap) {
    const passModal = bootstrap.Modal.getOrCreateInstance(modalEl);
    passModal.show();
  }

  // Success Notification
  if (typeof showToast === 'function') {
    showToast(`Summit Reservation Confirmed! Added to ${activeUser.name}'s Alpinist Profile.`);
  }

  // Reset Form
  form.reset();
  form.classList.remove('was-validated');
  updateBookingAuthUI();
}

// Update Booking Studio Auth Banner & State
function updateBookingAuthUI() {
  const banner = document.getElementById('booking-auth-banner');
  const nameInput = document.getElementById('booking-full-name');
  const emailInput = document.getElementById('booking-email');
  const submitBtn = document.querySelector('#expedition-booking-form button[type="submit"]');
  const activeUser = (typeof currentUser !== 'undefined' && currentUser) || window.currentUser;

  if (activeUser) {
    if (banner) {
      banner.innerHTML = `
        <div class="alert alert-success border-success border-opacity-50 rounded-4 d-flex align-items-center justify-content-between gap-3 mb-0 shadow-sm" style="background: rgba(16, 185, 129, 0.12);">
          <div class="d-flex align-items-center gap-3">
            <img src="${activeUser.avatar}" alt="${activeUser.name}" class="rounded-circle border border-success" style="width: 40px; height: 40px; object-fit: cover;">
            <div>
              <strong class="text-success d-block"><i class="fa-solid fa-circle-check me-1"></i> Verified Alpinist: ${activeUser.name}</strong>
              <small class="text-white-70">Authenticated session active. Booked climbs will appear on your Alpinist Profile.</small>
            </div>
          </div>
          <button type="button" class="btn btn-outline-success btn-sm rounded-pill px-3 py-1 fw-semibold text-nowrap" onclick="showUserProfileModal()">
            <i class="fa-solid fa-id-card me-1"></i> View Profile
          </button>
        </div>
      `;
    }
    if (nameInput && !nameInput.value) {
      nameInput.value = activeUser.name;
    }
    if (emailInput && !emailInput.value) {
      emailInput.value = activeUser.email;
    }
    if (submitBtn) {
      submitBtn.innerHTML = `<i class="fa-solid fa-passport me-2"></i> Confirm Reservation & Generate Expedition Pass`;
    }
  } else {
    if (banner) {
      banner.innerHTML = `
        <div class="alert alert-warning border-warning border-opacity-50 rounded-4 d-flex align-items-center justify-content-between gap-3 mb-0 shadow-sm" style="background: rgba(245, 158, 11, 0.12);">
          <div class="d-flex align-items-center gap-3">
            <span class="p-2 rounded-circle bg-warning bg-opacity-25 text-warning fs-5">
              <i class="fa-solid fa-lock"></i>
            </span>
            <div>
              <strong class="text-warning d-block">Authentication Required to Book a Climb</strong>
              <small class="text-white-70">You must be logged in to reserve an expedition and receive your official clearance permit.</small>
            </div>
          </div>
          <button type="button" class="btn btn-warning btn-sm rounded-pill px-3 py-1 fw-bold text-dark text-nowrap" data-bs-toggle="modal" data-bs-target="#authModal">
            <i class="fa-solid fa-arrow-right-to-bracket me-1"></i> Log In to Book
          </button>
        </div>
      `;
    }
    if (submitBtn) {
      submitBtn.innerHTML = `<i class="fa-solid fa-lock me-2"></i> Log In to Confirm Reservation`;
    }
  }
}
window.updateBookingAuthUI = updateBookingAuthUI;

// Populate the printable Expedition Pass Modal
function populateExpeditionPassModal(booking) {
  const container = document.getElementById('expedition-pass-content');
  if (!container) return;

  container.innerHTML = `
    <div class="expedition-ticket p-4 rounded-4 shadow border border-primary-subtle position-relative overflow-hidden bg-white text-dark">
      <div class="ticket-watermark position-absolute opacity-10 end-0 top-0 p-4">
        <i class="fa-solid fa-mountain fa-10x"></i>
      </div>

      <div class="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
        <div class="d-flex align-items-center gap-3">
          <img src="assets/images/logo.jpg" alt="Alpine Ascents" class="rounded-circle border" style="width: 54px; height: 54px; object-fit: cover;">
          <div>
            <h5 class="fw-bold mb-0 text-primary">ALPINE ASCENTS INTERNATIONAL</h5>
            <small class="text-uppercase tracking-wider text-muted fw-semibold">Official Expedition Pass & Permit Voucher</small>
          </div>
        </div>
        <div class="text-end">
          <span class="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 fw-bold">CONFIRMED & CLEARED</span>
          <div class="small text-muted mt-1">Ref: <strong>#${booking.refCode}</strong></div>
        </div>
      </div>

      <div class="row g-3 mb-4">
        <div class="col-md-7">
          <div class="p-3 bg-light rounded-3">
            <small class="text-muted d-block">Selected Expedition</small>
            <h5 class="fw-bold text-dark mb-1">${booking.expeditionName}</h5>
            <div class="d-flex gap-3 small text-muted">
              <span><i class="fa-solid fa-mountain text-primary me-1"></i> Elevation: <strong>${booking.altitude}</strong></span>
              <span><i class="fa-solid fa-calendar-days text-primary me-1"></i> Target Window: <strong>${booking.departureDate}</strong></span>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <div class="p-3 bg-light rounded-3 text-md-end">
            <small class="text-muted d-block">Grand Total Cleared</small>
            <h4 class="fw-bold text-success mb-0">$${booking.grandTotal.toLocaleString()}</h4>
            <small class="text-muted">${booking.climbers} Climber(s) • ${booking.guideTier.split('(')[0]}</small>
          </div>
        </div>
      </div>

      <div class="row g-3 mb-4">
        <div class="col-sm-6">
          <h6 class="fw-bold text-secondary small text-uppercase mb-2">Lead Climber Information</h6>
          <p class="mb-1"><strong>Name:</strong> ${booking.climberName}</p>
          <p class="mb-1"><strong>Email:</strong> ${booking.climberEmail}</p>
          <p class="mb-1"><strong>Phone:</strong> ${booking.climberPhone}</p>
          <p class="mb-0"><strong>Experience Level:</strong> ${booking.climberExp.toUpperCase()}</p>
        </div>
        <div class="col-sm-6">
          <h6 class="fw-bold text-secondary small text-uppercase mb-2">Operational Protocol</h6>
          <p class="mb-1"><strong>Emergency Contact:</strong> ${booking.emergencyContact}</p>
          <p class="mb-1"><strong>Rendezvous Point:</strong> Alpine Basecamp Command Desk</p>
          <p class="mb-1"><strong>Medical Screening:</strong> Day 1 Mandatory Review</p>
          <p class="mb-0 text-success"><i class="fa-solid fa-check-double me-1"></i> Gear & Oxygen Allocation Reserved</p>
        </div>
      </div>

      <div class="border-top pt-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div class="d-flex align-items-center gap-2">
          <div class="qr-code-placeholder bg-dark text-white p-2 rounded text-center" style="width: 50px; height: 50px;">
            <i class="fa-solid fa-qrcode fa-2x"></i>
          </div>
          <small class="text-muted">Scan QR at Basecamp Check-in.<br>Issued: ${booking.date}</small>
        </div>
        <div class="d-print-none d-flex gap-2">
          <button class="btn btn-outline-secondary btn-sm" onclick="window.print()">
            <i class="fa-solid fa-print me-1"></i> Print Pass
          </button>
          <button class="btn btn-primary btn-sm" data-bs-dismiss="modal">
            <i class="fa-solid fa-check me-1"></i> Done
          </button>
        </div>
      </div>
    </div>
  `;
}

// Expose functions globally
window.initBookingEngine = initBookingEngine;
window.selectExpeditionForBooking = selectExpeditionForBooking;
window.calculateBookingTotal = calculateBookingTotal;
window.handleBookingSubmit = handleBookingSubmit;
