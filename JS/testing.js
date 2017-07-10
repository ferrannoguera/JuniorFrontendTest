var jsonuserglobal;
var jsonreposglobal;
var is_error = false;


/*cada case consisteix en una columna de la fila que printeja */
function printrow(repo){
	var tr = document.createElement("tr");
	for (var i = 0; i<5; ++i) {
		switch(i){
			case 0:
				var td = document.createElement("td");
				td.id = "namerepo";
				var repositori = document.createElement("a");
				repositori.class = "url";
				repositori.href = "https://github.com/"+repo.owner.login+"/"+repo.name;
				repositori.innerHTML = repo.name;
				td.appendChild(repositori);
				tr.appendChild(td);
				break;
			case 1:
				td = document.createElement("td");
				td.class = "number";
				var img = document.createElement("img");
				img.id = "star";
				img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Octicons-star.svg/2000px-Octicons-star.svg.png";
			 	td.appendChild(img);
				tr.appendChild(td);
				break;
			case 2:
				td = document.createElement("td");
				td.class = "number";
				td.innerHTML = repo.stargazers_count;
				tr.appendChild(td);
				break;
			case 3:
				td = document.createElement("td");
				td.class = "number";
				img = document.createElement("img");
				img.id = "fork";
				img.src = "http://timhettler.github.io/sassconf-2015/slides/assets/svg/fork.svg";
			 	td.appendChild(img);
				tr.appendChild(td);
				break;
			case 4:
				td = document.createElement("td");
				td.class = "number";
				td.innerHTML = repo.forks_count;
				tr.appendChild(td);
				break;
			default:
				break;
		}
	}
	return tr;
}
/* elimina l'antiga taula */
function removeoldtable(taula){
	while (taula.firstChild) {
    	taula.removeChild(taula.firstChild);
	}
	return taula;
}
/* Printeja els repositoris */
function printrepos(){
	var taula = document.getElementById("taula");
	taula = removeoldtable(taula);
    jsonreposglobal.forEach(function(repo) {
		taula.appendChild(printrow(repo));
		/*
		considero que el de dalt es codi mes Clean, maintainable & easy­to­read
		pero tambe es podria realitzar de la seguent manera:
	  	a_inner = a_inner+"<tr>"+
		"<td id='namerepo'>"+
		"<a class='url' href='https://github.com/"+repo.owner.login+"/"+repo.name+"'>"+repo.name+"</a>"+
		"</td>"+
		"<td class='number'><img id='star' src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Octicons-star.svg/2000px-Octicons-star.svg.png'></td>"+
		"<td class='number'>"+repo.stargazers_count+"</td>"+
		"<td class='number'><img id='fork' src='http://timhettler.github.io/sassconf-2015/slides/assets/svg/fork.svg'></td>"+
		"<td class='number'>"+repo.forks_count+"</td>"+
		"</tr>";
		tenint en compte que el a_inner es fara despres del foreach en la taula. 
		  */
    });
}
/* Printeja les dades del usuari */
function printuser(){
	showuser();
	document.getElementById("username").innerHTML = "@"+jsonuserglobal.login;
	document.getElementById("username").href = "https://github.com/"+jsonuserglobal.login;
	document.getElementById("fullname").innerHTML = jsonuserglobal.name;
	document.getElementById("descripcio").innerHTML = jsonuserglobal.bio;
	document.getElementById("imguser").src = jsonuserglobal.avatar_url;
}
/* Mostra l'user i amaga l'error */
function showuser(){
	document.getElementById('fail').style.display = "none";
	document.getElementById('success').style.display = "block";
}
/* Mostra l'error i amaga usuari */
function error(){
	document.getElementById('success').style.display = "none";
	document.getElementById('fail').style.display = "block";
}
/* Detecta que s'ha apretat el botó search */
function searchpressed() {
	var user = document.getElementById("input1").value;
	UnityTesting.searchuser(user);
	if (!is_error){
		printuser();
		printrepos();
	}
	else{
		error();
		is_error = false;
	}

}
var UnityTesting = {
	tocheck:{
		error:"Not an Error",
		jsonuser:undefined,
		jsonrepos:undefined
	},
	/* Busca l'usuari si el camp esta buit, error */
	searchuser: function(user){
		if (user == ''){
			this.tocheck.error = "Error";
			is_error = true;
		}
		else{
			this.chargeuser(user);
			this.chargerepos(user);
		}
	},
	/* Carrega l'usuari si existeix, sino mostra l'error */
	chargeuser: function(user){
		var request = new XMLHttpRequest();
		request.open('GET', 'https://api.github.com/users/'+user,false);
		request.send();
		if (request.status == 200) {
			this.tocheck.jsonuser = JSON.parse(request.responseText);
			jsonuserglobal = this.tocheck.jsonuser;
		}
		else {
			this.tocheck.error = "Error";
			is_error = true;
		}
	},
	/* Carrega els repositoris */
	chargerepos: function(user){
		var request = new XMLHttpRequest();
		request.open('get', 'https://api.github.com/users/'+user+'/repos', false)
		request.send();
		if (request.status == 200) {
			this.tocheck.jsonrepos = JSON.parse(request.responseText);
			jsonreposglobal = this.tocheck.jsonrepos;
		}
		else {
			this.tocheck.error = "Error";
			is_error = true;
		}
	}
}