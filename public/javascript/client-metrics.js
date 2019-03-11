console.log("client-metrics.js");

const showRecord = function(id){
	console.log("showRecord:"+id);
}

const deleteRecord = function(id){
	console.log("deleteRecord:"+id);
	$.ajax({
		url: "/metrics",
		method: "DELETE",
		data: {"id": id}
	});
	location.reload();
}

const addRecord = function(){
	//$.post("/metrics", {"id":3,"name":"matt"});
	$.post("/metrics", function(data){
		console.log(data);
	});
	//location.reload();
}

const updateRecord = function(event, timeElapsed, numErrorDrops){
	console.log("kasdhflkajsdhflkajsdhflkasjdhf:"+event+" timeElapsed:"+timeElapsed+" numErrorDrops:"+numErrorDrops);
	$.ajax({
		url: "/metrics",
		method: "PUT",
		data: {"event":event, "timeElapsed": timeElapsed, "numErrorDrops": numErrorDrops}
	});
}