module.exports.getByPedido=function(app){
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
};