'use strict';

//We're going to use "check" to get the ckeckbox element
const check = document.getElementById("check")

//If darkMode doesn’t exist in the LocalStorage, create it. False by default
if (localStorage.getItem('darkMode') === null) {
  localStorage.setItem('darkMode', "false");
}

//Create a link tag to later link the CSS file we want
const link = document.createElement('link');
link.rel = 'stylesheet';
document.getElementsByTagName('HEAD')[0].appendChild(link);

//Or we can create the tag in the HTML and later reference in our code
//const link=document.getElementsByTagName("link");  

//checkStatus is only called one time in the program, when you reload the page
//It gives the page it's default look, depening on waht darkMode is set to it will load one css or another
checkStatus();

function checkStatus() {
  if (localStorage.getItem('darkMode') === "true") {
    check.checked = true;                           //the checkbox is checked (if you load the page by default it isn’t)
    link.href = "/Frontend/assets/css/style-dark/var-dark.css";                   //since it's true we load the dark theme CSS
  } else {
    check.checked = false;                          //the checkbox is unchecked
    link.href = "/Frontend/assets/css/style/var.css";
  }
}

function changeStatus() {                                //This function gets called every time the checkbox is clicked
  if (localStorage.getItem('darkMode') === "true") {     //if darkMode was active and this function is called it means the user now wants light
    localStorage.setItem('darkMode', "false");      //so we set it to false, to indicate we are in light mode
    link.href = "/Frontend/assets/css/style/var.css";
  } else {
    localStorage.setItem('darkMode', "true");       //same code but adapted for dark theme
    link.href = "/Frontend/assets/css/style-dark/var-dark.css";
  }
}

//Languages Selector Script with local storage

const languageButtons = document.querySelectorAll("#language-selector button");

languageButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedLanguage = this.getAttribute("data-lang");
    const currentUrl = window.location.pathname;
    const currentLanguage = getCurrentLanguage(currentUrl);
    let newUrl;
    if (selectedLanguage !== currentLanguage) {
      newUrl = currentUrl.replace(`/${currentLanguage}/`, `/${selectedLanguage}/`);
      newUrl = newUrl.replace(`-${currentLanguage}`, `-${selectedLanguage}`);
      window.localStorage.setItem("selectedLanguage", selectedLanguage);
      window.location.href = newUrl;
    }
  });
});

function getCurrentLanguage(url) {
  const pattern = /\/([a-z]{2})\//;
  const match = url.match(pattern);
  if (match) {
    return match[1];
  }
  return null;
}

let selectedLanguage = localStorage.getItem("language") || "en";

languageButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const newLanguage = this.getAttribute("data-lang");

    if (selectedLanguage !== newLanguage) {
      let newUrl;
      if (newLanguage === "en") {
        newUrl = currentUrl.replace(/\/bg\//g, "/en/");
        newUrl = newUrl.replace(/-bg/g, "-en");
      } else if (newLanguage === "bg") {
        newUrl = currentUrl.replace(/\/en\//g, "/bg/");
        newUrl = newUrl.replace(/-en/g, "-bg");
      } else if (newLanguage === "fr") {
        newUrl = currentUrl.replace(/\/en\//g, "/fr/");
        newUrl = newUrl.replace(/-en/g, "-fr");
      } else if (newLanguage === "es") {
        newUrl = currentUrl.replace(/\/en\//g, "/es/");
        newUrl = newUrl.replace(/-en/g, "-es");
      }
      // add more "else if" statements for additional languages

      window.location.href = newUrl;
      localStorage.setItem("language", newLanguage);
    }
  });
});

languageButtons.forEach(function (button) {
  const buttonLanguage = button.getAttribute("data-lang");
  if (buttonLanguage === selectedLanguage) {
    button.classList.add("selected");
  } else {
    button.classList.remove("selected");
  }
});




//Modal dialog box script

// Get the modal and close button
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// Function to close the modal
const closeModal = function () {
  modal.classList.add('closed');
};

