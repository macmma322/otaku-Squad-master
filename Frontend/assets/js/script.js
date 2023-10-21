"use strict";

//We're going to use "check" to get the ckeckbox element
const check = document.getElementById("check");

//If darkMode doesn’t exist in the LocalStorage, create it. False by default
if (localStorage.getItem("darkMode") === null) {
  localStorage.setItem("darkMode", "false");
}

//Create a link tag to later link the CSS file we want
const link = document.createElement("link");
link.rel = "stylesheet";
document.getElementsByTagName("HEAD")[0].appendChild(link);

//Or we can create the tag in the HTML and later reference in our code
//const link=document.getElementsByTagName("link");

//checkStatus is only called one time in the program, when you reload the page
//It gives the page it's default look, depening on waht darkMode is set to it will load one css or another
checkStatus();

function checkStatus() {
  if (localStorage.getItem("darkMode") === "true") {
    check.checked = true; //the checkbox is checked (if you load the page by default it isn’t)
    link.href = "/Frontend/assets/css/style-dark/var-dark.css"; //since it's true we load the dark theme CSS
  } else {
    check.checked = false; //the checkbox is unchecked
    link.href = "/Frontend/assets/css/style/var.css";
  }
}

function changeStatus() {
  //This function gets called every time the checkbox is clicked
  if (localStorage.getItem("darkMode") === "true") {
    //if darkMode was active and this function is called it means the user now wants light
    localStorage.setItem("darkMode", "false"); //so we set it to false, to indicate we are in light mode
    link.href = "/Frontend/assets/css/style/var.css";
  } else {
    localStorage.setItem("darkMode", "true"); //same code but adapted for dark theme
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
      newUrl = currentUrl.replace(
        `/${currentLanguage}/`,
        `/${selectedLanguage}/`
      );
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
const modal = document.querySelector("[data-modal]");
const modalCloseBtn = document.querySelector("[data-modal-close]");
const modalCloseOverlay = document.querySelector("[data-modal-overlay]");

// Function to close the modal
const closeModal = function () {
  modal.classList.add("closed");
};

// Check if the modal should be displayed
const openModal = function () {
  let pageViews = localStorage.getItem("pageViews");
  closeModal();
  // If no page views are recorded yet, set it to 1
  if (!pageViews) {
    pageViews = 1;
  } else {
    pageViews = parseInt(pageViews);
    pageViews += 1;
  }

  // Store the updated page view count
  localStorage.setItem("pageViews", pageViews);

  // Display the modal if the page view count is a multiple of 200
  if (pageViews % 100 === 0) {
    modal.classList.remove("closed");
  }
};

// Add event listeners to close the modal
modalCloseOverlay.addEventListener("click", closeModal);
modalCloseBtn.addEventListener("click", closeModal);

// Display the modal if necessary when the page is loaded
window.addEventListener("load", openModal);

// Search Bar Script
const $expandableSearch = document.getElementById("expandable-search");
const $expandableSearchBtn =
  $expandableSearch.querySelector(".search-btn-submit");
const $expandableSearchInput = $expandableSearch.querySelector(".search-input");

// Attach click event handler on search icon
$expandableSearchBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const expanded = $expandableSearch.getAttribute("data-expanded");

  // Toggle expanded state class and store in data attribute
  if (expanded === null || expanded === "false") {
    $expandableSearch.setAttribute("data-expanded", "true");
    $expandableSearch.classList.add("search-expanded");
    $expandableSearchInput.focus();
  } else {
    // Check if the input field is empty
    if ($expandableSearchInput.value.trim() === "") {
      $expandableSearch.setAttribute("data-expanded", "false");
      $expandableSearch.classList.remove("search-expanded");
    } else {
      // Perform search action here (you can replace this with your search logic)
      alert("Performing search for: " + $expandableSearchInput.value);
    }
  }
});

//-------------------//
// Mobile Menu Script
//-------------------//

// mobile menu variables

const mobileMenuOpenBtn = document.querySelectorAll(
  "[data-mobile-menu-open-btn]"
);
const mobileMenu = document.querySelectorAll("[data-mobile-menu]");
const mobileMenuCloseBtn = document.querySelectorAll(
  "[data-mobile-menu-close-btn]"
);
const overlay = document.querySelector("[data-overlay]");

