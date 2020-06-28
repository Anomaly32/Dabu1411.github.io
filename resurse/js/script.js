
function randInt(a,b){
	return Math.floor(a+(b-a)*Math.random()); // [a, b)
}

class Color{
	constructor(_r=0, _g=0, _b=0){
		this.r=_r;
    this.g=_g;
    this.b=_b;
	}

	generateRandom(){
    this.r=randInt(0,256)
    this.g=randInt(0,256)
    this.b=randInt(0,256)
	}

	toString(){
		return "rgb("+this.r+","+this.g+","+this.b+")";
	}
};

function JumbleTitle()
{
	// jumble char
	setInterval(function(){
		let jumble = document.getElementById("jumble").innerHTML;
		let aux = '';
		for(let i = 0; i < jumble.length; i++)
		{
		  aux += String.fromCharCode( (jumble[i].charCodeAt() - 'a'.charCodeAt() + 2) % ('z'.charCodeAt() - 'a'.charCodeAt() + 1) + 'a'.charCodeAt() );
		}
		document.getElementById("jumble").innerHTML = aux.slice();
		let c = new Color;
		c.generateRandom();
		document.getElementById("jumble").style.color = c.toString();
	}, 3000);
}

function isTrue(arr, arr2){;
	return arr.every(i => arr2.includes(i));
}

// sortare dupa pret
function sortPret(obJocuri)
{
	obJocuri.sort(function(a,b) {
		 return a.pret-b.pret;});
}

// sortare dupa data
function sortData(obJocuri)
{
	obJocuri.sort(function(a,b) {
		 let data_a = a.dataLansare.split('-');
		 for(let i=0;i<data_a.length;i++)
		 {
			 data_a[i] = parseInt(data_a[i]);
		 }
		 let data_b = b.dataLansare.split('-');
		 for(let i=0;i<data_b.length;i++)
		 {
			 data_b[i] = parseInt(data_b[i]);
		 }
		 if(data_a[0] == data_b[0])
		 {
			 if(data_a[1] == data_b[1])
			 {
				 return data_a[2] - data_b[2];
			 }
			 else
			 {
				 return data_a[1] - data_b[1];
			 }
		 }
		 else
		 {
			 return data_a[0] - data_b[0];
		 }
		 return a.dataLansare-b.dataLansare;});
}

// sortare dupa numar de tag-uri
function sortNrTag(obJocuri)
{
	obJocuri.sort(function(a,b){
		taguri_a = a.tags.toLowerCase().replace(/\s+/g, '').split(',');
		taguri_b = b.tags.toLowerCase().replace(/\s+/g, '').split(',');
		return taguri_a.length - taguri_b.length;
	});
}

// sortare speciala dupa data
function sortDataSpeciala(obJocuri)
{
	obJocuri.sort(function(a,b) {
		 let data_a = a.dataLansare.split('-');
		 for(let i=0;i<data_a.length;i++)
		 {
			 data_a[i] = parseInt(data_a[i]);
		 }
		 let data_b = b.dataLansare.split('-');
		 for(let i=0;i<data_b.length;i++)
		 {
			 data_b[i] = parseInt(data_b[i]);
		 }
		 if(data_a[1] == data_b[1])
		 {
			 return data_a[0] - data_b[0];
		 }
		 else
		 {
			 return data_a[1] - data_b[1];
		 }
		 return a.dataLansare-b.dataLansare;});
}

