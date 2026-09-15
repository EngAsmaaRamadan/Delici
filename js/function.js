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

function openPopup(popupName){
	let popupEle = document.querySelector(`.popup[data-popup-name="${popupName}"]`);
	popupEle.classList.add('active');
	setTimeout(function(){
		popupEle.classList.add('show');	
	},100);
}

function closePopup(popupName){
	let popupEle = document.querySelector(`.popup[data-popup-name="${popupName}"]`);
	popupEle.classList.remove('show');
	setTimeout(function(){
		popupEle.classList.remove('active');	
	},1000);
}

function showNavLinks(){
	navUlAnchor.innerHTML += `
		${prepareNavLi(navLiEleAnchors)}
	`;
}

function prepareNavLi(navLiEleAnchors){
	let liElements = "";
	navLiEleAnchors.forEach(function(navLiEleAnchor,index){
		liElements += `
			<li class="nav-item">
				<div class="square ${(index == 0) ? '' : 'd-none'}"></div>
        		<a class="nav-link ${(index == 0) ? 'active' : ''}" data-anchor-index="${index + 1}" href="#${navLiEleAnchor.href}">${navLiEleAnchor.textContent}</a>
        	</li>
		`;
	});
	return liElements;
}