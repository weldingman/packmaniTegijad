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
var score = 0;
var teime = 0;
var startMillis;

function preload(){
	preWorld = loadJSON("world2.json");
	bg = loadImage("pngs/dreamWorld4.jpg");
}

function setup() {
	//var myCanvas = createCanvas(640, 480);
	createCanvas(640, 480);
	startMillis = millis();
	//myCanvas.parent('myContainer');
	//const canvasElt = createCanvas(640, 480).elt;
  //canvasElt.style.width = '260px', canvasElt.style.height = "200px";
  pac = new Pacman({x:30, y:30}, {w:20, h:20}, 2.5, "up");
	for(var i = 0; i < numOfGhosts; i++){
		ghosts.push(new Ghost({x:280, y:190}, {w:20, h:20}, 2, "up"));
	}
  world = new TestWorld({w:20,h:20}, preWorld.wall, preWorld.branch, preWorld.pacTrace, preWorld.food);
	world.setPactraceRandom();
}

function draw() {
	background(bg);
	frameRate(50);
	var worldObj = world.update(pac);
	score += worldObj.addPoints;
	time = ((millis() - (startMillis)) / 1000).toFixed(1);
	strokeWeight(4);
	stroke(51);
	fill("yellow");
	textSize(20);
	textStyle(BOLD);
	text("score: " + score, 150, 65);
	text("time: " + time, 410, 65);
  pac.update(worldObj.wall);
	for(var i = 0; i < ghosts.length; i++){
		if(ghosts[i].update(worldObj, pac)){
			restartWorld();
		}
	}
	//document.getElementById("mytext").value = score;
	lS();
	//console.log(worldObj);
	//console.log(document.getElementById("users").value);
	//console.log(window.innerWidth);
}

function restartWorld(){
	world.setPactraceRandom();
	pac = new Pacman({x:30, y:30}, {w:20, h:20}, 2.5, "up");
	ghosts = [];
	for(var i = 0; i < numOfGhosts; i++){
		ghosts.push(new Ghost({x:280, y:190}, {w:20, h:20}, 2, "up"));
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
