// Creating our initial map object
var url = "https://oscars-dataset.herokuapp.com/api/v1.0/all_winners_data"

  d3.json(url,function(d){


    winnerz=[]
      
    d.forEach(function(winner) {
        if (winnerz.indexOf(winner['Winner Name']) !== -1)
        {return;}
        
        winnerz.push(winner['Winner Name']);

        if (winner['Age Awarded'] ==='Unknown')
        { return; }


      var colors = "";
      
        if (winner['Category'] == 'Best Actor' || winner['Category'] == 'Best Supporting Actor'){
          colors = "blue";
        }
        else if (winner['Category'] == 'Best Director') {
            colors = 'green';
        }
        else {
          colors = "pink";
        }
        
        // console.log(winner)

    // find unique years for plotting
    // const onlyUnique = (value, index, self) => { 
    //   return self.indexOf(value) === index;
    // }
    // const years = winner['Year'];
    // const uniqueyears = years.filter(onlyUnique);
    var years = winner['Year'];

    // console.log(uniqueyears)

    var age = winner['Age Awarded'];
    // console.log(age)

    var category = winner['Category'];
    // console.log(category)

    var name = winner['Winner Name'];
    // console.log(name)
    
        var trace = {
        x: years,
        y: age,
        mode: "markers",
        // name: category,
        // text: name,
        marker: {
          // color: colors,
          size: 12,
          line: {
            width: 0.5
          }
        },
        type: "scatter"
      };
      
      var data = [trace];
      var layout = {
        title: "Ages Awarded Over Time",
        xaxis: {
          title: "Years",
        //   showgrid: false,
        //   zeroline: false
        },
        yaxis: {
          title: "Age Awarded",
        //   showline: false
        }
      };
      var graphOptions = {layout: layout, filename: "line-style", fileopt: "overwrite"};
      Plotly.newPlot("age_years_chart", data, layout, {scrollZoom: true});
      });
      
    
})



