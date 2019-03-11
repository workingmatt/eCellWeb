var firstload = true;

$(document).ready(function(){
	//location.hash = "#city_main-page";
	var imageNames;
	var pageName = "nameOfPage";

	//Variable for metrics
	var startInstant = Date.now();
	var dropCount;
	var dropErrors;

//<script type="text/javascript">window.onload = addRecord;</script>
	if (firstload){
		addRecord();
		firstload = false;
	}

	var showPage = function(page){
		$(".page").hide();
		dropCount = 0;
		dropErrors = 0;
		$(page).show();
	}

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
				dropErrors--;
				dropCount++;
	 			var interval = (Date.now()-startInstant)/1000;
				var dropped = $(event.toElement.parentElement);
				var dropzone = $(event.target);
				var timestamp = (Date.now()-startInstant)/1000;
				//console.log("Successful drop of id "+dropped.attr('id')+" on "+dropzone.attr('id'));
				//console.log("errors:"+dropErrors+" good drop count:"+dropCount);
			}
		});
	}

	var startDrag = function(event) {
		dropErrors++;
		var draggedDiv = $(event.target);
		draggedDiv.addClass("draggingMe");
		$('.draggingMe > img').addClass("draggingMe");
	}

	var endDrag = function(event) {
	 	var draggedDiv = $(event.target);
	 	var page = window.location.hash;
	 	draggedDiv.removeClass("draggingMe");
		$('.draggingMe > img').removeClass("draggingMe");

		if((page == "#city_main-page")||(page == "#body_main-page")){
			if (dropCount==6){
				updateRecord(page.substring(1,page.length-5),(Date.now()-startInstant)/1000, dropErrors);
			}
		} else if (page == "#custom-page") {
			//don't do anything
		} else {
			if (dropCount==4){
				updateRecord(page.substring(1,page.length-5),(Date.now()-startInstant)/1000, dropErrors);
			}
		}
	 }

	//get list of image files
	var getDraggableImages = function(page) {
		$.ajax({
			url: "/files",
			data: {"page": page},
			success: function(imageNames){
				//got list of image filenames of form /images/page/file.png
				imageNames.forEach(file => {
					if (file !== "background.png" && file!==".DS_Store") {
						filename = file.substring(0, file.length-4);
						$("#"+page).append('<div class="col-xs-2 col-sm-2 col-md-2 dragMe" id="'+filename+'"><img src="/images/'+page+'/'+file+'"></div>');
					}
				});

				$('.dragMe').draggable({
					revert: "invalid",
					containment: $(".div"),
					snap: ".dragMe",
					start: function(event){
						startDrag(event);
					},
					stop: function(event){
						endDrag(event);
					}
				});
			}
		});
	} //end of getDraggableImages function


