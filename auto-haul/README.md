# Auto Haul Sales & Rentals — Website

## 📁 Project Structure

```
auto-haul-website/
├── index.html          ← Main HTML page
├── css/
│   └── style.css       ← All styles (layout, components, animations)
├── js/
│   ├── main.js         ← Cursor, scroll-reveal, filter tabs, nav highlight
│   └── booking.js      ← EmailJS booking form handler + toast notifications
└── README.md           ← This file
```

---

## 🔧 EmailJS Setup (Required for Booking Form)

The booking form sends reservation details to your email via **EmailJS** — no backend required.

### Step 1 — Create a Free EmailJS Account
Go to → https://www.emailjs.com and sign up.

### Step 2 — Add an Email Service
- Dashboard → **Email Services** → Add New Service
- Connect Gmail, Outlook, or any email provider
- Copy the **Service ID** (e.g. `service_abc123`)

### Step 3 — Create an Email Template
- Dashboard → **Email Templates** → Create New Template
- Use these **template variables** in your template body:

| Variable            | Description                        |
|---------------------|------------------------------------|
| `{{from_name}}`     | Client's full name                 |
| `{{from_email}}`    | Client's email address             |
| `{{phone}}`         | Phone number                       |
| `{{pickup_location}}`| Street address / pickup location  |
| `{{city}}`          | City                               |
| `{{state_province}}`| State or Province                  |
| `{{country}}`       | United States or Canada            |
| `{{vehicle_type}}`  | Selected vehicle category          |
| `{{specific_car}}`  | Specific car model (if provided)   |
| `{{pickup_date}}`   | Rental start date                  |
| `{{return_date}}`   | Rental end date                    |
| `{{payment_method}}`| Payment method chosen              |
| `{{notes}}`         | Additional notes from client       |

- Copy the **Template ID** (e.g. `template_xyz789`)

### Step 4 — Get Your Public Key
- Dashboard → **Account** → **API Keys**
- Copy your **Public Key**

### Step 5 — Paste IDs into booking.js
Open `js/booking.js` and replace the three placeholders at the top:

```js
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // ← replace
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // ← replace
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ← replace
```

---

## ✅ Features

- **Hero section** with animated stats and CTA buttons
- **Service Info** — full company description, requirements, vehicle collection policy, USA & Canada coverage
- **Fleet Section** — 15 vehicles with filter tabs (All / Sedan / SUV / Luxury / Sports / Truck / Electric / Van)
- **Why Us** — 8 feature cards
- **Payment Section** — Cash App, Apple Gift Card, Venmo, PayPal, Apple Pay
- **Booking Form** — full reservation form with:
  - Personal details (name, email, phone)
  - 📍 Client location (address, city, state/province, country)
  - Vehicle selection + dates
  - Payment method selector
  - Notes field
- **EmailJS integration** — form data emailed on submission
- **Toast notification** — gold popup confirms booking sent within 24 hours
- **Testimonials** section
- **Footer** with service links and social icons
- Custom gold cursor, scroll-reveal animations, ticker banner

---

## 🌐 Deployment

Simply upload all files to any static host:
- **GitHub Pages** — free
- **Netlify** — free, drag-and-drop folder
- **Vercel** — free
- **cPanel / FTP** — upload folder to `public_html`

No server or database needed — EmailJS handles all form submissions.

---

© 2025 Auto Haul Sales & Rentals
