var s;
var xmlHttpObj;
var count,count2,countFac,countFac2;

function myFunction() {
	
	var img = document.getElementById("imgdr");
	var myCon = document.getElementById("pesquisa");
	if(img.className=="rotateimg180"){
		img.setAttribute("class", "rotateimg0");
	
		myCon.style.display = "none";
	}else{
		
		img.setAttribute("class", "rotateimg180");
	
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

    var i, tabcontent, tablinks;
	var noFaid =document.getElementById("faceta"+sensorId);


    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }


    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

  	
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

function getOpcoesGPS(checkbox){
	
	var url="http://phpdev2.dei.isep.ipp.pt/~arqsi/smartcity/valoresFacetadoSensor.php?sensor=Atividade_cardiaca&faceta=GPS";
	var partsOfStr;
	xmlHttpObj = new XMLHttpRequest();
	if (xmlHttpObj) {
		
		
		xmlHttpObj.onreadystatechange  = function() {
			if (xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200) {
				
				diva=document.createElement("DIV");
				diva.id="divGPS";
				diva.className="intoPesquisa";
				
				var options = xmlHttpObj.responseText;
			
				options=options.replace("[","");
				options=options.replace("]","");
				while(options.includes("\"")){
					options=options.replace("\"","");
				}
				
				partsOfStr = options.split(',');
				
				diva.appendChild(document.createElement("BR"));
				diva.appendChild(document.createTextNode(" GPS : "));
				da=document.createElement("SELECT");
					
				for(i=0;i<partsOfStr.length;i++){
					opti=document.createElement("OPTION");
					opti.value=partsOfStr[i];
					opti.appendChild(document.createTextNode(partsOfStr[i]));
					da.appendChild(opti);
				}
				
				diva.appendChild(da);
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
			da.min="2010-12-31";
			da.max="2020-12-31";
			da2=document.createElement("INPUT");
			da2.type="date";
			da2.min="2010-12-31";
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
			
			getOpcoesGPS(checkbox);
			
		}
		if(checkbox.id.indexOf("Preço")!=-1){
			diva=document.createElement("DIV");
			diva.id="divPreco";
			diva.className="intoPesquisa";
			
			diva.appendChild(document.createElement("BR"));
			
			da=document.createElement("INPUT");
			da.placeholder="Preço";

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

	
	var elementDiv=document.getElementById("pesquisa");
	var noA = document.getElementsByTagName("a");
	var noFac,i,u,nP,j,btn;
	var noCampo,newCheckBox,label;
	
	noFac=document.createElement("DIV");
		
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

} 

function addEventButtonResultados(){
	var c,r,t,pesquisa,inicia;
	
	var btn=document.getElementById("buttonRes"+count);
	btn.addEventListener("click", function(e) {
	var pesquisadatas="";
	var pesquisahoras="";
	var pesquisatemp="";
	var pesquisalocal="";
	var pesquisalongitude="";
	var pesquisalatitude="";
	var pesquisapreco="";
	var pesquisafonte="";
	var pesquisavalor="";
	var pesquisafoto="";
	var pesquisaindicador="";
	var pesquisagps="";
	pesquisa="";
	inicia=0;	
	var url;
	var facetas=document.getElementsByClassName("tabcontent");
	
		for(i=0;i<facetas.length;i++){
			
			if(facetas[i].style.display=="block"){
				
				var checkBoxes=facetas[i].getElementsByClassName("checkbox");
				
				for(l=0;l<checkBoxes.length;l++){
				
					if(checkBoxes[l].checked){
						pesquisa=pesquisa+";"+checkBoxes[l].id;
					}
				}
			}
		}
		
		listaCheck=pesquisa.split(";");
		
		var d=document.getElementsByClassName("intoPesquisa");
		console.log(d);
		if(d.length==0||d==null){
			numSensor=btn.parentElement.id.replace("faceta","");
			switch(numSensor){
				case "0":
					numSensor="Temperatura";
					break;
				case "1":
					numSensor="Qualidade_do_ar";
					break;
				case "2":
					numSensor="Fluxo_de_transito";
					break;
				case "3":
					numSensor="Atividade_cardiaca";
					break;
			}
			
			pes=document.getElementById("resultados");
			while (pes.firstChild) {
				
				pes.removeChild(pes.firstChild);
				
			}
			url="http://phpdev2.dei.isep.ipp.pt/~arqsi/smartcity/valoresDeSensor.php?sensor="+numSensor;	
		}else{
			for(i=0;i<d.length;i++){
				
				if(d[i].id.indexOf("Data")!=-1){
					var de= new Date(d[i].children[1].value);
					var ate=new Date(d[i].children[4].value);
					
					if(isNaN(de.getTime())||isNaN(ate.getTime())){
						alert("Datas indefinidas!");
						inicia=1;
						break;
					}
					if(ate.getTime()<de.getTime()){
						alert("Data Limite maior que Data minima!");
						d[i].children[1].value="";
						d[i].children[4].value="";
						inicia=1;
						break;
					}
					pesquisadatas="&Data_de_leitura=[";
					
					var listaDatas=getArrayDates(de,ate);
					for(u=0;u<listaDatas.length;u++){
						
						pesquisadatas=pesquisadatas+","+listaDatas[u].getFullYear()+"-"+(listaDatas[u].getMonth()+1)+"-"+listaDatas[u].getDate();
					}
					
					
					pesquisadatas=pesquisadatas.replace(",","");
					pesquisadatas=pesquisadatas+"]";
				
				}
				if(d[i].id.indexOf("Hora")!=-1){
				
					horas=d[i].children[1].value;
					minutos=d[i].children[2].value;
					segundos=d[i].children[3].value;
					tempo=horas+":"+minutos+":"+segundos
					
					pesquisahoras="&Hora_de_leitura="+tempo;
				}
				if(d[i].id.indexOf("Temp")!=-1){
						
					temp=d[i].children[1].value;
					
					pesquisatemp="&Temp="+temp;
					
				
				}
				if(d[i].id.indexOf("Local")!=-1){
					pesquisalocal="&Local=[";
					ltemp=d[i].children;
					console.log(ltemp);
					temp=d[i].children[1].value;
					for(g=0;g<ltemp.length;g++){
						if(ltemp[g].checked){
							if(ltemp[g].nextSibling.nodeValue.includes("ã")){
								pesquisalocal=pesquisalocal+","+ltemp[g].nextSibling.nodeValue.replace("ã","a");
							}else{
							pesquisalocal=pesquisalocal+","+ltemp[g].nextSibling.nodeValue;
							}
						}
					}
					
					pesquisalocal=pesquisalocal.replace(",","");
					while(pesquisalocal.includes(" ")){
						pesquisalocal=pesquisalocal.replace(" ","");
					}
					pesquisalocal=pesquisalocal+"]";
					console.log(pesquisalocal);
					
					
				}
				if(d[i].id.indexOf("Latitude")!=-1){
					
					temp=d[i].children[1].value;
					
					pesquisalatitude="&Latitude="+temp;
					
				}
				if(d[i].id.indexOf("Longitude")!=-1){
					
					temp=d[i].children[1].value;
					
					pesquisalongitude="&Longitude="+temp;
				
				}
				nom=d[i].id.replace("checkbox","");
				console.log(nom);
				if(nom.replace("div","")=="GPS"){
					gp=d[i].children[1].value;
				
					
					pesquisagps="&GPS="+gp;
				}
				if(d[i].id.indexOf("Preco")!=-1){
					temp=d[i].children[1].value;
					var regex = /^[0-9.,]+$/;
					
					if(temp==""){
						inicia=1;
						alert("Insira o Preco!");
					}else if(!regex.test(temp)){
						inicia=1;
						alert("Caracteres Inválidos!");
						d[i].children[1].value="";
					}
					console.log(temp);
					pesquisapreco="&Preco="+temp;
				}
				if(d[i].id.indexOf("Fonte")!=-1){
					pesquisafonte="&Fonte=[";
					ltemp=d[i].children;
					console.log(ltemp);
					temp=d[i].children[1].value;
					for(g=0;g<ltemp.length;g++){
						if(ltemp[g].checked){
							
							pesquisafonte=pesquisafonte+","+ltemp[g].nextSibling.nodeValue;
						}
					}
					
					pesquisafonte=pesquisafonte.replace(",","");
					while(pesquisafonte.includes(" ")){
						pesquisafonte=pesquisafonte.replace(" ","");
					}
					pesquisafonte=pesquisafonte+"]";
					console.log(pesquisafonte);
				}
				if(d[i].id.indexOf("Valor")!=-1){
					temp=d[i].children[1].value;
					
					pesquisavalor="&Valor="+temp;
				}
				if(d[i].id.indexOf("Foto")!=-1){
					pesquisafoto="&Foto=[";
					ltemp=d[i].children;
					

					for(g=0;g<ltemp.length;g++){
						if(ltemp[g].checked){
							tf=ltemp[g].nextSibling.src;
							tn=tf.substring(0, tf.length - 1);
							pesquisafoto=pesquisafoto+","+tn;
						}
					}
					
					pesquisafoto=pesquisafoto.replace(",","");
					while(pesquisafoto.includes(" ")){
						pesquisafoto=pesquisafoto.replace(" ","");
					}
					pesquisafoto=pesquisafoto+"]";
					console.log(pesquisafoto);
				}
				if(d[i].id.indexOf("Indicador")!=-1){
					pesquisaindicador="&Indicador=[";
					ltemp=d[i].children;
					console.log(ltemp);
					temp=d[i].children[1].value;
					for(g=0;g<ltemp.length;g++){
						if(ltemp[g].checked){
							
							pesquisaindicador=pesquisaindicador+","+ltemp[g].nextSibling.nodeValue;
						}
					}
					
					pesquisaindicador=pesquisaindicador.replace(",","");
					while(pesquisaindicador.includes(" ")){
						pesquisaindicador=pesquisaindicador.replace(" ","");
					}
					pesquisaindicador=pesquisaindicador+"]";
					console.log(pesquisaindicador);
				}
				
				
			}
			
			numSensor=btn.parentElement.id.replace("faceta","");
			switch(numSensor){
				case "0":
					numSensor="Temperatura";
					break;
				case "1":
					numSensor="Qualidade_do_ar";
					break;
				case "2":
					numSensor="Fluxo_de_transito";
					break;
				case "3":
					numSensor="Atividade_cardiaca";
					break;
			}
			
			pes=document.getElementById("resultados");
			while (pes.firstChild) {
				
				pes.removeChild(pes.firstChild);
				
			}
			url="http://phpdev2.dei.isep.ipp.pt/~arqsi/smartcity/valoresDeSensor.php?sensor="+numSensor;		
		}
		if(inicia==0){
			
			
			
			url=url+pesquisadatas+pesquisahoras+pesquisatemp+pesquisalocal+pesquisalatitude+pesquisalongitude+pesquisapreco+pesquisafonte+pesquisavalor+pesquisaindicador+pesquisafoto+pesquisagps;
			console.log(url);
			
			
			var listaParam="";
			
			xmlHttpObj = new XMLHttpRequest();
			if (xmlHttpObj) {
				
				
				xmlHttpObj.onreadystatechange  = function() {
					if (xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200) {
						
						var results = xmlHttpObj.responseText;
						if(results=="[]"){
							aviso=document.createTextNode("Sem Resultados Para Os Parametros Inseridos!");
							pes.appendChild(aviso);
							pes.style.display = "block";
						}else{
							listaResults=results.split("},{");
							contador=listaResults.length;
							
							for(p=0;p<listaResults.length;p++){
								while(listaResults[p].includes("\"")){
									listaResults[p]=listaResults[p].replace("\"","");
								}
								listaResults[p]=listaResults[p].replace("{","");
								listaResults[p]=listaResults[p].replace("}","");
								listaResults[p]=listaResults[p].replace("[","");
								listaResults[p]=listaResults[p].replace("]","");

							}
						
							
							t = document.createElement("TABLE");
							var listaP;
							var lis="";
							var cc=0;
							var aa;
						
							for(i=0;i<1;i++){
								
								o=t.insertRow(-1);

								lis=listaResults[i].split(",");
	
								for(l=0;l<lis.length;l++){

									c = o.insertCell(-1);
									ll=lis[l].split(":");
									c.appendChild(document.createTextNode(ll[0]));


								}		
							}
							
							
							for(i=0;i<listaResults.length;i++){
								
								o=t.insertRow(-1);

								lis=listaResults[i].split(",");
	
								for(l=0;l<lis.length;l++){

									

									ll=lis[l].split(":");
									c = o.insertCell(-1);
									if(ll[0]=="Hora_de_leitura"){
										
										c.appendChild(document.createTextNode(ll[1]+":"+ll[2]+":"+ll[3]));
									}else{
										
										c.appendChild(document.createTextNode(ll[1]));
									}

								}		
							}
			
							pes.appendChild(t);
							pes.style.display = "block";
						}
					}
				};
				xmlHttpObj.open("GET",url, true);
				xmlHttpObj.send(null);
				
			}
			
			
		}
		

		
		
	});
	
}

function getArrayDates(startDate, endDate) {
  
  var oneDay = 24*3600*1000;
  for (var d=[],ms=startDate*1,last=endDate*1;ms<last;ms+=oneDay){
    d.push( new Date(ms) );
  }
  
  
  d.push(endDate);
  return d;


}











