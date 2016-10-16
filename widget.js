var s;
var xmlHttpObj;
var count,count2,countFac,countFac2;

function myFunction() {
	
	var img = document.getElementById("imgdr");
	//var myNode = document.getElementById("myDivId");
	var myCon = document.getElementById("pesquisa");
	if(img.className=="rotateimg180"){
		img.setAttribute("class", "rotateimg0");
	
		//myNode.style.display = "none";
		myCon.style.display = "none";
	}else{
		
		img.setAttribute("class", "rotateimg180");
		//myNode.style.display = "block";
		myCon.style.display = "block";
	}
	
}


function openSensor(evt, sensorId) {
	myFunction();
	pes=document.getElementById("resultados");
	while (pes.firstChild) {
		pes.removeChild(pes.firstChild);
	}	
	pes.style.display="none";
    // Declare all variables
    var i, tabcontent, tablinks;
	var noFaid =document.getElementById("faceta"+sensorId);

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab		
    noFaid.style.display = "block";
	
    evt.currentTarget.className += " active";
}

function addEvent(){ 
	
	var noA = document.getElementsByTagName("a");
	var i;
	var list;
	list=noA.length;
	
	noA[0].addEventListener("click",function(){
			openSensor(event,0);
		});
		
		noA[1].addEventListener("click",function(){
			openSensor(event,1);
		});
		
		noA[2].addEventListener("click",function(){
			openSensor(event,2);
		});
		
		noA[3].addEventListener("click",function(){
			openSensor(event,3);
		});
	
	/*while(list>0){
		alert(count2);
		noA[count2].addEventListener("click",function(){
			openSensor(event,count2);
		});
		count2++;
		list--;
	}*/
	
}

function getFacetasAJAX(){
	i=0;
	count=0;
	count2=0;
	countFac=0;
	countFac2=0;
	var url = "http://phpdev2.dei.isep.ipp.pt/~arqsi/smartcity/sensores.php";
	root_element = document.getElementById("myDivId");
	makeXmlHttpGetCall(url, null, true, true, getFacetasXML, [root_element]);

} 

function addCounter(){

	countFac++;
	
}

function makeXmlHttpGetCall(url, params, async, xml, callback, args){
	xmlHttpObj = new XMLHttpRequest();
	if(xmlHttpObj){
			xmlHttpObj.open("Get",url, async);
			xmlHttpObj.onreadystatechange = function() {
				if (xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200) {
					var response;
					if (xml == true){
						response = xmlHttpObj.responseXML;
					
					}else{
						
						response = xmlHttpObj.responseText;
					}
					callback(response,args);
				}
			};
			xmlHttpObj.send(null);
		
	}
}

function getFacetasXML() {
	var i;
	var facetas =[];
	if ( xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200) {
		
		if(countFac==countFac2){
			var xml = xmlHttpObj.responseXML;
			facetasXML = xml.getElementsByTagName("nome");
			
			
			for(i=0;i<facetasXML.length;i++){
				
				facetas[i] = facetasXML[i].firstChild.nodeValue;
		
			}
			
			preencheFacetas(facetas);
			
		}
	}
} 

function preencheFacetas(facetas){
	
	var elementDiv=document.getElementById("myDivId");
	var noCheck1,label,i,lin,noFac,u,l,noA;
	var noCampo;
	
	var noUl=document.createElement("UL");
	noUl.className="tab";
	
	for(i = 0; i < facetas.length; i++){
		
		faceta = facetas[i];
	
		getValoresFacetaAJAX();
				
		lin = document.createElement("li")
		
		noA = document.createElement("a")
		noA.href="#";
		noA.id="sensor"+i;
		noA.className="tablinks";
	
		noA.appendChild(document.createTextNode(faceta));
		
		lin.appendChild(noA);
		
		noUl.appendChild(lin);	
		
		
		
	}
	
	
	
	elementDiv.appendChild(noUl);
	
	addEvent();

} 



function getValoresFacetaAJAX(){
	i=i+1;
	
	var url="http://phpdev2.dei.isep.ipp.pt/~arqsi/smartcity/facetas.php?sensor="+i;
	xmlHttpObj = new XMLHttpRequest();
	if (xmlHttpObj) {
		
		xmlHttpObj.onreadystatechange = getValoresFacetaJSON;
		xmlHttpObj.open("GET",url, false);
		xmlHttpObj.send(null);
		
	}
}

