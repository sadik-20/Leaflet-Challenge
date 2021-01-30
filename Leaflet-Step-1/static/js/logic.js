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
  console.log(response)
})



