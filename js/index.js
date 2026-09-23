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
	sections = document.querySelectorAll('section, header'),
	navEle = document.querySelector('nav'),
	scrollYPixels = window.scrollY,
	loadingPage = document.querySelector('.loadingPage'),
	productsTypesLis = document.querySelectorAll('ul.productsTypes li');

//update active li
if(localStorage.getItem('lastActiveIndex') != null){
	let productsTypesActiveLi = document.querySelector('ul.productsTypes li.active'),
		productsTypesCurrentLi = document.querySelector(`ul.productsTypes li[data-tab-index="${JSON.parse(localStorage.getItem('lastActiveIndex'))}"]`);
	productsTypesActiveLi.classList.remove('active');
	productsTypesCurrentLi.classList.add('active');
}else{
	localStorage.setItem('lastActiveIndex','0');
}

//update products when reload
if(localStorage.getItem('lastActiveProductsType') != null){
	showProducts(null,JSON.parse(localStorage.getItem('lastActiveProductsType')));
}

/*
window.addEventListener('DOMContentLoaded',function(){
	loadingPage.classList.add('hide');
	setTimeout(function(){
		loadingPage.classList.add('d-none');
	},5000);

});*/

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

updateNavLinkOnScrollOrReload();

window.addEventListener('scroll',function(){
	updateNavClasses();
	updateNavLinkOnScrollOrReload();
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