// Function to close cart and wishlist dropdowns
function closeDropdowns() {
  if (cartDropdown.classList.contains("show")) {
    closeCart();
  }
  if (wishlistDropdown.classList.contains("show")) {
    closeWishlist();
  }

  // Reset the active state of the menu action buttons
  cartBtn.classList.remove("active");
  wishlistBtn.classList.remove("active");
}

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {
  //mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove("active");
    overlay.classList.remove("active");
  };

  mobileMenuOpenBtn[i].addEventListener("click", function () {
    closeDropdowns(); // Close cart and wishlist dropdowns when mobile menu is opened
    mobileMenu[i].classList.add("active");
    overlay.classList.add("active");
  });
  if (mobileMenuCloseBtn[i]) {
    mobileMenuCloseBtn[i].addEventListener("click", mobileMenuCloseFunc);
    overlay.addEventListener("click", mobileMenuCloseFunc);
  }
}

//----------------------------------------------------------

// Mobile Menu on the left side Script

//Accordion Variables

const accordionBtn = document.querySelectorAll("[data-accordion-btn]");
const accordion = document.querySelectorAll("[data-accordion]");
const openAndCloseCategory = function () {
  const clickedBtn = this.nextElementSibling.classList.contains("active");

  for (let i = 0; i < accordion.length; i++) {
    if (clickedBtn) break;

    if (accordion[i].classList.contains("active")) {
      accordion[i].classList.remove("active");
      accordionBtn[i].classList.remove("active");
    }
  }

  this.nextElementSibling.classList.toggle("active");
  this.classList.toggle("active");
};

for (let i = 0; i < accordionBtn.length; i++) {
  accordionBtn[i].addEventListener("click", openAndCloseCategory);
}

function toggleMobileMenu(menu) {
  menu.classList.toggle("open");
}

// Cart Dropdown Variables
const cartBtn = document.getElementById("cart-btn");
const cartDropdown = document.getElementById("cart-dropdown");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalContainer = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const cartArrow = document.createElement("div");
cartArrow.classList.add("arrow");

// Wishlist Dropdown Variables
const wishlistBtn = document.getElementById("wishlist-btn");
const wishlistDropdown = document.getElementById("wishlist-dropdown");
const wishlistDropdownCount = document.querySelector(".count-wishlist");
const wishlistItemsContainer = document.getElementById("wishlist-items");
const wishlistTotalContainer = document.getElementById("wishlist-total");
const wishlistCheckoutBtn = document.getElementById("wishlist-checkout-btn");
const wishlistArrow = document.createElement("div");
wishlistArrow.classList.add("arrow");

// Profile Dropdown Variables
const profileBtn = document.getElementById("profile-btn");
const profileDropdown = document.getElementById("profile-dropdown");
const profileArrow = document.createElement("div");
profileArrow.classList.add("arrow");

// Function to open the profile dropdown
function isLoggedIn() {
  // Example: Check if the user is logged in using sessionStorage
  return sessionStorage.getItem("userLoggedIn") === "true";
}

// Other variables and functions as in your code

// Function to open the profile dropdown
function openProfile() {
  profileBtn.disabled = true;
  profileDropdown.classList.add("show");
  profileDropdown.appendChild(profileArrow);
  const animation = profileDropdown.animate(
    [
      { transform: "translate(-178px, 0) scale(0, 0)", opacity: 0 },
      { transform: "translate(20px, 20px) scale(1, 1)", opacity: 1 },
    ],
    {
      duration: 250,
      easing: "ease-out",
      fill: "forwards",
    }
  );
  animation.onfinish = function () {
    profileBtn.disabled = false;
  };

  // Check if user is logged in by calling the isLoggedIn function
  isLoggedIn().then((loggedIn) => {
    if (loggedIn) {
      // User is logged in, fetch user data and update the dropdown
      fetch("/get-username-from-session") // Replace with the actual endpoint or method to get the username from the session
        .then((response) => response.json())
        .then((data) => {
          if (data.username) {
            const usernameElement = document.getElementById("username");
            usernameElement.textContent = `Hello, ${data.username}!`;

            // Calculate the width based on the updated username's width
            const usernameWidth = usernameElement.offsetWidth; // Get the width of the updated username element
            const minWidth = 150; // Set a minimum width for the dropdown (adjust as needed)
            const calculatedWidth = Math.max(usernameWidth, minWidth); // Choose the maximum width

            // Set the width of the profile dropdown
            profileDropdown.style.width = `${calculatedWidth}px`;

            // Add a "Logout" button
            const logoutButton = document.createElement("button");
            logoutButton.textContent = "Logout";
            logoutButton.addEventListener("click", () => {
              // Add your logout logic here
            });
            profileDropdown.appendChild(logoutButton);
          }
        })
        .catch((error) => {
          console.error("Error fetching username:", error);
        });
    } else {
      // User is not logged in (guest), display guest options
      const guestGreeting = document.createElement("div");
      guestGreeting.textContent = "Welcome, Guest!";
      profileDropdown.appendChild(guestGreeting);

      // Add "Login" and "Sign Up" buttons
      const loginButton = document.createElement("button");
      loginButton.textContent = "Login";
      loginButton.addEventListener("click", () => {
        // Add your login logic here
      });
      profileDropdown.appendChild(loginButton);

      const signUpButton = document.createElement("button");
      signUpButton.textContent = "Sign Up";
      signUpButton.addEventListener("click", () => {
        // Add your sign-up logic here
      });
      profileDropdown.appendChild(signUpButton);
    }
  });
}

