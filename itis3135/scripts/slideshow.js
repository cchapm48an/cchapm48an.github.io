let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("demo");
  const captionText = document.getElementById("caption");

  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");
  captionText.textContent = dots[slideIndex - 1].alt;

  // ✅ Highlight the matching name letter
  highlightLetter(slideIndex - 1);
}

function highlightLetter(index) {
  const nameLetters = document.querySelectorAll(".name-letter");
  nameLetters.forEach(letter => letter.classList.remove("active"));
  nameLetters[index % nameLetters.length]?.classList.add("active");
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    plusSlides(-1);
  } else if (event.key === "ArrowRight") {
    plusSlides(1);
  }
});
