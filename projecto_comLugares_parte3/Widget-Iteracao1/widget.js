var s,xmlHttpObj,count,count2,countFac,countFac2;

function myFunction() {
	
	var img = document.getElementById("imgdr");
	var myCon = document.getElementById("pesquisa");
	if(img.className=="rotateimg180"){
		img.setAttribute("class", "rotateimg0");
		myCon.style.display = "none";
		pes=document.getElementById("resultados");
		while (pes.firstChild) {
			pes.removeChild(pes.firstChild);
		}	
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
	var i, list;
	list=noA.length;
	
	noA[0].addEventListener("click",function(){	openSensor(event,0);});
	noA[1].addEventListener("click",function(){openSensor(event,1);});
	noA[2].addEventListener("click",function(){openSensor(event,2);});
	noA[3].addEventListener("click",function(){openSensor(event,3);});
	
}

function getFacetasAJAX(){
	
	i=0,count=0,count2=0,countFac=0,countFac2=0;
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

	var i,facetas =[];
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
	var noCheck1,label,i,lin,noFac,u,l,noA,noCampo;
	
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
	
	var facet =[],i,doc2;
	
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

	nomeSensor=getSensor(nomeSensor);

	var max=0, min=0;
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
	diva.appendChild(document.createElement("BR"));
	
	val=document.createTextNode("Valor: "+da.value);
	diva.appendChild(val);
	
	da.addEventListener("input", function() {
		val.textContent = "Valor: "+da.value;
	}, false);
	
	adicionaDiv(diva,checkbox);
}

function getOpcoesFaceta(checkbox){
	
var nomeFaceta=checkbox.id.replace("checkbox","");
var nomeSensor=checkbox.parentElement.id.replace("faceta","");

nomeSensor=getSensor(nomeSensor);
	
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
		
			
			adicionaDiv(addDataDisplay(),checkbox);
					
		}
		if(checkbox.id.indexOf("Hora")!=-1){
			
			adicionaDiv(addHorasDisplay(),checkbox);
			
		}
		if(checkbox.id.indexOf("Temp")!=-1){
				
			diva=document.createElement("DIV");
			diva.id="divTemp";
			diva.className="intoPesquisa";
			
			textBox=document.createElement("INPUT");
			textBox.placeholder="Temperatura";
			textBox2=document.createElement("INPUT");
			textBox2.placeholder="Temperatura";
			diva.appendChild(document.createTextNode("De:"));
			diva.appendChild(document.createElement("BR"));
			diva.appendChild(textBox);
			diva.appendChild(document.createElement("BR"));
			diva.appendChild(document.createTextNode("Até:"));
			diva.appendChild(document.createElement("BR"));
			diva.appendChild(textBox2);
			
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
			textBox2=document.createElement("INPUT");
			textBox2.placeholder="GPS Latitude";
			
			diva.appendChild(document.createTextNode("De:"));
			diva.appendChild(document.createElement("BR"));
			diva.appendChild(textBox);
			diva.appendChild(document.createElement("BR"));
			diva.appendChild(document.createTextNode("Até:"));
			diva.appendChild(document.createElement("BR"));
			diva.appendChild(textBox2);
			adicionaDiv(diva,checkbox);
		}
		if(checkbox.id.indexOf("Longitude")!=-1){
			diva=document.createElement("DIV");
			diva.id="divLongitude";
			diva.className="intoPesquisa";
			
			textBox=document.createElement("INPUT");
			textBox.placeholder="GPS Longitude";	
			textBox2=document.createElement("INPUT");
			textBox2.placeholder="GPS Longitude";
			
			diva.appendChild(document.createTextNode("De:"));
			diva.appendChild(document.createElement("BR"));
			diva.appendChild(textBox);
			diva.appendChild(document.createElement("BR"));
			diva.appendChild(document.createTextNode("Até:"));
			diva.appendChild(document.createElement("BR"));
			diva.appendChild(textBox2);
			
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
			da2=document.createElement("INPUT");
			da2.placeholder="Preço";
			
			diva.appendChild(document.createTextNode("De:"));
			diva.appendChild(document.createElement("BR"));
			diva.appendChild(da);
			diva.appendChild(document.createElement("BR"));
			diva.appendChild(document.createTextNode("Até:"));
			diva.appendChild(document.createElement("BR"));
			diva.appendChild(da2);
			
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
	}
}


