// Creating our initial map object
var url = "https://oscars-dataset.herokuapp.com/api/v1.0/all_winners_data"

d3.json(url, function(d){
    
    // Declare variables as arrays
    var name =[];
    var film=[];
    var colors =[];
    
    // Create foreach loop to append values to respective arrays
    d.forEach(function(winner) {
      name.push(winner['Winner Name']);
      film.push(winner['Film']);

      // Color by Category: Blue for all Actors, Pink for all Actresses, Green for Directors
      if (winner['Category'] == 'Best Actor' || winner['Category'] == 'Best Supporting Actor'){
        colors.push('blue');
      }
      else if (winner['Category'] == 'Best Director'){
        colors.push('green');
      }
      else {
        colors.push('pink');
      }
    });

    // Create object of winners and count of wins
    var countWin = name.reduce(function(grouping, item) {
  
      // If the current list item does not yet exist in grouping, set initial count to 1
      if( grouping[item] === undefined ) {    
        grouping[item] = 1;
      }
      // If current list item does exist in grouping, increment the count
      else {
        grouping[item] ++;
      }
        return grouping; 
    }, {});

    // Transform object contents to arrays
    var chartName = $.map(countWin, function(value,index){
      return [index];
    });
    // console.log(chartName)

    var chartWinCount = $.map(countWin, function(value,index){
      return [value];
    });
    // console.log(chartWinCount)

// // Find Indices of name and color. Use these to map between name and color.
// var nameIndex = name.map(function(item, index) {
//   return `${index}: ${item}`;
// });

// var colorIndex = colors.map(function(item, index) {
//   return `${index}: ${item}`;
// });

// var nameColorIndex = nameIndex.map(function())

// console.log(nameIndex);

// Set graph characteristics and chart with Plotly

var data = [{
  type: 'bar',
  orientation: 'h',
  text: film,
  mode: "markers",
    marker: {
      color: 'gold'
      },
  y: chartName,
  x: chartWinCount,
  transforms: [{
    type: 'sort',
    target: 'x',
    order: 'ascending'
  }, {
    type: 'filter', 
    target: 'x', 
    operation: '>',
    value: 2
  }],
  // DO NOT FORGET TO FIX FILM INFO IN HOVERTEMPLATE!!!!!
  hovertemplate:
        "<b>%{y}</b><br>" +
        "%{xaxis.title.text}: %{x}<br>" +
        // "Film: <i>%{text}</i><br>" +
        "<extra></extra>"
}];

var layout = {
  title: "Individuals with Most Oscars of All Time",
  titlefont: {size: 26},
  hovermode: "closest",
  xaxis: {
    title: "Oscars Won",
    titlefont: {size: 18},
    tickfont:{size: 14},
    automargin: true,
    showgrid: false,
    zeroline: false,
    dtick: 1
  },
  yaxis: {
    tickfont:{size: 14},
    dtick: 1,
    
    automargin: true,
    showline: false
  }
};
var config = {
  responsive: true
};

Plotly.newPlot('most_oscars_chart', data, layout, config);
});