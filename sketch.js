var pac;
var world;
var ghost;
var ghost2;

function setup() {
	createCanvas(640, 480);
  pac = new Pacman({x:100, y:100}, {w:40, h:40}, 5, "up");
	ghost = new Ghost({x:200, y:200}, {w:40, h:40}, 5, "up");
	ghost2 = new Ghost({x:200, y:200}, {w:40, h:40}, 5, "up");
  world = new TestWorld({w:20,h:20});
}

function draw() {
	background(0);
  pac.update(world.update().wall);
	ghost.update(world.update(), pac);
	ghost2.update(world.update(), pac);
}
