/* Printeja les dades del usuari */
function printuser(jsonuser){
	hideerror();
	showuser();
	document.getElementById("username").innerHTML = "@"+jsonuser.login;
	document.getElementById("username").href = "https://github.com/"+jsonuser.login;
	document.getElementById("fullname").innerHTML = jsonuser.name;
	document.getElementById("descripcio").innerHTML = jsonuser.bio;
	document.getElementById("imguser").src = jsonuser.avatar_url;
}
/* Carrega l'usuari si existeix, sino mostra l'error */
function chargeuser(user){
	var request = new XMLHttpRequest();
	request.open('get', 'https://api.github.com/users/'+user, true)
	request.send();
	request.onreadystatechange = function(){
		if (request.readyState == XMLHttpRequest.DONE){
			if (request.status == 200){
				var jsonuser = JSON.parse(request.responseText);
				printuser(jsonuser);
			}
			else{
				hideuser();
				error();
			}
		}
	}
}
/* Mostra l'user */
function showuser(){
	document.getElementById('success').style.display = "block";
}
/* Amaga l'user */
function hideuser(){
	document.getElementById('success').style.display = "none";
}
/* Mostra l'error */
function error(){
	document.getElementById('fail').style.display = "block";
}
/* Amaga l'error() */
function hideerror(){
	document.getElementById('fail').style.display = "none";
}
/* Busca l'usuari si el camp esta buit, error */
function searchuser(){
	var user = document.getElementById("input1").value;
	if (user == ''){
		hideuser();
		error();
	}
	else{
		chargeuser(user);
	}
}