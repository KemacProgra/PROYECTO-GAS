var ENVIOPEDIDOS=(function () {
    var my = {};
    ////////////
     my.crearEnlaces=function(){
        //Enlaces Page Alumno
     $("body").append('<a id="idGomapaClie" href="#idpagemapaClie"  class="style-31"></a>'); 
     };
    
    my.cargarEnvioPedidos=function(idPrecio){
       console.log(idPrecio);
        var param={};
        param.idP=idPrecio;
        $.ajax({
            type:"POST",
            url:"http://127.0.0.1:9090/getPedidos",
            data:"data="+JSON.stringify(param),
            //dataType : 'json',
            dataType : 'text',
            success:function(data){
                var data=JSON.parse(data);
                console.log(data.status);
                
                if(data.status===1){
                     navigator.notification.confirm(
                        'SE ENVIO SU PEDIDO EXITOSAMENTE',  // message
                        function(){
                        $("#idGomapaClie").click();
                        },         // callback
                        'Mensaje',            // title
                        'Aceptar'                  // buttonName
                    );  
                   
                        
                    }
               
                 if(data.status===0){
                    
                     navigator.notification.alert(
                        'ERROR DE PEDIDO',  // message
                        function(){},         // callback
                        'Mensaje',            // title
                        'Aceptar'                  // buttonName
                    );
                    
                }
            },
            error:function(data){
            
                console.log("ERROR:"+data);
            }
        });
    
    };//////////////////////////////////////////////////////////////////////////////////
    
    //////////
    return my;
}());