function preencheValoresFaceta(valoresFaceta){

	var elementDiv=document.getElementById("pesquisa");
	var noA = document.getElementsByTagName("a");
	var noFac,i,u,nP,j,btn,noCampo,newCheckBox,label;
	
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
	
	var tempActivo=false,gpsLatActivo=false,gpsLonActivo=false,precoActivo=false;
	var tempValorDe,tempValorAte,gpsLatValorDe,gpsLatValorAte,gpsLonValorDe,gpsLonValorAte,precoValorDe,precoValorAte;
	var horaActiva=false;
	
	var btn=document.getElementById("buttonRes"+count);
	btn.addEventListener("click", function(e) {
	var c,r,t,pesquisa,pesquisadatas="", pesquisahoras="", pesquisatemp="",pesquisalocal="",pesquisalongitude="",pesquisalatitude="",pesquisapreco="", pesquisafonte="", pesquisavalor="", pesquisafoto="", pesquisaindicador="",pesquisagps="",pesquisa="",inicia=0,url;
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
	if(d.length==0||d==null){
		numSensor=btn.parentElement.id.replace("faceta","");
		numSensor=getSensor(numSensor);
		
		pes=document.getElementById("resultados");
		while (pes.firstChild) {
			pes.removeChild(pes.firstChild);
		}
		
		var pesquisadatas="",pesquisahoras="",pesquisatemp="",pesquisalocal="",pesquisalongitude="",pesquisalatitude="",pesquisapreco="",pesquisafonte="",pesquisavalor="",pesquisafoto="",pesquisaindicador="", pesquisagps="";
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
			
				horas=d[i].children[3].value;
				minutos=d[i].children[4].value;
				segundos=d[i].children[5].value;
				horaValorDe=(Number(horas)*60*60)+(Number(minutos)*60)+Number(segundos);
				
				horas2=d[i].children[10].value;
				minutos2=d[i].children[11].value;
				segundos2=d[i].children[12].value;
				horaValorAte=(Number(horas2)*60*60)+(Number(minutos2)*60)+Number(segundos2);
				

				if(Number(horaValorDe)>Number(horaValorAte)){
					alert("Parametros Da faceta Temp Errados!");
					horas=d[i].children[3].value=0;
					minutos=d[i].children[4].value=0;
					segundos=d[i].children[5].value=0;
					
					horas2=d[i].children[10].value=0;
					minutos2=d[i].children[11].value=0;
					segundos2=d[i].children[12].value=0;
					horaActivo=false;
					inicia=1;
				}else{
					horaActiva=true;
				}
				
	
				pesquisahoras="";
			}
			if(d[i].id.indexOf("Temp")!=-1){
					
				
				tempValorDe=d[i].children[1].value;
				tempValorAte=d[i].children[4].value;
				if(Number(tempValorDe)>Number(tempValorAte)){
					alert("Parametros Da faceta Temp Errados!");
					d[i].children[1].value="";
					d[i].children[4].value="";
					tempActivo=false;
					inicia=1;
				}else{
					tempActivo=true;
				}
				pesquisatemp="";
				
			
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
						}else if(ltemp[g].nextSibling.nodeValue.includes("á")){
							pesquisalocal=pesquisalocal+","+ltemp[g].nextSibling.nodeValue.replace("á","a");
						}else{
							pesquisalocal=pesquisalocal+","+ltemp[g].nextSibling.nodeValue;
						}
					}
				}
				
				pesquisalocal=pesquisalocal.replace(",","");
				pesquisalocal=pesquisalocal.replace(" ","");
				pesquisalocal=pesquisalocal+"]";			
			}
			if(d[i].id.indexOf("Latitude")!=-1){			
				
				gpsLatValorDe=d[i].children[1].value;
				gpsLatValorAte=d[i].children[4].value;
				if(Number(gpsLatValorDe)>Number(gpsLatValorAte)){
					alert("Parametros Da faceta Latitude Errados!");
					d[i].children[1].value="";
					d[i].children[4].value="";
					gpsLatActivo=false;
					inicia=1;
				}else{
					gpsLatActivo=true;
				}
				pesquisatemp="";
			}
			if(d[i].id.indexOf("Longitude")!=-1){	
				
				gpsLonValorDe=d[i].children[1].value;
				gpsLonValorAte=d[i].children[4].value;
				if(Number(gpsLonValorDe)>Number(gpsLonValorAte)){
					alert("Parametros Da faceta Longitude Errados!");
					d[i].children[1].value="";
					d[i].children[4].value="";
					gpsLonActivo=false;
					inicia=1;
				}else{
					gpsLonActivo=true;
				}
				pesquisatemp="";
			}
			nom=d[i].id.replace("checkbox","");
			
			if(nom.replace("div","")=="GPS"){
				gp=d[i].children[1].value;
				pesquisagps="&GPS="+gp;
				pesquisagps=findAndReplace(pesquisagps," ","");
			}
			if(d[i].id.indexOf("Preco")!=-1){
				temp=d[i].children[2].value;
				temp2=d[i].children[5].value;
				var regex = /^[0-9.,]+$/;
				
				console.log(temp);
				console.log(temp2);
				if(temp==""||temp2==""){
					inicia=1;
					alert("Insira o Preco!");
				}else if(!regex.test(temp)||!regex.test(temp2)){
					inicia=1;
					alert("Caracteres Inválidos!");
					d[i].children[2].value="";
					d[i].children[5].value="";
				}
				
				precoValorDe=d[i].children[2].value;
				precoValorAte=d[i].children[5].value;
				if(Number(precoValorDe)>Number(precoValorAte)){
					alert("Parametros Da faceta Preco Errados!");
					d[i].children[2].value="";
					d[i].children[5].value="";
					precoActivo=false;
					inicia=1;
				}else{
					precoActivo=true;
				}
				pesquisatemp="";

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
		numSensor=getSensor(numSensor);
		
		pes=document.getElementById("resultados");
		while (pes.firstChild) {	
			pes.removeChild(pes.firstChild);		
		}
		url="http://phpdev2.dei.isep.ipp.pt/~arqsi/smartcity/valoresDeSensor.php?sensor="+numSensor;		
	}
	
	
		var tempoFiltrar=tempActivo,gpsLatFiltrar=gpsLatActivo,gpsLonFiltrar=gpsLonActivo,precoFiltrar=precoActivo,horaFiltrar=horaActiva;
		if(inicia==0){
			
			url=url+pesquisadatas+pesquisahoras+pesquisatemp+pesquisalocal+pesquisalatitude+pesquisalongitude+pesquisapreco+pesquisafonte+pesquisavalor+pesquisaindicador+pesquisafoto+pesquisagps;
			
			
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
							var listaP,lis="",cc=0, aa;
						
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
									console.log(precoFiltrar);
										console.log(ll[0]);
									if(horaFiltrar){
										if(ll[0]=="Hora_de_leitura"){
												horaRec=(Number(ll[1])*60*60)+(Number(ll[2])*60)+Number(ll[3]);
												
												if(horaRec>Number(horaValorDe) && horaRec<Number(horaValorAte)){
													addCell(o,ll);
												}else{
													addCell(o,ll);
													t.deleteRow(t.rows.length-1);
												}
											}else{
												addCell(o,ll);
											}
									}else if(tempoFiltrar){
										if(ll[0]=="Temp"){
											if(ll[1]>Number(tempValorDe) && ll[1]<Number(tempValorAte)){
												addCell(o,ll);
											}else{
												addCell(o,ll);
												t.deleteRow(t.rows.length-1);
											}
										}else{
											addCell(o,ll);
										}
									
									}else if(gpsLatFiltrar){
										if(ll[0]=="GPS_Latitude"){
											console.log(ll[1]);
											console.log(gpsLatValorDe);
											console.log(gpsLatValorAte);
											if(ll[1]>Number(gpsLatValorDe) && ll[1]<Number(gpsLatValorAte)){
												addCell(o,ll);
											}else{
												addCell(o,ll);
												t.deleteRow(t.rows.length-1);
											}
										}else{
												addCell(o,ll);
										} 
									}else if(gpsLonFiltrar){
										if(ll[0]=="GPS_Longitude"){
											if(ll[1]>Number(gpsLonValorDe) && ll[1]<Number(gpsLonValorAte)){
												addCell(o,ll);
											}else{
												addCell(o,ll);
												t.deleteRow(t.rows.length-1);
											}
										}else{
											addCell(o,ll);
										}
									}else if(precoFiltrar){
										if(ll[0]=="Preco"){
											if(ll[1]>Number(precoValorDe) && ll[1]<Number(precoValorAte)){
												addCell(o,ll);
											}else{
												addCell(o,ll);
												t.deleteRow(t.rows.length-1);
											}
										}else{
											addCell(o,ll);
										}
									}else{
										addCell(o,ll);
									}	
								}						
							}
							
							if(t.rows.length==1){
								aviso=document.createTextNode("Sem Resultados Para Os Parametros Inseridos!");
								pes.appendChild(aviso);
								pes.style.display = "block";
							}else{
								pes.appendChild(t);
								pes.style.display = "block";
							}
			
						}
					}
				};
				xmlHttpObj.open("GET",url, true);
				xmlHttpObj.send(null);	
			}	
			tempActivo=false,horaActiva=false,gpsLatActivo=false,gpsLonActivo=false,precoActivo=false;
		}	
	});	
}