// Check if the modal should be displayed
const openModal = function () {
  let pageViews = localStorage.getItem('pageViews');
  closeModal();
  // If no page views are recorded yet, set it to 1
  if (!pageViews) {
    pageViews = 1;
  } else {
    pageViews = parseInt(pageViews);
    pageViews += 1;
  }

  // Store the updated page view count
  localStorage.setItem('pageViews', pageViews);

  // Display the modal if the page view count is a multiple of 200
  if (pageViews % 100 === 0) {
    modal.classList.remove('closed');
  }
};

// Add event listeners to close the modal
modalCloseOverlay.addEventListener('click', closeModal);
modalCloseBtn.addEventListener('click', closeModal);

// Display the modal if necessary when the page is loaded
window.addEventListener('load', openModal);




//Search Bar Script

const $expandableSearch = document.getElementById('expandable-search')
const $expandableSearchBtn = $expandableSearch.querySelector('.search-btn-submit')
const $expandableSearchInput = $expandableSearch.querySelector('.search-input')

// Attach click event handler on search icon
$expandableSearchBtn.addEventListener('click', function (e) {

  e.preventDefault()

  const expanded = $expandableSearch.getAttribute('data-expanded')

  // Toggle expanded state class and store in data attribute
  if (expanded === null || expanded === 'false') {
    $expandableSearch.setAttribute('data-expanded', 'true')
    $expandableSearch.classList.add('search-expanded')
    $expandableSearchInput.focus()
  } else {
    $expandableSearch.setAttribute('data-expanded', 'false')
    $expandableSearch.classList.remove('search-expanded')
  }
})




//Mobile Menu Script

// mobile menu variables

const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');
for (let i = 0; i < mobileMenuOpenBtn.length; i++) {
  //mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  };

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });
  if (mobileMenuCloseBtn[i]) {
    mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
    overlay.addEventListener('click', mobileMenuCloseFunc);
  }
}






//----------------------------------------------------------

// Mobile Menu on the left side Script

//accordion variables

const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');
const openAndCloseCategory = function () {

  const clickedBtn = this.nextElementSibling.classList.contains('active');

  for (let i = 0; i < accordion.length; i++) {

    if (clickedBtn) break;

    if (accordion[i].classList.contains('active')) {

      accordion[i].classList.remove('active');
      accordionBtn[i].classList.remove('active');

    }
  }

  this.nextElementSibling.classList.toggle('active');
  this.classList.toggle('active');
};

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', openAndCloseCategory);
}

function toggleMobileMenu(menu) {
  menu.classList.toggle('open');
}





const cartBtn = document.getElementById('cart-btn');
const cartDropdown = document.getElementById('cart-dropdown');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalContainer = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const cartArrow = document.createElement('div');
cartArrow.classList.add('arrow');

const wishlistBtn = document.getElementById('wishlist-btn');
const wishlistDropdown = document.getElementById('wishlist-dropdown');
const wishlistItemsContainer = document.getElementById('wishlist-items');
const wishlistTotalContainer = document.getElementById('wishlist-total');
const wishlistCheckoutBtn = document.getElementById('wishlist-checkout-btn');
const wishlistArrow = document.createElement('div');
wishlistArrow.classList.add('arrow');

let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];

function updateCart() {
  let cartCount = 0;
  let cartTotal = 0;
  cartItemsContainer.innerHTML = '';

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = 'Your cart is empty';
    return;
  }

  cartItems.forEach((item) => {
    const cartItem = document.createElement('div');
    cartItem.innerHTML = `
      <div>${item.name}</div>
      <div>${item.quantity} x $${item.price.toFixed(2)}</div>
    `;
    cartItemsContainer.appendChild(cartItem);
    cartCount += item.quantity;
    cartTotal += item.price * item.quantity;
  });

  cartTotalContainer.innerHTML = `Total: $${cartTotal.toFixed(2)}`;
  document.querySelector('.count-cart').textContent = cartCount;
}

function updateWishlistCount() {
  let wishlistCount = wishlistItems.length;
  wishlistCountContainer.textContent = wishlistCount;
}

