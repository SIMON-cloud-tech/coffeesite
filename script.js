//Toggle menubar for mobile responsiveness
document.getElementById("menu-toggle").addEventListener("click", function () {
  document.getElementById("nav-links").classList.toggle("show");
});

//testimonials slider//
const testimonials = document.querySelectorAll(".testimonial");
let current = 0;

function showNextTestimonial() {
  testimonials[current].classList.remove("active");
  current = (current + 1) % testimonials.length;
  testimonials[current].classList.add("active");
}

setInterval(showNextTestimonial, 5000); // Change every 5 seconds

//menu section//
let cart = [];

function revealCartButton(card) {
  const btn = card.querySelector(".add-btn");
  btn.classList.remove("hidden");
}

function addToCart(event, name, price, image) {
  event.stopPropagation();
  cart.push({ name, price, image });
    showToast(`${name} added to cart`);
  updateCartCount();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.style.display = "block";
  setTimeout(() => toast.style.display = "none", 3000);
}

function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
}

function openCart() {
  const modal = document.getElementById("cart-modal");
  modal.classList.remove("hidden");
  renderCartItems();
}
function renderCartItems() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";
  let total = 0;
    cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h4>${item.name}</h4>
      <p>$${item.price}</p>
      <span class="delete" onclick="removeItem(${index})">✖</span>
    `;
    container.appendChild(div);
  });
    document.getElementById("cart-total").innerText = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCartCount();
  renderCartItems();
}

function checkout() {
  document.getElementById("cart-modal").classList.add("hidden");
    document.getElementById("payment-section").classList.remove("hidden");
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("final-amount").innerText = total;
}
//form validation
  function validateForm() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    const error = document.getElementById('error');

    if (!name || !phone || !message) {
      error.textContent = 'Please fill in all fields.';
      return;
    }

    error.textContent = ''; // Clear error

    // Compose WhatsApp message
    const fullMessage = `Hello, my name is ${name}. My phone number is ${phone}. Here's my message: ${message}`;
    const encodedMessage = encodeURIComponent(fullMessage);

    // Replace with your WhatsApp number (no + or spaces)
    const whatsappNumber = '+254 112585214';

    // Redirect to WhatsApp
    window.location.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  }
