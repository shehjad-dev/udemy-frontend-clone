const SearchHandler = (() => {
  const elements = {
    searchInput: document.getElementById('searchInput'),
    searchInputContainer: document.getElementById('searchInputContainer'),
    searchButton: document.getElementById('searchButton'),
  };

  const classes = {
    defaultBorder: ['border-slate-400', 'hover:bg-slate-50'],
    activeBorder: ['border-violet-700', 'outline-[1px]', 'outline-violet-700'],
    buttonActive: ['cursor-pointer'],
    buttonInactive: ['opacity-20', 'cursor-not-allowed', 'disabled'],
  };

  const handleFocus = () => {
    elements.searchInputContainer.classList.remove(...classes.defaultBorder);
    elements.searchInputContainer.classList.add(...classes.activeBorder);
  };

  const handleBlur = () => {
    elements.searchInputContainer.classList.add(...classes.defaultBorder);
    elements.searchInputContainer.classList.remove(...classes.activeBorder);
  };

  const handleInput = () => {
    const hasValue = elements.searchInput.value.length > 0;
    console.log(hasValue,)
    if (hasValue) {
      elements.searchButton.classList.remove(...classes.buttonInactive);
      elements.searchButton.classList.add(...classes.buttonActive);
    } else {
      elements.searchButton.classList.add(...classes.buttonInactive);
      elements.searchButton.classList.remove(...classes.buttonActive);
    }
    // elements.searchButton.classList.toggle(...classes.buttonInactive, !hasValue);
    // elements.searchButton.classList.toggle(...classes.buttonActive, hasValue);
  };

  const init = () => {
    if (!elements.searchInput || !elements.searchInputContainer || !elements.searchButton) {
      console.error('Search elements not found');
      return;
    }
    elements.searchInput.addEventListener('focus', handleFocus);
    elements.searchInput.addEventListener('blur', handleBlur);
    elements.searchInput.addEventListener('input', handleInput);
  };

  return { init };
})();

