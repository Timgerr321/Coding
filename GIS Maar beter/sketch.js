let myMap;
let row;
// Create a variable to hold our canvas
let canvas;
// Create a new Mappa instance using Leaflet.
const mappa = new Mappa('Leaflet');

const options = {
  lat: 52.126972,
  lng: 6.229233,
  zoom: 4,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

// p5.js setup
function setup() {
  // Create a canvas 640x640
  canvas = createCanvas(1000, 1000);
  // Add a grey background
  //background(100);

  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  myMap.onChange(drawPoint);
  Subscribers = loadTable('country-capitals.csv', 'csv', 'header');
  //console.log(Subscribers);
    fill(70, 203, 31);
  newtable = loadTable('add.csv', 'csv', 'header');
}
function add(){
  //var xx = document.getElementById("frm1").value;
  //var yy = document.getElementById("frm2").value;
  //console.log(xx);
  //console.log(yy);


//  var newRow = newtable.addRow();
//  newRow.setNum('lat', x);
//  newRow.setNum('lon', y);
//  saveTable(newtable,'add.csv');
}
// p5.js draw
function draw() {

}

function drawPoint() {
  clear();

  const xx = document.getElementById("frm1").value;
  const yy = document.getElementById("frm2").value;

  for (let i = 0; i < Subscribers.getRowCount(); i++) {
    // Get the lat/lng of each meteorite
    const x = Number(Subscribers.getString(i, 'CapitalLatitude'));
    const y = Number(Subscribers.getString(i, 'CapitalLongitude'));

    const pos = myMap.latLngToPixel(x, y);
    ellipse(pos.x, pos.y, 10, 10);

  }
  
  const pos2 = myMap.latLngToPixel(xx, yy);
  ellipse(pos2.x, pos2.y, 10, 10);
}
