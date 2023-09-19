document.addEventListener("DOMContentLoaded", function () {
  // Get the heart element
  var heart = document.querySelector(".heart");
  var productId = heart.dataset.productId;
  var currentURL = window.location.href;

  // Initialize the heart's state based on local storage
  var heartState = localStorage.getItem(currentURL + "_" + productId + "_heartState");

  if (heartState === "active") {
    heart.classList.add("is-active");
    updateCounterDisplay(1); // Increment the counter if heart is active
  }

  heart.addEventListener("click", function () {
    if (heart.classList.contains("is-active")) {
      heart.classList.remove("is-active");
      localStorage.setItem(currentURL + "_" + productId + "_heartState", "inactive");
      updateCounterDisplay(-1); // Decrement the counter if heart is deactivated
      updateGlobalWishlistCount(-1); // Update the global wishlist count
    } else {
      heart.classList.add("is-active");
      localStorage.setItem(currentURL + "_" + productId + "_heartState", "active");
      updateCounterDisplay(1); // Increment the counter if heart is activated
      updateGlobalWishlistCount(1); // Update the global wishlist count
    }
  });

  // Function to update the counter display
  function updateCounterDisplay(change) {
    // Assuming you have an element with the class "count-heart" to display the count
    var countHeartElement = document.querySelector(".count-heart");
    if (countHeartElement) {
      var currentCount = parseInt(countHeartElement.textContent) || 0;
      countHeartElement.textContent = currentCount + change;
    }
  }

  // Function to update the global wishlist count stored in session storage
  function updateGlobalWishlistCount(change) {
    let globalWishlistCount = parseInt(sessionStorage.getItem('wishlistCount')) || 0;
    globalWishlistCount += change;
    sessionStorage.setItem('wishlistCount', globalWishlistCount);
    // Update the display of the global wishlist count if needed
    // Example: document.querySelector('.global-wishlist-count').textContent = globalWishlistCount;
  }
});



var slides = document.querySelectorAll(".slide");
var dots = document.querySelectorAll(".dot");
var index = 0;


function prevSlide(n) {
  index += n;
  console.log("prevSlide is called");
  changeSlide();
}

function nextSlide(n) {
  index += n;
  changeSlide();
}

changeSlide();

function changeSlide() {

  if (index > slides.length - 1)
    index = 0;

  if (index < 0)
    index = slides.length - 1;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";

    dots[i].classList.remove("active");
  }

  slides[index].style.display = "block";
  dots[index].classList.add("active");



}


let rateBox = Array.from(document.querySelectorAll(".rate-box"));
let globalValue = document.querySelector(".global-value");
let two = document.querySelector(".two");
let totalReviews = document.querySelector(".total-reviews");
let reviews = {
  5: 0,
  4: 0,
  3: 0,
  2: 0,
  1: 0,
};
updateValues();

function updateValues() {
  rateBox.forEach((box) => {
    let valueBox = rateBox[rateBox.indexOf(box)].querySelector(".value");
    let countBox = rateBox[rateBox.indexOf(box)].querySelector(".count");
    let progress = rateBox[rateBox.indexOf(box)].querySelector(".progress");
    console.log(typeof reviews[valueBox.innerHTML]);
    countBox.innerHTML = nFormat(reviews[valueBox.innerHTML]);

    let progressValue = Math.round(
      (reviews[valueBox.innerHTML] / getTotal(reviews)) * 100
    );
    progress.style.width = `${progressValue}%`;
  });
  totalReviews.innerHTML = getTotal(reviews);
  finalRating();
}
function getTotal(reviews) {
  return Object.values(reviews).reduce((a, b) => a + b);
}

document.querySelectorAll(".value").forEach((element) => {
  element.addEventListener("click", () => {
    let target = element.innerHTML;
    reviews[target] += 1;
    updateValues();
  });
});

function finalRating() {
  let final = Object.entries(reviews)
    .map((val) => val[0] * val[1])
    .reduce((a, b) => a + b);

  let ratingValue = nFormat(parseFloat(final / getTotal(reviews)).toFixed(1));
  globalValue.innerHTML = ratingValue;

  two.style.transition = 'background 1s ease-in-out';// Adjust the duration and timing function as needed

  two.style.background = `linear-gradient(to right, var(--golden-yellow-gradient) ${(ratingValue / 5) * 100
    }%, transparent 0%)`;
}

function nFormat(number) {
  if (number >= 1000 && number < 1000000) {
    return `${number.toString().slice(0, -3)}k`;
  } else if (number >= 1000000 && number < 1000000000) {
    return `${number.toString().slice(0, -6)}m`;
  } else if (number >= 1000000000) {
    return `${number.toString().slice(0, -9)}md`;
  } else if (number === "NaN") {
    return `0.0`;
  } else {
    return number;
  }
}


var slides = document.querySelectorAll(".slide");
var dots = document.querySelectorAll(".dot");
var index = 0;
var intervalId;

// Add event listeners to each dot
dots.forEach(function (dot, dotIndex) {
  dot.addEventListener("click", function () {
    index = dotIndex;
    changeSlide();
    resetInterval();
  });
});

function prevSlide(n) {
  index += n;
  changeSlide();
  resetInterval();
}

function nextSlide(n) {
  index += n;
  changeSlide();
  resetInterval();
}

changeSlide();
startInterval();

function changeSlide() {
  if (index > slides.length - 1)
    index = 0;

  if (index < 0)
    index = slides.length - 1;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].classList.remove("active");
  }

  slides[index].style.display = "block";
  dots[index].classList.add("active");
}

function startInterval() {
  intervalId = setInterval(function () {
    index++;
    changeSlide();
  }, 15000); // Change slide every 15 seconds
}

function resetInterval() {
  clearInterval(intervalId);
  startInterval();
}