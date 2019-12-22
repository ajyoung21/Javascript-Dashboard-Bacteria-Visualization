//I ran into an error for some reason on one of the data points
//(the data was probably incomplete), so I used this to bypass the
//error later in the code.
function stoperror() {
    return true;
 }

 //Getting Data
jQuery.getJSON("../samples.json", function(json) {
    var data = json
    var ref_number = 0
    // Grab values from the response json object to build the plots
    var namez = data.names;
    var otu_ids = []
    var sample_values = []
    var otu_labels = []
    var ids = []
    var ethnicities = []
    var genders = []
    var ages = []
    var locations = []
    var bbtypes = []
    var wfreqs = []

    


    for (i = 0; i < data.samples.length; i++) { 
        sample_values.push(data.samples[i].sample_values);
        otu_labels.push(data.samples[i].otu_labels);
        otu_ids.push(data.samples[i].otu_ids)
    }

        // if (data.samples[i].otu_ids.length > 0) {
        //     try{

            
            // otu_id = [];

        // for (j = 0; j <data.samples[i].otu_ids.length; i++) {
        //         otu_id.push(`${data.samples[i].otu_ids[j]}`);
        // }
        //     otu_ids.push(otu_id)

        //     } catch(e){
        //         console.log(e)
        //     stoperror(e);
        //     }

        // }
        // else {}
        // }
    for (i = 0; i < data.metadata.length; i++) { 
                ids.push(data.metadata[i].id);
        ethnicities.push(data.metadata[i].ethnicity);
        genders.push(data.metadata[i].gender);
        ages.push(data.metadata[i].age);
        locations.push(data.metadata[i].location);
        bbtypes.push(data.metadata[i].bbtype);
        wfreqs.push(data.metadata[i].wfreq);

    }
    
  
    //Demographic Data
    function make_dems(number) {
        d3.select("#sample-metadata").text('')
        d3.select("#sample-metadata").append("p").text(`ID: ${ids[number]}`);
        d3.select("#sample-metadata").append("p").text(`Ethnicity: ${ethnicities[number]}`);
        d3.select("#sample-metadata").append("p").text(`Gender: ${genders[number]}`);
        d3.select("#sample-metadata").append("p").text(`Age: ${ages[number]}`);
        d3.select("#sample-metadata").append("p").text(`Location: ${locations[number]}`);
        d3.select("#sample-metadata").append("p").text(`bbtype: ${bbtypes[number]}`);
        d3.select("#sample-metadata").append("p").text(`wfreq: ${wfreqs[number]}`);

    }
    console.log(ids)
    make_dems(ref_number)
    otu_idz = otu_ids.map(object => `"${object}"`)
  
    //Bar Chart
    function makebar(number) {
        var trace1 = {
            type: 'bar',
        
            text: otu_labels[number].slice(0,10),
            x: sample_values[number].slice(0,10),
            y: otu_idz[number].slice(0,10),
            orientation: "h",
            line: {
                color: "#17BECF"
      }

    };
        

        data = [trace1]
       


        var layout = {
            title: `Most Common Biodiversity in Patient ${namez[number]}`,
            xaxis: {

            title: {
                text: "Sample Value"
            }
       
            },
            yaxis: {
                    tickvals: [0,1,2,3,4,5,6,7,8,9],
                    ticktext: otu_ids[number],
                    tickmode: "array",
                    range: [9.5, -.5],
                //By reversing the range ([9.5, -.5] as opposed to [-.5, 9.5]), 
                //we can get our highest values on top like in the example.
                    
                    title: {
                        text: "OTU ID"
                        }
        

                    }
                    };
                    
                
                Plotly.newPlot("bar", data, layout);
                }
makebar(ref_number)
 
//Appends all of the names to the dropdown menu.
d3.select("#dropdown").text(namez[ref_number])

for (i = 0; i < namez.length; i++) { 

d3.select("select").append("option").text(namez[i])


}


var selected = d3.select("option")

var inputElement = d3.select("#selDataset");
var inputValue = inputElement.property("value");


var button = d3.select("#selDataset");

button.on("change", function() {

console.log('click')


function optionChanged(){
    inputElement = d3.select("#selDataset");
    inputValue = inputElement.property("value");
    console.log(inputValue)
    for (i = 0; i < namez.length; i++) {

        if (inputValue === namez[i]) {
            ref_number = i
            console.log(ref_number)
            console.log(otu_ids)
            make_dems(ref_number)
            makebar(ref_number)
            make_bubble(ref_number)
            
                }
                
        else {}
            
        

    
}}
optionChanged()
}
);
// function optionChanged() {
//     selected.on('click', function() {

//     
// }

console.log(otu_ids)

//BUBBLE CHART
function make_bubble(number) {
    var trace2 = {
        x: otu_ids[number],
        
        y: sample_values[number],
        text: otu_labels[number],
        mode: 'markers',
        marker: {
    
            size: sample_values[number],
            color: otu_ids[number],
        }
    };
  
    var data = [trace2];
  
    var layout = {
        yaxis: {

            title: {
                text: "Sample Value"
            }
        },
        xaxis: {

            title: {
                text: "OTU ID"
            }
        },
        title:  `Most Common Biodiversity in Patient ${namez[number]}`,
        showlegend: false,
        height: 600,
        width: 1500,
        range: [-500, 3500]

    
    };
  
    Plotly.newPlot('bubble', data, layout);

}

make_bubble(ref_number)

});




