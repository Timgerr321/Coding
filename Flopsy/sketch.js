var bird;
var pipes = [];
var score;

function setup() {
  createCanvas(400, 600);
  bird = new bird();
  pipes.push(new pipe());
}

function draw() {
  background(0)

  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log("HIT");
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }
    bird.update();
    bird.show();

    if (bird.y > pipe.bottom && bird.y < pipe.top){
      console.log("point");
      }

    if (frameCount % 60 == 0) {
      pipes.push(new pipe());
    }
  }


function keyPressed() {


  if (key == ' ' ) {
    //console.log("SPACE");
    bird.up();
  }
}
