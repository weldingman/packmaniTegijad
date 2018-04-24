var pac;

function setup() {
	createCanvas(640, 480);
  pac = new Pacman({x:100, y:100}, {w:30, h:30}, 1, "up");
}

function draw() {
	background(0);
  pac.update();
}
