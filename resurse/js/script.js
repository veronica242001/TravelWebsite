function randInt(a,b){ //[a, b)
	return Math.trunc(a+(b-a)*Math.random());
}





//----------------afisare timp inactivitate utilitazor

timp_inactiv = 0;
div=document.createElement("div")
inactivitate= function(){
	
	
	document.body.appendChild(div);
	div.style.height="120px";
	div.style.backgroundColor = "grey";
	div.style.color="white";
	div.style.width="130px";
	div.style.border = "1px solid black";
  div.style.position ="absolute";
  div.style.top="0";
  div.style.left="0";
  div.style.width=100+"%";
  div.style.height=100+"%";
  div.classList.add("selectat");
  
  setInterval(aduna, 1000)//1 secunda
  window.onload = resetare;
  window.onmousemove = resetare;
  window.onmouseover=resetare;
  window.onmouseout=resetare;
  window.onmousedown=resetare;
  window.onmouseup=resetare;
  window.onmouseleave=resetare;
  window.onkeypress = resetare;
  window.onkeyup=resetare;
  window.onkeydown=resetare;
  window.ondblclick=resetare;
}
function resetare() {
	timp_inactiv = 0;
	div.classList.add("selectat");
	
}
function aduna(){
	timp_inactiv=timp_inactiv+1
	if(timp_inactiv>=20) //20 secunde
	{ div.innerHTML="Ati fost inactiv:"+timp_inactiv;
	  div.classList.remove("selectat");}
	//alert("inactiv")
}
//--======================================================
//----------------calculare timp petrecut
 function calculeaza(){
  
  setInterval(function p(){
	var timp;
     var rez=returneaza_timp()+1000//
	 localStorage.setItem("time",rez)// actualizam mereu ce e in localStorage
	 var z= parseInt(rez/1000/60)
	 if(z>0) timp=z+"minute";
	 z=(parseInt(rez/1000))%60
	 timp=timp+z+"secunde"
	 document.getElementsByClassName("f_mic")[0].innerHTML=timp;
},1000)


 }
 function returneaza_timp(){
	 var s=parseInt(localStorage.getItem("time"));
	 if(isNaN(s))
	 return 0;
	 return s;

 }

//=================================================Generare quiz
window.addEventListener("load", function generare_quiz(){
	
	var arr=[{intrebare:"Opere care apartin lui Rafael Sanzio sunt:",raspunsuri:[["Triumful Galateei", true], ["Cina cea de taina", true],["Scoala din Atena", false]]},{intrebare:"In Venetia se afla urmatoarele obiective",raspunsuri:[["Piata San Marco", false], ["Palatul Dogilor", false], ["Bazilia Sfantul Petru", true]]},{intrebare: "Fontana di Trevi",raspunsuri:[["a fost construita in jurul anilor 1500",true], ["se  afla in cartierul Quirinale din Roma", true], ["a fost ridicata din ordinul papei Clement al XII-lea ", true]]}]
	var verificare=["true", "false", "false","false","false","false","false","true","true"]
	var quiz=document.createElement("ol");
	
	nr_c=-1;
	for (let i of arr)
	{ var li=document.createElement("li");
	  li.innerHTML=i.intrebare;
	  raspuns=document.createElement("ol");
	  for(let j of i.raspunsuri)
	  { nr_c=nr_c+1;//pentru a i putea dea id butonului
		li_rasp=document.createElement("li");
		  var r=document.createElement("ul");
		  var cb = document.createElement('input');
		  cb.type = 'checkbox';
		  cb.name = "gr_chck";
		  cb.value = j[1];
		  cb.id=nr_c;
		   r.appendChild(cb);
		  var r2=document.createElement("li");
		  r2.innerHTML=j[0];
		  r.appendChild(r2);
		  r2=document.createElement("li");
		  
		  r2.innerHTML=j[1];
		  r.appendChild(r2);
	
		li_rasp.appendChild(r);
		raspuns.appendChild(li_rasp);
		li.appendChild(raspuns);
	  }
	  quiz.appendChild(li);
	  
	} 
	document.getElementById("quiz").appendChild(quiz);
	
    buton=document.createElement("button");
	buton.innerHTML="Verifica daca sunt corecte";
	document.getElementById("quiz").appendChild(buton);
	nr=0;
	buton.onclick=function(){
		let ck=document.getElementsByName("gr_chck");		
	   
			for(let ch of ck){
		  //console.log(ch.value)
			if(ch.checked && verificare[ch.id]==ch.value)
					  nr+=1
		 ch.disabled=true//il dezactivam
			}
	vr=document.createElement("div");
	vr.style.border="1px solid black";
	vr.innerHTML="Ati obtinut "+nr+"  puncte";
	document.getElementById("quiz").appendChild(vr);
	
	
	}



}
)