function closeProfile() {
  profileBtn.disabled = true;
  const animation = profileDropdown.animate(
    [
      { transform: "translate(20px, 20px) scale(1, 1)", opacity: 1 },
      { transform: "translate(-178px, 0) scale(0, 0)", opacity: 0 },
    ],
    {
      duration: 250,
      easing: "ease-out",
      fill: "forwards",
    }
  );

  animation.onfinish = function () {
    // Check if profileArrow exists in profileDropdown before removing it
    const existingProfileArrow =
      profileDropdown.querySelector(".profile-arrow");
    if (existingProfileArrow) {
      profileDropdown.removeChild(existingProfileArrow);
    }

    profileDropdown.classList.remove("show");
    profileBtn.disabled = false;
  };
}

profileBtn.addEventListener("click", () => {
  if (!profileDropdown.classList.contains("show")) {
    closeDropdowns(); // Close other dropdowns if open
    openProfile();
  } else {
    closeProfile();
  }
});

// Modify the closeDropdowns function to include the profile dropdown
function closeDropdowns() {
  if (cartDropdown.classList.contains("show")) {
    closeCart();
  }
  if (wishlistDropdown.classList.contains("show")) {
    closeWishlist();
  }
  if (profileDropdown.classList.contains("show")) {
    closeProfile();
  }
}

// Add an event listener to the document body to close dropdowns when clicked outside
document.body.addEventListener("click", (event) => {
  const isCartDropdownClicked =
    cartDropdown.contains(event.target) || cartBtn.contains(event.target);
  const isWishlistDropdownClicked =
    wishlistDropdown.contains(event.target) ||
    wishlistBtn.contains(event.target);
  const isProfileDropdownClicked =
    profileDropdown.contains(event.target) || profileBtn.contains(event.target);

  if (!isCartDropdownClicked && cartDropdown.classList.contains("show")) {
    closeCart();
  }

  if (
    !isWishlistDropdownClicked &&
    wishlistDropdown.classList.contains("show")
  ) {
    closeWishlist();
  }

  if (!isProfileDropdownClicked && profileDropdown.classList.contains("show")) {
    closeProfile();
  }
});

// Initialize cart and wishlist items from local storage
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
let wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];

// Initialize heart counter
let heartCounter = 0;

// Function to update the shopping cart display based on the contents of the cartItems array.
function updateCart() {
  let cartCount = 0;
  let cartTotal = 0;

  cartItemsContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = "Your cart is empty";
    return;
  }

  cartItems.forEach((item) => {
    const cartItem = document.createElement("div");

    cartItem.innerHTML = `
        <div>${item.name}</div>
        <div>${item.quantity} x $${item.price.toFixed(2)}</div>
      `;

    cartItemsContainer.appendChild(cartItem);

    cartCount += item.quantity;
    cartTotal += item.price * item.quantity;
  });

  cartTotalContainer.innerHTML = `Total: $${cartTotal.toFixed(2)}`;
  document.querySelector(".count-cart").textContent = cartCount;
}

// Initialize wishlist count from local storage
let wishlistCount = parseInt(localStorage.getItem("wishlistCount")) || 0;

// Function to update the wishlist count display
function updateWishlistCount() {
  let totalHeartCount = 0; // Initialize the total heart count

  // Iterate through local storage to count hearts for each product page
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.endsWith("_heartState") && localStorage.getItem(key) === "active") {
      totalHeartCount++;
    }
  }

  // Update the wishlist count display
  wishlistDropdownCount.textContent = totalHeartCount;

  // Update the local storage value
  localStorage.setItem("wishlistCount", totalHeartCount);
}

