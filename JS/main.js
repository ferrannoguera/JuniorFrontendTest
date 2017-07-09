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
function printrepos(jsonrepos){
	var taula = document.getElementById("taula");
	taula = removeoldtable(taula);
    jsonrepos.forEach((repo)=>{
		taula.appendChild(printrow(repo));
		/*considero que el de dalt es codi mes Clean, maintainable & easy­to­read
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
		  tenint en compte que el a_inner es fara despres del foreach en la taula. */
    });
}

/* Carrega els repositoris */
function chargerepos(user){
	var request = new XMLHttpRequest();
	request.open('get', 'https://api.github.com/users/'+user+'/repos', true)
	request.send();
	request.onreadystatechange = function(){
		if (request.readyState == XMLHttpRequest.DONE){
			if (request.status == 200){
				var jsonrepos = JSON.parse(request.responseText);
				printrepos(jsonrepos);
			}
			else{
				hideuser();
				error();
			}
		}
	}
}
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
				chargerepos(user);
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