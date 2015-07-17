var PRODUCTOS= (function () {
    var my = {};
    ////////////
    
    my.crearEnlaces=function(){
        //Enlaces Page Alumno
     $("body").append('<a id="idGoProducto" href="#idpagecliente"  class="style-31"></a>');  
     
         /* listitem  #listaPrueba */
     $(document).on("click", "#idListaProductos", function(evt)
        {
            /* your code goes here */ 
            //$.ui.popup('Hi there');
            //$(evt.target).attr('id');
            console.log(evt);
            DEPU=evt;
            var idProducto=$(evt.target).attr('idProducto');
            PEDIDOS.cargarPedidos(idProducto);
         
        });      
    };//////////////////////////////////////////////////////////////////////////////////
    my.cargarProductos=function(){
       
        var param={};
        param.perfil='Cliente';
        
        $.ajax({
            type:"POST",
            url:"http://127.0.0.1:9090/getProductos",
            data:"data="+JSON.stringify(param),
            //dataType : 'json',
            dataType : 'text',
            success:function(data){
                var data=JSON.parse(data);
                console.log(data.status);
                
                if(data.status===1){
                
                    $("#idListaProductos").empty();
                    for(var i=0;i<data.data.length;i++){                    
                        $("#idListaProductos").append("<li ><a href='#idpagePedido' idProducto= "+data.data[i].id+">"+data.data[i].nombre+"</a></li>");
                        
                        
                        
                    }
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