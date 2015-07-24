var IPADDRESS="127.0.0.1";
var PORT=9090
var express = require('express');
var bodyParser = require('body-parser');
//var socketio=require('socket.io');
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,x-access-token');
   
    next();
}

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(allowCrossDomain);
/*var io=socketio();
io.use(bodyParser.urlencoded({ extended: false }));
io.use(allowCrossDomain);*/
var server = app.listen(PORT,IPADDRESS);
console.log('Escuchando en '+IPADDRESS+':'+PORT);
var io = require('socket.io').listen(server);
//////////////////////////////////////////////////////
/*var SOCKET_MONITOR_ID=null;
var io = require('socket.io').listen(server);
io.on('connection', function (socket) {
	console.log('CONNECTED KEY: '+socket.id);
	
	socket.on("loginMonitor",function(data,response){
	   if(data.monitor="monitor"){	
		   SOCKET_MONITOR_ID=socket.id;
		   var info={id:socket.id};			   
		   response(info);
	   }	
	});
	socket.on("loginCliente",function(data,response){
		var info={id:socket.id};			   
		response(info);
	});	
	socket.on("posicionClientes", function(data) {
		console.log(data);
		if(SOCKET_MONITOR_ID!=null)
			io.sockets.connected[SOCKET_MONITOR_ID].emit('monitorPrincipal',data);
	});	
	socket.on("disconnect", function() {
		console.log('DISCONNECT key: '+socket.id);
	});
});*/
//////////////////////////////////////////////////////
var LOGIN=require('./login.js');
var ENVIOPEDIDO=require('./envioPedidos.js');
var PEDIDOS=require('./pedidos.js');
var PRODUCTOS=require('./productos.js');
var SOCKETIO=require('./SOCKETIO.js');
/////////////////////////////////////////////////////
LOGIN.getByLogin(app);
PEDIDOS.getByPedido(app);
ENVIOPEDIDO.getByEnviopedido(app);
PRODUCTOS.getByProductos(app);
SOCKETIO.getBySocketio(io);
/////////////////////////////////////////////////////
/*app.post('/getLogin', function(req, res){	
	
    var datos=req.param('data');
    datos=JSON.parse(datos);
    //console.log(data);	
    if(datos.user=="Cliente" && datos.password=="Cliente" && datos.perfil =="Cliente"){
        var user={}
    	user.id=1;
    	user.usuario='supito';
    	user.nombres='edwin';
    	user.perfil='Cliente';

		var msn={};
		msn.estado=1;	
		msn.data=user;	
		msn.message=null;
		/*var msn={};
		msn.estado=0;	
		msn.data=null;	
		msn.message="NO AUTENTICADO";*/
   /* }
    else if(datos.user=="Distribuidor" && datos.password=="Distribuidor" && datos.perfil =="Distribuidor"){

		var user={}
    	user.id=1;
    	user.usuario='Distribuidor';
    	user.nombres='Distribuidor';
    	user.perfil='Distribuidor';

		var msn={};
		msn.estado=1;	
		msn.data=user;	
		msn.message=null;
	
   }				
	        
   res.json(msn);
	
});
app.post('/getProductos', function(req, res){	

    	var data=req.param('data');
	data=JSON.parse(data);    	

	//console.log(data);
if(data.perfil!=="Cliente"){
   data.perfil="Cliente";
}else{
    	var producto1={}
    	producto1.id=1;
    	producto1.nombre='CEL GAS';
	    
	var producto2={}
    	producto2.id=2;
    	producto2.nombre='LIMA GAS';
	
    	
	var producto3={}
    	producto3.id=3;
    	producto3.nombre='INTI GAS';
	    var producto4={}
    	producto4.id=4;
    	producto4.nombre='LLAMA GAS';
}
	var productos=[];
	productos[0]=producto1;
	productos[1]=producto2;
	productos[2]=producto3;
	productos[3]=producto4;
	
	var msn={};
	msn.data=productos;	
	msn.status=1;
	msn.message=null;
	
	res.json(msn);

});

app.post('/getPedidos', function(req, res){	

    	var data=req.param('data');
	data=JSON.parse(data);    	

	//console.log(data);

	
	
	if(data.id==1){
	  var producto={}
    	producto.id=1;
    	producto.nombre='CEL GAS';
        var peso1={}
    	peso1.idP=1;
        peso1.peso="10K";
        peso1.precio=10;
        var peso2={}
    	peso2.idP=2;
        peso2.peso="20K";
        peso2.precio=20;
        var peso3={}
    	peso3.idP=3;
        peso3.peso="50K";
        peso3.precio=50;
	}
	else if(data.id==2){
	 var producto={}
    	producto.id=2;
    	producto.nombre='LIMA GAS';
         var peso1={}
    	peso1.idP=1;
        peso1.peso="10K";
        peso1.precio=15;
        var peso2={}
    	peso2.idP=2;
        peso2.peso="20K";
        peso2.precio=25;
        var peso3={}
    	peso3.idP=3;
        peso3.peso="50K";
        peso3.precio=60;
	
	}
    else if(data.id==3){
        var producto={}
    	producto.id=3;
    	producto.nombre='INTI GAS';
     var peso1={}
    	peso1.idP=1;
        peso1.peso="10K";
        peso1.precio=20;
        var peso2={}
    	peso2.idP=2;
        peso2.peso="20K";
        peso2.precio=30;
        var peso3={}
    	peso3.idP=3;
        peso3.peso="50K";
        peso3.precio=65;
	}
    
     else if(data.id==4){
        var producto={}
    	producto.id=4;
    	producto.nombre='LLAMA GAS';
          var peso1={}
    	peso1.idP=1;
        peso1.peso="10K";
        peso1.precio=22;
        var peso2={}
    	peso2.idP=2;
        peso2.peso="20K";
        peso2.precio=32;
        var peso3={}
    	peso3.idP=3;
        peso3.peso="50K";
        peso3.precio=54;
	}
    
	var tipos=[];
    tipos[0]=peso1;
	tipos[1]=peso2;
	tipos[2]=peso3;
    
	var msn={};
    msn.data1=tipos;
	msn.data=producto;	
	msn.status=1;
	msn.message=null;
	
	res.json(msn);
});
app.post('/getEnvioPedido', function(req, res){	
var data=req.param('data');
	data=JSON.parse(data); 



});*/