function getValoresFacetaJSON(){
	
	
	var facet =[];
	var i,doc2;
	
	if( xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200) {
	
		if(countFac==countFac2){
			doc2 = xmlHttpObj.responseXML;
			
			fac=doc2.getElementsByTagName("Nome");
			
			for(i=0;i<fac.length;i++){

				facet[i]=fac[i].firstChild.nodeValue;
				
			}
			
			preencheValoresFaceta(facet);
			count++;
			
			countFac2++;
		}
		
	
		
	}
	
	lo=document.getElementById("pesquisa");
	lo.onload=document.getElementById("myDivId").style.display="block";
}

function adicionaDiv(diva,checkbox){
	
	var num=0;
	for(h=0;h<checkbox.parentElement.children.length;h++){
		
		if(checkbox==checkbox.parentElement.children[h]){
			
			num=h+2;
		}
	}

	var child = checkbox.parentElement.children[num];
	checkbox.parentElement.insertBefore(diva,child);
	
}
function getMaximo(url,da){
	
xmlHttpObj = new XMLHttpRequest();
if (xmlHttpObj) {
	
	xmlHttpObj.onreadystatechange  = function() {
		if (xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200) {
			
			var options = xmlHttpObj.responseText;
	
			options=options.replace("}","");
			options=options.replace("}","");
			while(options.includes("\"")){
				options=options.replace("\"","");
			}
			
			var partsOfStr = options.split(':');
			max=partsOfStr[1];
	
			da.setAttribute("max", max);


			
		}
	};
	xmlHttpObj.open("GET",url, false);
	xmlHttpObj.send(null);
	
}
	
}

function getMinimo(url,da){
	
xmlHttpObj = new XMLHttpRequest();
if (xmlHttpObj) {
	
	xmlHttpObj.onreadystatechange  = function() {
		if (xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200) {
			
			var options = xmlHttpObj.responseText;
		
			options=options.replace("}","");
			options=options.replace("}","");
			while(options.includes("\"")){
				options=options.replace("\"","");
			}
			
			var partsOfStr = options.split(':');
			max=partsOfStr[1];
			da.setAttribute("min", max);


			
		}
	};
	xmlHttpObj.open("GET",url, false);
	xmlHttpObj.send(null);
	
}
	
}


function getOpcoesMinMax(checkbox){
	
var nomeFaceta=checkbox.id.replace("checkbox","");
var nomeSensor=checkbox.parentElement.id.replace("faceta","");

switch(nomeSensor){
	case "0":
		nomeSensor="Temperatura";
		break;
	case "1":
		nomeSensor="Qualidade_do_ar";
		break;
	case "2":
		nomeSensor="Fluxo_de_transito";
		break;
	case "3":
		nomeSensor="Atividade_cardiaca";
		break;
}

var max=0;
var min=0;
var url="http://phpdev2.dei.isep.ipp.pt/~arqsi/smartcity/maxFaceta.php?sensor="+nomeSensor+"&facetaCont="+nomeFaceta;

diva=document.createElement("DIV");
diva.id="div"+nomeFaceta;
diva.className="intoPesquisa";

da=document.createElement("INPUT");
da.setAttribute("type", "range");

getMaximo(url,da);
	
		


var url="http://phpdev2.dei.isep.ipp.pt/~arqsi/smartcity/minFaceta.php?sensor="+nomeSensor+"&facetaCont="+nomeFaceta;
		
getMinimo(url,da);


diva.appendChild(document.createElement("BR"));
diva.appendChild(document.createTextNode("Min: "+da.min+" "));
diva.appendChild(da);
diva.appendChild(document.createTextNode(" Max: "+da.max));



adicionaDiv(diva,checkbox);
	
	
	
}

