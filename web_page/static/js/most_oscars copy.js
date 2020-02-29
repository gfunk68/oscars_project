// Creating our initial map object
var url = "https://oscars-dataset.herokuapp.com/api/v1.0/all_winners_data"

d3.json(url, function(d){
    
    // Declare variables as arrays
    var name =[];
    var colors =[];
    
    // Create foreach loop to append values to respective arrays
    d.forEach(function(winner) {
      name.push(winner['Winner Name']);

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

  //   // // Map colors to chartName
  //  var chartColors=[];


// Set graph characteristics and chart with Plotly

var data = [{
  type: 'bar',
  orientation: 'h',
  width: .75,
  bargap: .5,
  mode: "markers",
    marker: {
      color: colors
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
  }]
}];

var layout = {
  title: "Individuals With More Than One Oscar Win",
  titlefont: {size: 26},
  hovermode: "closest",
  xaxis: {
    title: "Win Count",
    titlefont: {size: 20},
    tickfont:{size: 14},
    automargin: true,
    showgrid: true,
    zeroline: false,
    dtick: 1
  },
  yaxis: {
    // title: "Oscar Winner",
    // titlefont: {size: 20},
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