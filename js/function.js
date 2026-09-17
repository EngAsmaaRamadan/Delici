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

	/*
	currentSlide.classList.remove('show');
	newSlide.classList.add('active');
	setTimeout(function(){
		currentSlide.classList.remove('active');
		currentSlide.classList.add('show');
	},500);
	*/
}

function updateActive(that){
	let prevActive = that.parentElement.querySelector('.active');
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

	MenuRowPart1.innerHTML = "";
	MenuRowPart2.innerHTML = "";
	if(isEven(products.length) == true){//the 2 parts have the same number of products
		addToPartMenu(MenuRowPart1,products,1,products.length,true);
		addToPartMenu(MenuRowPart2,products,2,products.length,true);
	}else if(isEven(products.length) == false){//the 2 parts doesnt have the same number of products(first part take length/2 +1 from products , part2 take length/2 from products)
		addToPartMenu(MenuRowPart1,products,1,( (products.length - 1) / 2 ) + 1,false);
		addToPartMenu(MenuRowPart2,products,2,products.length / 2,false);
	}

}

function addToPartMenu(menuPart,currentProducts,p,numOfProductsInPart,isEven){//p = 1 -->col-lg-6 part1 pe-5 , p=2 --> col-lg-6 part2 ps-5 (1 difference)
	menuPart.innerHTML += `
		<div class="col-lg-6 part1 ${(p == 1) ? 'part1 pe-5' : 'part2 ps-5' } ">
			<div class="item">
			${prepareNewProduct(currentProducts,numOfProductsInPart,p,isEven)}
			</div>
		</div>
	` ;
}

function prepareNewProduct(productsInPart,numOfProductsInPart,p,isEven){
	let newRow = '',
		startIndex = (isEven == true) ? numOfProductsInPart / 2 : (p == 1)  ?  ;
	console.log(numOfProductsInPart);
	for(let i = 0 ; i < numOfProductsInPart; i++){
		productsInPart.forEach(function(product){
		console.log(product);
		newRow += `
			<div class="row new-product">
				<div class="col-lg-3">
					<div class="item img-container rounded-4">
						<img src="images/${product.images[0]}" alt="${product.images[0]}" class="img-fluid">
					</div>
				</div>
				<div class="col-lg-9 ps-0">
					<div class="item py-2">
						<div class="row">
							<div class="col-lg-10 pe-0">
								<div class="item product-info">
									<h4>${product.name}</h4>
									<span></span>
								</div>
							</div>
							<div class="col-lg-2 ps-0">
								<div class="item">
									<h4>${product.price}</h4>
								</div>
							</div>
						</div>
						<p class="text-start">${product.miniDescription}</p>

					</div>
				</div>
			</div>
		`;
	});
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
        		<a class="nav-link ${(index == 0) ? 'active' : ''}" data-anchor-index="${index + 1}" href="#${navLiEleAnchor.href}">${navLiEleAnchor.textContent}</a>
        	</li>
		`;
	});
	return liElements;
}