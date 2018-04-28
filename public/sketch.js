// test heoku

var pac;
var world;
var ghost;
var ghost2;
var ghosts = [];
var numOfGhosts = 5;
var saveWorld = true;
var loadWorld = true;
let preWorld;
var bg;

function preload(){
	preWorld = loadJSON("world.json");
}

function setup() {
	bg = loadImage("pngs/dreamWorld4.jpg");
	createCanvas(640, 480);
	//const canvasElt = createCanvas(640, 480).elt;
  //canvasElt.style.width = '50%', canvasElt.style.height = '50%';
  pac = new Pacman({x:30, y:30}, {w:20, h:20}, 5, "up");
	for(var i = 0; i < numOfGhosts; i++){
		ghosts.push(new Ghost({x:280, y:190}, {w:20, h:20}, 5, "up"));
	}
	// ghost = new Ghost({x:200, y:200}, {w:40, h:40}, 5, "up");
	// ghost2 = new Ghost({x:200, y:200}, {w:40, h:40}, 5, "up");
  world = new TestWorld({w:20,h:20}, preWorld.wall, preWorld.branch, preWorld.pacTrace);
	console.log(world);
}

function draw() {
	background(bg);
	frameRate(60);
  pac.update(world.update(pac).wall);
	for(var i = 0; i < ghosts.length; i++){
		if(ghosts[i].update(world.update(pac), pac)){
			restartWorld();
		}
	}
	lS();
}

function restartWorld(){
	pac = new Pacman({x:30, y:30}, {w:20, h:20}, 5, "up");
	ghosts = [];
	for(var i = 0; i < numOfGhosts; i++){
		ghosts.push(new Ghost({x:280, y:190}, {w:20, h:20}, 5, "up"));
	}
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
