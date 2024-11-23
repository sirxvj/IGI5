class Slider
{
  constructor(selector, config = {})
  {
    this.slider = document.querySelector(selector);
    this.slides = this.slider.querySelectorAll('.slide');
    this.prevButton = this.slider.querySelector('.prev');
    this.nextButton = this.slider.querySelector('.next');
    this.dots = this.slider.querySelectorAll('.pag div');
    this.pagination = this.slider.querySelector('.pag');
    this.currentSlide = 0;

    this.config = {
      allowCycle: true,
      autoScroll: true,
      hoverPause: true,
      intervalTime: 5000,
      showArrows: true,
      showPagination: true,
      ...config
    };

    this.slideInterval = null;

    this.init();
  }

  init()
  {
    this.showSlide(this.currentSlide);
    this.startInterval();

    if (this.prevButton)
    {
      this.prevButton.addEventListener('click', this.prevSlide.bind(this));
    }
    if (this.nextButton)
    {
      this.nextButton.addEventListener('click', this.nextSlide.bind(this));
    }

    this.dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => this.goToSlide(idx));
    });

    this.mouseHoverPause();
  }

  mouseHoverPause()
  {
    if (this.config.hoverPause)
    {
      this.slider.addEventListener('mouseenter', () => clearInterval(this.slideInterval), { once: true });
      this.slider.addEventListener('mouseleave', () => this.startInterval(), { once: true });
    }
    else
    {
      this.slider.removeEventListener('mouseenter', () => clearInterval(this.slideInterval), { once: true });
      this.slider.removeEventListener('mouseleave', () => this.startInterval(), { once: true });
    }
  }

  showSlide(index)
  {
    if (index < 0)
    {
      this.currentSlide = this.config.allowCycle ? this.slides.length - 1 : 0;
    }
    else if (index >= this.slides.length)
    {
      this.currentSlide = this.config.allowCycle ? 0 : this.slides.length - 1;
    }
    else
    {
      this.currentSlide = index;
    }

    const offset = -this.currentSlide * 100;
    this.slider.querySelector('.slider-wrapper').style.transform = `translateX(${offset}%)`;
    this.updateDots();
    this.slides[this.currentSlide].querySelector('.counter').innerHTML = this.currentSlide + 1 + "/" + this.slides.length;
  }

  updateDots()
  {
    this.dots.forEach((dot, idx) => {
      dot.classList.toggle('active-dot', idx === this.currentSlide);
    });
  }

  prevSlide()
  {
    this.showSlide(this.currentSlide - 1);
    this.resetInterval();
  }

  nextSlide()
  {
    this.showSlide(this.currentSlide + 1);
    this.resetInterval();
  }

  goToSlide(index)
  {
    this.showSlide(index);
    this.resetInterval();
  }

  autoSlide()
  {
    this.showSlide(this.currentSlide + 1);
  }

  startInterval()
  {
    if (this.config.autoScroll)
    {
      this.slideInterval = setInterval(this.autoSlide.bind(this), this.config.intervalTime);
    }
  }

  stopInterval()
  {
    clearInterval(this.slideInterval);
  }

  resetInterval()
  {
    this.stopInterval();
    this.startInterval();
  }

  pause()
  {
    this.stopInterval();
  }

  resume()
  {
    this.startInterval();
  }

  applySettings(config)
  {
    this.config = { ...this.config, ...config };

    this.prevButton.style.display = this.config.showArrows ? 'block' : 'none';
    this.nextButton.style.display = this.config.showArrows ? 'block' : 'none';

    this.pagination.style.display = this.config.showPagination ? 'block' : 'none';

    this.mouseHoverPause();
    this.resetInterval();
  }
}

const mySlider = new Slider('.slider');

document.getElementById('applySettings').addEventListener('click', () => {
  const newConfig = {
    allowCycle: document.getElementById('allowCycle').checked,
    showArrows: document.getElementById('showArrows').checked,
    showPagination: document.getElementById('showPagination').checked,
    autoScroll: document.getElementById('allowAutoScroll').checked,
    hoverPause: document.getElementById('allowHoverPause').checked,
    intervalTime: document.getElementById('autoScrollTime').value * 1000
  };

  mySlider.applySettings(newConfig);
});