//Déclaration de variables
var btnmenu = document.getElementById("btnmenu");
var menu = document.getElementById("monmenu")
var close_menu = document.getElementById("close_menu");


//Afficher le menu lorsque le bouton menu est cliqué

btnmenu.onclick = function(){
	//Afficher le menu
	menu.style.display = "block";
	//Afficher l'option fermer le m.
	close_menu.style.display = "inline";
	btnmenu.style.display = "none";
}

//Fermer le menu lorsqu'un lien est cliqué

/*
menu.onclick = function(){
	menu.style.display = "none";
	close_menu.style.display = "none";
	btnmenu.style.display = "inline";
}

*/


//Fermer le menu lorsque le bouton 
close_menu.onclick = function(){
	menu.style.display ="none";
	close_menu.style.display = "none";
	btnmenu.style.display = "inline";
}
