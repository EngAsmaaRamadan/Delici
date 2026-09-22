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

function updateActive(that){
	let prevActive = that.closest('ul').querySelector('.active');
	prevActive.classList.remove('active');
	that.classList.add('active');
}

function showProducts(that,type){
	let typeName = that.getAttribute('data-type-name'),
		products;
	switch(typeName) {
		case 'BreakFast':
			products = BreakFast;
			break;
		case 'Lunch':
			products = Lunch;
			break;
		case 'Dinner':
			products = Dinner;
			break;
		case 'Drinks':
			products = Drinks;
			break;
	}
	MenuRow.innerHTML = "";
	if(isEven(products.length) == true){//the 2 parts have the same number of products
		addPartMenu(products,1,Math.floor(products.length / 2),true);
		addPartMenu(products,2,Math.floor(products.length / 2),true);
	}else if(isEven(products.length) == false){//the 2 parts doesnt have the same number of products(first part take length/2 +1 from products , part2 take length/2 from products)
		addPartMenu(products,1,Math.floor(( (products.length - 1) / 2 ) + 1),false);
		addPartMenu(products,2,Math.floor(products.length / 2),false);
	}

}

function addPartMenu(currentProducts,p,numOfProductsInPart,isEven){//p = 1 -->col-lg-6 part1 pe-5 , p=2 --> col-lg-6 part2 ps-5 (1 difference)
	MenuRow.innerHTML += `
		<div class="col-lg-6 ${(p == 1) ? 'part1 pe-5' : 'part2 ps-5' } ">
			<div class="item">
			${prepareNewProduct(currentProducts,numOfProductsInPart,p,isEven)}
			</div>
		</div>
	` ;
}

function prepareNewProduct(productsInPart,numOfProductsInPart,p,isEven){
	console.log(productsInPart);
	let newRow = '',
		startIndex = (isEven == true) ? 0 : (p == 1) ? 0 : Math.floor(numOfProductsInPart + 1 ),
		endIndex;
		if(p == 1){
			endIndex = productsInPart.length - numOfProductsInPart + 1;
		}else if(p == 2){
			endIndex = productsInPart.length;
		}
	for(let i = startIndex ; i < endIndex; i++){
		newRow += `
			<div class="row new-product" data-product-id="${productsInPart[i].id}">
				<div class="col-lg-3">
					<div class="item img-container rounded-4">
						<img src="images/${productsInPart[i].images[0]}" alt="${productsInPart[i].images[0]}" class="img-fluid">
					</div>
				</div>
				<div class="col-lg-9 ps-0">
					<div class="item py-2">
						<div class="row">
							<div class="col-lg-10 pe-0">
								<div class="item product-info">
									<h4>${productsInPart[i].name}</h4>
									<span></span>
								</div>
							</div>
							<div class="col-lg-2 ps-0">
								<div class="item">
									<h4>${productsInPart[i].price}</h4>
								</div>
							</div>
						</div>
						<p class="text-start">${productsInPart[i].miniDescription}</p>

					</div>
				</div>
			</div>
		`;
	}
	
	return newRow;
}

function isEven(num){
	if(num % 2 == 0 && num != 0){
		return true;
	}else if(num % 2 != 0){
		return false;
	}else{
		console.log('num is zero , so not even or odd');
		return -1;
	}
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
        		<a class="nav-link ${(index == 0) ? 'active' : ''}" data-anchor-index="${index + 1}" href="${navLiEleAnchor.getAttribute('href')}">${navLiEleAnchor.textContent}</a>
        	</li>
		`;
	});
	return liElements;
}

function updateNavLink(sectionId){
	let section = document.querySelector(`#${sectionId}`),
		topOfSection = section.offsetTop,
		navHeight = navEle.clientHeight,
		sectionHeight = section.clientHeight,
		sectionBottom = topOfSection + sectionHeight;
	if(window.scrollY >= topOfSection && window.scrollY <= sectionBottom){
		let currentNavLinks = document.querySelectorAll('.nav-link.active'),
			navLinksOfSection = document.querySelectorAll(`a[href="#${sectionId}"]`);
		currentNavLinks.forEach(function(currentNavLink){
			currentNavLink.classList.remove('active');
		});
		currentNavLinks[1].parentElement.querySelector('.square').classList.add('d-none');
		navLinksOfSection.forEach(function(navLinkOfSection){
			navLinkOfSection.classList.add('active');
		});
		navLinksOfSection[1].parentElement.querySelector('.square').classList.remove('d-none');
	}
}

function updateNavClasses(){
	if(window.scrollY >= 5){
		navEle.classList.add('has-background');
	}else{
		navEle.classList.remove('has-background');
	}

	if(window.scrollY > scrollYPixels){
		navEle.classList.add('scrollDown');
		scrollYPixels = window.scrollY;
	}else if(window.scrollY < scrollYPixels){
		navEle.classList.remove('scrollDown');
		scrollYPixels = window.scrollY;
	}
}

function updateNavLinkOnScrollOrReload(){
	sections.forEach(function(section){
		updateNavLink(section.id);
	});
}