$(document).ready(function(){

	var imageNames;
	var loadingImages = false;

	var showPage = function(page){
		$(".page").hide();
		$(page).show();
	}

	showPage("#city-page");

	$(window).on("hashchange", function(){
		showPage(location.hash);
	});

	var makeDropZone = function(page, targetId, left, top, width, height, acceptableId){
		$('#'+page).append('<div class="dropZone" id="'+targetId+'"></div>');

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
	var getDraggableImages = function(page) {
		console.log("Getting Draggable Images for "+page+" page");
		loadingImages = true;
		$.ajax({
			url: "/files",
			data: {"page": page},
			success: function(data){
				console.log("Got file list!");
				loadingImages = false;
				imageNames = data;

				imageNames.forEach(file => {
					if (file !== "background.png" && file!==".DS_Store") {
						filename = file.substring(0, file.length-4);
						$("#"+page).append('<div class="col-xs-2 col-sm-2 col-md-2 dragMe" id="'+filename+'"><img src="/images/'+page+'/'+file+'"></div>');
						//This is where to make dropzones if I can figure out where to get the left, top, width, height data from
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
	} //end of getDraggableImages function


//	makeDropZone(page, targetId, left, top, width, height, acceptableId);

	var pageName = "city"
	makeDropZone(pageName, "sciDrop", 40, 38, 18, 20, "science");
	makeDropZone(pageName, "airDrop", 0, 9, 20, 25, "airport");
	makeDropZone(pageName, "consDrop", 13, 53, 27, 27, "construction");
	makeDropZone(pageName, "restDrop", 47, 0, 22, 17, "restaurant");
	makeDropZone(pageName, "hospDrop", 71, 23, 21, 17, "hospital");
	makeDropZone(pageName, "roadDrop", 15, 17, 70, 60, "road");
	getDraggableImages(pageName);

	var pageName = "cityAirport"
	makeDropZone(pageName, "airEscalatorDrop", 0, 0, 100, 85, "airEscalator");
	makeDropZone(pageName, "airGuardDrop", 0, 0, 100, 85, "airGuard");
	makeDropZone(pageName, "airLuggageDrop", 0, 0, 100, 85, "airLuggage");
	makeDropZone(pageName, "airToiletDrop", 0, 0, 100, 85, "airToilet");
	getDraggableImages(pageName);

	var pageName = "body"
	makeDropZone(pageName, "bulbDrop", 27, 0, 18, 20, "bulb");
	makeDropZone(pageName, "cutleryDrop", 25, 42, 20, 18, "cutlery");
	makeDropZone(pageName, "gustDrop", 22, 26, 22, 19, "gust");
	makeDropZone(pageName, "heartDrop", 29, 28, 10, 15, "heart");
	makeDropZone(pageName, "scaffoldDrop", 0, 10, 65, 70, "scaffold");
	makeDropZone(pageName, "shieldDrop", 70, 10, 30, 45, "shield");
	getDraggableImages(pageName);

});
