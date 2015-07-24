    var SOCKET=null;
	var MAP=null; 
	var MARCADORES=[];
var MAPADISTRIBUIDOR=(function () {
    var my = {};
	     my.conectarse=function(){
	    	SOCKET = io.connect("http://127.0.0.1:9090");
             
		SOCKET.on("connect",function(){
			//document.getElementById("idEstado").innerHTML="CONECTADO...";

			SOCKET.emit("loginMonitor",{monitor:"monitor"},function(data){
				//document.getElementById("idSocket").innerHTML=data.id;

			});
			
		});
		SOCKET.on("disconnect",function(){
			//document.getElementById("idEstado").innerHTML="DESCONECTADO...";
	          eliminarMarcadores();
		});

		iniciarMapa();

	    	SOCKET.on("Distribuidor",function(data){//{id,lat,lon}
			console.log(data);
	    		var index=buscar(data);
                console.log(index);
			if(index===-1){//ES NUEVO
				nuevoPosicion(data);
			}
			else{//REGISTRADO
				actualizarPosicion(index,data);
			}

	    	});
           SOCKET.on("DistribuidorDisconnet",function(data){//{id,socket_id}
			
			console.log(data);
	    		var index=buscar(data);
			if(index!==-1){//ENCONTRADO
				removerPosicion(index);
			}
	    	});
	
	    }  
	function iniciarMapa(){
		var mapProp = {
		    center:new google.maps.LatLng(-13.658845, -73.349589),
		    zoom:-5,
		    mapTypeId:google.maps.MapTypeId.ROADMAP
		  };
		 MAP=new google.maps.Map(document.getElementById("idpageMapaDistri"),mapProp);
	}
	
      return my;
}());  
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
	function removerPosicion(index){
		var marca=MARCADORES[index];
		marca.remover();
		MARCADORES.splice(index, 1);//eliminamos del ARRAY	
	}
	function eliminarMarcadores(){
		var n=MARCADORES.length;
		for(var i=0;i<n;i++){
			MARCADORES[i].remover();
		}
		MARCADORES=[];
	}
//////////////////////////////////////////////////////////////////////////////////
/*function cMarker(map,id,lat,lon){
  this.map=map;
  this.lat=lat;
  this.lon=lon;
  this.marker=null;
  this.id=id;	
  ///////////////////////////////////////////
  this.dibujar=function(){ 
	this.marker=new google.maps.Marker({
  		position:new google.maps.LatLng(this.lat,this.lon),
		map:this.map,
		title:this.id,
		//icon: 'beachflag.png'
  	});
	this.marker.setMap(this.map);
  }//////////////////////////////////////////
  this.remover=function(){
	if(this.marker!=null)
		this.marker.setMap(null);
  }//////////////////////////////////////////
  this.desplazarY=function(){
    this.lat+=0.01;

  }//////////////////////////////////////////
  this.desplazarX=function(){
    this.lon+=0.01;

  }//////////////////////////////////////////	
  this.getId=function(){
    return this.id;
  }//////////////////////////////////////////	
  this.update=function(lat,lon){
    this.lat=lat;
    this.lon=lon;	
  }//////////////////////////////////////////						
}*/