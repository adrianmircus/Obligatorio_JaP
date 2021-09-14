//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let currentID = localStorage.getItem('display-id');
let ID = [];
let productsDiv = document.getElementById("lol");
let resultData = [];


document.addEventListener("DOMContentLoaded", function(e){

	

	let lol = document.getElementById('lol');

	lol.innerHTML = currentID;

});


getJSONData(PRODUCTS_URL).then(function(resultArray){
		if (resultArray.status == "ok") {
			resultData = resultArray.data
			showProducts();
		}
	});


function showProducts() {
		let resultArray = resultData;
		let content = "";


		for (let i = 0; i < resultArray.length; i++) {
			let product = resultArray[i]



			//Arreglar para que use Array.filter()
			if (currentID == i) {

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
                    ID[i] = i;
                    console.log(ID[i])


                }

		}
		

		productsDiv.innerHTML = content;


	}