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
        link.href = './assets/css/style-dark.css';                   //since it's true we load the dark theme CSS
    }else{
        check.checked = false;                          //the checkbox is unchecked
        link.href = './assets/css/style.css';
    }
}

function changeStatus(){                                //This function gets called every time the checkbox is clicked
    if (localStorage.getItem('darkMode')==="true"){     //if darkMode was active and this function is called it means the user now wants light
        localStorage.setItem('darkMode', "false");      //so we set it to false, to indicate we are in light mode
        link.href = './assets/css/style.css';
    } else{
        localStorage.setItem('darkMode', "true");       //same code but adapted for dark theme
        link.href = './assets/css/style-dark.css';
    }
}


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