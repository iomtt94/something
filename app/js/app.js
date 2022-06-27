window.addEventListener('DOMContentLoaded', (e) => {

    // fetch section header and subheader
    fetch('http://localhost:3333/sectionHeader')
    .then(res => res.json())
    .then(json => {
        let { title, subtitle } = json;
        let panelsHeader = document.querySelector('.panels-container__header');
        let panelsSubheader = document.querySelector('.panels-container__subheader');

        panelsHeader.append(title);
        panelsSubheader.append(subtitle);
    });
    
    // fetch categories
    fetch('http://localhost:3333/categories')
    .then(res => res.json())
    .then(categories => {
        let tabNames = Array.from(document.getElementsByClassName('panels-list__link'));
        let categoriesNames = [];
        let categoriesText = [];
        let categoriesSecond = [];
        let categoriesImage = []

        categories.map(category => {
            categoriesNames.push(category.name)
            categoriesText.push(category.text)
            categoriesSecond.push(category.textSecond)
            categoriesImage.push(category.image)
        });

        for (let i = 0; i < tabNames.length; i++) {
            tabNames[i].append(categoriesNames[i]);
        }

        function fillTabData(categoriesNames, categoriesText, categoriesSecond, categoriesImage) {
            let tabs = Array.from(document.getElementsByClassName('panel-tab'));

            for (let i = 0; i < tabs.length; i++) {
                tabs[i].querySelector('.panel-tab__header').append(categoriesNames[i]);
                tabs[i].querySelector('.panel-tab__text').append(categoriesText[i]);
                tabs[i].querySelector('.panel-tab__text--second').append(categoriesSecond[i]);
                tabs[i].querySelector('.panel-tab__image').src = categoriesImage[i];
            }
        };

        fillTabData(categoriesNames, categoriesText, categoriesSecond, categoriesImage);

    });

    // tabs
    function Tabs() {
        let bindTabs = function() {
        let menuTabs = document.querySelectorAll('[data-tab]');

          for (let i = 0; i < menuTabs.length ; i++) {
            menuTabs[i].addEventListener('click', change, false);
          }
        }
      
        let clear = function() {
        let menuTabs = document.querySelectorAll('[data-tab]');

          for (let i = 0; i < menuTabs.length ; i++) {
            menuTabs[i].classList.remove('panels-list__link--active');

            let id = menuTabs[i].getAttribute('data-tab');

            document.getElementById(id).classList.remove('panel-tab--active');
          }
        }
      
        let change = function(e) {
          clear();
          e.target.classList.add('panels-list__link--active');

          let id = e.currentTarget.getAttribute('data-tab');

          document.getElementById(id).classList.add('panel-tab--active');
        }
      
        bindTabs();
    }
      
    new Tabs();
});

if (window.innerWidth <= 767) {
    let slideIndex = 1;
    showSlides(slideIndex);
    
    function currentSlide(n) {
      showSlides(slideIndex = n);
    }
    
    function showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("panel-tab");
      let dots = document.getElementsByClassName("dot");

      if (n > slides.length) {slideIndex = 1}

      if (n < 1) {slideIndex = slides.length}

      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
      }

      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }

      slides[slideIndex-1].style.display = "block";  
      dots[slideIndex-1].className += " active";
    }
}