window.onload=function(){
	inactivitate();
	calculeaza();
	
	
	
	//creez un obiect de tip XMLHttpRequest cu care pot transmite cereri catre server
	var ajaxRequest = new XMLHttpRequest();


	//la schimbarea starii obiectului XMLHttpRequest (la schimbarea proprietatii readyState)
	/* stari posibile:
	0 - netrimis
	1 - conexiune deschisa
	2 - s-au transmis headerele
	3 - se downleadeaza datele (datele sunt impartite in pachete si el primeste cate un stfel de pachet)
	4 - a terminat
	*/
	ajaxRequest.onreadystatechange = function() {
			//daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
			if (this.readyState == 4 && this.status == 200) {
					//in proprietatea responseText am contintul fiserului JSON
					//document.getElementById("afisJson").innerHTML=this.responseText;
					var obJson = JSON.parse(this.responseText);
					afiseajaJsonTemplate(obJson);
			}
	};
	//deschid o conexiune cu o cerere de tip get catre server
	//json e pus in folderul static "resurse" deci calea e relativa la acel folder (fisierul e la calea absoluta /resurse/json/studenti.json)
	ajaxRequest.open("GET", "/json/excursii.json", true);
	//trimit catre server cererea
	ajaxRequest.send();
	container=document.getElementById("afisTemplate");
	
	function afiseajaJsonTemplate(obJson) { 
			//in acets div voi afisa template-urile   
		 

			//in textTemplate creez continutul (ce va deveni innerHTML-ul) divului "afisTemplate"
			let textTemplate ="";
			//parcurg vetorul de studenti din obJson
			for(let i=0;i<obJson.excursii.length;i++){
				//creez un template ejs (primul parametru al lui ejs.render)
				//acesta va primi ca parametru un student din vectorul de studenti din json {student: obJson.studenti[i]}
				//practic obJson.studenti[i] e redenumit ca "student" in template si putem sa ii accesam proprietatile student.id etc
				j="/poze-proiect/"
				y=".jpg"
				console.log(j);
				textTemplate+=ejs.render("<div class='templ_excursie'>\
				<% k=j+excursie.Oras+y%>\
				<img src=<%= k%> >\
				<div>\
				<p>Nume Hotel: <p class='hotel'><%= excursie.Nume_Hotel %></p></p>\
				<p> Oras:<p class='oras'><%= excursie.Oras %></p></p>\
                <p> Pret in euro:<p class='pret'><%= excursie.Pret%></p></p>\
				<p>Numar nopti cazare:<p class='cazare'><%=excursie.nopti_cazare%></p></p>\
				<p> Numar stele hotel:<p class='stele'><%=excursie.stele%></p></p>\
				<p>  Facilitati Hotel:<p class='facilitati'><%=excursie.Facilitati%></p></p>\
				</div>\
				</div>", 
				{excursie: obJson.excursii[i]});

			} 
			//adaug textul cu afisarea excursiilor in container
			container.innerHTML=textTemplate;
			backup=container.innerHTML;
			verif_valid();
			//---------------------------modificarea stilului 
			container.style.boxShadow="0 0 10px white";

		///
		adaugare();
		//varclona=container.cloneNode(true);
		
		
			
	}
	
   //-------------------------SetInterval
	setInterval(function(){ 
		var excursii=container.children;
	   for(let i=0; i<excursii.length;i++)
			{ 
				excursii[i].getElementsByClassName("stele")[0].innerHTML=randInt(1,7);
			}	
			
			}, 9000); //9 secunde
	//----------------------------
			function verif_valid(){
		if(localStorage.getItem("cheie_sortare")!=null)
			container.innerHTML=localStorage.getItem("cheie_sortare");
		}
	
	//---------------------
	function pret(k){

		return parseInt(k.getElementsByClassName("pret")[0].innerHTML);
	}
	function oras(k)
	{  
		return k.getElementsByClassName("oras")[0].innerHTML;

	}
	function hotel(k)
	{  
		return k.getElementsByClassName("hotel")[0].innerHTML;

	}
	function cazare(k){
		return parseInt(k.getElementsByClassName("cazare")[0].innerHTML);
	}
	
	function facilitati(k)
	{
		return k.getElementsByClassName("facilitati")[0].innerHTML;
	} 
	
		/*La click pe butonul "Afiseaza crescator dpa pret" se vor sorta excursiile dupa pret. (Indicatii: Array.sort(), Array.reduce(), appendChild)*/
	document.getElementById("crescator_pret").onclick=function(){
				var excursii=container.children;
				var vexcursii=Array.prototype.slice.call(excursii);
				
			
			vexcursii.sort(function(a,b){
			return pret(a)-pret(b);
			});
			
			for(let excursie of vexcursii){
				container.appendChild(excursie);
					}
			//---------------SetTimeOut
			setTimeout(function(){ alert("Speram sa va gasiti un sejur potrivit pentru dumneavoastra")}, 1000)
			var continut=container.innerHTML;
			 //---------------------localStorage
			 localStorage.setItem("cheie_sortare",continut);//
				
	

			}
			
		/*La click pe butonul "" se vor pastra  toate excursiile din oras din input*/
		document.getElementById("cazare").onclick=function() {
			//preluarea datelor din radiobutton-urile bifate
			container.innerHTML=backup;
			var radiobuttons=document.getElementsByName("gr_rad");		
			sir="";
			
			for(let rad of radiobuttons){
				if(rad.checked){
					sir=rad.value;
					break;//iesim din for deoarece doar un radiobutton din grup poate fi bifat (si tocmai l-am gasit)
				}}
				
			nr_nopti=Number(sir)

			let excursii=container.children;
			for(let i=0; i<excursii.length;i++)
			{
			if (cazare(excursii[i])<nr_nopti){
				excursii[i].classList.add('selectat');
				
			}
			
			}
		}
		function calc_pret(){
			
			var excursii=container.children;
			
			pret_min=pret(excursii[0])
			for(let i=0; i<excursii.length;i++)
			{  pret_min= Math.min(pret(excursii[i]),pret_min);
				
			}
			return pret_min;

		}
     //calculam pretul minim din lista de excursii
		document.getElementById("pret_minim").onclick=function(){
			
			document.getElementById("info").innerHTML="Pretul minim este:"+calc_pret()+"euro";
		}
	//-----------------adaugam un atribut title care contine dif pana la pretul minim
   function adaugare(){
	var excursii=container.children;
			
	
	for(let i=0; i<excursii.length;i++)
	{  excursii[i].title="Diferenta pret: "+ (pret(excursii[i])-calc_pret())+"  euro";
		
	} }
   

   


	//------------------
	   document.getElementById("sterge").onclick=function() {
				//preluarea datelor din input bifate
				sterge_oras=document.getElementById("i_text").value;
				
				var excursii=container.children;
				for(let i=0; i<excursii.length;i++)
				{ 
				if (oras(excursii[i])==sterge_oras){
					excursii[i].remove();
					i-=1;
					}
					
				}
			}
		document.getElementById("reset").onclick=function() {
				//preluarea datelor din input bifate
				container.innerHTML=backup;
				adaugare();
				//var container=document.getElementById("afisTemplate");
				//var parentDiv=container.parentNode;
				//parentDiv.replaceChild(clona,container)
				localStorage.removeItem("cheie_sortare");//sterg cheia din localStorage
			}
   


 //-------------------------------------------------------------------

  document.getElementById("sort_complex").onclick=function(){
			var excursii=container.children;
			var vexcursii=Array.prototype.slice.call(excursii);
		

		vexcursii.sort(function(a,b){
			if(oras(a)>oras(b)) return 1;
			if(oras(a)<oras(b))return -1;
			
			if(pret(a)>pret(b)) return 1;
			return -1;
			return 0;
			
		});

		for(let excursie of vexcursii){
			container.appendChild(excursie);
				}

}
document.getElementById("sort_descrescator").onclick=function(){
		var excursii=container.children;
		var vexcursii=Array.prototype.slice.call(excursii);
			

		vexcursii.sort(function(a,b){
			return pret(b)/cazare(b)-pret(a)/cazare(a);
		});

		for(let excursie of vexcursii){
			container.appendChild(excursie);
				}

}
document.getElementById("elimin_vide").onclick=function(){
	container.innerHTML=backup;
	var excursii=container.children;

  
	for(let i=0; i<excursii.length;i++)
	{
	  if ( hotel(excursii[i])=="" || facilitati(excursii[i])==""){
		excursii[i].classList.add('selectat');
		
		}

}
}

	

}

function stele(k){
	return parseInt(k.getElementsByClassName("stele")[0].innerHTML);
}
/*------------ Filtrare---------------*/
window.onkeypress=function(e){
	//codul tastei apasate e in e.key
	container.innerHTML=backup;//mereu resetez pentru a nu
	var tasta = e.key
    var excursii = container.children;
	 
	for(let i=0; i<excursii.length;i++)
	{
	  if (stele(excursii[i])!=tasta && tasta>=1 && tasta <=6){
		excursii[i].classList.add('selectat');
		
		}
	
	}
	
}
