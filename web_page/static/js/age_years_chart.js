// Creating our initial map object for Directors
var directors_url = "https://oscars-dataset.herokuapp.com/api/v1.0/best_directors"

//Bring in and clean directors Data
d3.json(directors_url, function(directors){
    
    // Declare variables as arrays
    var years_directors =[];
    var age_directors = [];
    var category_directors =[];
    var name_directors =[];
    
    // Create foreach loop to append values to respective arrays
    directors.forEach(function(winner) {
      years_directors.push(winner['Year']);
      age_directors.push(winner['Age Awarded']);
      category_directors.push(winner['Category']);
      name_directors.push(winner['Winner Name']);
    });




// Clean up Years data for Directors
var years_directors_clean = years_directors.map(x => x.slice(0,4));




// Creating our initial map object for Best Actors
var actors_url = "https://oscars-dataset.herokuapp.com/api/v1.0/best_actors"

//Bring in and clean Actors Data
d3.json(actors_url, function(actors){
    
    // Declare variables as arrays
    var years_actors =[];
    var age_actors = [];
    var name_actors =[];
    
    // Create foreach loop to append values to respective arrays
    actors.forEach(function(winner) {
      years_actors.push(winner['Year']);
      age_actors.push(winner['Age Awarded']);
      name_actors.push(winner['Winner Name']);

    });



 // Clean up Years data for actors
var years_actors_clean = years_actors.map(x => x.slice(0,4));




// Creating our initial map object for Best Supporting Actors
var supp_actors_url = "https://oscars-dataset.herokuapp.com/api/v1.0/best_supporting_actors"

//Bring in and clean Actors Data
d3.json(supp_actors_url, function(supp_actors){
    
    // Declare variables as arrays
    var years_supp_actors =[];
    var age_supp_actors = [];
    var category_supp_actors =[];
    var name_supp_actors =[];
    
    // Create foreach loop to append values to respective arrays
    supp_actors.forEach(function(winner) {
      years_supp_actors.push(winner['Year']);
      age_supp_actors.push(winner['Age Awarded']);
      category_supp_actors.push(winner['Category']);
      name_supp_actors.push(winner['Winner Name']);
    });


// Clean up Years data for Supporting Actors
var years_supp_actors_clean = years_supp_actors.map(x => x.slice(0,4));



// Creating our initial map object for Best Actresses
var actresses_url = "https://oscars-dataset.herokuapp.com/api/v1.0/best_actresses"

//Bring in and clean Actresses Data
d3.json(actresses_url, function(actresses) {
    
    // Declare variables as arrays
    var years_actresses =[];
    var age_actresses = [];
    var category_actresses =[];
    var name_actresses =[];
    
    // Create foreach loop to append values to respective arrays
    actresses.forEach(function(winner) {
      years_actresses.push(winner['Year']);
      age_actresses.push(winner['Age Awarded']);
      category_actresses.push(winner['Category']);
      name_actresses.push(winner['Winner Name']);
    });


// Clean up Years data for actresses
var years_actresses_clean = years_actresses.map(x => x.slice(0,4));





// Creating our initial map object for Best Supporting Actresses
var supp_actresses_url = "https://oscars-dataset.herokuapp.com/api/v1.0/best_supporting_actresses"

//Bring in and clean Actors Data
d3.json(supp_actresses_url, function(supp_actresses){
    
    // Declare variables as arrays
    var years_supp_actresses =[];
    var age_supp_actresses = [];
    var category_supp_actresses =[];
    var name_supp_actresses =[];
    
    // Create foreach loop to append values to respective arrays
    supp_actresses.forEach(function(winner) {
      years_supp_actresses.push(winner['Year']);
      age_supp_actresses.push(winner['Age Awarded']);
      category_supp_actresses.push(winner['Category']);
      name_supp_actresses.push(winner['Winner Name']);
    });


// Clean up Years data for Supporting Actresses
var years_supp_actresses_clean = years_supp_actresses.map(x => x.slice(0,4));



// Set graph characteristics and chart with Plotly
// OPTION 1: Set all actors blue, all actresses pink (group actors and actresses categories together)
    
// Directors graph characteristics
var trace1 = {
    x: years_directors_clean,
    y: age_directors,
    mode: "markers",
    name: "Directors",
    showlegend: true,
    legendgroup: 'group',
    text: name_directors,
    marker: {
        color: 'green',
        size: 11
    },
    hovertemplate:
        "<b>%{text}</b><br>" +
        "%{yaxis.title.text}: %{y}<br>" +
        "%{xaxis.title.text}: %{x}<br>" +
        "<extra></extra>"
};

 
// Best Actors graph characteristics
var trace2 = {
    x: years_actors_clean,
    y: age_actors,
    mode: "markers",
    name: "Actors",
    showlegend: true,
    legendgroup: 'group1',
    text: name_actors,
    marker: {
      color: 'blue',
      size: 11
  },
    hovertemplate:
          "<b>%{text}</b><br>" +
          "%{yaxis.title.text}: %{y}<br>" +
          "%{xaxis.title.text}: %{x}<br>" +
          "<extra></extra>"
};


// Best Supporting Actors graph characteristics
var trace3 = {
    x: years_supp_actors_clean,
    y: age_supp_actors,
    mode: "markers",
    showlegend: false,
    legendgroup: 'group1',
    text: name_supp_actors,
    marker: {
      color: 'blue',
      size: 11
  },
    hovertemplate:
          "<b>%{text}</b><br>" +
          "%{yaxis.title.text}: %{y}<br>" +
          "%{xaxis.title.text}: %{x}<br>" +
          "<extra></extra>"
};


// Best Actress graph characteristics
var trace4 = {
    x: years_actresses_clean,
    y: age_actresses,
    mode: "markers",
    name: "Actresses",
    showlegend: true,
    legendgroup: 'group2',
    text: name_actresses,
    marker: {
      color: 'pink',
      size: 11
  },
    hovertemplate:
          "<b>%{text}</b><br>" +
          "%{yaxis.title.text}: %{y}<br>" +
          "%{xaxis.title.text}: %{x}<br>" +
          "<extra></extra>"
};


// Best Supporting Actress graph characteristics
var trace5 = {
    x: years_supp_actresses_clean,
    y: age_supp_actresses,
    mode: "markers",
    showlegend: false,
    legendgroup: 'group2',
    text: name_supp_actresses,
    marker: {
      color: 'pink',
      size: 11
  },
    hovertemplate:
          "<b>%{text}</b><br>" +
          "%{yaxis.title.text}: %{y}<br>" +
          "%{xaxis.title.text}: %{x}<br>" +
          "<extra></extra>"
};

var data = [trace2, trace4, trace1, trace3,trace5];

var layout = {
    title: "Ages Awarded Oscar Over Time",
    titlefont: {size: 26},
    hovermode: "closest",
    // showlegend: true,
    legend: {"orientation": "h", 
            y: -0.2, 
            x: 0.25},
    xaxis: {
        title: "Film Year",
        titlefont: {size: 20},
        tickfont:{size: 16},
        automargin: true,
        showgrid: false,
        // zeroline: false,
        dtick: 10,
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
});
});
});
});



// // OPTION 2: set unique color for each category (including supporting actor and supporting actress)
    
// // Directors graph characteristics
// var trace1 = {
//   x: years_directors_clean,
//   y: age_directors,
//   mode: "markers",
//   name: "Best Directors",
//   showlegend: true,
//   text: name_directors,
//   marker: {
//       color: 'green',
//       size: 11
//   },
//   // line: {
//   //     width: 0.5
//   // },
//   // connectgaps: true,
//   // transforms: [{
//   //     type: 'sort',
//   //     target: 'x',
//   //     order: 'ascending'
//   //   }, {
//   //     type: 'filter', 
//   //     target: 'x', 
//   //     operation: '>',
//   //     value: 2
//   //   }],
//   hovertemplate:
//       "<b>%{text}</b><br>" +
//       "%{yaxis.title.text}: %{y}<br>" +
//       "%{xaxis.title.text}: %{x}<br>" +
//       "<extra></extra>"
// };


// // Best Actors graph characteristics
// var trace2 = {
//   x: years_actors_clean,
//   y: age_actors,
//   mode: "markers",
//   name: "Best Actors",
//   text: name_actors,
//   marker: {
//     color: 'blue',
//     size: 11
// },
// // line: {
// //     width: 0.5
// // },
// // connectgaps: true,
// // transforms: [{
// //     type: 'sort',
// //     target: 'x',
// //     order: 'ascending'
// //   }, {
// //     type: 'filter', 
// //     target: 'x', 
// //     operation: '>',
// //     value: 2
// //   }],
//   hovertemplate:
//         "<b>%{text}</b><br>" +
//         "%{yaxis.title.text}: %{y}<br>" +
//         "%{xaxis.title.text}: %{x}<br>" +
//         "<extra></extra>"
// };


// // Best Supporting Actors graph characteristics
// var trace3 = {
//   x: years_supp_actors_clean,
//   y: age_supp_actors,
//   mode: "markers",
//   name: "Best Supporting Actors",
//   text: name_supp_actors,
//   marker: {
//     color: 'lightblue',
//     size: 11
// },
// // line: {
// //     width: 0.5
// // },
// // connectgaps: true,
// // transforms: [{
// //     type: 'sort',
// //     target: 'x',
// //     order: 'ascending'
// //   }, {
// //     type: 'filter', 
// //     target: 'x', 
// //     operation: '>',
// //     value: 2
// //   }],
//   hovertemplate:
//         "<b>%{text}</b><br>" +
//         "%{yaxis.title.text}: %{y}<br>" +
//         "%{xaxis.title.text}: %{x}<br>" +
//         "<extra></extra>"
// };


// // Best Actress graph characteristics
// var trace4 = {
//   x: years_actresses_clean,
//   y: age_actresses,
//   mode: "markers",
//   name: "Best Actresses",
//   text: name_actresses,
//   marker: {
//     color: 'deeppink',
//     size: 11
// },
// // line: {
// //     width: 0.5
// // },
// // connectgaps: true,
// // transforms: [{
// //     type: 'sort',
// //     target: 'x',
// //     order: 'ascending'
// //   }, {
// //     type: 'filter', 
// //     target: 'x', 
// //     operation: '>',
// //     value: 2
// //   }],
//   hovertemplate:
//         "<b>%{text}</b><br>" +
//         "%{yaxis.title.text}: %{y}<br>" +
//         "%{xaxis.title.text}: %{x}<br>" +
//         "<extra></extra>"
// };


// // Best Supporting Actress graph characteristics
// var trace5 = {
//   x: years_supp_actresses_clean,
//   y: age_supp_actresses,
//   mode: "markers",
//   name: "Best Supporting Actresses",
//   text: name_supp_actresses,
//   marker: {
//     color: 'lightpink',
//     size: 11
// },
// // line: {
// //     width: 0.5
// // },
// // connectgaps: true,
// // transforms: [{
// //     type: 'sort',
// //     target: 'x',
// //     order: 'ascending'
// //   }, {
// //     type: 'filter', 
// //     target: 'x', 
// //     operation: '>',
// //     value: 2
// //   }],
//   hovertemplate:
//         "<b>%{text}</b><br>" +
//         "%{yaxis.title.text}: %{y}<br>" +
//         "%{xaxis.title.text}: %{x}<br>" +
//         "<extra></extra>"
// };

// var data = [trace2, trace4, trace1, trace3,trace5];

// var layout = {
//   title: "Ages Awarded Oscar Over Time",
//   titlefont: {size: 26},
//   hovermode: "closest",
//   showlegend: true,
//   legend: {"orientation": "h", 
//           y: -0.2},
//   xaxis: {
//       title: "Film Year",
//       titlefont: {size: 20},
//       tickfont:{size: 16},
//       automargin: true,
//       showgrid: false,
//       // zeroline: false,
//       dtick: 10,
//   },
//   yaxis: {
//       title: "Age Awarded",
//       titlefont: {size: 20},
//       tickfont:{size: 16},
//       automargin: true,
//       showline: false
//   }
// };

// var config = {
// responsive: true
// };

// Plotly.newPlot("age_years_chart", data, layout, config);

// });
// });
// });
// });
// });