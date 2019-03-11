console.log("client-metrics.js");

$(document).ready(function() {
	$(".page").hide();
	$("#metrics").show();

});

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
	$.post("/metrics", {"id":3,"name":"matt"});
	location.reload();
}