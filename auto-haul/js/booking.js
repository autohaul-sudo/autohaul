/* ============================================================
   AUTO HAUL SALES & RENTALS — Booking Form + EmailJS
   js/booking.js

   HOW TO SET UP EMAILJS:
   1. Sign up free at https://www.emailjs.com
   2. Add an Email Service (Gmail, Outlook, etc.)
   3. Create an Email Template — use these template variables:
        {{from_name}}       — Full name
        {{from_email}}      — Client email
        {{phone}}           — Phone number
        {{pickup_location}} — Pickup location
        {{city}}            — City
        {{state_province}}  — State / Province
        {{country}}         — Country
        {{vehicle_type}}    — Selected vehicle category
        {{specific_car}}    — Specific car model
        {{pickup_date}}     — Rental start date
        {{return_date}}     — Rental end date
        {{payment_method}}  — Payment method chosen
        {{notes}}           — Additional notes
   4. Replace the three constants below with your real IDs.
   ============================================================ */

const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // ← from Account > API Keys
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // ← from Email Services
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ← from Email Templates

/* ── Init EmailJS once DOM is ready ── */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  const form   = document.getElementById('bookingForm');
  const submit = document.getElementById('formSubmit');
  if (!form || !submit) return;

  form.addEventListener('submit', handleBookingSubmit);
});


/* ── Main submit handler ── */
async function handleBookingSubmit(e) {
  e.preventDefault();

  const form   = e.target;
  const submit = document.getElementById('formSubmit');

  /* --- Collect values --- */
  const firstName     = form.firstName.value.trim();
  const lastName      = form.lastName.value.trim();
  const email         = form.email.value.trim();
  const phone         = form.phone.value.trim();
  const pickupLoc     = form.pickupLocation.value.trim();
  const city          = form.city.value.trim();
  const stateProvince = form.stateProvince.value.trim();
  const country       = form.country.value;
  const vehicleType   = form.vehicleType.value;
  const specificCar   = form.specificCar.value;
  const pickupDate    = form.pickupDate.value;
  const returnDate    = form.returnDate.value;
  const paymentMethod = form.paymentMethod.value;
  const notes         = form.notes.value.trim();

  /* --- Simple validation --- */
  if (!firstName || !lastName || !email || !phone ||
      !pickupLoc || !city || !country || !vehicleType ||
      !pickupDate || !returnDate || !paymentMethod) {
    showToast('error', 'Missing Fields', 'Please fill in all required fields before submitting.');
    return;
  }

  if (new Date(returnDate) <= new Date(pickupDate)) {
    showToast('error', 'Date Error', 'Return date must be after your pick-up date.');
    return;
  }

  /* --- Check EmailJS is loaded --- */
  if (typeof emailjs === 'undefined') {
    showToast('error', 'Service Unavailable', 'Booking service is not loaded. Please refresh and try again.');
    return;
  }

  /* --- Loading state --- */
  setLoading(submit, true);

  const templateParams = {
    from_name:       `${firstName} ${lastName}`,
    from_email:      email,
    phone:           phone,
    pickup_location: pickupLoc,
    city:            city,
    state_province:  stateProvince || 'N/A',
    country:         country,
    vehicle_type:    vehicleType,
    specific_car:    specificCar || 'No preference',
    pickup_date:     formatDate(pickupDate),
    return_date:     formatDate(returnDate),
    payment_method:  paymentMethod,
    notes:           notes || 'None',
  };

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

    /* ✅ Success */
    setLoading(submit, false);
    form.reset();
    showToast(
      'success',
      '✅ Booking Request Sent!',
      `Thank you, ${firstName}! Your booking has been received. You'll get a confirmation email within 24 hours.`
    );

    /* Scroll to top of booking section */
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth', block: 'start' });

  } catch (err) {
    console.error('EmailJS error:', err);
    setLoading(submit, false);
    showToast(
      'error',
      'Submission Failed',
      'There was a problem sending your booking. Please try again or contact us directly.'
    );
  }
}


/* ── Helpers ── */
function setLoading(btn, loading) {
  const spinner  = btn.querySelector('.spinner');
  const btnText  = btn.querySelector('.btn-text');
  btn.disabled = loading;
  btn.classList.toggle('loading', loading);
  if (spinner) spinner.style.display = loading ? 'block' : 'none';
  if (btnText) btnText.textContent   = loading ? 'Sending…' : 'Confirm Booking →';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { weekday:'short', year:'numeric', month:'long', day:'numeric' });
}