const CarouselHandler = (() => {
  const elements = {
    track: document.querySelector('.carousel-track'),
    items: document.querySelectorAll('.carousel-item'),
    prevBtn: document.querySelector('.carousel-btn-left'),
    nextBtn: document.querySelector('.carousel-btn-right'),
  };

  const config = {
    autoSwipeInterval: 5000,
    transitionDuration: 500,
  };

  let currentIndex = 0;
  let autoSwipe = null;

  const updateCarousel = () => {
    elements.track.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  const goToNext = () => {
    currentIndex = (currentIndex + 1) % elements.items.length;
    updateCarousel();
  };

  const goToPrev = () => {
    currentIndex = (currentIndex - 1 + elements.items.length) % elements.items.length;
    updateCarousel();
  };

  const startAutoSwipe = () => {
    autoSwipe = setInterval(goToNext, config.autoSwipeInterval);
  };

  const stopAutoSwipe = () => {
    clearInterval(autoSwipe);
  };

  const init = () => {
    if (!elements.track || !elements.items.length || !elements.prevBtn || !elements.nextBtn) {
      console.error('Carousel elements not found');
      return;
    }

    elements.nextBtn.addEventListener('click', goToNext);
    elements.prevBtn.addEventListener('click', goToPrev);

    elements.track.parentElement.addEventListener('mouseenter', stopAutoSwipe);
    elements.track.parentElement.addEventListener('mouseleave', startAutoSwipe);

    startAutoSwipe();
  };

  return { init };
})();

const PricingHandler = (() => {
  const elements = {
    pricingButtons: document.querySelectorAll('.pricingDownBtn'),
  };

  const toggleContent = (button, chevron, content) => {
    content.classList.toggle('hidden');
    chevron.classList.toggle('rotate-180', !content.classList.contains('hidden'));
  };

  const init = () => {
    if (!elements.pricingButtons.length) {
      console.error('Pricing buttons not found');
      return;
    }

    elements.pricingButtons.forEach(button => {
      const chevron = button.querySelector('button');
      const content = button.nextElementSibling;

      if (!chevron || !content) {
        console.error('Pricing button structure incomplete');
        return;
      }

      chevron.classList.add('transition-transform', 'duration-300');
      button.addEventListener('click', () => toggleContent(button, chevron, content));
    });
  };

  return { init };
})();

const FeatureCarouselHandler = (() => {
  const elements = {
    featureOptions: document.querySelectorAll('.goalFeaturedOption'),
    goalFeaturedImage: document.getElementById('goalFeaturedImage'),
    carousel: document.querySelector('.carousel-v2'),
    carouselItems: document.querySelectorAll('.carousel-item-v2'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    dots: document.querySelectorAll('.carousel-dot-v2'),
  };

  const images = [
    "https://cms-images.udemycdn.com/96883mtakkm8/4kbyXne3Slx9Sfz4nTBqdf/8ac2b75db1a118f15e2fb5dfe2bb4567/desktop-hands-on-learning-2x.png",
    "https://cms-images.udemycdn.com/96883mtakkm8/GUVYFTj0uwEQuJha5j7TZ/473be949e2751dd5826b141dc4c16892/desktop-certification-prep-2x.png",
    "https://cms-images.udemycdn.com/96883mtakkm8/6q4N9BvIQusFoheoALJhGj/678c1a0bb6c2a22d95461d409492231e/desktop-insights-and-analytics-2x.png",
    "https://cms-images.udemycdn.com/96883mtakkm8/385IhnON960Wvz50ooWIN3/d4e6738c97769258d387b3d609edaad4/desktop-customizable-2x.png",
  ];

  let currentIndex = 0;

  const updateActiveOption = (index) => {
    elements.featureOptions.forEach(opt => {
      opt.classList.remove('isActiveGoal', 'bg-purple-500', 'border-purple-500');
      opt.classList.add('bg-white', 'border-slate-300');
    });
    const activeOption = elements.featureOptions[index] || elements.carouselItems[index];
    activeOption.classList.add('isActiveGoal', 'bg-purple-500', 'border-purple-500');
    activeOption.classList.remove('bg-white', 'border-slate-300');
  };

  const updateDots = (index) => {
    elements.dots.forEach(dot => dot.classList.replace('bg-purple-500', 'bg-gray-300'));
    elements.dots[index].classList.replace('bg-gray-300', 'bg-purple-500');
  };

  const updateCarousel = () => {
    elements.carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateActiveOption(currentIndex);
    elements.goalFeaturedImage.src = images[currentIndex];
    updateDots(currentIndex);
  };

  const handleDesktopClick = (option, index) => {
    currentIndex = index;
    updateCarousel();
  };

  const handleMobileNav = (direction) => {
    currentIndex = direction === 'next'
      ? (currentIndex + 1) % elements.carouselItems.length
      : (currentIndex - 1 + elements.carouselItems.length) % elements.carouselItems.length;
    updateCarousel();
  };

  const handleDotClick = (index) => {
    currentIndex = index;
    updateCarousel();
  };

  const init = () => {
    if (!elements.featureOptions.length || !elements.goalFeaturedImage || !elements.carousel || !elements.carouselItems.length) {
      console.error('Feature carousel elements not found');
      return;
    }

    elements.featureOptions.forEach((option, index) => {
      option.addEventListener('click', () => handleDesktopClick(option, index));
    });

    elements.prevBtn.addEventListener('click', () => handleMobileNav('prev'));
    elements.nextBtn.addEventListener('click', () => handleMobileNav('next'));

    elements.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => handleDotClick(index));
    });
  };

  return { init };
})();

const MobileMenuHandler = (() => {
  const elements = {
    mobileMenuBox: document.getElementById('mobileMenuBox'),
    mobileMenuButton: document.getElementById('mobileMenuButton'),
    mobileMenuList: document.getElementById('mobileMenuList'),
    customMobileMenuCloseBtn: document.getElementById('customMobileMenuCloseBtn'),
  };

  const toggleMenu = (isOpen) => {
    elements.mobileMenuBox.classList.toggle('left-0', isOpen);
    elements.mobileMenuBox.classList.toggle('left-[-100vw]', !isOpen);
  };

  const handleMenuClick = () => toggleMenu(true);

  const handleOutsideClick = (e) => {
    if (!elements.mobileMenuList.contains(e.target)) {
      toggleMenu(false);
    }
  };

  const handleCloseClick = () => toggleMenu(false);

  const init = () => {
    if (!elements.mobileMenuBox || !elements.mobileMenuButton || !elements.mobileMenuList || !elements.customMobileMenuCloseBtn) {
      console.error('Mobile menu elements not found');
      return;
    }

    elements.mobileMenuButton.addEventListener('click', handleMenuClick);
    elements.mobileMenuBox.addEventListener('click', handleOutsideClick);
    elements.customMobileMenuCloseBtn.addEventListener('click', handleCloseClick);
  };

  return { init };
})();

const App = (() => {
  const init = () => {
    try {
      feather.replace();
      SearchHandler.init();
      CarouselHandler.init();
      PricingHandler.init();
      FeatureCarouselHandler.init();
      MobileMenuHandler.init();
    } catch (error) {
      console.error('Application initialization failed:', error);
    }
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);