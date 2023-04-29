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

//------------------------------


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

/* 
  =======================
    MODAL SCRIPT
  =======================
*/

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



//----------------------------------------------------------

/* 
  =======================
    SEARCH BAR SCRIPT
  =======================
*/



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

/* 
  =======================
    MOBILE MENU SCRIPT
  =======================
*/

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

/* 
  =======================
    MOBILE MENU ON THE SIDE SCRIPT
  =======================
*/

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

//----------------------------------------------------------

const $window = $(window);
const $body = $('body');

class Slideshow {
  constructor(userOptions = {}) {
    const defaultOptions = {
      $el: $('.slideshow'),
      showArrows: false,
      showPagination: true,
      duration: 10000,
      autoplay: true
    };


    let options = Object.assign({}, defaultOptions, userOptions);

    this.$el = options.$el;
    this.maxSlide = this.$el.find($('.js-slider-home-slide')).length;
    this.showArrows = this.maxSlide > 1 ? options.showArrows : false;
    this.showPagination = options.showPagination;
    this.currentSlide = 1;
    this.isAnimating = false;
    this.animationDuration = 1200;
    this.autoplaySpeed = options.duration;
    this.interval;
    this.$controls = this.$el.find('.js-slider-home-button');
    this.autoplay = this.maxSlide > 1 ? options.autoplay : false;

    this.$el.on('click', '.js-slider-home-next', event => this.nextSlide());
    this.$el.on('click', '.js-slider-home-prev', event => this.prevSlide());
    this.$el.on('click', '.js-pagination-item', event => {
      if (!this.isAnimating) {
        this.preventClick();
        this.goToSlide(event.target.dataset.slide);
      }
    });

    this.init();
  }

  init() {
    this.goToSlide(1);
    if (this.autoplay) {
      this.startAutoplay();
    }

    if (this.showPagination) {
      let paginationNumber = this.maxSlide;
      let pagination = '<div class="pagination"><div class="container">';

      for (let i = 0; i < this.maxSlide; i++) {
        let item = `<span class="pagination__item js-pagination-item ${i === 0 ? 'is-current' : ''}" data-slide=${i + 1}>${i + 1}</span>`;
        pagination = pagination + item;
      }

      pagination = pagination + '</div></div>';

      this.$el.append(pagination);
    }
  }

  preventClick() {
    this.isAnimating = true;
    this.$controls.prop('disabled', true);
    clearInterval(this.interval);

    setTimeout(() => {
      this.isAnimating = false;
      this.$controls.prop('disabled', false);
      if (this.autoplay) {
        this.startAutoplay();
      }
    }, this.animationDuration);
  }

  goToSlide(index) {
    this.currentSlide = parseInt(index);

    if (this.currentSlide > this.maxSlide) {
      this.currentSlide = 1;
    }

    if (this.currentSlide === 0) {
      this.currentSlide = this.maxSlide;
    }

    const newCurrent = this.$el.find('.js-slider-home-slide[data-slide="' + this.currentSlide + '"]');
    const newPrev = this.currentSlide === 1 ? this.$el.find('.js-slider-home-slide').last() : newCurrent.prev('.js-slider-home-slide');
    const newNext = this.currentSlide === this.maxSlide ? this.$el.find('.js-slider-home-slide').first() : newCurrent.next('.js-slider-home-slide');

    this.$el.find('.js-slider-home-slide').removeClass('is-prev is-next is-current');
    this.$el.find('.js-pagination-item').removeClass('is-current');

    if (this.maxSlide > 1) {
      newPrev.addClass('is-prev');
      newNext.addClass('is-next');
    }

    newCurrent.addClass('is-current');
    this.$el.find('.js-pagination-item[data-slide="' + this.currentSlide + '"]').addClass('is-current');
  }

  nextSlide() {
    this.preventClick();
    this.goToSlide(this.currentSlide + 1);
  }

  prevSlide() {
    this.preventClick();
    this.goToSlide(this.currentSlide - 1);
  }

  startAutoplay() {
    this.interval = setInterval(() => {
      if (!this.isAnimating) {
        this.nextSlide();
      }
    }, this.autoplaySpeed);
  }

  destroy() {
    this.$el.off();
  }
}


(function () {
  let loaded = false;
  let maxLoad = 3000;

  function load() {
    const options = {
      showPagination: true
    };


    let slideShow = new Slideshow(options);
  }

  function addLoadClass() {
    $body.addClass('is-loaded');

    setTimeout(function () {
      $body.addClass('is-animated');
    }, 600);
  }

  $window.on('load', function () {
    if (!loaded) {
      loaded = true;
      load();
    }
  });

  setTimeout(function () {
    if (!loaded) {
      loaded = true;
      load();
    }
  }, maxLoad);

  addLoadClass();
})();







