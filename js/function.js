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
	updateActiveLiWhenLoad(that.getAttribute('data-tab-index'),that.getAttribute('data-type-name'));
}

function showProducts(that = null,type){
	let typeName = that?.getAttribute('data-type-name') ?? type,
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
		addPartMenu(products,1,Math.floor(products.length / 2),true,typeName);
		addPartMenu(products,2,Math.floor(products.length / 2),true,typeName);
	}else if(isEven(products.length) == false){//the 2 parts doesnt have the same number of products(first part take length/2 +1 from products , part2 take length/2 from products)
		addPartMenu(products,1,Math.floor(( (products.length - 1) / 2 ) + 1),false,typeName);
		addPartMenu(products,2,Math.floor(products.length / 2),false,typeName);
	}

	makeActiveThenShow(1,typeName);
	makeActiveThenShow(2,typeName);

}

function makeActiveThenShow(p,typeName){
	productContent = null;
	productContent = document.querySelector(`.part${p}[data-product-type="${typeName}"] .product-content`);
	productContent.classList.add('active');
	setTimeout(function(){
		productContent.classList.add('show');
	},1000);

}

function addPartMenu(currentProducts,p,numOfProductsInPart,isEven,typeName){//p = 1 -->col-lg-6 part1 pe-5 , p=2 --> col-lg-6 part2 ps-5 (1 difference)
	MenuRow.insertAdjacentHTML('beforeend',`
		<div class="col-lg-6 part ${(p == 1) ? 'part1 pe-5' : 'part2 ps-5' } " data-product-type="${typeName}">
			<div class="item product-content">
			${prepareNewProduct(currentProducts,numOfProductsInPart,p,isEven)}
			</div>
		</div>
		`);//didnt use innerHTML because it remove copy of part1 and add p1 ,p2 so removed show from p1
}

function prepareNewProduct(productsInPart,numOfProductsInPart,p,isEven){
	let newRow = '',
		startIndex = (isEven == true) ? ( (p == 1) ? 0 : Math.floor(numOfProductsInPart ) ) : ( (p == 1) ? 0 : Math.floor(numOfProductsInPart + 1 ) ),
		endIndex;
		if(p == 1){
			endIndex = (isEven == true) ? (productsInPart.length - numOfProductsInPart) : (productsInPart.length - numOfProductsInPart + 1);
			for(let i = startIndex ; i < endIndex; i++){
				newRow += `
					<div class="row new-product img-container-parent" data-product-id="${productsInPart[i].id}">
						<div class="col-lg-3">
							<div class="item img-container rounded-4">
									<i class="fa-regular fa-square-plus open" onclick="showProductsInPopup(this)"></i>
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
											<h4>$${productsInPart[i].price}</h4>
										</div>
									</div>
								</div>
								<p class="text-start">${productsInPart[i].miniDescription}</p>

							</div>
						</div>
					</div>
				`;
			}

		}else if(p == 2){

			endIndex = (isEven == true) ? (numOfProductsInPart * 2 ) : (numOfProductsInPart * 2 + 1);
			for(let i = startIndex ; i < endIndex ; i++){
				newRow += `
					<div class="row new-product img-container-parent" data-product-id="${productsInPart[i].id}">
						<div class="col-lg-3">
							<div class="item img-container rounded-4">
									<i class="fa-regular fa-square-plus open" onclick="showProductsInPopup(this)"></i>
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
											<h4>$${productsInPart[i].price}</h4>
										</div>
									</div>
								</div>
								<p class="text-start">${productsInPart[i].miniDescription}</p>

							</div>
						</div>
					</div>
				`;
			}
		}
	
	return newRow;
}

function isEven(num){
	if(num % 2 == 0 && num != 0){
		return true;
	}else if(num % 2 != 0){
		return false;
	}else{
		return -1;
	}
}

function showProductsInPopup(that){
	let productId = that.closest('.new-product').getAttribute('data-product-id'),
		productsType = that.closest('.part').getAttribute('data-product-type'),
		product,
		productIndex,
		productsLength;

	let arrInfo = updatePopupProduct(products,product,productId,productsType,productIndex,productsLength);
	products = arrInfo[0];
	product = arrInfo[1];
	productIndex = arrInfo[2];
	productsLength = arrInfo[3];
	openPopup('product');
	popupProductBox.onclick = function(e){
		if(e.target.closest('.prev')){
			let prevButtonInPopup = document.querySelector('.popup[data-popup-name="product"] .prev'),
				prevIndex = (--productIndex),
				currentIndex = ( prevIndex == -1) ? (products.length - 1) : (prevIndex);

		arrInfo = updatePopupProduct(products,products[currentIndex],products[currentIndex].id,products[currentIndex].type,currentIndex,products.length);
		products = arrInfo[0];
		product = arrInfo[1];
		productIndex = arrInfo[2];
		productsLength = arrInfo[3];
		
		}else if(e.target.closest('.next')){
			let nextButtonInPopup = document.querySelector('.popup[data-popup-name="product"] .next'),
				nextIndex = (++productIndex),
				currentIndex = ( nextIndex == (products.length) ) ? 0 : nextIndex;

		arrInfo = updatePopupProduct(products,products[currentIndex],products[currentIndex].id,products[currentIndex].type,currentIndex,products.length);
		products = arrInfo[0];
		product = arrInfo[1];
		productIndex = arrInfo[2];
		productsLength = arrInfo[3];
		
		}
	};


}

function updatePopupProduct(products,product,productId,productsType,productIndex = undefined,productsLength){
	switch(productsType) {
		case 'BreakFast':
			products = BreakFast;
			 if(productIndex == undefined){
			 	productIndex = getProductIndex(BreakFast,productId);
			 }
			 product = products[productIndex];
			 productsLength = BreakFast.length;
			break;
		case 'Lunch':
			products = Lunch;
			if(productIndex == undefined){
			 	productIndex = getProductIndex(Lunch,productId);
			 }
			 product = products[productIndex];
			 productsLength = Lunch.length;
			break;
		case 'Dinner':
			products = Dinner;
			if(productIndex == undefined){
			 	productIndex = getProductIndex(Dinner,productId);
			 }
			 product = products[productIndex];
			 productsLength = Dinner.length;
			break;
		case 'Drinks':
			products = Drinks;
			if(productIndex == undefined){
			 	productIndex = getProductIndex(Drinks,productId);
			 }
			 product = products[productIndex];
			 productsLength = Drinks.length;
			break;
	}

	popupProductBody.innerHTML = '';
	popupProductBody.innerHTML += `
		<h2 class="text-center mb-4">${product.name}</h2>
			<div class="image mb-3">
				<img src="images/${product.images[0]}" alt="" class="img-fluid">
				<div class="price">$${product.price}</div>
				<button class="prev"><i class="fa-solid fa-chevron-left"></i></button>
				<button class="next"><i class="fa-solid fa-chevron-right"></i></button>
			</div>
			<p>${product.description}</p>
	`;

	let arr = [];
	arr.push(products,product,productIndex,productsLength);
	return arr;

}

function showNavLinks(){
	navUlAnchor.innerHTML += `
		${prepareNavLi(navLiEleAnchors)}
	`;
}

function getProduct(products,productId){
	return (products.filter((product) => product.id == productId))[0];
}

function getProductIndex(products,productId){
	return products.indexOf(getProduct(products,productId));
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

function updateActiveLiWhenLoad(lastActiveIndex,lastActiveProductsType){
	localStorage.setItem('lastActiveIndex',JSON.stringify(lastActiveIndex));
	localStorage.setItem('lastActiveProductsType',JSON.stringify(lastActiveProductsType));
}