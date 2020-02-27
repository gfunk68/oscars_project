// Creating our initial map object
var url = "https://oscars-dataset.herokuapp.com/api/v1.0/all_winners_data"

d3.json(url, function(d){
    
    // Declare variables as arrays
    var years =[];
    var age = [];
    var category =[];
    var name =[];
    var colors =[];
    
    // Create foreach loop to append values to respective arrays
    d.forEach(function(winner) {
      years.push(winner['Year']);
      age.push(winner['Age Awarded']);
      category.push(winner['Category']);
      name.push(winner['Winner Name']);

      if (winner['Category'] == 'Best Actor' || winner['Category'] == 'Best Supporting Actor'){
        colors.push('blue');
      }
      else if (winner['Category'] == 'Best Director') {
        colors.push('green');
      }
      else {
        colors.push('pink');
      }
    });
    
// Set graph characteristics and chart with Plotly
    var trace = {
    x: years,
    y: age,
    mode: "markers",
    name: category,
    text: name,
    marker: {
      color: colors,
      size: 11,
      line: {
        width: 0.2
      }
    },
    type: "scatter",
    hovertemplate:
          "<b>%{text}</b><br>" +
          "%{yaxis.title.text}: %{y}<br>" +
          "%{xaxis.title.text}: %{x}<br>" +
          "<extra></extra>"
  };
  
    var data = [trace];
    var layout = {
      title: "Ages Awarded Oscar Over Time",
      titlefont: {size: 26},
      hovermode: "closest",
      xaxis: {
        title: "Year",
        titlefont: {size: 20},
        tickfont:{size: 16},
        automargin: true,
        showgrid: false,
        zeroline: false
      },
      yaxis: {
        title: "Age Awarded",
        titlefont: {size: 20},
        tickfont:{size: 16},
        automargin: true,
        showline: false
      }
    };
    var config = {
      responsive: true
    };
    Plotly.newPlot("age_years_chart", data, layout, config);
  });