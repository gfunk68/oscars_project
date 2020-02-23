// from data.js
var tableData = data;

var tbody = d3.select("tbody");

tableData.forEach(alien => {
	var row =tbody.append("tr");
	Object.entries(alien).forEach(([key,value]) => {
		var cell = row.append("td");
		cell.text(value);
	});
});


var button = d3.select("button");
button.on("click", function() {
	console.log("click")
	var inputElement = d3.select("#datetime");
	var inputValue = inputElement.property("value");
	if (inputValue != "") {
		var filteredData = tableData.filter(alien => alien.datetime === inputValue);
	}
	tbody.html("")
	filteredData.forEach(alien => {
		var row = tbody.append("tr");
		Object.entries(alien).forEach(([key, value]) => {
			var cell = row.append("td");
			cell.text(value);
		});
	});
});