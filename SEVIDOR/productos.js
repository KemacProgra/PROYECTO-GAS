module.exports.getByProductos=function(app){
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
};