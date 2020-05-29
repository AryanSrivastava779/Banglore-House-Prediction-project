function getBathValue(){
    var uiBath = document.getElementsByName("uibathrooms");
    for(var i in uiBath){
        if(uiBath[i].checked){
            return parseInt(i)+1;
            
        }
    }
    return -1   
}
function getBHKValue(){
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK){
        if(uiBHK[i].checked){
            return parseInt(i)+1;
        }
    }
    return -1
}
function onClickedEstimatePrice(){
    console.log("Estimate Price Button Clicked");
    var sqft = document.getElementById("uisqft");
    var BHK = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocation");
    var estPrice = document.getElementById("uiEstimatePrice");

    var url = "/api/predict_home_price";
    $.post(url,{
        total_sqft : parseFloat(sqft.value),
        bhk : BHK,
        bath : bathrooms,
        location : location.value
    }, function(data,status){
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2 class='output'>"+ data.estimated_price.toString() + " Lakh</h2>";
        console.log(status);
    });
}


function onPageLoad(){
    console.log("Document Loded");
    var url = "/api/get_location_names";
    $.get(url,function(data,status){
        console.log("fot response from get_location_names request");
        if(data){
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocation");
            $('#uiLocation').empty();
            for (var i in locations){
                var opt = new Option(locations[i]);
                $('#uiLocation').append(opt);
            }
        }
    });

}
window.onload = onPageLoad;
