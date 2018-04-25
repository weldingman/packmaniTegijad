var pac;
var world;

function setup() {
	createCanvas(640, 480);
  pac = new Pacman({x:100, y:100}, {w:40, h:40}, 5, "up");
  world = new TestWorld({w:20,h:20});
}

function draw() {
	background(0);
  pac.update(world.update());
}
