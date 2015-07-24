module.exports.getBySocketio=function(io){
////////////////////////////////////////////////////////////////////////////////////////////////////////
var SOCKET_MONITOR_ID=null;
var CLIENTES=[];//{id,socket_id}
//var io = require('socket.io').listen(server);
io.on('connection', function (socket) {
	console.log('CONNECTED KEY: '+socket.id);
	
	socket.on("loginMonitor",function(data,response){
	   if(data.monitor="monitor"){	
		   SOCKET_MONITOR_ID=socket.id;
		   var info={id:socket.id};			   
		   response(info);
	   }	
	});
	socket.on("loginCliente",function(data,response){//data={id}
		var index=buscar(data);
		if(index===-1){//NO ENCONTRADO
			
			CLIENTES.push({id:data.id,socket_id:socket.id});
			var info={estado:1,id:data.id};			   
			response(info);
		}
		else{
			var info={estado:0,id:null};			   
			response(info);
		}
		
	});	
	socket.on("posicionClientes", function(data) {
		console.log(data);
		if(SOCKET_MONITOR_ID!=null)
			io.sockets.connected[SOCKET_MONITOR_ID].emit('Distribuidor',data);
	});	
	socket.on("disconnect", function() {
		console.log('DISCONNECT key: '+socket.id);
		var n=CLIENTES.length;
		for(var i=0;i<n;i++){
			if(CLIENTES[i].socket_id==socket.id){
				
				if(SOCKET_MONITOR_ID!=null)
					io.sockets.connected[SOCKET_MONITOR_ID].emit('DistribuidorDisconnet',CLIENTES[i]);//EL CLIENTE DEBE SER BORRADO
				
				CLIENTES.splice(i, 1);//eliminamos el usuario				
				break;
			}
		}
	});
});////////////////////////////////////////////////////////////////////////////////////////////////////
function buscar(data){
		var index=-1;		
		var n=CLIENTES.length;
		for(var i=0;i<n;i++){
			if(CLIENTES[i].id===data.id){
				index=i;
				break;
			}
		}			
		return index;			
}
}	
