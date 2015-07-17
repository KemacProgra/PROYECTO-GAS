module.exports.getByLogin=function(app){
app.post('/getLogin', function(req, res){	
	
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
    }
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
};