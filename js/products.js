//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

let resultData = [];
let productsDiv = document.getElementById("productsData");
let minPrice;
let maxPrice;
let ID = [];
let foo = false;


// SE SORTEA EL ARRAY

function setID(id) {

	console.log(id);

	localStorage.setItem('display-id', id);

	window.location.href = 'product-info.html';

};


function showProducts() {

		let resultArray = resultData;
		let content = "";


		for (let i = 0; i < resultArray.length; i++) {

			let product = resultArray[i];


			ID[i] = i;


			//Arreglar para que use Array.filter()
			if (((minPrice == undefined) || ((minPrice != undefined && parseInt(product.cost) >= minPrice))) &&
            (((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice)))) {

			content += `
                    <div class="col-md-3">
                        
                        <div class="card mb-3 shadow-sm custom-card">
                            <img class="bd-placeholder-img card-img-top"  src="` + product.imgSrc + `">
                            <h3 class="m-3">` + product.name + `</h3>
                            <div class="card-body">
                                <p class="card-text"> ` + product.description + `</p>
                                <p class="card-text"> ` + "Cantidad vendidos " + product.soldCount + `</p>
                                <p class="card-text"> ` + product.currency + " " + product.cost + `</p>
                                <button type="button" onclick=setID(`  + i +  `)>Ir</button>
                            </div>
                        </div>
                        
                    </div> `
                    
                    console.log(ID[i])


                }

		}
		

		productsDiv.innerHTML = content;

		localStorage.setItem('array', JSON.stringify(resultArray))


	}

function sortPriceAsc() {

	resultData.sort(function(a,b) {
		return parseFloat(a.cost) - parseFloat(b.cost);
	});
	
	localStorage.setItem('order', 'priceasc')
	
	showProducts();
}

function sortPriceDesc() {
	resultData.sort(function(a,b) {
		return parseFloat(b.cost) - parseFloat(a.cost);
	});
	
	showProducts();
}

function sortRelDesc() {
	resultData.sort(function(a,b) {
		return parseFloat(b.soldCount) - parseFloat(a.soldCount);
	});
	
	showProducts();
}

document.addEventListener("DOMContentLoaded", function (e) {


	getJSONData(PRODUCTS_URL).then(function(resultArray){
		if (resultArray.status == "ok") {
			resultData = resultArray.data
			showProducts();
		}
	});


	document.getElementById("filterBttn").addEventListener("click", function(){

		minPrice = document.getElementById("minPricex").value
		maxPrice = document.getElementById("maxPricex").value

		if ((minPrice != "") && (minPrice != undefined) && (minPrice >= 0)) {
			console.log(minPrice)
			minPrice = parseInt(minPrice);
		}
		else{
			minPrice = undefined;
		}

		if ((maxPrice != "") && (maxPrice != undefined) && (maxPrice >= 0)) {
			maxPrice = parseInt(maxPrice);

		}
		else{
			maxPrice = undefined;
		}

		
	showProducts();
	});




document.getElementById("clearBttn").addEventListener("click", function(){

	document.getElementById("minPricex").value = "";
	document.getElementById("maxPricex").value = "";

	minPrice = undefined;
	maxPrice = undefined;

	showProducts();


});


});