const cartBtn = document.getElementById('cart-btn');
const cartDropdown = document.getElementById('cart-dropdown');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalContainer = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const arrow = document.createElement('div');
arrow.classList.add('arrow');

let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

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
  document.querySelector('.count').innerHTML = cartCount;

  let cartHeight = 0;
  cartItems.forEach((item) => {
    cartHeight += 35; // Change this value to adjust the height of each cart item
  });

  cartDropdown.style.height = `${cartHeight}px`;
}

function openCart() {
  cartBtn.disabled = true; // disable the button before starting the animation
  cartDropdown.classList.add('show');
  arrow.classList.add('arrow-up');
  cartDropdown.appendChild(arrow);
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
  animation.onfinish = function() {
    cartBtn.disabled = false; // enable the button when the animation is finished
  }
}

function closeCart() {
  cartBtn.disabled = true; // disable the button before starting the animation
  arrow.classList.remove('arrow-up');
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
  animation.onfinish = function() {
    cartDropdown.classList.remove('show');
    cartDropdown.removeChild(arrow);
    cartBtn.disabled = false; // enable the button when the animation is finished
  }
}



cartBtn.addEventListener('click', () => {
  if (cartDropdown.classList.contains('show')) {
    closeCart();
  } else {
    openCart();
  }
  updateCart();
});

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

































//-------------------------------------------------------------

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", function () {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", function () {
  container.classList.remove("sign-up-mode");
});




//--------------------Log In Password Show/Hide-------------------

const toggleLoginPassword = document.querySelectorAll('#togglePassword')[0];
const loginPasswordInput = document.querySelector('#login_password');

// toggle the type attribute
toggleLoginPassword.addEventListener('click', function (e) {
  const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
  loginPassword.setAttribute('type', type);
}
)

// toggle the eye slash icon
const loginPasswordButton = document.querySelectorAll('ion-button')[0];
loginPasswordButton.addEventListener("click", () => {
  if (toggleLoginPassword.getAttribute('name') == 'eye-outline') {
    toggleLoginPassword.setAttribute('name', 'eye-off-outline');
  }
  else {
    toggleLoginPassword.setAttribute('name', 'eye-outline');
  }
}
);


//--------------------Sign Up Password Show/Hide-------------------

const toggleSignUpPassword = document.querySelectorAll('#togglePassword')[1];
const signUpPasswordInput = document.querySelector('#signup_password');

// toggle the type attribute
toggleSignUpPassword.addEventListener('click', function (e) {
  const type = signUpPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  signUpPasswordInput.setAttribute('type', type);
}
)

// toggle the eye slash icon
const signUpPasswordButton = document.querySelectorAll("ion-button")[1];
signUpPasswordButton.addEventListener("click", () => {
  if (signUpPasswordInput.getAttribute('name') == 'eye-outline') {
    signUpPasswordInput.setAttribute('name', 'eye-off-outline');
  }
  else {
    signUpPasswordButton.setAttribute('name', 'eye-outline');
  }
}
);









const signUpForm = document.getElementById('signup-btn');
signUpForm.addEventListener('click', signUpUser());

function signUpUser() {
  // Prevent the form from submitting and refreshing the page
  // event.preventDefault();

    // Get sign up form input values
    const signUpUsername = document.getElementById('signup_username').value;
    const email = document.getElementById('signup_email').value;
    const signUpPassword = document.getElementById('signup_password').value;
    const fname = document.getElementById('signup_fname').value;
    const lname = document.getElementById('signup_lname').value;

  // Send a POST request to the /api/sign-up endpoint
  fetch('http://localhost:3000/api/sign-up', {
    method: 'POST',
    body: JSON.stringify({ signUpUsername, email, signUpPassword, fname, lname }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Handle the response data here
      insertUser(signUpUsername, email, signUpPassword, fname, lname);
    })
    .catch(error => {
      // Handle any errors that occur during the request
      console.error(error);
    });
}




const loginForm = document.getElementById('login-btn');
loginForm.addEventListener('submit',loginUser);

function loginUser(event) {
  // Prevent the form from submitting and refreshing the page
  event.preventDefault();

  // Get the login form input values
const loginUsername = document.getElementById('login_username').value;console.log(loginUsername);
const loginPassword = document.getElementById('login_password').value;console.log(loginPassword);

  // Send a POST request to the /api/login endpoint
  fetch('http://localhost:3000/api/login', {
    method: 'POST',
    body: JSON.stringify({ loginUsername, loginPassword }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response data here
      console.log(data);
    })
    .catch(error => {
      // Handle any errors that occur during the request
      console.error(error);
    });
}