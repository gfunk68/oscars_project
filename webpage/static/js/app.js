var url='http://127.0.0.1:5000/api/v1.0/all_winners_data'

// console.log(7)
d3.json(url, {mode: 'no-cors'}).then(function(data){
	console.log(data)
});

// d3.json(url, {mode:'no-cors'}, function(data) {
//     console.log(data);
// });