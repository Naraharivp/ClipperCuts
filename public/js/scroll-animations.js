// Script untuk mendeteksi elemen saat scroll dan menambahkan kelas active
document.addEventListener('DOMContentLoaded', function() {
  // Function to check if an element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }

  // Function to handle scroll and reveal elements
  function handleScroll() {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((element) => {
      if (isInViewport(element)) {
        element.classList.add('active');
      }
    });
  }

  // Initial check and add event listener
  handleScroll();
  window.addEventListener('scroll', handleScroll);
});
