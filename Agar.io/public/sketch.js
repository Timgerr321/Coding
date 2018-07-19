// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/ZjVyKXp9hec

// Keep track of our socket connection
var socket;

var blob;

var blobs = [];
var zoom = 1;

function setup() {
  createCanvas(900, 900);
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://localhost:3000');


  blob = new Blob(random(width), random(height), random(8, 24));
  // Make a little object with  and y
  var data = {
    x: blob.pos.x,
    y: blob.pos.y,
    r: blob.r
  };
  socket.emit('start', data);

  socket.on('heartbeat',
    function(data) {
      //console.log(data);
      blobs = data;
    }
  );
}

function draw() {
  background(0);
  //console.log(blob.pos.x, blob.pos.y);

  rect(width-200,height-200,200,200);
  var getpositx = blob.pos.x/9;
  var getposity = blob.pos.y/9;


    //console.log(getpositx);
  ellipse(width-200+getpositx+100,height-200+getposity+100, 10);
  for (var i = blobs.length - 1; i >= 0; i--) {
    var x6 = blobs[i].x2;
    var y6 = blobs[i].y2;

    ellipse(width-200+x6+100,height-200+y6+100, 10);
  }

  //console.log(x6);
  translate(width / 2, height / 2);
  var newzoom = 64 / blob.r;
  zoom = lerp(zoom, newzoom, 0.1);
  scale(zoom);
  translate(-blob.pos.x, -blob.pos.y);

  for (var i = blobs.length - 1; i >= 0; i--) {
    var id = blobs[i].id;
    if (id.substring(2, id.length) !== socket.id) {

      //console.log(id.substring(2, id.lenth));
      fill(0, 0, 255);
      ellipse(blobs[i].x, blobs[i].y, blobs[i].r * 2, blobs[i].r * 2);

      fill(120);
      textAlign(CENTER);
      textSize(4);
      text(blobs[i].id, blobs[i].x, blobs[i].y + blobs[i].r);
    }
  //  blobs[i].show();
  //   if (blob.eats(blobs[i])) {
    //   blobs.splice(i, 1);
   //}
  }



  blob.show();
  if (mouseIsPressed) {
    blob.update();
  }
  blob.constrain();

  var data = {
    x: blob.pos.x,
    y: blob.pos.y,
    r: blob.r
  };
  socket.emit('update', data);


}
