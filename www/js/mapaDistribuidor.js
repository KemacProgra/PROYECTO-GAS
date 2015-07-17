    var SOCKET=null;
	var MAP=null; 
	var MARCADORES=[];
	var REINICIO=false;
var MAPADISTRIBUIDOR=(function () {
    var my = {};
	     my.conectarse=function(){
	    	SOCKET = io.connect("http://192.168.20.31:9090");
             
		SOCKET.on("connect",function(){
			//document.getElementById("idEstado").innerHTML="CONECTADO...";

			SOCKET.emit("loginMonitor",{monitor:"monitor"},function(data){
				//document.getElementById("idSocket").innerHTML=data.id;

			});
			
		});
		SOCKET.on("disconnect",function(){
			//document.getElementById("idEstado").innerHTML="DESCONECTADO...";
			REINICIO=true;
		});

		iniciarMapa();

	    	SOCKET.on("Distribuidor",function(data){//{id,lat,lon}
			if(REINICIO===true){
				alert("REFRESQUE EL NAVEGADOR");
				return;	
			}
			console.log(data);
	    		var index=buscar(data);
			if(index===-1){//ES NUEVO
				nuevoPosicion(data);
			}
			else{//REGISTRADO
				actualizarPosicion(index,data);
			}

	    	});
	
	    }
function iniciarMapa(){
		var mapProp = {
		    center:new google.maps.LatLng(-13.658845, -73.349589),
		    zoom:10,
		    mapTypeId:google.maps.MapTypeId.ROADMAP
		  };
		 MAP=new google.maps.Map(document.getElementById("idpageMapaDistri"),mapProp);
	}
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function buscar(data){
		var index=-1;		
		var n=MARCADORES.length;
		for(var i=0;i<n;i++){
			if(MARCADORES[i].getId()==data.id){
				index=i;
				break;
			}
		}			
		return index;			
	}	
	function nuevoPosicion(data){
		var marca=new cMarker(MAP,data.id,data.lat,data.lon);
		marca.dibujar();
		MARCADORES.push(marca);
		
	}
	function actualizarPosicion(index,data){
		var marca=MARCADORES[index];
		marca.remover();	
		marca.update(data.lat,data.lon);
		marca.dibujar();
	}
	
      return my;
}());  
