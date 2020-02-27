// API key
const API_KEY = "pk.eyJ1IjoiZ2Z1bms2OCIsImEiOiJjazZiZ2Nkd28wZ21hM2twc294ZGh1c29yIn0.fej_fX1ysqGL6puoXInGqg";
// Creating our initial map object
var url = "https://oscars-dataset.herokuapp.com/api/v1.0/all_winners_data"

// d3.json(url).then(function(d){
//     console.log(d)
// })


  d3.json(url,function(d){
    // Create a new marker cluster group
    
  
    var markers = L.markerClusterGroup();
    
   
    var myMap = L.map("map", {
        center: [15.5994, -28.6731],
        zoom: 3,
        layers: [markers, circle]
      })
      

     
    
      

      // Adding tile layer
      L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API_KEY
      }).addTo(myMap);
      
      // Loop through the countries array and create one circle for each country. 
    //   winnerlist = []
    //   d.filter(function(winner){return winner['Birthplace Latitude']=='Unknown'}
      winnerz=[]
      
      d.forEach(function(winner) {

        //Checks if Winner Name is unique so we don't show multiple dots for same person.
        if (winnerz.indexOf(winner['Winner Name']) !== -1)
        {return;}
        
        winnerz.push(winner['Winner Name']);

        if (winner['Birthplace Latitude'] ==='Unknown')
        { return; }


      var color = "";
      
        if (winner['Category'] == 'Best Actor' || winner['Category'] == 'Best Supporting Actor'){
          color = "blue";
        }
        else if (winner['Category'] == 'Best Director') {
            color = 'green';
        }
        else {
          color = "pink";
        }
    
              // add circles to map
          L.circle([winner['Birthplace Latitude'],winner['Birthplace Longitude']], {
            fillOpacity: 1,
            weight: 0,
            color: "white",
            fillColor: color,
            // Adjust radius
            radius: 70000
          }).bindPopup(`<img src='${winner['Image URL']}' width="75" height="100" margin-right=auto margin-left=auto display=block> <h4>${winner["Winner Name"]}</h4> <hr> <h6>Year: ${winner.Year}</h6><h6>Category: ${winner.Category}</h6><h6>Film: ${winner.Film}</h6><h6>Birthplace: ${winner['Birthplace']}</h6>`)
            .addTo(myMap);
      

    
      
      
          //Add a new marker to the cluster group and bind a pop-up
          markers.addLayer(
            L.marker([winner['Birthplace Latitude'],winner['Birthplace Longitude']]).bindPopup(`<img src='${winner['Image URL']}' width="75" height="100" margin-right=auto margin-left=auto display=block> <h4>${winner["Winner Name"]}</h4> <hr> <h6>Year: ${winner.Year}</h6><h6>Category: ${winner.Category}</h6><h6>Film: ${winner.Film}</h6><h6>Birthplace: ${winner['Birthplace']}</h6>`)
          );
          // Add our marker cluster layer to the map
          myMap.addLayer(markers);
          
          L.control.layers()
      })
})
