let sc_carousel = document.querySelector('#sc_carousel'),
	prevButton = sc_carousel.querySelector('.prev'),
	nextButton = sc_carousel.querySelector('.next'),
	circleIndicators = sc_carousel.querySelectorAll('.circle-indicators li'),
	navUlAnchor = document.querySelector('.nav-popup ul.navbar-nav'),
	navLiEleAnchors = document.querySelectorAll('nav .nav-item .nav-link'),
	popupBoxes = document.querySelectorAll('.popupBox'),
	MenuRow = document.querySelector('#Menu .row'),
	MenuRowPart1 = MenuRow.querySelector('.part1'),
	MenuRowPart2 = MenuRow.querySelector('.part2'),
	sections = document.querySelectorAll('section, header');

nextButton.addEventListener('click',function(){
	let currentSlide = sc_carousel.querySelector('.sc-carousel-item.active'),
		newSlide = currentSlide.nextElementSibling ?? sc_carousel.querySelector('.sc-carousel-item:first-child'),
		newIndicator = sc_carousel.querySelector(`.circle-indicators li[data-index="${newSlide.getAttribute('data-item-index')}"]`);
	updateIndicator(newIndicator,currentSlide,newSlide);
});

prevButton.addEventListener('click',function(){
	 let currentSlide = sc_carousel.querySelector('.sc-carousel-item.active'),
		newSlide = currentSlide.previousElementSibling ?? sc_carousel.querySelector('.sc-carousel-item:last-child'),
		newIndicator = sc_carousel.querySelector(`.circle-indicators li[data-index="${newSlide.getAttribute('data-item-index')}"]`);
	updateIndicator(newIndicator,currentSlide,newSlide);
});

circleIndicators.forEach(function(indicator){
	indicator.addEventListener('click',function(){
		updateIndicator(this);
	});
});

showNavLinks();

sections.forEach(function(section){
	updateNavLink(section.id);
});

window.addEventListener('scroll',function(){
	sections.forEach(function(section){
		updateNavLink(section.id);
	});
});

let navLiEleAnchorsInPopup = document.querySelectorAll('.nav-popup ul.navbar-nav li a');
	navLiEleAnchorsInPopup.forEach(function(anchor){
		anchor.addEventListener('click',function(e){
			let newAnchor = this,
				currentAnchor = document.querySelector('.nav-popup ul.navbar-nav li a.active');
			currentAnchor.classList.remove('active');
			currentAnchor.parentElement.querySelector('.square').classList.add('d-none');
			newAnchor.classList.add('active');
			newAnchor.parentElement.querySelector('.square').classList.remove('d-none');

		});
	});

popupBoxes.forEach(function(popupBox){
	popupBox.addEventListener('click',function(e){
		e.stopPropagation();
	});
});