function updateWishlist() {
  wishlistItemsContainer.innerHTML = '';

  if (wishlistItems.length === 0) {
    wishlistItemsContainer.innerHTML = 'Your wishlist is empty';
    return;
  }

  wishlistItems.forEach((item) => {
    const wishlistItem = document.createElement('li');
    wishlistItem.textContent = item;
    wishlistItemsContainer.appendChild(wishlistItem);
  });
}

function calculateWishlistTotal() {
  let total = 0;
  wishlistItems.forEach((item) => {
    total += item.price * item.quantity;
  });
  return total;
}

function closeDropdowns() {
  if (cartDropdown.classList.contains('show')) {
    closeCart();
  }
  if (wishlistDropdown.classList.contains('show')) {
    closeWishlist();
  }
}

cartBtn.addEventListener('click', () => {
  if (!cartDropdown.classList.contains('show')) {
    closeDropdowns();
    openCart();
  } else {
    closeCart();
  }
  updateCart();
});

wishlistBtn.addEventListener('click', () => {
  if (!wishlistDropdown.classList.contains('show')) {
    closeDropdowns();
    openWishlist();
  } else {
    closeWishlist();
  }
  updateWishlist();
});

function openCart() {
  cartBtn.disabled = true;
  cartDropdown.classList.add('show');
  cartDropdown.appendChild(cartArrow);
  const animation = cartDropdown.animate(
    [
      { transform: 'translate(45px, 0) scale(0, 0)', opacity: 0 },
      { transform: 'translate(20px, 20px) scale(1, 1)', opacity: 1 },
    ],
    {
      duration: 250,
      easing: 'ease-out',
      fill: 'forwards',
    }
  );
  animation.onfinish = function () {
    cartBtn.disabled = false;
  };
}

function closeCart() {
  cartBtn.disabled = true;
  cartDropdown.removeChild(cartArrow);
  const animation = cartDropdown.animate(
    [
      { transform: 'translate(20px, 20px) scale(1, 1)', opacity: 1 },
      { transform: 'translate(45px, 0) scale(0, 0)', opacity: 0 },
    ],
    {
      duration: 250,
      easing: 'ease-out',
      fill: 'forwards',
    }
  );
  animation.onfinish = function () {
    cartDropdown.classList.remove('show');
    cartBtn.disabled = false;
  };
}

function openWishlist() {
  wishlistBtn.disabled = true;
  wishlistDropdown.classList.add('show');
  wishlistDropdown.appendChild(wishlistArrow);
  const animation = wishlistDropdown.animate(
    [
      { transform: 'translate(45px, 0) scale(0, 0)', opacity: 0 },
      { transform: 'translate(20px, 20px) scale(1, 1)', opacity: 1 },
    ],
    {
      duration: 250,
      easing: 'ease-out',
      fill: 'forwards',
    }
  );
  animation.onfinish = function () {
    wishlistBtn.disabled = false;
  };
}

function closeWishlist() {
  wishlistBtn.disabled = true;
  wishlistDropdown.removeChild(wishlistArrow);
  const animation = wishlistDropdown.animate(
    [
      { transform: 'translate(20px, 20px) scale(1, 1)', opacity: 1 },
      { transform: 'translate(45px, 0) scale(0, 0)', opacity: 0 },
    ],
    {
      duration: 250,
      easing: 'ease-out',
      fill: 'forwards',
    }
  );
  animation.onfinish = function () {
    wishlistDropdown.classList.remove('show');
    wishlistBtn.disabled = false;
  };
}

checkoutBtn.addEventListener('click', async () => {
  const stripe = Stripe('your_public_key_here');
  const response = await fetch('/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cartItems }),
  });
  const session = await response.json();
  const result = await stripe.redirectToCheckout({
    sessionId: session.id,
  });
  if (result.error) {
    console.log(result.error.message);
  }
});

wishlistCheckoutBtn.addEventListener('click', async () => {
  // Handle checkout for the wishlist here
});

updateCart();
updateWishlist();


