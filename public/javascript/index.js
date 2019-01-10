$(document).ready(function(){

	//get top left position of draggable
	var startDrag = function(event) {
		var draggedDiv = $(event.target.parentElement);
		draggedDiv.addClass("draggingMe");
		$('#results').append(Date.now()+': Start dragging '+draggedDiv.attr('id'));
	}

	var endDrag = function(event) {
	// 	console.log(event);
	 	var draggedDiv = $(event.target.parentElement);
	// 	var p = draggedDiv.position();
	 	draggedDiv.removeClass("draggingMe");
	// 	$('#results').append(' : Stop dragging X:'+p.left+' Y:'+p.top+' w/h: ');
	 }

	$('#target').append('<div class="dropZone" id="hospDrop"></div>');
	$('.dropZone#hospDrop').css({
	    "top": "500px",
	    "left": "400px",
	    "height": "200px",
	    "width": "200px",
	    "background": "blue",
	    "border-color": "red"
	});

	$('.dropZone#hospDrop').droppable({
		accept: "#hospital",
		drop: function(event, ui){
			var dropped = $(event.toElement.parentElement);
			var dropzone = $(event.target);
			console.log("Got drop event");
			console.log(event);
			console.log("Successful drop of id "+dropped.attr('id')+" on "+dropzone.attr('id'));
			console.log($());
		}
	});

	//get list of image files
	$.ajax({
		url: "/files",
		success: function(data){
			console.log("Got file list!");
			data.forEach(file => {
				if (file !== "city.png") {
					filename = file.substring(0, file.length-4);
					$("#target").append('<div class="col-xs-2 col-sm-2 col-md-2 dragMe" id="'+filename+'"><img src="/images/'+file+'"></div>');
				}
			});

			$('.dragMe').draggable({
				containment: 'document',
				revert: "invalid",
				containment: $(".div"),
				snap: ".dragMe",
				start: function(event){
					console.log("Start drag");
					startDrag(event);
				},
				stop: function(event){
					console.log("Stop drag");
					endDrag(event);
				}
			});
		}
	});
});
