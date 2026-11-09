document.addEventListener('DOMContentLoaded', () => {
  let slideIndex = 0;
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let slideTimer;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;

    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
  }

  function moveSlide(step) {
    slideIndex += step;
    showSlide(slideIndex);
    resetAutoplay();
  }

  function currentSlide(index) {
    slideIndex = index;
    showSlide(slideIndex);
    resetAutoplay();
  }

  function startAutoplay() {
    slideTimer = setInterval(() => {
      slideIndex++;
      showSlide(slideIndex);
    }, 5000); // 5-second interval
  }

  function resetAutoplay() {
    clearInterval(slideTimer);
    startAutoplay();
  }

  // Event Listeners for Prev/Next Arrows
  if (prevBtn) {
    prevBtn.addEventListener('click', () => moveSlide(-1));
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => moveSlide(1));
  }

  // Event Listeners for Pagination Dots
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideNum = parseInt(e.target.getAttribute('data-slide'));
      currentSlide(slideNum);
    });
  });

  // Initialize Autoplay
  startAutoplay();
});

// Open lightbox when clicking an estate card image
document.querySelectorAll('.card-img').forEach(cardImg => {
  cardImg.addEventListener('click', function() {
    const modal = document.getElementById('imageLightbox');
    const modalImg = document.getElementById('lightboxImg');
    
    // Extract the background-image URL string
    const bgImage = this.style.backgroundImage;
    
    // Clean up the URL string to grab just the web address or path
    const imageUrl = bgImage.slice(5, -2).replace(/['"]/g, "");
    
    modal.style.display = "block";
    modalImg.src = imageUrl;
  });
});

// Close lightbox when clicking the X or anywhere on the background
function closeLightbox() {
  document.getElementById('imageLightbox').style.display = "none";
}