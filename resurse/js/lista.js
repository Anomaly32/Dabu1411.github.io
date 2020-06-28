
/*
Inversare lista. La dubluclick pe o lista existenta in pagina, sa se afiseze elementele ei in ordine inversa.
*/

function changeStyle()
{
  //cifre arabe, litere mari, litere mici, cifre romane
  let lista = document.getElementById("lista_spec");
  if(document.getElementById("cifre_arabe").checked)
  {
    lista.style = "list-style-type: decimal;"
  }
  else if(document.getElementById("litere_mari").checked)
  {
    lista.style = "list-style-type: upper-alpha;"
  }
  else if(document.getElementById("litere_mici").checked)
  {
    lista.style = "list-style-type: lower-alpha;"
  }
  else if(document.getElementById("cifre_romane").checked)
  {
    lista.style = "list-style-type: upper-roman;"
  }
}

window.onload=function()
{
  // inversare
  document.getElementById("lista_spec").ondblclick = function()
  {
    let lista = document.getElementById("lista_spec").children;
    for(let i = lista.length - 1; i >= 0; i--)
    {
      document.getElementById("lista_spec").appendChild(lista[i]);
    }
  }

  //radiobutton
  document.getElementById("cifre_arabe").checked = true;
  changeStyle();

  document.getElementById("radio").onclick = function(){
    changeStyle();
  }
}