function addCell(o,ll){
	c = o.insertCell(-1);
	if(ll[0]=="Hora_de_leitura"){	
		c.appendChild(document.createTextNode(ll[1]+":"+ll[2]+":"+ll[3]));
	}else{	
		c.appendChild(document.createTextNode(ll[1]));
	}
}

function getSensor(numSensor){
	
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
	return numSensor;
	
}

function getArrayDates(startDate, endDate) {
  
	var oneDay = 24*3600*1000;
	for (var d=[],ms=startDate*1,last=endDate*1;ms<last;ms+=oneDay){
	d.push( new Date(ms) );
	}
	d.push(endDate);
	return d;
}

function findAndReplace(string, target, replacement) {
 
	var i = 0, length = string.length;
	for (i; i < length; i++) {
		string = string.replace(target, replacement);
	}
	return string;
}

function addHorasDisplay() {
 
	diva=document.createElement("DIV");
	diva.id="divHora";
	diva.className="intoPesquisa";			
	diva.appendChild(document.createElement("BR"));	
	da=document.createElement("SELECT");	
	da4=document.createElement("SELECT");
	for(i=0;i<24;i++){
		opti=document.createElement("OPTION");
		opti.value=i;
		opti.appendChild(document.createTextNode(i));
		da.appendChild(opti);
		opti2=document.createElement("OPTION");
		opti2.value=i;
		opti2.appendChild(document.createTextNode(i));
		da4.appendChild(opti2);
	}

	
	da2=document.createElement("SELECT");
	da5=document.createElement("SELECT");
	for(i=0;i<60;i++){
		opti=document.createElement("OPTION");
		opti.value=i;
		da2.appendChild(opti);
		opti.appendChild(document.createTextNode(i));
		opti2=document.createElement("OPTION");
		opti2.value=i;
		da5.appendChild(opti2);
		opti2.appendChild(document.createTextNode(i));
	}
	
	da3=document.createElement("SELECT");
	da6=document.createElement("SELECT");
	for(i=0;i<60;i++){
		opti=document.createElement("OPTION");
		opti.value=i;
		da3.appendChild(opti);
		opti.appendChild(document.createTextNode(i));
		opti2=document.createElement("OPTION");
		opti2.value=i;
		da6.appendChild(opti2);
		opti2.appendChild(document.createTextNode(i));
	}
 
	diva.appendChild(document.createTextNode(" De : "));
	diva.appendChild(document.createElement("BR"));
	diva.appendChild(document.createElement("BR"));
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
	diva.appendChild(document.createElement("BR"));
	diva.appendChild(document.createTextNode(" Horas : "));
	diva.appendChild(da4);
	diva.appendChild(document.createTextNode("  Minutos : "));
	diva.appendChild(da5);
	diva.appendChild(document.createTextNode("  Segundos : "));
	diva.appendChild(da6);
	return diva;
}


function addDataDisplay(){
		
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
	return diva;
}