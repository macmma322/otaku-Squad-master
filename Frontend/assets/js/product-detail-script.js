document.addEventListener("DOMContentLoaded", function () {
  var hearts = document.querySelectorAll(".heart");

  hearts.forEach(function (heart) {
    heart.addEventListener("click", function () {
      this.classList.toggle("is-active");
    });
  });
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