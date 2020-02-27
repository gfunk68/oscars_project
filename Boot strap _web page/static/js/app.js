// variables for tags and urls

var select_category = d3.selectAll("#category").on('change',optionChanged)
var select_years = d3.selectAll("#years").on('change',optionChanged_years)


var url = "https://oscars-dataset.herokuapp.com/api/v1.0/all_winners_data"
var actress_url = "https://oscars-dataset.herokuapp.com/api/v1.0/best_actresses"

var form_tag = d3.select("#personal_information").append("form").attr("class","form-group").append("ul").attr("class","list-group")

// html manipulation

function optionChanged()
{
   
    var select_category = d3.select("#category").property("value")
    //console.log(select_category)
   
     var selected_year = d3.select("#years").property("value")
     //console.log(selected_year)

    
    select_years.selectAll("option").remove()
   
     d3.json(url,function(url_data){
        var arr = []
        url_data.map(i =>{
             
             if(select_category === i.Category)
             {
                 arr.push(i.Year)
                 var id = arr[0]
                
               if (i.Year == id)
               {
                  if(!(select_years.text()).includes(i.Year)) 
                   {
                    var keys = Object.keys(i)
                    var values = Object.values(i)
                   demographic_info(keys,values)
                   var add_years= select_years.append("option").attr("value",i.Year).text(i.Year)    
                   }
               }
               else
               {
                   if(!(select_years.text()).includes(i.Year))  // adding remaining years -  all unique years 
                   {
                      var add_years= select_years.append("option").attr("value",i.Year).text(i.Year)
                   }
               }
               
             }
         })
         
      })

}


function optionChanged_years()
 {

       var selected_year = d3.select("#years").property("value")

       var current_selected_category = d3.select("#category").property("value")

       d3.json(url,function(url_data){
        var tie_years = []
        var tie_winners = []

          url_data.map(i =>{
            
              if(selected_year === i.Year && current_selected_category === i.Category)
              {
                var keys = Object.keys(i)
                var values = Object.values(i)

                //----------code for displaying tie up winners---------------
               
                tie_winners.push(i)
                tie_years.push(selected_year)

                if(tie_years.length === 2)
                {
                    if(tie_years[0]===tie_years[1])  // display tie up winners onr after one
                    {
                        console.log(tie_years)
                        
                         var keys1 = Object.keys(tie_winners[0])
                         var values1 = Object.values(tie_winners[0])
                        
                         //form_tag.selectAll("img").remove()
                         //form_tag.selectAll("h4").remove()

                         demographic_info(keys1,values1)

                         var keys2 = Object.keys(tie_winners[1])
                         var values2 = Object.values(tie_winners[1])

                         //var breaks = form_tag.append("br") 
                         form_tag.append("br")
                         form_tag.append("br")
                         //form_tag.append("hr")
                         

                         var second = form_tag.append("ul").attr("class","list-group").append("p")  // adding 
                         //demographic_info(keys2,values2)
                        
                        for (var k=1;k<keys2.length;k++)
                         { 
                            if (k===7) // image url , display image at bottom right 
                             {
                                  //console.log(values[k]) 
                             if(values[k]!=="Unknown")  
                                {
         
                                   second.append("img").attr("src",values2[k]).attr("alt","Winners Image").classed('float-down',true).style("float","right")
                                  

                                }
                             else{   // "No image url case"
                                   second.append("img").attr("src","images/unknown.png").attr("alt","Winners Image").classed('float-down',true).style("float","right")
                                }
     
                             }
                            if (k!==7 && k!==11 && k!==12)
                             {
                             if (k!==6)
                             {
          
                                var property = second.append("h4").text(keys2[k]+" "+":"+" ").append("b").text(values2[k]).append("br")
          
                             }
                            else  // wiki url
                             {
                                var property = second.append("h4").text(keys2[k]+" "+":"+" ").append("a").attr("href",values2[k]).attr("target","_blank").text(values[k])
                             }   
                            }  
                        }  //  for loop ending
                    }
                        }
           
                else
                {

                //----------code for tie up above---------------

                demographic_info(keys,values)  // function called for non tie winners

                } 
              }
          }) 
       })
 }

 function page_load() // loading all 5 categories ,best actress years and first best actress information when the page is opened or refreshed 
 {
    d3.json(actress_url,function(url_data){

        var selected_id = url_data[0].Year
        url_data.map(i => {
            //console.log(i.Year)
    
            if (selected_id === i.Year)
            {
                var keys = Object.keys(i)
                var values = Object.values(i)
                demographic_info(keys,values)
    
                if(!(select_years.text()).includes(i.Year))  // adding first year  - total 92 years
                {
                   var add_years= select_years.append("option").attr("value",i.Year).text(i.Year).attr("selected","selected")
                }
            }
            else
            {
                if(!(select_years.text()).includes(i.Year))  // adding remaining 91 years -  all unique years 
                {
                   var add_years= select_years.append("option").attr("value",i.Year).text(i.Year)
                }
            }
        })
    })
    
    d3.json(url,function(url_data){
      
        var selected_id = url_data[0].Category
    
        url_data.map(data =>
        {
           if (selected_id === data.Category)
           {
            if (!(select_category.text()).includes(data.Category))  // checking for unique values
            {
                // adding first data category - total 5 
                var add_category = select_category.append("option").attr("value",data.Category).text(data.Category).attr("selected","selected")
            }
           }
           else
           {
            if (!(select_category.text()).includes(data.Category))   // checking for unique values
            {
                // adding remaining 4 data categories - all unique
                var add_category = select_category.append("option").attr("value",data.Category).text(data.Category)
            }
           }     
        })
    })

 }


function demographic_info(keys,values)
{

    form_tag.selectAll("img").remove()
    form_tag.selectAll("h4").remove()
    form_tag.selectAll("br").remove()
    form_tag.selectAll("p").remove()

    var tie_keys = []
    var tie_values = []

    tie_keys.push(keys)
    tie_values.push(values)
    
    var tie_years = []
    
    for (var k=1;k<keys.length;k++)
   { 
 
    if (k===7) // image url , display image at top right 
    {
        //console.log(values[k]) 
        if(values[k]!=="Unknown")  // "No image url case"
        {
         
         form_tag.append("img").attr("src",values[k]).attr("alt","Winners Image").classed('float-right',true).style("float","right")
        //form_tag.append("img").attr("src",values[k]).attr("alt","Winners Image").classed('float-right',true)

        }
        else{
            form_tag.append("img").attr("src","images/unknown.png").attr("alt","Winners Image").classed('float-right',true).style("float","right")
        }
     
    }
    if (k!==7 && k!==11 && k!==12)
    {
        if (k!==6)
        {
          
            var property = form_tag.append("h4").text(keys[k]+" "+":"+" ").append("b").text(values[k]).append("br")
           //var value_tag = property.append("label").attr("for",values[k]).text(values[k])
           //value_tag.append("br")
        }
        else  // wiki url
        {
            var property = form_tag.append("h4").text(keys[k]+" "+":"+" ").append("a").attr("href",values[k]).attr("target","_blank").text(values[k])

        }   
    }  
  }  //  for loop ending
  
} // function ending 


page_load()  // data to be loaded when page is opened or refreshed