function getOpcoesFaceta(checkbox){
	
var nomeFaceta=checkbox.id.replace("checkbox","");
var nomeSensor=checkbox.parentElement.id.replace("faceta","");


switch(nomeSensor){
	case "0":
		nomeSensor="Temperatura";
		break;
	case "1":
		nomeSensor="Qualidade_do_ar";
		break;
	case "2":
		nomeSensor="Fluxo_de_transito";
		break;
	case "3":
		nomeSensor="Atividade_cardiaca";
		break;
}

	
var url="http://phpdev2.dei.isep.ipp.pt/~arqsi/smartcity/valoresFacetadoSensor.php?sensor="+nomeSensor+"&faceta="+nomeFaceta;
		
	xmlHttpObj = new XMLHttpRequest();
	if (xmlHttpObj) {
		
		
		xmlHttpObj.onreadystatechange  = function() {
			if (xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200) {
				
				var options = xmlHttpObj.responseText;
			
				options=options.replace("[","");
				options=options.replace("]","");
				while(options.includes("\"")){
					options=options.replace("\"","");
				}
				
				var partsOfStr = options.split(',');
				
				
				diva=document.createElement("DIV");
				diva.id="div"+nomeFaceta;
				diva.className="intoPesquisa";
				
				for(y=0;y<partsOfStr.length;y++){
					da=document.createElement("INPUT");
					da.type="checkbox";
					da.className="checkboxValores";
					
					diva.appendChild(da);
					
					if(nomeFaceta=="Foto"){
						img=document.createElement("IMG");
						img.src=partsOfStr[y];
						diva.appendChild(img);
						diva.appendChild(document.createElement("BR"));
						
					}else{
						diva.appendChild(document.createTextNode(partsOfStr[y]));
						diva.appendChild(document.createElement("BR"));
					}
				}
				
				
				adicionaDiv(diva,checkbox);
		
			}
		};
		xmlHttpObj.open("GET",url, true);
		xmlHttpObj.send(null);
		
	}
	
}