//	makeDropZone(page, targetId, left, top, width, height, acceptableId);
//TODO - add a json file to define location/size of dropzones rather than hardcode
//TODO - once above is done, makeDropZone is loopable for all images found

	pageName = "city_main";
		makePage(pageName);
		makeDropZone(pageName, "sciDrop", 40, 38, 18, 20, "science");
		makeDropZone(pageName, "airDrop", 0, 9, 20, 25, "airport");
		makeDropZone(pageName, "consDrop", 13, 53, 27, 27, "construction");
		makeDropZone(pageName, "restDrop", 47, 0, 22, 17, "restaurant");
		makeDropZone(pageName, "hospDrop", 71, 23, 21, 17, "hospital");
		makeDropZone(pageName, "roadDrop", 15, 17, 70, 60, "road");

	pageName = "city_airport"
		makePage(pageName);
		makeDropZone(pageName, "airEscalatorDrop", 0, 0, 100, 85, "airEscalator");
		makeDropZone(pageName, "airGuardDrop", 0, 0, 100, 85, "airGuard");
		makeDropZone(pageName, "airLuggageDrop", 0, 0, 100, 85, "airLuggage");
		makeDropZone(pageName, "airToiletDrop", 0, 0, 100, 85, "airToilet");
		//makeDropZone(pageName, "airDisguiseDrop", 0, 0, 100, 85, "airDisguise");
		//makeDropZone(pageName, "airToothDrop", 0, 0, 100, 85, "airTooth");

	pageName = "city_construction"
		makePage(pageName);
		makeDropZone(pageName, "consCautionDrop", 0, 0, 100, 85, "consCaution");
		//makeDropZone(pageName, "consContactlessDrop", 0, 0, 100, 85, "consContactless");
		//makeDropZone(pageName, "consCowDrop", 0, 0, 100, 85, "consCow");
		makeDropZone(pageName, "consHardhatDrop", 0, 0, 100, 85, "consHardhat");
		makeDropZone(pageName, "consOverheadDrop", 0, 0, 100, 85, "consOverhead");
		makeDropZone(pageName, "consStopDrop", 0, 0, 100, 85, "consStop");

	pageName = "city_hospital"
		makePage(pageName);
		makeDropZone(pageName, "hospAmbulanceDrop", 0,0,100,85,"hospAmbulance");
		//makeDropZone(pageName, "hospBalloonDrop", 0,0,100,85,"hospBalloon");
		makeDropZone(pageName, "hospHeartDrop", 0,0,100,85,"hospHeartTrace");
		//makeDropZone(pageName, "hospHorseDrop", 0,0,100,85,"hospHorse");
		makeDropZone(pageName, "hospNurseDrop", 0,0,100,85,"hospNurse");
		makeDropZone(pageName, "hospStethDrop", 0,0,100,85,"hospStethoscope");

	pageName = "city_restaurant";
		makePage(pageName);
		makeDropZone(pageName, "restCoffeeDrop", 0,0,100,85,"restCoffee");
		makeDropZone(pageName, "restMealDrop", 0,0,100,85,"restMeal");
		makeDropZone(pageName, "restNoSmokingDrop", 0,0,100,85,"restNoSmoking");
		//makeDropZone(pageName, "restRadioactiveDrop", 0,0,100,85,"restRadioactive");
		//makeDropZone(pageName, "restTrafficLightsDrop", 0,0,100,85,"restTrafficLights");
		makeDropZone(pageName, "restWineDrop", 0,0,100,85,"restWine");

	pageName = "city_road";
		makePage(pageName);
		makeDropZone(pageName, "roadBikeDrop",0,0,100,85,"roadBike");
		//makeDropZone(pageName, "roadEscalatorDrop",0,0,100,85,"roadEscalator");
		//makeDropZone(pageName, "roadLabCoatDrop",0,0,100,85,"roadLabCoat");
		makeDropZone(pageName, "roadOneWayDrop",0,0,100,85,"roadOneWay");
		makeDropZone(pageName, "roadParkingDrop",0,0,100,85,"roadParking");
		makeDropZone(pageName, "roadTrafficLightsDrop",0,0,100,85,"roadTrafficLights");

	pageName = "city_science";
		makePage(pageName);
		//makeDropZone(pageName, "sciBikeDrop",0,0,100,85,"sciBike");
		makeDropZone(pageName, "sciDnaDrop",0,0,100,85,"sciDna");
		makeDropZone(pageName, "sciLabCoatDrop",0,0,100,85,"sciLabCoat");
		makeDropZone(pageName, "sciRadioactiveDrop",0,0,100,85,"sciRadioactive");
		makeDropZone(pageName, "sciSkullDrop",0,0,100,85,"sciSkull");
		//makeDropZone(pageName, "sciTrafficLightDrop",0,0,100,85,"sciTrafficLight");


	pageName = "body_main"
		makePage(pageName);
		makeDropZone(pageName, "bulbDrop", 27, 0, 18, 20, "bulb");
		makeDropZone(pageName, "cutleryDrop", 25, 42, 20, 18, "cutlery");
		makeDropZone(pageName, "gustDrop", 22, 26, 22, 19, "gust");
		makeDropZone(pageName, "heartDrop", 29, 28, 10, 15, "heart");
		makeDropZone(pageName, "scaffoldDrop", 0, 10, 65, 70, "scaffold");
		makeDropZone(pageName, "shieldDrop", 70, 10, 30, 45, "shield");

	pageName = "body_bulb"
		makePage(pageName);
		makeDropZone(pageName, "bulbChatDrop", 0, 0, 100, 85, "bulbChat");
		makeDropZone(pageName, "bulbEyeDrop", 0, 0, 100, 85, "bulbEye");
		//makeDropZone(pageName, "bulbPoliceDrop", 0, 0, 100, 85, "bulbPolice");
		//makeDropZone(pageName, "bulbRadioactiveDrop", 0, 0, 100, 85, "bulbRadioactive");
		makeDropZone(pageName, "bulbSaveDrop", 0, 0, 100, 85, "bulbSave");
		makeDropZone(pageName, "bulbWifiDrop", 0, 0, 100, 85, "bulbWifi");

	pageName = "body_cutlery"
		makePage(pageName);
		makeDropZone(pageName, "cutleryBinDrop", 0, 0, 100, 85, "cutleryBin");
		//makeDropZone(pageName, "cutleryHorseDrop", 0, 0, 100, 85, "cutleryHorse");
		makeDropZone(pageName, "cutleryPowerDrop", 0, 0, 100, 85, "cutleryPower");
		makeDropZone(pageName, "cutleryRecycleDrop", 0, 0, 100, 85, "cutleryRecycle");
		//makeDropZone(pageName, "cutlerySockDrop", 0, 0, 100, 85, "cutlerySock");
		makeDropZone(pageName, "cutleryToothDrop", 0, 0, 100, 85, "cutleryTooth");

	pageName = "body_gust"
		makePage(pageName);
		makeDropZone(pageName, "gustBalloonDrop", 0, 0, 100, 85, "gustBalloon");
		makeDropZone(pageName, "gustBloodDrop", 0, 0, 100, 85, "gustBlood");
		//makeDropZone(pageName, "gustContactlessDrop", 0, 0, 100, 85, "gustContactless");
		//makeDropZone(pageName, "gustOneWayDrop", 0, 0, 100, 85, "gustOneWay");
		makeDropZone(pageName, "gustSneezeDrop", 0, 0, 100, 85, "gustSneeze");
		makeDropZone(pageName, "gustSpeakerDrop", 0, 0, 100, 85, "gustSpeaker");


	pageName = "body_heart"
		makePage(pageName);
		makeDropZone(pageName, "heartBloodDrop", 0, 0, 100, 85, "heartBlood");
		makeDropZone(pageName, "heartDrumsDrop", 0, 0, 100, 85, "heartDrums");
		//makeDropZone(pageName, "heartParkingDrop", 0, 0, 100, 85, "heartParking");
		//makeDropZone(pageName, "heartPhoneDrop", 0, 0, 100, 85, "heartPhone");
		makeDropZone(pageName, "heartPlugDrop", 0, 0, 100, 85, "heartPlug");
		makeDropZone(pageName, "heartSpringDrop", 0, 0, 100, 85, "heartSpring");


	pageName = "body_scaffold"
		makePage(pageName);
		//makeDropZone(pageName, "scafCowDrop", 0, 0, 100, 85, "scafCow");
		makeDropZone(pageName, "scafPressDrop", 0, 0, 100, 85, "scafPress");
		makeDropZone(pageName, "scafStopDrop", 0, 0, 100, 85, "scafStop");
		makeDropZone(pageName, "scafStrongDrop", 0, 0, 100, 85, "scafStrong");
		makeDropZone(pageName, "scafThermometerDrop", 0, 0, 100, 85, "scafThermometer");
		//makeDropZone(pageName, "scafWineDrop", 0, 0, 100, 85, "scafWine");


	pageName = "body_shield"
		makePage(pageName);
		makeDropZone(pageName, "shieldCautionDrop", 0, 0, 100, 85, "shieldCaution");
		makeDropZone(pageName, "shieldFightDrop", 0, 0, 100, 85, "shieldFight");
		//makeDropZone(pageName, "shieldHorseDrop", 0, 0, 100, 85, "shieldHorse");
		makeDropZone(pageName, "shieldPlasterDrop", 0, 0, 100, 85, "shieldPlaster");
		//makeDropZone(pageName, "shieldSaveDrop", 0, 0, 100, 85, "shieldSave");
		makeDropZone(pageName, "shieldSeatBeltDrop", 0, 0, 100, 85, "shieldSeatBelt");

	pageName = "adipose"
		makePage(pageName);
		makeDropZone(pageName, "adiposeBoxDrop", 0, 0, 100, 85, "adiposeBox");
		makeDropZone(pageName, "adiposePowerDrop", 0, 0, 100, 85, "adiposePower");
		makeDropZone(pageName, "adiposeRepelDrop", 0, 0, 100, 85, "adiposeRepel");
		makeDropZone(pageName, "adiposeThermometerDrop", 0, 0, 100, 85, "adiposeThermometer");

	pageName = "carcinoma"
		makePage(pageName);
		makeDropZone(pageName, "carcinomaDisguiseDrop", 0, 0, 100, 85, "carcinomaDisguise");
		makeDropZone(pageName, "carcinomaFishDrop", 0, 0, 100, 85, "carcinomaFish");
		makeDropZone(pageName, "carcinomaSkullDrop", 0, 0, 100, 85, "carcinomaSkull");
		makeDropZone(pageName, "carcinomaSpreadDrop", 0, 0, 100, 85, "carcinomaSpread");

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

	pageName = "custom"
		makePage(pageName);
		makeDropZone(pageName, "1Drop", 0,0,50,42,"1");
		makeDropZone(pageName, "2Drop", 50,0,100,42,"2");
		makeDropZone(pageName, "3Drop", 0,43,50,85,"3");
		makeDropZone(pageName, "4Drop", 50,43,100,85,"4");

	showPage("#city_main-page");

});
