$(document).ready(function(){
	var makeDropZone = function(targetId, left, top, width, height, acceptableId){
		$('#target').append('<div class="dropZone" id="'+targetId+'"></div>');

		$('.dropZone#'+targetId).css({
		    "top": top+"%",
		    "left": left+"%",
		    "height": height+"%",
		    "width": width+"%"
		});

		var tempId = '#'+acceptableId;

		$('.dropZone#'+targetId).droppable({
			accept: tempId,
			drop: function(event){
				var dropped = $(event.toElement.parentElement);
				var dropzone = $(event.target); 
				console.log("Successful drop of id "+dropped.attr('id')+" on "+dropzone.attr('id'));
				}
		});
	}

//	makeDropZone(targetId, left, top, width, height, acceptableId);
	makeDropZone("sciDrop", 40, 38, 18, 20, "science");
	makeDropZone("airDrop", 0, 9, 20, 25, "airport");
	makeDropZone("consDrop", 13, 53, 27, 27, "construction");
	makeDropZone("restDrop", 47, 0, 22, 17, "restaurant");
	makeDropZone("hospDrop", 71, 23, 21, 17, "hospital");
	makeDropZone("roadDrop", 15, 17, 70, 60, "road");

	//get top left position of draggable
	var startDrag = function(event) {
		var draggedDiv = $(event.target);
		console.log(draggedDiv);
		draggedDiv.addClass("draggingMe");
		$('.draggingMe > img').addClass("draggingMe");
		$('#results').append(Date.now()+': Start dragging '+draggedDiv.attr('id'));
	}

	var endDrag = function(event) {
	 	var draggedDiv = $(event.target);
		$('.draggingMe > img').removeClass("draggingMe");
	 	draggedDiv.removeClass("draggingMe");
	 }



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
