# HealthCare Portal

A modern, responsive healthcare portal built using **HTML**, **CSS**, and **JavaScript**. This project allows users to view services, doctors, and book appointments online. It features form validation, email notifications via EmailJS, smooth animations, and a professional layout.

---

## Features

- **Responsive Design:** Works on desktop and mobile.
- **Animated UI:** Smooth transitions and hover effects for a polished look.
- **Doctors Section:** Profiles with images, ratings, and specialties.
- **Services Section:** Overview of healthcare offerings.
- **Appointment Booking:** Modal form with validation and confirmation page.
- **Email Notifications:** Sends confirmation emails to users using EmailJS.
- **Footer Summary:** Quick links, owner info, and contact details.
- **Smooth Navigation:** Scrolls to sections and closes modals as needed.

---

## File Structure

```
healthcare-portal/
│
├── index.html          # Main page
├── confirmation.html   # Appointment confirmation page
├── css/
│   └── style.css       # All custom styles and animations
├── js/
│   └── script.js       # All interactive logic and form handling
└── images/             # (Optional) Images for hero/doctors
```

---

## How It Works

### HTML

- **index.html:** Contains all main sections (navbar, hero, services, doctors, modal, footer).
- **confirmation.html:** Displays booking details after appointment submission.

### CSS

- **style.css:** Custom styles for layout, colors, animations, and responsive design.
- Animations for fade, slide, scale, and hover effects.

### JavaScript

- **script.js:** Handles all interactivity, validation, modal logic, email sending, navigation, and smooth scrolling.

---

## JavaScript Function Reference

| Function Name            | Purpose                                                                                   |
|------------------------- |------------------------------------------------------------------------------------------|
| `openAppointmentForm()`  | Opens the appointment booking modal.                                                     |
| `closeAppointmentForm()` | Closes the appointment modal.                                                            |
| `validateInput()`        | Validates form fields using regex patterns.                                              |
| `showError()`            | Displays error messages next to invalid form fields.                                     |
| `removeError()`          | Removes error messages and resets field styling.                                         |
| `sendConfirmationEmail()`| Sends a confirmation email to the user via EmailJS with appointment details.             |
| `scrollToAppointment()`  | Opens the appointment modal and scrolls to it smoothly.                                  |
| `scrollToHome()`         | Scrolls smoothly to the top/home section when the logo is clicked.                       |
| `DOMContentLoaded` event | Attaches click handler to logo for smooth scroll and closes modal if open.               |
| `footer-links click`     | Smoothly scrolls to the relevant section when a footer quick link is clicked.            |
| `form submit`            | Validates form, sends email, stores booking, and redirects to confirmation page.         |
| `input event`            | Provides real-time validation feedback as the user types in the form fields.             |
| `window.scroll`          | (Optional) Placeholder for scroll-to-top button logic.                                   |

---

## How to Add This Project to Your GitHub

1. **Create a New Repository:**
   - Go to [GitHub](https://github.com/) and click "New Repository".
   - Name it (e.g., `healthcare-portal`).

2. **Clone the Repository Locally:**
   ```sh
   git clone https://github.com/your-username/healthcare-portal.git
   cd healthcare-portal
   ```

3. **Copy Your Project Files:**
   - Place all your files (`index.html`, `confirmation.html`, `css/`, `js/`, `images/`) into the cloned folder.

4. **Add and Commit:**
   ```sh
   git add .
   git commit -m "Initial commit of HealthCare Portal"
   ```

5. **Push to GitHub:**
   ```sh
   git push origin main
   ```

6. **(Optional) Enable GitHub Pages:**
   - Go to repository settings > Pages > Source: `main` branch, `/root`.
   - Your site will be live at `https://your-username.github.io/healthcare-portal/`.

---

## EmailJS Setup

- Sign up at [EmailJS](https://www.emailjs.com/).
- Create a service and email template.
- Replace the public key, service ID, and template ID in `script.js` with your own.
- Make sure your template variables match those sent from JS (`to_email`, `to_name`, etc.).

---

## Credits

**Owner:** [Your Name]  
**Contact:** info@healthcareportal.com

---

Enjoy your professional healthcare portal!