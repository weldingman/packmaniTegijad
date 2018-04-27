// test heoku

var pac;
var world;
var ghost;
var ghost2;
var saveWorld = true;
var loadWorld = true;
let preWorld;

function preload(){
	preWorld = loadJSON("world.json");
}

function setup() {
	//createCanvas(640, 480);
	const canvasElt = createCanvas(640, 480).elt;
  canvasElt.style.width = '100%', canvasElt.style.height = '100%';
  pac = new Pacman({x:100, y:100}, {w:40, h:40}, 5, "up");
	ghost = new Ghost({x:200, y:200}, {w:40, h:40}, 5, "up");
	ghost2 = new Ghost({x:200, y:200}, {w:40, h:40}, 5, "up");
  world = new TestWorld({w:20,h:20}, preWorld.wall, preWorld.branch);
	console.log(preWorld);
}

function draw() {
	background(0);
  pac.update(world.update().wall);
	ghost.update(world.update(), pac);
	ghost2.update(world.update(), pac);
	lS();
}

function lS(){
	if(testLib.keys().save && saveWorld){
		this.saveWorld = false;
		saveJSON(world, "world.json");
	}
	if(testLib.keys().load && this.loadWorld){
		//var text = require('world.json'); //(with path)
		var obj = loadJSON("world.json");
		console.log(obj);
		world = obj;
		loadWorld = false;
	}
	if(!testLib.keys().load){
		loadWorld = true;
	}
	if(!testLib.keys().save){
		saveWorld = true;
	}
}
