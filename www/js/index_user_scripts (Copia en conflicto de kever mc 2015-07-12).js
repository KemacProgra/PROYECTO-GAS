(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
      PRODUCTOS.crearEnlaces();
     PEDIDOS.crearEnlaces();
     ENVIOPEDIDOS.crearEnlaces();
     DISTRIBUIDOR.crearEnlaces();
     ACEPTARPEDIDO.crearEnlaces();
     /* button  ACEPTAR */
    $(document).on("click", ".uib_w_5", function(evt)
    {
           
        var usuario=$("#idUsuario").val();
        var contrasenia=$("#idContrasena").val();
        var perfil=$("#idSelectPerfil").val();
        
        	var param={};
        param.user=usuario;
        param.password=contrasenia;
        param.perfil=perfil;
        $.ajax({
            type:"POST",
            url:"http://127.0.0.1:9090/getLogin",
             data:"data="+JSON.stringify(param),
            //dataType : 'json',
            dataType : 'text',
            success:function(data){
                var data=JSON.parse(data);
                console.log(data.estado);
                console.log(data.data.perfil); 
                if(data.estado===1){
                    if(data.data.perfil=="Cliente"){
                      navigator.notification.confirm(                         
                        'INGRESASTE COMO CLIENTE',  // message
                        function(){  // message
                        $("#idGoProducto").click();
                        PRODUCTOS.cargarProductos();
                        MAPACLIENTE.conectarse();
                        MAPACLIENTE.enviarIdentificador(data.data.usuario);
                        },         // callback
                        'Mensaje',            // title
                        'Aceptar'                  // buttonName
                    );
                        
                    }
                     
                    else if(data.data.perfil=="Distribuidor"){
                       
                     navigator.notification.confirm(                         
                        'INGRESASTE COMO DISTRIBUIDOR',  // message
                        function(){  // message
                       
                        $("#idGoDistribuidor").click();                                                                             
                        },         // callback
                        'Mensaje',            // title
                        'Aceptar'                  // buttonName
                    );
                    }
                }
                if(data.estado===0){
                    
                     navigator.notification.confirm(
                        data.message,  // message
                        function(){},         // callback
                        'Mensaje',            // title
                        'Aceptar'                  // buttonName
                    );
                    
                }
                //console.log(data.data[0].usuario);
                //console.log(data);  
                
                /*
                for(var i=0;i<data.data.length;i++){
                    
                    $("#lista").append("<li><a>"+data.data[i].usuario+"</a></li>");
                }
                */
            },
            error:function(data){
            
                console.log("ERROR:"+data);
            }
        });

        
         
        /* your code goes here */ 
    });
    
        /* button  #idEnvarPedido */
    $(document).on("click", "#idEnvarPedido", function(evt)
    {
         $("#idGomapaClie").click();
         /*var nombre=$("#listaPedidos").index[0].val();
        var tipo=$("#idContrasena").val();
        var cantidad=$("#idSelectPerfil").val();
        
        	var param={};
        param.nombre=nombre;
        param.tipo=tipo;
        param.cantidad=cantidad;*/        ENVIOPEDIDOS.cargarEnvioPedidos();
        MAPACLIENTE.enviarPosicion();
        /* your code goes here */ 
    });
    
        /* button  #idaceptarPedido */
    $(document).on("click", "#idaceptarPedido", function(evt)
    {
        $("#idGoMapaDistri").click();
        /* your code goes here */ 
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