// sortare complexa dupa 3 criterii
function sortComplex(obJocuri)
{
	/*
	sortPret(obJocuri);
	sortData(obJocuri);
	sortNrTag(obJocuri);
	*/
	obJocuri.sort(function(a,b) {
		let taguri_a = a.tags.toLowerCase().replace(/\s+/g, '').split(',');
		let taguri_b = b.tags.toLowerCase().replace(/\s+/g, '').split(',');
		if(taguri_a.length == taguri_b.length)
		{
			let data_a = a.dataLansare.split('-');
			for(let i=0;i<data_a.length;i++)
			{
			 data_a[i] = parseInt(data_a[i]);
			}
			let data_b = b.dataLansare.split('-');
			for(let i=0;i<data_b.length;i++)
			{
			 data_b[i] = parseInt(data_b[i]);
			}
			if(data_a[0] == data_b[0])
			{
			 if(data_a[1] == data_b[1])
			 {
				 if(data_a[2] == data_b[2])
				 {
					 return a.pret-b.pret;
				 }
				 else
				 {
					 return data_a[2] - data_b[2];
				 }
			 }
			 else
			 {
				 return data_a[1] - data_b[1];
			 }
			}
			else
			{
			 return data_a[0] - data_b[0];
			}
		}
		else
		{
			return taguri_a.length - taguri_b.length;
		}
	});
}

function eliminaDuplicate(obJocuri)
{
	var obJocuriaux1;
	var obJocuriaux2;
	for(let i = 0; i < obJocuri.length - 1; i++)
	{
		obJocuriaux1 = [obJocuri[i].nume, obJocuri[i].descriere, obJocuri[i].pret, obJocuri[i].R15, obJocuri[i].dataLansare];
		for(let j = i + 1; j < obJocuri.length; j++)
		{
			obJocuriaux2 = [obJocuri[j].nume, obJocuri[j].descriere, obJocuri[j].pret, obJocuri[j].R15, obJocuri[j].dataLansare];
			if(isTrue(obJocuriaux1, obJocuriaux2)
					&& isTrue(obJocuri[i].tags.toLowerCase().replace(/\s+/g, '').split(','), obJocuri[j].tags.toLowerCase().replace(/\s+/g, '').split(','))){
					obJocuri.splice(i, 1);
					i--;
					break;
			}
		}
	}
	console.log(obJocuri[0]);
	console.log(obJocuri[0] - obJocuri[0].id);
}

