$(document).ready(function () {
    const images = [
      { letter: "C", word: "Chick Light", src: "../images/C_Chicklight.jpg" },
      { letter: "H", word: "Hat", src: "./images/H_HatPanthers.jpg" },
      { letter: "R", word: "Rings", src: "images/R_rings.jpg" },
      { letter: "I", word: "Iris", src: "images/I_Irisowl.jpg" },
      { letter: "S", word: "Scarfs", src: "images/S_Scarfs.jpg" },
      { letter: "T", word: "Tuilp", src: "images/T_Tuilp.jpg" },
      { letter: "I", word: "Iphone", src: "images/I_Iphone.jpg" },
      { letter: "N", word: "Notebooks", src: "images/N_Notebooks.jpg" },
      { letter: "E", word: "Emerald Ring", src: "images/E_EmeraldRing.jpg" },
      { letter: "C", word: "China Cup", src: "images/C_CupChina.jpg" },
      { letter: "H", word: "House", src: "images/H_House.jpg" },
      { letter: "A", word: "Airpods in Case", src: "images/A_Airpodsin_acase.jpg" },
      { letter: "P", word: "Pen", src: "images/P_Penfancy.jpg" },
      { letter: "M", word: "Masks", src: "images/M_Masks.jpg" },
      { letter: "A", word: "Australian Sheperd dogs", src: "images/A_AustralainSheperds.png" },
      { letter: "N", word: "Necklaces", src: "images/N_Necklace.jpg" }
    ];

    let currentIndex = 0;
    let intervalId = null;
  
    const $img = $('#slideshow-img');
    const $caption = $('#caption');
  
    // 🔴 New function to highlight current letter in the name bar
    function highlightLetter(index) {
      const nameLetters = document.querySelectorAll(".name-letter");
      nameLetters.forEach(letter => letter.classList.remove("active"));
      nameLetters[index]?.classList.add("active");
    }
  
    function updateSlide(index) {
      const item = images[index];
      $img.attr('src', item.src);
      $img.attr('alt', `${item.letter} - ${item.word}`);
      $caption.text(`${item.letter} - ${item.word}`);
      highlightLetter(index); // 🔴 Add this to update the red highlight
    }
  
    function nextSlide() {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlide(currentIndex);
    }
  
    function prevSlide() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateSlide(currentIndex);
    }
  
    function startSlide() {
      currentIndex = 0;
      updateSlide(currentIndex);
    }
  
    function endSlide() {
      currentIndex = images.length - 1;
      updateSlide(currentIndex);
    }
  
    function playSlide() {
      if (!intervalId) {
        intervalId = setInterval(nextSlide, 2000); // every 2 seconds
      }
    }
  
    function pauseSlide() {
      clearInterval(intervalId);
      intervalId = null;
    }
  
    // Button Events
    $('#nextBtn').on('click', nextSlide);
    $('#backBtn').on('click', prevSlide);
    $('#startBtn').on('click', startSlide);
    $('#endBtn').on('click', endSlide);
    $('#playBtn').on('click', playSlide);
    $('#pauseBtn').on('click', pauseSlide);
  
    // Init
    updateSlide(currentIndex);
  });
  