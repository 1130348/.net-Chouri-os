function myFunction() {
	var img = document.getElementById("imgdr");
	if(img.className=="rotateimg180"){
		img.setAttribute("class", "rotateimg0");
		var myNode = document.getElementById("myDivId");
		while (myNode.firstChild) {
			myNode.removeChild(myNode.firstChild);
		}
	}else{
		img.setAttribute("class", "rotateimg180");
		
	}
	
}

function displaySensores( ){
	
	var img = document.getElementById("imgdr");
	if(img.className!="rotateimg180"){
			MakeXMLHTTPCall("http://phpdev2.dei.isep.ipp.pt/~nsilva/smartcity/sensores.php");
	}

	
}

var xmlHttpObj;
var doc, doc2;

function MakeXMLHTTPCall(Url){
	
	xmlHttpObj = new XMLHttpRequest();

		if (xmlHttpObj){
	
			xmlHttpObj.open("GET",Url, true);
			xmlHttpObj.onreadystatechange = stateHandler;
			xmlHttpObj.send(null);
		
		}
		
	return xmlHttpObj.onreadystatechange();
	 
}

/*function CreateXmlHttpRequestObject(){
	
	
	
}*/
var count=0;
function stateHandler(){
	
	if ( xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200 ){
	
		if(count==0){
			doc = xmlHttpObj.responseXML;
	
			criarListaSensores();
			count++;
			
			return doc;
			
		}else{
			
			doc2=xmlHttpObj.responseXML;
			alert(doc2+"State");
			
			return doc2;
			
		}
		
	}
}

function criarListaSensores(){
	
	var nodelist=doc.getElementsByTagName("nome");
	var elementDiv=document.getElementById("myDivId");
	var noCheck1,texto2,label,i,lin,noFac,u,l;
	var noCampo,docFac1,docFac2,docFac3,docFac4;
	
		
	docFac1=MakeXMLHTTPCall("http:" + "//" + "phpdev2.dei.isep.ipp.pt" + "/" + "~arqsi/smartcity/facetas.php?sensor=1");
	docFac2=MakeXMLHTTPCall("http:" + "//" + "phpdev2.dei.isep.ipp.pt" + "/" + "~arqsi/smartcity/facetas.php?sensor=2");
	docFac3=MakeXMLHTTPCall("http:" + "//" + "phpdev2.dei.isep.ipp.pt" + "/" + "~arqsi/smartcity/facetas.php?sensor=3");
	docFac4=MakeXMLHTTPCall("http:" + "//" + "phpdev2.dei.isep.ipp.pt" + "/" + "~arqsi/smartcity/facetas.php?sensor=4");
		


	
	
	var noUl=document.createElement("UL");
	noUl.className="tab";
	
	//Criar Facetas info
	for( i=0;i<nodelist.length;i++){
		
		noFac=document.createElement("DIV");
		noFac.id=i;
		noFac.className="tabcontent";
		
		noFac.appendChild(document.createElement("P"));
	
		
		if(docFac1){
			
		var noFacetasList = docFac1.getElementsById();
		
			for( u=0;i<noFacetasList.length;u++){
				noCampo=noFacetasList[u].firstChild.nodeValue;
				alert(noCampo);
				noFac.appendChild(document.createTextNode(noCampo.firstChild.nodeValue));
			}
		}
		
		elementDiv.appendChild(noFac);

	}
	
	//Criar Sensores
	for( i=0;i<nodelist.length;i++){
		
	lin = document.createElement("li")
	
	noA = document.createElement("a")
	noA.href="#";
	noA.className="tablinks";
	noA.addEventListener("click",openSensor(event,i),false);
	
	
	texto2 =nodelist[i].firstChild.nodeValue;//nodeValue
	noA.appendChild(document.createTextNode(texto2));
	
	lin.appendChild(noA);
	
	noUl.appendChild(lin);	

	}
	
	elementDiv.appendChild(noUl);
	
	
	
	
	
}

function openSensor(evt, sensorId) {
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
}




