// Adding tile layer with variable
var nAmerica = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});
// create Leaflet myMap var with center in North America
var myMap = L.map("map", {
  center: [39.14, -94.67],
  zoom: 5
});

nAmerica.addTo(myMap);
//geojosn earthquake file updating weekly 
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// read the url using d3
d3.json(url, function(response){
  //console.log(response)
//creating a style function
  function earthquackePoint(feature){
    return{
      opacity: 1,
      fillOpacity: 1,
      fillColor: mapColor(feature.properties.mag),
      color: "#000000",
      radius: mapRadius(feature.properties.mag),
      stroke:true,
      weight: 0.5
    };
  }
//creating a color function for each magnitude
  function mapColor(mag){
    switch(true){
        case mag > 5: return "#e42217";
        case mag > 4: return "#e55451";
        case mag > 3: return "#f87217";
        case mag > 2: return "#Af9b60";
        case mag > 1: return "#57e964";
        default: return "#ffffcc";
    }
  }
  //creating a function for radius to enlarge the circle Marker
  function mapRadius(mag) {
    if (mag === 0) {
      return 1;
    }
  return mag * 5;
  }
  
  L.geoJson(response,{
    pointToLayer: function(feature, latlng){
      return L.circleMarker(latlng);
    },
      style: earthquackePoint,
  //Popup info of mag and location for every marker
    onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
  
      }
    }).addTo(myMap);
  //creating legend
    var legend = L.control({
      position: "bottomright"
    });
    legend.onAdd = function(map) {
      var div = L.DomUtil.create("div", "info legend");
      //labels = ['<strong>Magnitude</strong>'];
      var grades = [0, 1, 2, 3, 4, 5];
      var colors = ["#fffcc", "#57e964", "#af9b60", "#f87217","#e55451", "#e42217"];
      // loop thry the intervals of colors to put it in the label
      for (var i = 0; i<grades.length; i++) {
        div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
      }
    //div.innerHTML = labels.join("<br>");
    //return div;
  
    };
  
    legend.addTo(myMap)
   
});



