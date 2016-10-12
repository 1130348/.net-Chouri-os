var count=0;
function myFunction() {
	var img = document.getElementById("imgdr");
	if(img.className=="rotateimg180"){
		img.setAttribute("class", "rotateimg0");
		var myNode = document.getElementById("myDivId");
		while (myNode.firstChild) {
			myNode.removeChild(myNode.firstChild);
		}
		count=4;
		
		
	}else{
		img.setAttribute("class", "rotateimg180");
		
	}
	
}



/*function criarFaceta(){
	
	var nodelist=docFac1.getElementsByTagName("faceta");

	var noFac,i,u;
	var noCampo;
	
	

	
	//Criar Facetas info
	for( i=0;i<nodelist.length;i++){
		
		noFac=document.createElement("DIV");
		noFac.id=count;
		noFac.className="tabcontent";
		
		noFac.appendChild(document.createElement("P"));
	
		alert(docFac1);
		if(docFac1){
			alert("OLA");
		var noFacetasList = docFac1.getElementsById(i);
		
			for( u=0;i<noFacetasList.length;u++){
				noCampo=noFacetasList[u].firstChild.nodeValue;
				alert(noCampo);
				noFac.appendChild(document.createTextNode(noCampo.firstChild.nodeValue));
			}
		}
		
		document.body.appendChild(noFac);

	}
	
}*/


/*var docFac1,docFac2,docFac3,docFac4;
function getFacetas(){
	
	docFac1=MakeXMLHTTPCall("http://phpdev2.dei.isep.ipp.pt/~arqsi/smartcity/facetas.php?sensor=1");
	docFac2=MakeXMLHTTPCall("http://phpdev2.dei.isep.ipp.pt/~arqsi/smartcity/facetas.php?sensor=2");
	docFac3=MakeXMLHTTPCall("http://phpdev2.dei.isep.ipp.pt/~arqsi/smartcity/facetas.php?sensor=3");
	docFac4=MakeXMLHTTPCall("http://phpdev2.dei.isep.ipp.pt/~arqsi/smartcity/facetas.php?sensor=4");
		
	
}*/


/*function displaySensores( ){
	
	var img = document.getElementById("imgdr");
	if(img.className!="rotateimg180"){
			MakeXMLHTTPCall("http://phpdev2.dei.isep.ipp.pt/~nsilva/smartcity/sensores.php");
	}

	
}*/

var xmlHttpObj;
//var doc, doc2;

/*function MakeXMLHTTPCall(Url){
	
	xmlHttpObj = new XMLHttpRequest();

		if (xmlHttpObj){
	
			xmlHttpObj.open("GET",Url, true);
			xmlHttpObj.onreadystatechange = function(){
				
				stateHandler();	
				
			} 
			xmlHttpObj.send(null);
		
		}
		
	return xmlHttpObj.onreadystatechange();
	 
}*/

/*function CreateXmlHttpRequestObject(){
	
	
	
}*/

/*function stateHandler(){
	
	if ( xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200 ){
		
		
		if(count==4){
			doc = xmlHttpObj.responseXML;
	
			criarListaSensores();
			count++;
			
			return doc;
			
		}else{
			alert("Paasa");
			doc2=xmlHttpObj.responseXML;
			//criarFaceta(count);
			
			return doc2;
		}
		
	}
}*/

/*function openSensor(evt, sensorId) {
    // Declare all variables
    var i, tabcontent, tablinks;
	var noFaid =document.getElementById(sensorId);

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
}*/


/*function criarListaSensores(){
	
	
	var nodelist=doc.getElementsByTagName("nome");
	var elementDiv=document.getElementById("myDivId");
	var noCheck1,texto2,label,i,lin,noFac,u,l;
	var noCampo;
	
	
	var noUl=document.createElement("UL");
	noUl.className="tab";
	
	
	//Criar Sensores
	for( i=0;i<nodelist.length;i++){
		
		lin = document.createElement("li")
		
		noA = document.createElement("a")
		noA.href="#";
		noA.id=i+1;
		noA.className="tablinks";
		noA.addEventListener("click",function(){
			openSensor(event,i);
		});
		
		
		texto2 =nodelist[i].firstChild.nodeValue;//nodeValue
		noA.appendChild(document.createTextNode(texto2));
		
		lin.appendChild(noA);
		
		noUl.appendChild(lin);	

	}
	
	elementDiv.appendChild(noUl);
	
	
	//criarFaceta();
	
	
}*/

function getFacetasAJAX(){
	
	var url = "http://phpdev2.dei.isep.ipp.pt/~arqsi/smartcity/sensores.php";
	root_element = document.getElementById("myDivId");
	makeXmlHttpGetCall(url, null, true, true, getFacetasXML, [root_element]);

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
		
		var xml = xmlHttpObj.responseXML;
		facetasXML = xml.getElementsByTagName("nome");
		
		
		for(i=0;i<facetasXML.length;i++){
			
			facetas[i] = facetasXML[i].firstChild.nodeValue;
	
		}
		
		preencheFacetas(facetas);
	}
} 

function preencheFacetas(facetas){
	
	var strHTML="";

	for(i = 0; i < facetas.length; i++){
		
		faceta = facetas[i];
		strHTML += faceta + "</br>";
		getValoresFacetaAJAX(i);
	}
	
	document.body.innerHTML = strHTML;
} 



function getValoresFacetaAJAX(i){
	i=i+1;
	
	xmlHttpObj = new XMLHttpRequest();
	if (xmlHttpObj) {
		xmlHttpObj.onreadystatechange = getValoresFacetaJSON;
		xmlHttpObj.open("GET","http://phpdev2.dei.isep.ipp.pt/~arqsi/smartcity/facetas.php?sensor=" +i, true);
		xmlHttpObj.send(null);
	}
}

function getValoresFacetaJSON(){
	var facet =[];
	var i,doc2;
	
	if ( xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200) {
	
		doc2 = xmlHttpObj.responseXML;
		alert(doc2);
		
		fac=doc2.getElementsByTagName("Nome");
		alert(fac.length);
		for(i=0;i<fac.length;i++){
			
			facet[i]=fac[i].firstChild.nodeValue;
		
		}
		
		preencheValoresFaceta(facet);
		alert("ola4");
	}
}

function preencheValoresFaceta(valoresFaceta){
	
	var strHTML;
	//alert(ola3);
	for(j = 0; j < valoresFaceta.length; j++) {
		strHTML += "<input type=checkbox name=" + j + " value=" + valoresFaceta[j] + ">"
		+ valoresFaceta[j] + "</input></br>";
	}
	
	document.body.innerHTML = strHTML;

} 








