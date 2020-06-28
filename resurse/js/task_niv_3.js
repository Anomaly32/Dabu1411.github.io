
var index = 0;
var MorseCode = {
  "01": 'A',
  "1000": 'B',
  "1010": 'C',
  "100": 'D',
  "0": 'E',
  "0010": 'F',
  "110": 'G',
  "0000": 'H',
  "00": 'I',
  "0111": 'J',
  "101": 'K',
  "0100": 'L',
  "11": 'M',
  "10": 'N',
  "111": 'O',
  "0110": 'P',
  "1101": 'Q',
  "010": 'R',
  "000": 'S',
  "1": 'T',
  "001": 'U',
  "0001": 'V',
  "011": 'W',
  "1001": 'X',
  "1011": 'Y',
  "1100": 'Z',
  "0000000": ' '
};

function GetChar(code)
{
  if(!(code in MorseCode))
  {
    return '?';
  }
  else
  {
    return MorseCode[code];
  }
}

var olType = ["lower-alpha", "lower-roman", "lower-greek", "decimal", "upper-roman", "upper-alpha", "hebrew"];

function GetSectionDirectChild(col){
  let aux = [];
  for(let i = 0; i < col.length; i++)
  {
    if(col[i].tagName == "SECTION")
    {
      aux.push(col[i]);
    }
  }
	return aux;
}

function CreateLinkElem(id, nume)
{
  const a = document.createElement("a");
  a.href = "#section" + id;
  a.target = "_self";
  a.innerHTML = nume;
  return a;
}

function createLists(list, nivel)
{
  let cuprins =  document.createElement("ol");
  cuprins.style = "list-style-type: " + olType[nivel] + ";";
  for(let i = 0; i < list.length; i++)
  {
    // link catre elementul curent
    index++;
    list[i].children[0].id = "section"+index;
    const a = CreateLinkElem(index, list[i].children[0].innerHTML);

    if(GetSectionDirectChild(list[i].children).length != 0)
    {
      // ia lista de subsection-uri
      let listaSection = GetSectionDirectChild(list[i].children);
      listaSection = createLists(listaSection, nivel + 1);

      // ataseaza div-ul pe post de link
      let titlu = document.createElement("li");
      titlu.appendChild(a);
      cuprins.appendChild(titlu);

      // ataseaza sublista
      let sublist = document.createElement("div");
      sublist.appendChild(listaSection);
      cuprins.appendChild(sublist);
    }
    else
    {
      // adauga un element terminal
      let elem = document.createElement("li");
      elem.appendChild(a);
      cuprins.appendChild(elem);
    }
  }
  return cuprins;
}

window.onload = function()
{
  var main = document.body.children[1]; // main
  let aux = GetSectionDirectChild(main.children); // lista de elemente de tip section din main
  let a = createLists(aux, 0); // cuprinsul creat

  // container-ul cuprinsului
  let b = document.createElement("div");
  b.className = "cuprins";
  b.appendChild(a);

  // inserare container
  main.insertBefore(b, main.firstChild);

  // inserare subtitlu pentru claritate
  let c = document.createElement("h1");
  c.innerHTML = "Cuprins";
  main.insertBefore(c, main.firstChild);

  var lastClicked = 0;
  var currCode = "";
  var newLitera = false;
  var text = document.getElementById("morse");
  var lit_diferite;
  var cuv_diferite;
  var ignora_semnal;
  var litere = /^[a-zA-Z]+$/;
  /* MORSE */
  document.getElementById("morse").onmousedown=function(){
    clearTimeout(cuv_diferite);
    clearTimeout(lit_diferite);
    lastClicked = +new Date();
    if(newLitera)
    {
      newLitera = false;
      text.innerHTML += ' ';
    }
  }

  document.getElementById("morse").onmouseup=function(){

    cuv_diferite = setTimeout(function(){
      if(text.innerHTML[text.innerHTML.length - 1] && text.innerHTML[text.innerHTML.length - 1].match(litere)
        || (text.innerHTML[text.innerHTML.length - 2] && text.innerHTML[text.innerHTML.length - 2].match(litere) && text.innerHTML[text.innerHTML.length - 1] == ' '))
        {text.innerHTML += ' ';} }, 7000);
    lit_diferite = setTimeout(function(){

      if(GetChar(currCode) == '?' && !newLitera)
      {
        text.innerHTML = text.innerHTML.slice(0, -1);
      }
      currCode = "";
      newLitera = true;
    }, 3000);

    let clicked = +new Date();
    if(clicked - lastClicked < 1000)
    {
      currCode += 0;
      text.innerHTML = text.innerHTML.slice(0, -1);
      text.innerHTML += GetChar(currCode);
    }
    else if(clicked - lastClicked < 3000)
    {
      currCode += 1;
      text.innerHTML = text.innerHTML.slice(0, -1);
      text.innerHTML += GetChar(currCode);
    }
    else
    {
      if(GetChar(currCode) == '?')
      {
        text.innerHTML = text.innerHTML.slice(0, -1);
      }
      currCode = "";
      newLitera = true;
    }
  }

  document.getElementById("resetare").onclick=function(){
    currCode = "";
    text.innerHTML='';
  }

  document.getElementById("ignora").onclick=function(){
    if(GetChar(currCode) == '?' && !newLitera)
    {
      text.innerHTML = text.innerHTML.slice(0, -1);
    }
    currCode = "";
    newLitera = true;
  }

  document.getElementById("sterge_litera").onclick=function(){
    text.innerHTML = text.innerHTML.slice(0, -1);
    newLitera = true;
    currCode = "";
  }

}
