
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


var xmlHttpObj;
var count,count2,countFac,countFac2;


function openSensor(evt, sensorId) {
	myFunction();
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
	count=0;
	count2=0;
	countFac=0;
	countFac2=0;
	var url = "http://phpdev2.dei.isep.ipp.pt/~arqsi/smartcity/sensores.php";
	root_element = document.getElementById("myDivId");
	makeXmlHttpGetCall(url, null, true, true, getFacetasXML, [root_element]);

} 

function addCounter(){
	alert("Adding");
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
	//alert(facetas.length);
	for(i = 0; i < facetas.length; i++){
		
		faceta = facetas[i];
	
		getValoresFacetaAJAX(i,addCounter);
				
		lin = document.createElement("li")
		
		noA = document.createElement("a")
		noA.href="#";
		noA.id="sensor"+i;
		noA.className="tablinks";
	
		/*noA.onclick=function(){
		openSensor(event,noA.id);
		};*/

		noA.appendChild(document.createTextNode(faceta));
		
		lin.appendChild(noA);
		
		noUl.appendChild(lin);	
		
		
		
	}
	
	
	
	elementDiv.appendChild(noUl);
	
	addEvent();

} 



function getValoresFacetaAJAX(i){
	i=i+1;
	
	var url="http://phpdev2.dei.isep.ipp.pt/~arqsi/smartcity/facetas.php?sensor=" +i;
	xmlHttpObj = new XMLHttpRequest();
	if (xmlHttpObj) {
		
		xmlHttpObj.onreadystatechange = getValoresFacetaJSON;
		xmlHttpObj.open("GET",url, true);
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
}

function OnChangeCheckbox () {
		var checkbox = event.target;
		if (checkbox.checked) {
			alert ("The check box is checked.");
		}
		else {
			alert ("The check box is not checked.");
		}
}

function search () {
		
	alert ("Search Started");
		
}

function preencheValoresFaceta(valoresFaceta){
	

	var elementDiv=document.getElementById("pesquisa");
	var noA = document.getElementsByTagName("a");
	var noFac,i,u,nP,j;
	var noCampo,newCheckBox,label;
	
	noFac=document.createElement("DIV");
	noFac.id="faceta"+count;
	noFac.className="tabcontent";
	
	
	
	for(j = 0; j < valoresFaceta.length; j++) {
		
		
		newCheckBox = document.createElement("input");
		newCheckBox.type = "checkbox";
		newCheckBox.id ="facetaCheckbox"+j;
		newCheckBox.addEventListener ("CheckboxStateChange", function(){
			OnChangeCheckbox;
		});
		
		label = document.createElement('label')
		label.appendChild(document.createTextNode(valoresFaceta[j]));
		
		
		noFac.appendChild(newCheckBox);
		noFac.appendChild(label);
		noFac.appendChild(document.createElement("BR"));
	}
	
	var btn = document.createElement("BUTTON");
	var t = document.createTextNode("Resultados");  
	btn.addEventListener("click",search);
	btn.appendChild(t);  
	noFac.appendChild(btn);
	
	elementDiv.appendChild(noFac);
	
	countFac++;

} 











