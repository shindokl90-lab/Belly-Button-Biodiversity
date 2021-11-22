// create init function to build inital plot when refreshed
function init(){
    buildPlot()
};

//create function that will apply once the option has changed
function optionChanged() {
    // Build the revised plot
    buildPlot();
  };

//create a function that builds plot
function buildPlot(){

    d3.json("data/samples.json").then((data) =>{
        //get a list of all the id names
        var idValues = data.names;
        console.log(idValues);

        // Create the drop down menu by inserting every id
        idValues.forEach(id => d3.select('#selDataset').append('option').text(id).property("value", id));

        // Use D3 to select the current ID and store in a variable to work with
        var currentID = d3.selectAll("#selDataset").node().value;
        console.log(currentID);

        //filter the data based on selection
        filtered = data.samples.filter(entry => entry.id == currentID);
        console.log(filtered);

                // create the demographics panel
        filterData2 = data.metadata.filter(entry => entry.id == currentID)

        // create a demographics object to add to panel body
        var panelDemo = {
            'id: ': filterData2[0].id,
            'ethnicity: ': filterData2[0].ethnicity,
            'gender: ': filterData2[0].gender,
            'age: ': filterData2[0].age,
            'location: ': filterData2[0].location,
            'bbtype: ': filterData2[0].bbtype,
            'wfreq: ': filterData2[0].wfreq
            }
        
        console.log(panelDemo)    
        //select the id to append the key value pair under demographics panel
        panelBody = d3.select("#sample-metadata")
      
        // remove the current demographic info to make way for new currentID
        panelBody.html("")
              
        //append the key value pairs from demographics into the demographics panel
        Object.entries(panelDemo).forEach(([key, value]) => {
            panelBody.append('p').attr('style', 'font-weight: bold').text(key + value)
            });
        //testing for x values
        console.log(filtered[0].sample_values);
        console.log(filtered[0].sample_values.slice(0,10));
    
        //y vales test
        console.log(filtered[0].otu_ids.slice(0,10).reverse());
        console.log(filtered[0].otu_ids.slice(0,10).reverse().map(id => "OTU " + id.toString()));

        // horizontal bar chart
        var data = [{
            type: 'bar',
            x: filtered[0].sample_values.slice(0,10).reverse(),
            y: filtered[0].otu_ids.slice(0,10).reverse().map(id => "OTU " + id.toString()),
            orientation: 'h'
        }];
      
      Plotly.newPlot('bar', data);

          // bubble chart
      var trace2 = {
        x: filtered[0].otu_ids,
        y: filtered[0].sample_values,
        text: filtered[0].otu_labels,
        mode: 'markers',
        marker: {
          color : filtered[0].otu_ids,
          size : filtered[0].sample_values
        }
      };
     
      var data = [trace2];
    
      var layout = {
        title: 'OTU Info For Subject',
        showlegend: false,
       };
    
      Plotly.newPlot('bubble', data, layout);  

    });

};

//run init to  set the main page
init();