function OnChangeCheckbox () {
	
	var checkbox = event.target;
	
	if (checkbox.checked) {

		if(checkbox.id.indexOf("Data")!=-1){
			
			
			diva=document.createElement("DIV");
			diva.id="divData";
			diva.className="intoPesquisa";
			da=document.createElement("INPUT");
			da.type="date";
			da.max="2010-12-31";
			da2=document.createElement("INPUT");
			da2.type="date";
			da2.max="2020-12-31";
			diva.appendChild(document.createElement("BR"));
			diva.appendChild(document.createTextNode("De : "));
			diva.appendChild(da);
			diva.appendChild(document.createElement("BR"));
			diva.appendChild(document.createElement("BR"));
			diva.appendChild(document.createTextNode("Até : "));
			diva.appendChild(da2);
			
			adicionaDiv(diva,checkbox);
			
			
		}
		if(checkbox.id.indexOf("Hora")!=-1){
			
			diva=document.createElement("DIV");
			diva.id="divHora";
			diva.className="intoPesquisa";
			
			diva.appendChild(document.createElement("BR"));
			diva.appendChild(document.createTextNode(" De : "));
			diva.appendChild(document.createElement("BR"));
			
			
			da=document.createElement("SELECT");
			
			
			for(i=0;i<25;i++){
				opti=document.createElement("OPTION");
				opti.value=i;
				opti.appendChild(document.createTextNode(i));
				da.appendChild(opti);
			}
			
			da2=document.createElement("SELECT");
			for(i=0;i<61;i++){
				opti=document.createElement("OPTION");
				opti.value=i;
				da2.appendChild(opti);
				opti.appendChild(document.createTextNode(i));
			}
			
			da3=document.createElement("SELECT");
			for(i=0;i<61;i++){
				opti=document.createElement("OPTION");
				opti.value=i;
				da3.appendChild(opti);
				opti.appendChild(document.createTextNode(i));
			}
			
			diva.appendChild(document.createTextNode(" Horas : "));
			diva.appendChild(da);
			
			diva.appendChild(document.createTextNode("  Minutos : "));
			
			diva.appendChild(da2);
			
			diva.appendChild(document.createTextNode("  Segundos : "));
			diva.appendChild(da3);
			
			
			diva.appendChild(document.createElement("BR"));
			diva.appendChild(document.createElement("BR"));
			diva.appendChild(document.createTextNode(" Até : "));
			diva.appendChild(document.createElement("BR"));
			
			
			da4=document.createElement("SELECT");
			
			
			for(i=0;i<25;i++){
				opti=document.createElement("OPTION");
				opti.value=i;
				opti.appendChild(document.createTextNode(i));
				da4.appendChild(opti);
			}
			
			da5=document.createElement("SELECT");
			for(i=0;i<61;i++){
				opti=document.createElement("OPTION");
				opti.value=i;
				opti.appendChild(document.createTextNode(i));
				da5.appendChild(opti);
			}
			
			da6=document.createElement("SELECT");
			for(i=0;i<61;i++){
				opti=document.createElement("OPTION");
				opti.value=i;
				opti.appendChild(document.createTextNode(i));
				da6.appendChild(opti);
			}
			
			diva.appendChild(document.createTextNode(" Horas : "));

			diva.appendChild(da4);
			
			diva.appendChild(document.createTextNode("  Minutos : "));
	
			diva.appendChild(da5);
			
			diva.appendChild(document.createTextNode("  Segundos : "));
			diva.appendChild(da6);
			
			
			adicionaDiv(diva,checkbox);
			
		}
		if(checkbox.id.indexOf("Temp")!=-1){
				
			diva=document.createElement("DIV");
			diva.id="divTemp";
			diva.className="intoPesquisa";
			
			textBox=document.createElement("INPUT");
			textBox.placeholder="Temperatura";
			diva.appendChild(document.createElement("BR"));
			diva.appendChild(textBox);
			
			adicionaDiv(diva,checkbox);
		}
		if(checkbox.id.indexOf("Local")!=-1){
	
			getOpcoesFaceta(checkbox);
		
			
		}
		if(checkbox.id.indexOf("Latitude")!=-1){
			diva=document.createElement("DIV");
			diva.id="divLatitude";
			diva.className="intoPesquisa";
			
			textBox=document.createElement("INPUT");
			textBox.placeholder="GPS Latitude";
			diva.appendChild(document.createElement("BR"));
			diva.appendChild(textBox);
			
			adicionaDiv(diva,checkbox);
		}
		if(checkbox.id.indexOf("Longitude")!=-1){
			diva=document.createElement("DIV");
			diva.id="divLongitude";
			diva.className="intoPesquisa";
			
			textBox=document.createElement("INPUT");
			textBox.placeholder="GPS Longitude";
			diva.appendChild(document.createElement("BR"));
			diva.appendChild(textBox);
			
			adicionaDiv(diva,checkbox);
		}
		
		nom=checkbox.id.replace("checkbox","");
		if(nom=="GPS"){
			
			diva=document.createElement("DIV");
			diva.id="divGPS";
			diva.className="intoPesquisa";
			
			diva.appendChild(document.createElement("BR"));
			diva.appendChild(document.createTextNode(" GPS : "));
			da=document.createElement("SELECT");
			letters=["A","B","C","D","E","E","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
			for(i=0;i<letters.length;i++){
				opti=document.createElement("OPTION");
				opti.value=letters[i];
				opti.appendChild(document.createTextNode(letters[i]));
				da.appendChild(opti);
			}
			
			

			diva.appendChild(da);
			adicionaDiv(diva,checkbox);
		}
		if(checkbox.id.indexOf("Preço")!=-1){
			diva=document.createElement("DIV");
			diva.id="divPreco";
			diva.className="intoPesquisa";
			
			diva.appendChild(document.createElement("BR"));
			
			da=document.createElement("INPUT");
			da.placeholder="Preço";
			letters=["A","B","C","D","E","E","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

			diva.appendChild(da);
			adicionaDiv(diva,checkbox);
		}
		if(checkbox.id.indexOf("Fonte")!=-1){
			
			getOpcoesFaceta(checkbox);
			
		}
		if(checkbox.id.indexOf("Valor")!=-1){
			
			getOpcoesMinMax(checkbox);
			
		}
		if(checkbox.id.indexOf("Foto")!=-1){
			getOpcoesFaceta(checkbox);
		}
		if(checkbox.id.indexOf("Indicador")!=-1){
			getOpcoesFaceta(checkbox);
		}
	}
	else {
		listChildren=checkbox.parentElement.children;

		//for(i=0;i<listChildren.length;i++){
			
			/*if(listChildren[i].name=="div"){
				
				divR=listChildren[i];
				checkbox.parentElement.removeChild(divR);
			}*/
			
			if(checkbox.id.indexOf("Data")!=-1){
			
				checkbox.parentElement.removeChild(document.getElementById("divData"));
				
			}
			if(checkbox.id.indexOf("Hora")!=-1){
			
				checkbox.parentElement.removeChild(document.getElementById("divHora"));
				
			}
			if(checkbox.id.indexOf("Temp")!=-1){
					
				checkbox.parentElement.removeChild(document.getElementById("divTemp"));
			
			}
			if(checkbox.id.indexOf("Local")!=-1){
				
		
				checkbox.parentElement.removeChild(document.getElementById("divLocal"));
				
			}
			if(checkbox.id.indexOf("Latitude")!=-1){
				
				checkbox.parentElement.removeChild(document.getElementById("divLatitude"));
				
			}
			if(checkbox.id.indexOf("Longitude")!=-1){
				
				checkbox.parentElement.removeChild(document.getElementById("divLongitude"));
			
			}
			nom=checkbox.id.replace("checkbox","");
			if(nom=="GPS"){
				checkbox.parentElement.removeChild(document.getElementById("divGPS"));
			}
			if(checkbox.id.indexOf("Preço")!=-1){
				checkbox.parentElement.removeChild(document.getElementById("divPreco"));
			}
			if(checkbox.id.indexOf("Fonte")!=-1){
				checkbox.parentElement.removeChild(document.getElementById("divFonte"));
			}
			if(checkbox.id.indexOf("Valor")!=-1){
				checkbox.parentElement.removeChild(document.getElementById("divValor"));
			}
			if(checkbox.id.indexOf("Foto")!=-1){
				checkbox.parentElement.removeChild(document.getElementById("divFoto"));
			}
			if(checkbox.id.indexOf("Indicador")!=-1){
				checkbox.parentElement.removeChild(document.getElementById("divIndicador"));
			}
			
		//}

			
		
	}
}


function preencheValoresFaceta(valoresFaceta){
	//lista=document.getElementsByTagName("a");
	
	var elementDiv=document.getElementById("pesquisa");
	var noA = document.getElementsByTagName("a");
	var noFac,i,u,nP,j,btn;
	var noCampo,newCheckBox,label;
	
	noFac=document.createElement("DIV");
	//if(lista[count]!=null){
		
		noFac.id="faceta"+count;
		noFac.className="tabcontent";
		
		
		
		for(j = 0; j < valoresFaceta.length; j++) {
			
			
			newCheckBox = document.createElement("input");
			newCheckBox.type = "checkbox";
			newCheckBox.className="checkbox";
			newCheckBox.id ="checkbox"+valoresFaceta[j];
			newCheckBox.addEventListener ("click", OnChangeCheckbox);
			
			label = document.createElement('label');
			label.appendChild(document.createTextNode(valoresFaceta[j]));
			
			
			noFac.appendChild(newCheckBox);
			noFac.appendChild(label);
			noFac.appendChild(document.createElement("BR"));
		}
		
		btn = document.createElement("BUTTON");
		btn.id="buttonRes"+count;
		btn.setAttribute("type", "submit");
		btn.setAttribute("class","buttonSubmit");
		btn.appendChild(document.createTextNode("Resultados"));  
		noFac.appendChild(document.createElement("BR"));
		noFac.appendChild(btn);
		
		elementDiv.appendChild(noFac);
		
		countFac++;
		
		addEventButtonResultados();
	//}

} 

function addEventButtonResultados(){
	var c,r,t,pesquisa;
	var btn=document.getElementById("buttonRes"+count);
	btn.addEventListener("click", function(e) {
		
	pesquisa="";
		
	var facetas=document.getElementsByClassName("tabcontent");
	
		for(i=0;i<facetas.length;i++){
			
			if(facetas[i].style.display=="block"){
				
				var checkBoxes=facetas[i].getElementsByClassName("checkbox");
				
				for(l=0;l<checkBoxes.length;l++){
				
					if(checkBoxes[l].checked){
						pesquisa=pesquisa+";"+checkBoxes[i];
					}
				}
			}
		}
		
		console.log(pesquisa);
		
		
		pes=document.getElementById("resultados");
		while (pes.firstChild) {
			
			pes.removeChild(pes.firstChild);
			
		}	
		
		var t = document.createElement("TABLE");
		for(l=0;l<20;l++){
			r = t.insertRow(l); 
			for(i=0;i<20;i++){
				c = r.insertCell(i);
				c.appendChild(document.createTextNode("Ola"));
			}
		}

		pes.appendChild(t);
		pes.style.display = "block";
		
	});
	
}











