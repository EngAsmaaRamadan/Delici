let sc_carousel = document.querySelector('#sc_carousel'),
	prevButton = sc_carousel.querySelector('.prev'),
	nextButton = sc_carousel.querySelector('.next'),
	circleIndicators = sc_carousel.querySelectorAll('.circle-indicators li');

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

function updateIndicator(newIndicator,currentSlide = null,newSlide = null){
	let prevIndicator = document.querySelector('.circle-indicators li.active');
	
	if(currentSlide == null && newSlide == null){
		currentSlide = sc_carousel.querySelector('.sc-carousel-item.active');
		newSlide = sc_carousel.querySelector(`.sc-carousel-item[data-item-index="${newIndicator.getAttribute('data-index')}"]`);
	}
	
	currentSlide.classList.remove('active');
	newSlide.classList.add('active');
	prevIndicator.classList.remove('active');
	newIndicator.classList.add('active');
}