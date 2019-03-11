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
		console.log("addRecord, id:"+data);
	});
	//location.reload();
}

const updateRecord = function(event, timeElapsed, numErrorDrops){
	console.log("Updating record:"+event+"_time ="+timeElapsed+" "+event+"_errors:"+numErrorDrops);
	$.ajax({
		url: "/metrics",
		method: "PUT",
		data: {"event":event, "timeElapsed": timeElapsed, "numErrorDrops": numErrorDrops}
	});
}