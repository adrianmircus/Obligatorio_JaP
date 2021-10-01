//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let currentID = localStorage.getItem('display-id');
let ID = [];
let productsDiv = document.getElementById("lol");
let resultData = [];
let box = document.getElementById('box')


document.addEventListener("DOMContentLoaded", function(e){

	

	let producto = document.getElementById('data');
	resultData = JSON.parse(localStorage.getItem('array'))

showProducts();
console.log(resultData)

	showComments();

});







function showProducts(id) {

const PRODUCT_SINGLE = 'https://adrianmircus.github.io/Obligatorio_JaP/json/'


let url = PRODUCT_SINGLE + id + '.json';


		getJSONData(url).then(function (resultProduct) {
			console.log(resultProduct)
		})



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
                            </div>
                        </div>
                        
                    </div> `
                    ID[i] = i;
                    console.log(ID[i])


                }

		}
		

		productsDiv.innerHTML = content;


	}

	function showComments() {
		getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultComments){
			
			if (resultComments.status == 'ok') {
				commentsArray = resultComments.data
				
			}

			


			commentsArray.forEach(function (comment) {
				let points = '';
			
			
			for (let i = 1; i <= comment.score; i++) {
				points += `<span class="fa fa-star checked"></span>`
				
				
			}

			for (let i = comment.score + 1; i <= 5; i++) {
				

				points += `<span class="fa fa-star"></span>`

			}

			box.innerHTML += `
                    <div class="col-md-3">
                        
                        <div class="card mb-3 shadow-sm custom-card">
                            <h3 class="m-3">` + comment.user + `</h3>
                            <div class="card-body">
                                <p class="card-text"> ` + comment.description + `</p>
                                <p class="card-text"> ` + comment.dateTime + `</p>
                                <p>${points}</p>
                            </div>
                        </div>
                        
                    </div> `



					});
			
		})


		
	}



