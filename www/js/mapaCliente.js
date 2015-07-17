var SOCKET=null;
	var ID=null;
	var REINICIO=false;
var MAPACLIENTE=(function () {
    var my = {};
	  my.conectarse=function(){
	    	SOCKET = io.connect("http://127.0.0.1:9090");
		SOCKET.on("connect",function(){
			//document.getElementById("idEstado").innerHTML="CONECTADO...";

			SOCKET.emit("loginCliente",null,function(data){
				
		    		ID=data.id;	
				//document.getElementById("idSocket").innerHTML=ID;
			});
		});
		SOCKET.on("disconnect",function(){
			//document.getElementById("idEstado").innerHTML="DESCONECTADO...";
			REINICIO=true;
			
		});
		
	    	
	}////////////////////////////////////
	my.enviarPosicion=function(){

		if(REINICIO==true){
			alert("REFRESQUE EL NAVEGADOR");
			return;	
		}
		
		var data={};
		data.lat="-13.658845";//51.508742;
		data.lon="-73.349589";//-0.120850;
		data.id=ID;

		SOCKET.emit("posicionClientes",data);

		alert("ENVIADO");
	}////////////////////////////////////
    return my;
}());