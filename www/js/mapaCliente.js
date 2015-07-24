var SOCKET=null;
	var ID=null;
	var REINICIO=false;
var MAPACLIENTE=(function () {
    var my = {};
	  my.conectarse=function(){
	    	SOCKET = io.connect("http://127.0.0.1:9090");
		SOCKET.on("connect",function(){
			//document.getElementById("idEstado").innerHTML="CONECTADO...";
		});
		SOCKET.on("disconnect",function(){
			//document.getElementById("idEstado").innerHTML="DESCONECTADO...";
			REINICIO=true;
			
		});
		
	    	
	}////////////////////////////////////
	my.enviarPosicion=function(){
		
		var data={};
		data.lat="-13.658845";//51.508742;
		data.lon="-73.349589";//-0.120850;
		data.id=ID;

		SOCKET.emit("posicionClientes",data);

		alert("ENVIADO");
	}////////////////////////////////////
    my.enviarIdentificador=function(nombre){
		var data={};
		data.id=nombre;
		SOCKET.emit("loginCliente",data,function(data){//{estado,id}
				
		    		
				if(data.estado===0){
					alert("Existe otro usuario con el Identificador");
				}
				else{
					ID=data.id;	
					//document.getElementById("idSocket").innerHTML=ID;
					//document.getElementById("idFormulario2").style.display="block";//MOSTRAMOS FORM2
//					document.getElementById("idFormulario1").style.display="none";//OCULTAMOS FORM1
				}
		});
	}
    return my;
}());