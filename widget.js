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

function OnChangeCheckbox () {
	
	var checkbox = event.target;
	
	if (checkbox.checked) {

		if(checkbox.id.indexOf("Data")!=-1){
			diva=document.createElement("DIV");
			diva.name="div";
			da=document.createElement("INPUT");
			da.type="date";
			da.max="2010-12-31";
			diva.appendChild(da);
			var num=0;
			for(h=0;h<checkbox.parentElement.children.length;h++){
				
				if(checkbox==checkbox.parentElement.children[h]){
					console.log(checkbox.parentElement.children[h]);
					num=h+2;
				}
			}
			console.log(num);
			var child = checkbox.parentElement.children[num];
			checkbox.parentElement.insertBefore(diva,child);
			
			
		}
		if(checkbox.id.indexOf("Hora")!=-1){
			console.log("Hora");
		}
		if(checkbox.id.indexOf("Temp")!=-1){
			console.log("Temp");
		}
		if(checkbox.id.indexOf("Local")!=-1){
			var nomeFaceta=checkbox.id.replace("checkbox","");
			var nomeSensor=checkbox.parentElement.id.replace("faceta","");
			console.log(nomeFaceta);
			console.log(nomeSensor);
			var url="http://phpdev2.dei.isep.ipp.pt/~arqsi/smartcity/valoresFacetadoSensor.php?sensor="+nomeSensor+"&faceta="+nomeFaceta;
			
			xmlHttpObj = new XMLHttpRequest();
			if (xmlHttpObj) {
				
				
				xmlHttpObj.onreadystatechange  = function() {
					if (xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200) {
						
						var options = xmlHttpObj.responseText;
					
						options=options.replace("[","");
						options=options.replace("]","");
						options=options.replace("\"","");
						options=options.replace("\"","");
						options=options.replace("\"","");
						options=options.replace("\"","");
						
						var partsOfStr = options.split(',');
						
						
						diva=document.createElement("DIV");
						diva.name="div";
						
						for(y=0;y<partsOfStr.length;y++){
							da=document.createElement("INPUT");
							da.type="checkbox";
							da.className="checkboxValores";
							
							diva.appendChild(da);
							diva.appendChild(document.createTextNode(partsOfStr[y]));
							diva.appendChild(document.createElement("BR"));
						}
						
						
						var num=0;
						for(h=0;h<checkbox.parentElement.children.length;h++){
							
							if(checkbox==checkbox.parentElement.children[h]){
								
								num=h+2;
							}
						}
						
						var child = checkbox.parentElement.children[num];
						checkbox.parentElement.insertBefore(diva,child);
				
					}
				};
				xmlHttpObj.open("GET",url, true);
				xmlHttpObj.send(null);
				
			}
		
			
		}
		if(checkbox.id.indexOf("Latitude")!=-1){
			console.log("Latitude");
		}
		if(checkbox.id.indexOf("Longitude")!=-1){
			console.log("Longitude");
		}
		if(checkbox.id.indexOf("GPS")!=-1){
			console.log("GPS");
		}
		if(checkbox.id.indexOf("Preco")!=-1){
			console.log("Preco");
		}
		if(checkbox.id.indexOf("Fonte")!=-1){
			console.log("Fonte");
		}
		if(checkbox.id.indexOf("Valor")!=-1){
			console.log("Valor");
		}
		if(checkbox.id.indexOf("Foto")!=-1){
			console.log("Foto");
		}
		if(checkbox.id.indexOf("Indicador")!=-1){
			console.log("Indicador");
		}
	}
	else {
		listChildren=checkbox.parentElement.children;

		for(i=0;i<listChildren.length;i++){
			
			if(listChildren[i].name=="div"){
				console.log(listChildren[i]);
				divR=listChildren[i];
				checkbox.parentElement.removeChild(divR);
			}
			
		}	
		
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











