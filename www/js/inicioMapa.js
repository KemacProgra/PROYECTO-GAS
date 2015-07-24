var CONSTRUIRMAPA=(function () {
    var my = {};
my.iniciarMapa=function(){
		var mapProp = {
		    center:new google.maps.LatLng(-13.658845, -73.349589),
		    zoom:14,
		    mapTypeId:google.maps.MapTypeId.ROADMAP
		  };
		 var MAP=new google.maps.Map(document.getElementById("idpageMapaDistri"),mapProp);
	}
          return my;
}()); 