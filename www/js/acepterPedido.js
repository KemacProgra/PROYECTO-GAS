var ACEPTARPEDIDO=(function () {
    var my = {};
    ////////////
    
    my.crearEnlaces=function(){
        //Enlaces Page Alumno
     $("body").append('<a id="idGoMapaDistri" href="#idpageMapaDistri"  class="style-31"></a>');  
     
         /* listitem  #listaPrueba */    };//////////////////////////////////////////////////////////////////////////////////
    my.cargarAceptarPedido=function(){
       
        var param={};
        param.perfil='Cliente';
        
        $.ajax({
            type:"POST",
            url:"http://127.0.0.1:9090/getAcepterPedido",
            data:"data="+JSON.stringify(param),
            //dataType : 'json',
            dataType : 'text',
            success:function(data){
                var data=JSON.parse(data);
                console.log(data.status);
                
                if(data.status===1){       
                    
                }
                if(data.status===0){
                    
                     navigator.notification.alert(
                        'ERROR AL CAPTURAR LISTA',  // message
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