var url='https://oscars-dataset.herokuapp.com/api/v1.0/all_winners_data'

// console.log(7)
d3.json(url, function(d) {
	console.log(d)
});

// d3.json(url, {mode:'no-cors'}, function(data) {
//     console.log(data);
// });