window.onload=function(){
	//creez un obiect de tip XMLHttpRequest cu care pot transmite cereri catre server
	var ajaxRequest = new XMLHttpRequest();
  var obJocuri;
	//la schimbarea starii obiectului XMLHttpRequest (la schimbarea proprietatii readyState)
	/* stari posibile:
	0 - netrimis
	1 - conexiune deschisa
	2 - s-au transmis headerele
	3 - se downleadeaza datele (datele sunt impartite in pachete si el primeste cate un stfel de pachet)
	4 - a terminat
	*/
	ajaxRequest.onreadystatechange = function() {
			//daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
			if (this.readyState == 4 && this.status == 200) {
					//in proprietatea responseText am contintul fiserului JSON
					if(!localStorage.getItem("reset"))
					{
						obJocuri = JSON.parse(this.responseText).jocuri;
						localStorage.setItem("reset", JSON.stringify(obJocuri));
						localStorage.setItem("curent", JSON.stringify(obJocuri));
					}
					JumbleTitle();
					obJocuri = JSON.parse(localStorage.getItem("curent"));
					afiseazaJsonTemplate(obJocuri);
			}
	};
	//deschid o conexiune cu o cerere de tip get catre server
	//json e pus in folderul static "resurse" deci calea e relativa la acel folder (fisierul e la calea absoluta /resurse/json/studenti.json)
	ajaxRequest.open("GET", "/json/jocuri.json", true);
	//trimit catre server cererea
	ajaxRequest.send();

	function afiseazaJsonTemplate(obJocuri) {
		  localStorage.setItem("curent", JSON.stringify(obJocuri));
			//in acets div voi afisa template-urile
			let container=document.getElementById("afisTemplate");
			//in textTemplate creez continutul (ce va deveni innerHTML-ul) divului "afisTemplate"
			let textTemplate ="";
			//parcurg vetorul de studenti din obJson
			for(let i=0;i<obJocuri.length;i++){
				//creez un template ejs (primul parametru al lui ejs.render)
				//acesta va primi ca parametru un student din vectorul de studenti din json {student: obJson.studenti[i]}
				//practic obJson.studenti[i] e redenumit ca "student" in template si putem sa ii accesam proprietatile: student.id etc
				textTemplate+=ejs.render("<div class='templ_joc'>\
				<p>Id: <%= joc.id %></p>\
				<p>Nume: <%= joc.nume %></p>\
				<p>Descriere: <%= joc.descriere %></p>\
				<p>pret: <%= joc.pret %></p>\
				<p>Rated 15: <%= joc.R15 %></p>\
				<p>Data Lansare: <%= joc.dataLansare %></p>\
				<p>Tags: <%= joc.tags %></p>\
				</div>",
				{joc: obJocuri[i]});
			}
			//adaug textul cu afisarea studentilor in container
			container.innerHTML=textTemplate;
	}

	// aducere la normal a listei
	document.getElementById("original").onclick=function(){
     obJocuri = JSON.parse(localStorage.getItem("reset"));
		 afiseazaJsonTemplate(obJocuri);
	}

	// sortare dupa pret
	document.getElementById("pret").onclick=function(){
     sortPret(obJocuri);
		 afiseazaJsonTemplate(obJocuri);
	}

	// sortare dupa data
	document.getElementById("data_lansare").onclick=function(){
     sortData(obJocuri);
		 afiseazaJsonTemplate(obJocuri);
	}

	// sortare dupa numar taguri
	document.getElementById("numar_taguri").onclick=function(){
     sortNrTag(obJocuri);
		 afiseazaJsonTemplate(obJocuri);
	}

	// sortare speciala dupa data
	document.getElementById("data_speciala").onclick=function(){
		 sortDataSpeciala(obJocuri);
		 afiseazaJsonTemplate(obJocuri);
	}

	// sortare complexa
	document.getElementById("complex").onclick=function(){
		 sortComplex(obJocuri);
		 afiseazaJsonTemplate(obJocuri);
	}

	// stergere Duplicate
	document.getElementById("stergere_duplicate").onclick=function(){
		 eliminaDuplicate(obJocuri);
		 afiseazaJsonTemplate(obJocuri);
	}

	// calculare a mediei
	document.getElementById("medie").onclick=function(){
		if(this.className == "afisat") {
			this.innerHTML = "medie: ";
			this.className = "";
		}
		else {
			var medie = 0;
			for(let i=0;i<obJocuri.length;i++)
			{
				medie += obJocuri[i].pret;
			}
			medie = parseInt((medie / obJocuri.length) * 100) / 100;
			this.innerHTML += medie;
			this.className = "afisat";
		}
	}

	// filtrare dupa taguri
	document.getElementById("cauta").onclick=function(){
		input = document.getElementById("tags").value.toLowerCase().replace(/\s+/g, '').split(',');
		for(let i=0;i<obJocuri.length;i++)
		{
			taguri = obJocuri[i].tags.toLowerCase().replace(/\s+/g, '').split(',');
			if(!isTrue(input, taguri) && !(input.length == 1 && input[0] == ""))
			{
				obJocuri.splice(i, 1);
				i--;
			}
		}
		afiseazaJsonTemplate(obJocuri);
		setTimeout(function(){ alert("Ati facut o filtrare acum 5 secunde."); }, 5000);
	}

	// eliminare element ctrl + click
  jocuri = document.getElementById("afisTemplate");
	jocuri.onclick = function(){
		for(let i = 0; i < jocuri.children.length; i++)
		{
			jocuri.children[i].onclick = function(e)
			{
				var index = jocuri.children[i].children[0].innerHTML.replace("Id: ", '');
				for(let j = 0; j < obJocuri.length; j++)
				{
					if(obJocuri[j].id == index && e.ctrlKey)
					{
						obJocuri.splice(j, 1);
						afiseazaJsonTemplate(obJocuri);
						break;
					}
				}
			}
		}
	}
}
