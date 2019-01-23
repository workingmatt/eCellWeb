$(document).ready(function(){

	var imageNames;
	var loadingImages = false;
	var pageName = "nameOfPage";

	var showPage = function(page){
		$(".page").hide();
		$(page).show();
	}

	showPage("#city-page");

	$(window).on("hashchange", function(){
		showPage(location.hash);
	});


	var makePage = function(name){
		html = $('<div class="row">').append($('<div id="'+name+'-page" class="page" style="display: none;">')
			.append('<div class="col-xs-1 col-sm-1 col-md-3"></div>')
			.append('<div class="col-xs-10 col-sm-10 col-md-8" id="'+name+'"><img src="/images/'+name+'/background.png" width="100%"></div>')
			.append('<div class="col-xs-1 col-sm-1 col-md-3"></div>'));
		$(document.body).append(html);

		getDraggableImages(name);
	}


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
//TODO - add script to add the page's divs currently hand coded into index.ejs.
//TODO - add a json file to define location/size of dropzones rather than hardcode
//TODO - once above is done, makeDropZone is loopable for all images found

	pageName = "cityMain";
		makePage(pageName);
		makeDropZone(pageName, "sciDrop", 40, 38, 18, 20, "science");
		makeDropZone(pageName, "airDrop", 0, 9, 20, 25, "airport");
		makeDropZone(pageName, "consDrop", 13, 53, 27, 27, "construction");
		makeDropZone(pageName, "restDrop", 47, 0, 22, 17, "restaurant");
		makeDropZone(pageName, "hospDrop", 71, 23, 21, 17, "hospital");
		makeDropZone(pageName, "roadDrop", 15, 17, 70, 60, "road");

	pageName = "cityAirport"
		makePage(pageName);
		makeDropZone(pageName, "airEscalatorDrop", 0, 0, 100, 85, "airEscalator");
		makeDropZone(pageName, "airGuardDrop", 0, 0, 100, 85, "airGuard");
		makeDropZone(pageName, "airLuggageDrop", 0, 0, 100, 85, "airLuggage");
		makeDropZone(pageName, "airToiletDrop", 0, 0, 100, 85, "airToilet");
		makeDropZone(pageName, "airDisguiseDrop", 0, 0, 100, 85, "airDisguise");
		makeDropZone(pageName, "airToothDrop", 0, 0, 100, 85, "airTooth");

	pageName = "cityConstruction"
		makePage(pageName);
		makeDropZone(pageName, "consCautionDrop", 0, 0, 100, 85, "consCaution");
		//makeDropZone(pageName, "consContactlessDrop", 0, 0, 100, 85, "consContactless");
		//makeDropZone(pageName, "consCowDrop", 0, 0, 100, 85, "consCow");
		makeDropZone(pageName, "consHardhatDrop", 0, 0, 100, 85, "consHardhat");
		makeDropZone(pageName, "consOverheadDrop", 0, 0, 100, 85, "consOverhead");
		makeDropZone(pageName, "consStopDrop", 0, 0, 100, 85, "consStop");

	pageName = "cityHospital"
		makePage(pageName);
		makeDropZone(pageName, "hospAmbulanceDrop", 0,0,100,85,"hospAmbulance");
		//makeDropZone(pageName, "hospBalloonDrop", 0,0,100,85,"hospBalloon");
		makeDropZone(pageName, "hospHeartDrop", 0,0,100,85,"hospHeartTrace");
		//makeDropZone(pageName, "hospHorseDrop", 0,0,100,85,"hospHorse");
		makeDropZone(pageName, "hospNurseDrop", 0,0,100,85,"hospNurse");
		makeDropZone(pageName, "hospStethDrop", 0,0,100,85,"hospStethoscope");

	pageName = "cityRestaurant";
		makePage(pageName);
		makeDropZone(pageName, "restCoffeeDrop", 0,0,100,85,"restCoffee");
		makeDropZone(pageName, "restMealDrop", 0,0,100,85,"restMeal");
		makeDropZone(pageName, "restNoSmokingDrop", 0,0,100,85,"restNoSmoking");
		//makeDropZone(pageName, "restRadioactiveDrop", 0,0,100,85,"restRadioactive");
		//makeDropZone(pageName, "restTrafficLightsDrop", 0,0,100,85,"restTrafficLights");
		makeDropZone(pageName, "restWineDrop", 0,0,100,85,"restWine");

	pageName = "cityRoad";
		makePage(pageName);
		makeDropZone(pageName, "roadBikeDrop",0,0,100,85,"roadBike");
		//makeDropZone(pageName, "roadEscalatorDrop",0,0,100,85,"roadEscalator");
		//makeDropZone(pageName, "roadLabCoatDrop",0,0,100,85,"roadLabCoat");
		makeDropZone(pageName, "roadOneWayDrop",0,0,100,85,"roadOneWay");
		makeDropZone(pageName, "roadParkingDrop",0,0,100,85,"roadParking");
		makeDropZone(pageName, "roadTrafficLightsDrop",0,0,100,85,"roadTrafficLights");

	pageName = "cityScience";
		makePage(pageName);
		//makeDropZone(pageName, "sciBikeDrop",0,0,100,85,"sciBike");
		makeDropZone(pageName, "sciDnaDrop",0,0,100,85,"sciDna");
		makeDropZone(pageName, "sciLabCoatDrop",0,0,100,85,"sciLabCoat");
		makeDropZone(pageName, "sciRadioactiveDrop",0,0,100,85,"sciRadioactive");
		makeDropZone(pageName, "sciSkullDrop",0,0,100,85,"sciSkull");
		//makeDropZone(pageName, "sciTrafficLightDrop",0,0,100,85,"sciTrafficLight");


	pageName = "bodyMain"
		makePage(pageName);
		makeDropZone(pageName, "bulbDrop", 27, 0, 18, 20, "bulb");
		makeDropZone(pageName, "cutleryDrop", 25, 42, 20, 18, "cutlery");
		makeDropZone(pageName, "gustDrop", 22, 26, 22, 19, "gust");
		makeDropZone(pageName, "heartDrop", 29, 28, 10, 15, "heart");
		makeDropZone(pageName, "scaffoldDrop", 0, 10, 65, 70, "scaffold");
		makeDropZone(pageName, "shieldDrop", 70, 10, 30, 45, "shield");

	pageName = "bodyBulb"
		makePage(pageName);
		makeDropZone(pageName, "bulbChatDrop", 0, 0, 100, 85, "bulbChat");
		makeDropZone(pageName, "bulbEyeDrop", 0, 0, 100, 85, "bulbEye");
		//makeDropZone(pageName, "bulbPoliceDrop", 0, 0, 100, 85, "bulbPolice");
		//makeDropZone(pageName, "bulbRadioactiveDrop", 0, 0, 100, 85, "bulbRadioactive");
		makeDropZone(pageName, "bulbSaveDrop", 0, 0, 100, 85, "bulbSave");
		makeDropZone(pageName, "bulbWifiDrop", 0, 0, 100, 85, "bulbWifi");

	pageName="bodyCutlery"
		makePage(pageName);
		makeDropZone(pageName, "cutleryBinDrop", 0, 0, 100, 85, "cutleryBin");
		//makeDropZone(pageName, "cutleryHorseDrop", 0, 0, 100, 85, "cutleryHorse");
		makeDropZone(pageName, "cutleryPowerDrop", 0, 0, 100, 85, "cutleryPower");
		makeDropZone(pageName, "cutleryRecycleDrop", 0, 0, 100, 85, "cutleryRecycle");
		//makeDropZone(pageName, "cutlerySockDrop", 0, 0, 100, 85, "cutlerySock");
		makeDropZone(pageName, "cutleryToothDrop", 0, 0, 100, 85, "cutleryTooth");

	pageName = "bodyGust"
		makePage(pageName);
		makeDropZone(pageName, "Drop", 0, 0, 100, 85, "gustBalloon");
		makeDropZone(pageName, "Drop", 0, 0, 100, 85, "gustBlood");
		//makeDropZone(pageName, "Drop", 0, 0, 100, 85, "gustContactless");
		//makeDropZone(pageName, "Drop", 0, 0, 100, 85, "gustOneWay");
		makeDropZone(pageName, "Drop", 0, 0, 100, 85, "gustSneeze");
		makeDropZone(pageName, "Drop", 0, 0, 100, 85, "gustSpeaker");


	pageName = "bodyHeart"
		makePage(pageName);
		makeDropZone(pageName, "Drop", 0, 0, 100, 85, "heartBlood");
		makeDropZone(pageName, "Drop", 0, 0, 100, 85, "heartDrums");
		//makeDropZone(pageName, "Drop", 0, 0, 100, 85, "heartParking");
		//makeDropZone(pageName, "Drop", 0, 0, 100, 85, "heartPhone");
		makeDropZone(pageName, "Drop", 0, 0, 100, 85, "heartPlug");
		makeDropZone(pageName, "Drop", 0, 0, 100, 85, "heartSpring");


	pageName = "bodyScaffold"
		makePage(pageName);
		//makeDropZone(pageName, "scafCowDrop", 0, 0, 100, 85, "scafCow");
		makeDropZone(pageName, "scafPressDrop", 0, 0, 100, 85, "scafPress");
		makeDropZone(pageName, "scafStopDrop", 0, 0, 100, 85, "scafStop");
		makeDropZone(pageName, "scafStrongDrop", 0, 0, 100, 85, "scafStrong");
		makeDropZone(pageName, "scafThermometerDrop", 0, 0, 100, 85, "scafThermometer");
		//makeDropZone(pageName, "scafWineDrop", 0, 0, 100, 85, "scafWine");


	pageName = "bodyShield"
		makePage(pageName);
		makeDropZone(pageName, "shieldCautionDrop", 0, 0, 100, 85, "shieldCaution");
		makeDropZone(pageName, "shieldFightDrop", 0, 0, 100, 85, "shieldFight");
		//makeDropZone(pageName, "shieldHorseDrop", 0, 0, 100, 85, "shieldHorse");
		makeDropZone(pageName, "shieldPlasterDrop", 0, 0, 100, 85, "shieldPlaster");
		//makeDropZone(pageName, "shieldSaveDrop", 0, 0, 100, 85, "shieldSave");
		makeDropZone(pageName, "shieldSeatBeltDrop", 0, 0, 100, 85, "shieldSeatBelt");

	pageName = "adipose"
		makePage(pageName);
		//makeDropZone(pageName, "adiposeBoxDrop", 0, 0, 100, 85, "adiposeBox");
		makeDropZone(pageName, "adiposePowerDrop", 0, 0, 100, 85, "adiposePower");
		makeDropZone(pageName, "adiposeRepelDrop", 0, 0, 100, 85, "adiposeRepel");
		makeDropZone(pageName, "adiposeThermometerDrop", 0, 0, 100, 85, "adiposeThermometer");

	pageName = "carcinoma"
		makePage(pageName);
		makeDropZone(pageName, "Drop", 0, 0, 100, 85, "carcinomaDisguise");
		makeDropZone(pageName, "Drop", 0, 0, 100, 85, "carcinomaFish");
		makeDropZone(pageName, "Drop", 0, 0, 100, 85, "carcinomaSkull");
		makeDropZone(pageName, "Drop", 0, 0, 100, 85, "carcinomaSpread");

	pageName = "cardiomyocytes"
		makePage(pageName);
		makeDropZone(pageName, "cardiomyocytesDrumDrop", 0, 0, 100, 85, "cardiomyocytesDrum");
		makeDropZone(pageName, "cardiomyocytesPlugDrop", 0, 0, 100, 85, "cardiomyocytesPlug");
		makeDropZone(pageName, "cardiomyocytesSpringDrop", 0, 0, 100, 85, "cardiomyocytesSpring");
		makeDropZone(pageName, "cardiomyocytesStrengthDrop", 0, 0, 100, 85, "cardiomyocytesStrength");

	pageName = "endothelial"
		makePage(pageName);
		makeDropZone(pageName, "endothelialBloodDrop", 0, 0, 100, 85, "endothelialBlood");
		makeDropZone(pageName, "endothelialSpringDrop", 0, 0, 100, 85, "endothelialSpring");
		makeDropZone(pageName, "endothelialSproutDrop", 0, 0, 100, 85, "endothelialSprout");
		makeDropZone(pageName, "endothelialWifiDrop", 0, 0, 100, 85, "endothelialWifi");

	pageName = "leukocytes"
		makePage(pageName);
		makeDropZone(pageName, "leukocytesChatDrop", 0, 0, 100, 85, "leukocytesChat");
		makeDropZone(pageName, "leukocytesCutleryDrop", 0, 0, 100, 85, "leukocytesCutlery");
		makeDropZone(pageName, "leukocytesFightDrop", 0, 0, 100, 85, "leukocytesFight");
		makeDropZone(pageName, "leukocytesPlasterDrop", 0, 0, 100, 85, "leukocytesPlaster");

	pageName = "neurones"
		makePage(pageName);
		makeDropZone(pageName, "neuronesBulbDrop", 0, 0, 100, 85, "neuronesBulb");
		makeDropZone(pageName, "neuronesPlugDrop", 0, 0, 100, 85, "neuronesPlug");
		makeDropZone(pageName, "neuronesSaveDrop", 0, 0, 100, 85, "neuronesSave");
		makeDropZone(pageName, "neuronesWifiDrop", 0, 0, 100, 85, "neuronesWifi");

	pageName = "osteoclast"
		makePage(pageName);
		makeDropZone(pageName, "osteoclastConstructDrop", 0, 0, 100, 85, "osteoclastConstruct");
		makeDropZone(pageName, "osteoclastCutleryDrop", 0, 0, 100, 85, "osteoclastCutlery");
		makeDropZone(pageName, "osteoclastPlasterDrop", 0, 0, 100, 85, "osteoclastPlaster");
		makeDropZone(pageName, "osteoclastScaffoldDrop", 0, 0, 100, 85, "osteoclastScaffold");

	pageName = "pulmonary"
		makePage(pageName);
		makeDropZone(pageName, "pulmonaryBalloonDrop", 0, 0, 100, 85, "pulmonaryBalloon");
		makeDropZone(pageName, "pulmonaryBloodDrop", 0, 0, 100, 85, "pulmonaryBlood");
		makeDropZone(pageName, "pulmonaryOilDrop", 0, 0, 100, 85, "pulmonaryOil");
		makeDropZone(pageName, "pulmonaryRecycleDrop", 0, 0, 100, 85, "pulmonaryRecycle");

	showPage("#cityMain-page");

});
