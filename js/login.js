//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){

	
	


});

document.getElementById("loginBttn").addEventListener("click", function(){

	let userEmail = document.getElementById("inputEmail").value;

	localStorage.setItem("Email", String(userEmail));



});