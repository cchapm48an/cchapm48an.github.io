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
    dots[i].classList.remove("selected");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("selected");
  captionText.textContent = dots[slideIndex - 1].alt;

  // ✅ Highlight the matching name letter
  highlightLetter(slideIndex - 1);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    plusSlides(-1);
  } else if (event.key === "ArrowRight") {
    plusSlides(1);
  }
});
