$(document).ready(function(){

	//get top left position of draggable
	var coordinates = function(element) {
		console.log("coords");
		element = $(element);
		var top = element.position().top;
		var left = element.position().left;
		var toffset = element.offset().top;
		var loffset = element.offset().left;
		$('#results').text('X:'+left+' Y:'+top+' Xoff:'+loffset+' Yoff:'+toffset);
	}

	//get list of image files
	$.ajax({
		url: "/files",
		success: function(data){
			console.log("Got file list!\n"+data);
			data.forEach(file => {
				if (file !== "city.png") {
					$("#main").append('<div class="col-sm-6 col-md-2 dragMe"><img src="/images/'+file+'" width="100%"></div>');
				}
			});

			$('.dragMe').draggable({
				containment: 'document',
				revert: "invalid",
				containment: "#contain",
				start: function(){
					coordinates('.dragMe');
				},
				stop: function(){
					coordinates('.dragMe');
				}
			});
		}
	});

});
