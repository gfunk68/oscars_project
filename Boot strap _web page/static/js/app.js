
var select_category = d3.selectAll("#category")
var select_names = d3.selectAll("#names")

var form_tag = d3.select("#personal_information").append("form").attr("class","form-group").append("ul").attr("class","list-group")

//form_tag.append("b").text("AGE :")




var category_array = ["Actor","Actress","Director","SupportingActor","SupportingActress"]
var actor_names = [1,2,3,4,5]
var actress_names = [4,4,4,4,5,5,5,5]

category_array.forEach(function(d){
    //console.log(d)
    select_category.append("option").attr("value",d).text(d)
})

function optionChanged()
{
    //var selected_category = d3.selectAll("category").node()
    var select_category = d3.select("#category").property("value")
    console.log(select_category)
    //var category_value = select_category.text;
    //console.log(category_value)

    //optionChanged_names(select_category)

    if (select_category == category_array[0])
    {
        optionChanged_names(select_category)
        //console.log(select_category)
        //console.log(category_array[0])
        //actor_names.forEach(function(d){
          //  console.log(d)
            //select_names.append("option").attr("value",d).text(d)
        //})
    }

}

function optionChanged_names(select_category)
{
    console.log(select_category)
    actor_names.forEach(function(d){
        console.log(d)
        select_names.append("option").attr("value",d).text(d)
    })
    
}

actress_names.forEach(function(d){
    //console.log(d)
    //select_names.append("option").attr("value",d).text(d)
})



//var names = students.map(student => student.name);
// actor_names.forEach(function(d){
//     select_names.append("option").attr("value",d).text(d)
// })

//hairData.csv

//url = "http://127.0.0.1:5000/api/v1.0/best_directors"
url = "https://oscars-dataset.herokuapp.com/api/v1.0/all_winners_data"

//console.log(url)

// retrieving url data in json using d3

//  d3.json(url,function(data){
//     // console.log(data.Year)
//  })

//  d3.request("http://127.0.0.1:5000/api/v1.0/all_winners_data")
// .header("Content-Type", "application/json")
// .post(function(data) {
//    console.log(data);
// })


var data = {"_id": {"$oid": "5e5491fe11ec5fc67afdaecc"}, "Year": "1927/28", "Oscar Year": "1st", "Winner Name": "Frank Borzage ", "Film": "7th Heaven", "Category": "Best Director", "Wiki URL": "https://en.wikipedia.org/wiki/Frank Borzage ", "Image URL": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Frank_Borzage_001.JPG", "Birthplace": "Salt Lake City, Utah, U.S.", "Birth Year": "1894", "Age Awarded": 34, "Birthplace Latitude": 40.77, "Birthplace Longitude": -111.89}

console.log(data)
console.log(typeof data)


console.log("---------keys - values--------------");

var keys = Object.keys(data)
var values = Object.values(data)
console.log(values)

for (var k=1;k<keys.length;k++)
{ 
    //console.log(k)
    //var age_tag = h5_1.append("label").attr("for","age").append("h5").text("")
    if (k===7)
    {
        //console.log(k)
        //<img src="https://www.w3schools.com/images/w3schools_green.jpg" alt="W3Schools.com">
        //<img src="paris.jpg" class="float-right" alt="Paris" width="304" height="236"> 
        //form_tag.append("img").attr("src",values[k]).attr("alt","Winners Image").attr("class","float-right")
         //form_tag.append("img").attr("src",values[k]).attr("alt","Winners Image").classed('float-right',true).style("position","absolute").style("top",0).style("right","0%")
         form_tag.append("img").attr("src",values[k]).attr("alt","Winners Image").classed('float-right',true).style("float","right")
        //form_tag.append("img").attr("src",values[k]).attr("alt","Winners Image").classed('float-right',true)
    }

    if (k!==7 && k!==11 && k!==12)
    {
        if (k!==6)
        {
            //console.log(k)
            var property = form_tag.append("h4").text(keys[k]+" "+":"+" ").append("b").text(values[k]).append("br")
           //form_tag.append("label").attr("for",values[k]).text(values[k]).append("br")
           //var value_tag = property.append("label").attr("for",values[k]).text(values[k])
           //value_tag.append("br")

        }
        else
        {
            var property = form_tag.append("h4").text(keys[k]+" "+":"+" ").append("a").attr("href",values[k]).attr("target","_blank").text(values[k])

        }
       

    }

   
}

// form_tag.append("b").text(keys[1]+":").append("br")
// form_tag.append("b").text(keys[2]+":").append("br")
// form_tag.append("b").text(keys[3]+":").append("br")
// form_tag.append("b").text(keys[4]+":").append("br")
// form_tag.append("b").text(keys[5]+":")
// form_tag.append("b").text(keys[6]+":")
// form_tag.append("b").text(keys[8]+":")
// form_tag.append("b").text(keys[9]+":")
// form_tag.append("b").text(keys[10]+":")

//console.log(keys)
//console.log(typeof keys)
//console.log(Object.values(data))

console.log("----------entries-------------");

//console.log(entries1[0]) 
console.log(Object.entries(data))

console.log("-----------------------");

//  d3.json("http://127.0.0.1:5000/api/v1.0/all_winners_data").then( data => {
//     console.log(data);
// })

// // import csv data from "Best-actor.csv"


var categories = []

 d3.csv("static/js/bestdirector.csv",function(data){
     console.log("---------------------")
     data.forEach(function(data){
         //console.log(data.Year)
         categories.push(data.Category)
     })
     console.log(categories)
     console.log("---------------------")
 })

 d3.csv("static/js/best_actor.csv",function(data){
    console.log("---------------------")
    data.forEach(function(data){
        //console.log(data.Year)
        categories.push(data.Category)
    })
    console.log(categories)
    console.log("---------------------")
})
d3.csv("static/js/best_actress.csv",function(data){
    console.log("---------------------")
    data.forEach(function(data){
        //console.log(data.Year)
        categories.push(data.Category)
    })
    console.log(categories)
    console.log("---------------------")
})

d3.csv("static/js/bestsupportingactor.csv",function(data){
    console.log("---------------------")
    data.forEach(function(data){
        //console.log(data.Year)
        categories.push(data.Category)
    })
    console.log(categories)
    console.log("---------------------")
})

d3.csv("static/js/bestdirector.csv",function(data){
    console.log("---------------------")
    data.forEach(function(data){
        //console.log(data.Year)
        categories.push(data.Category)
    })
    console.log(categories)
    console.log("---------------------")
})

//  d3.csv("hairData.csv").then(function(d){
//      console.log(d)
//      console.log("---------------------")
//      d.forEach(function(data){
//          console.log(data)
//      })
//      console.log("---------------------")
//  })


// d3.csv("hairData.csv").then(function(hairData) {

//     console.log(hairData[0])
//     // Step 1: Parse Data/Cast as numbers
//     // ==============================
//     hairData.forEach(function(data) {
//       console.log(data[0])
//       data.hair_length = +data.hair_length;
//       data.num_hits = +data.num_hits;
//     });

// });