// Update the wishlist count display initially
updateWishlistCount();

// Create a MutationObserver to watch for changes in the DOM (class changes on hearts)
const heartMutationObserver = new MutationObserver(updateWishlistCount);

heartMutationObserver.observe(document.body, {
  subtree: true,
  attributes: true,
  attributeFilter: ["class"],
});

// Function to update the wishlist display
function updateWishlist() {
  wishlistItemsContainer.innerHTML = "";

  if (wishlistItems.length === 0) {
    wishlistItemsContainer.innerHTML = "Your wishlist is empty";
    return;
  }

  wishlistItems.forEach((item) => {
    const wishlistItem = document.createElement("li");
    wishlistItem.textContent = item;
    wishlistItemsContainer.appendChild(wishlistItem);
  });
}

// Dropdowns Close function
function closeDropdowns() {
  if (cartDropdown.classList.contains("show")) {
    closeCart();
  }
  if (wishlistDropdown.classList.contains("show")) {
    closeWishlist();
  }
}

cartBtn.addEventListener("click", () => {
  if (!cartDropdown.classList.contains("show")) {
    closeDropdowns();
    openCart();
  } else {
    closeCart();
  }
  updateCart();
});

wishlistBtn.addEventListener("click", () => {
  if (!wishlistDropdown.classList.contains("show")) {
    closeDropdowns();
    openWishlist();
  } else {
    closeWishlist();
  }
  updateWishlist();
  updateWishlistCount();
});

checkoutBtn.addEventListener("click", async () => {
  // Close the cart dropdown when the checkout button is clicked
  closeCart();

  // Add your checkout logic here
});

wishlistCheckoutBtn.addEventListener("click", async () => {
  // Close the wishlist dropdown when the wishlist checkout button is clicked
  closeWishlist();

  // Add your wishlist checkout logic here
});

document.body.addEventListener("click", (event) => {
  const isCartDropdownClicked =
    cartDropdown.contains(event.target) || cartBtn.contains(event.target);
  const isWishlistDropdownClicked =
    wishlistDropdown.contains(event.target) ||
    wishlistBtn.contains(event.target);

  if (!isCartDropdownClicked && cartDropdown.classList.contains("show")) {
    closeCart();
  }

  if (
    !isWishlistDropdownClicked &&
    wishlistDropdown.classList.contains("show")
  ) {
    closeWishlist();
  }
});

// Function to open the cart dropdown
function openCart() {
  cartBtn.disabled = true;
  cartDropdown.classList.add("show");
  cartDropdown.appendChild(cartArrow);
  const animation = cartDropdown.animate(
    [
      { transform: "translate(45px, 0) scale(0, 0)", opacity: 0 },
      { transform: "translate(20px, 20px) scale(1, 1)", opacity: 1 },
    ],
    {
      duration: 250,
      easing: "ease-out",
      fill: "forwards",
    }
  );
  animation.onfinish = function () {
    cartBtn.disabled = false;
  };
}

// Function to close the cart dropdown
function closeCart() {
  cartBtn.disabled = true;

  // Check if cartArrow is a child of cartDropdown before removing it
  if (cartDropdown.contains(cartArrow)) {
    cartDropdown.removeChild(cartArrow);
  }

  const animation = cartDropdown.animate(
    [
      { transform: "translate(20px, 20px) scale(1, 1)", opacity: 1 },
      { transform: "translate(45px, 0) scale(0, 0)", opacity: 0 },
    ],
    {
      duration: 250,
      easing: "ease-out",
      fill: "forwards",
    }
  );
  animation.onfinish = function () {
    cartDropdown.classList.remove("show");
    cartBtn.disabled = false;
  };
}

// Function to open the wishlist dropdown
function openWishlist() {
  wishlistBtn.disabled = true;
  wishlistDropdown.classList.add("show");
  wishlistDropdown.appendChild(wishlistArrow);
  const animation = wishlistDropdown.animate(
    [
      { transform: "translate(45px, 0) scale(0, 0)", opacity: 0 },
      { transform: "translate(20px, 20px) scale(1, 1)", opacity: 1 },
    ],
    {
      duration: 250,
      easing: "ease-out",
      fill: "forwards",
    }
  );
  animation.onfinish = function () {
    wishlistBtn.disabled = false;
  };
}

