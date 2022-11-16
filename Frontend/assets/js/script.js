'use strict';

//We're going to use "check" to get the ckeckbox element
const check=document.getElementById("check")

//If darkMode doesn’t exist in the LocalStorage, create it. False by default
if (localStorage.getItem('darkMode')===null){
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

function checkStatus(){
    if (localStorage.getItem('darkMode')==="true"){
        check.checked = true;                           //the checkbox is checked (if you load the page by default it isn’t)
        link.href = './assets/css/style-dark/style-main-dark.css';                   //since it's true we load the dark theme CSS
    }else{
        check.checked = false;                          //the checkbox is unchecked
        link.href = './assets/css/style/style-main.css';
    }
}

function changeStatus(){                                //This function gets called every time the checkbox is clicked
    if (localStorage.getItem('darkMode')==="true"){     //if darkMode was active and this function is called it means the user now wants light
        localStorage.setItem('darkMode', "false");      //so we set it to false, to indicate we are in light mode
        link.href = './assets/css/style/style-main.css';
    } else{
        localStorage.setItem('darkMode', "true");       //same code but adapted for dark theme
        link.href = './assets/css/style-dark/style-main-dark.css';
    }
}

//------------------------------






/* 
  =======================
    MODAL SCRIPT
  =======================
*/

//modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

//modal function

const modalCloseFunc = function () {
  modal.classList.add('closed');
};

//modal eventListener

modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);


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
      autoplay: true };


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
  }}


(function () {
  let loaded = false;
  let maxLoad = 3000;

  function load() {
    const options = {
      showPagination: true };


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








// Toggle "effect" classes
function toggleEffect () {
  var target = document.querySelector (this.dataset.target);
      target.dataset.effect = this.dataset.effect;
  
  for (var i= 0; i < demoButtons.length; i++) {
    demoButtons[i].classList.remove ('active');
  }
  
  toggleActive.call (this);
}

// Toggle "active" class
function toggleActive () {
  this.classList.toggle ('active');
}

// Invoke "start ()" function
window.addEventListener ('load', start);