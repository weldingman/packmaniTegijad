
var dim = 20;
var cols = 31;
var rows = 24;
var windWith = dim * cols;
var winHeight = dim * rows;
// var nodeArr = [];
// var grid;
// var mc = true;
// var aStar;
var walls = [];
var walls2 = [];
// var path = [];
var start = {i:1, j:1};
var pacman;
var ghost;
var ghost2;
var preWorld = [];
var md = true;
var i = 1;
var j = 1;
// var bg;
// var pacPos;

function preload(){
	preWorld = loadJSON("world.json");
	bg = loadImage("pngs/dreamWorld4.jpg");
}

function setup() {
	createCanvas(windWith, winHeight);

	walls2 = new Wall(preWorld);
	walls = walls2.wall.wall;
	pacman = new Agent(cols, rows, dim, walls, start, 5);
	ghost = new Agent(cols, rows, dim, walls, {i:1, j:22}, 2);
	ghost2 = new Agent(cols, rows, dim, walls, {i:29, j:22}, 2);
	// pacman.showGrid = true;
}

function draw(){
  background(bg);

	var pacPos = pacman.update(md, i, j);
	if(mouseIsPressed){
		md = true;
		i = help.snap(mouseX, dim) / dim;
  	j = help.snap(mouseY, dim) / dim;
	}
	else{
		md = false;
	}

	// ghost.update(pacPos.u, pacPos.i, pacPos.j);
	// ghost2.update(pacPos.u, pacPos.i, pacPos.j);
}
