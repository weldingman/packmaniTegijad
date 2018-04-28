// test heoku

var pac;
var world;
var ghost;
var ghost2;
var ghosts = [];
var numOfGhosts = 6;
var saveWorld = true;
var loadWorld = true;
let preWorld;
var bg;
var score = 0;

function preload(){
	preWorld = loadJSON("world2.json");
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
  world = new TestWorld({w:20,h:20}, preWorld.wall, preWorld.branch, preWorld.pacTrace, preWorld.food);
	world.setPactraceRandom();
	console.log(world);
}

function draw() {
	background(bg);
	frameRate(60);
	document.getElementById("mytext").value = score;
	var worldObj = world.update(pac);
  pac.update(worldObj.wall);
	for(var i = 0; i < ghosts.length; i++){
		if(ghosts[i].update(worldObj, pac)){
			restartWorld();
		}
	}
	lS();
}

function restartWorld(){
	world.setPactraceRandom();
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