// Function to close the wishlist dropdown
function closeWishlist() {
  wishlistBtn.disabled = true;

  // Check if wishlistArrow is a child of wishlistDropdown before removing it
  if (wishlistDropdown.contains(wishlistArrow)) {
    wishlistDropdown.removeChild(wishlistArrow);
  }

  const animation = wishlistDropdown.animate(
    [
      { transform: "translate(20px, 20px) scale(1, 1)", opacity: 1 },
      { transform: "translate(45px, 0) scale(0, 0)", opacity: 0 },
    ],
    {
      duration: 250,
      easing: "ease-out",
      fill: "forwards",
    }
  );
  animation.onfinish = function () {
    wishlistDropdown.classList.remove("show");
    wishlistBtn.disabled = false;
  };
}

checkoutBtn.addEventListener("click", async () => {
  const stripe = Stripe("your_public_key_here");
  const response = await fetch("/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

wishlistCheckoutBtn.addEventListener("click", async () => {
  // Handle checkout for the wishlist here
});

// Update the shopping cart and wishlist initially
updateCart();
updateWishlist();
updateWishlistCount();

//Registration/Login form script and access to the backend

const login_btn = document.querySelector("#login-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container-login");

sign_up_btn.addEventListener("click", function () {
  container.classList.add("sign-up-mode");
});

login_btn.addEventListener("click", function () {
  container.classList.remove("sign-up-mode");
});

//--------------------Log In Password Show/Hide-------------------

const toggleLoginPassword = document.querySelector("#togglePasswordLogin");
const loginPasswordInput = document.querySelector("#login_password");

// toggle the type attribute
toggleLoginPassword.addEventListener("click", function (e) {
  const type =
    loginPasswordInput.getAttribute("type") === "password"
      ? "text"
      : "password";
  loginPasswordInput.setAttribute("type", type);
});

// toggle the eye slash icon
const loginPasswordButton = document.querySelectorAll("ion-button")[0];
loginPasswordButton.addEventListener("click", () => {
  if (toggleLoginPassword.getAttribute("name") == "eye-outline") {
    toggleLoginPassword.setAttribute("name", "eye-off-outline");
  } else {
    toggleLoginPassword.setAttribute("name", "eye-outline");
  }
});

//--------------------Sign Up Password Show/Hide-------------------

const toggleSignUpPassword = document.querySelector("#togglePasswordSignUp");
const signUpPasswordInput = document.querySelector("#signup_password");

// toggle the type attribute
toggleSignUpPassword.addEventListener("click", function (e) {
  const type =
    signUpPasswordInput.getAttribute("type") === "password"
      ? "text"
      : "password";
  signUpPasswordInput.setAttribute("type", type);
});

// toggle the eye slash icon
const signUpPasswordButton = document.querySelectorAll("ion-button")[1];
signUpPasswordButton.addEventListener("click", () => {
  if (toggleSignUpPassword.getAttribute("name") == "eye-outline") {
    toggleSignUpPassword.setAttribute("name", "eye-off-outline");
  } else {
    toggleSignUpPassword.setAttribute("name", "eye-outline");
  }
});

const signUpForm = document.getElementById("signup-btn");
signUpForm.addEventListener("click", signUpUser());

function signUpUser() {
  // Prevent the form from submitting and refreshing the page
  preventDefault();

  // Get sign up form input values
  var signUpUsername = document.getElementById("signup_username").value;
  var email = document.getElementById("signup_email").value;
  var signUpPassword = document.getElementById("signup_password").value;
  var fname = document.getElementById("signup_fname").value;
  var lname = document.getElementById("signup_lname").value;

  // Send a POST request to the /api/sign-up endpoint
  fetch("http://localhost:3000/api/sign-up", {
    method: "POST",
    body: JSON.stringify({
      signUpUsername,
      email,
      signUpPassword,
      fname,
      lname,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Handle the response data here
      insertUser(signUpUsername, email, signUpPassword, fname, lname);
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error(error);
    });
}

const loginForm = document.getElementById("login-btn");
loginForm.addEventListener("submit", loginUser);

function loginUser(event) {
  // Prevent the form from submitting and refreshing the page
  event.preventDefault();

  // Get the login form input values
  var loginUsername = document.getElementById("login_username").value;
  console.log(loginUsername);
  var loginPassword = document.getElementById("login_password").value;
  console.log(loginPassword);

  // Send a POST request to the /api/login endpoint
  fetch("http://localhost:3000/api/login", {
    method: "POST",
    body: JSON.stringify({ loginUsername, loginPassword }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data here
      console.log(data);
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error(error);
    });
}
