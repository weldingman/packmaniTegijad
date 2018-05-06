// test heoku
var pac;
var world;
var ghost;
var ghost2;
var ghosts = [];
var numOfGhosts = 1;
var saveWorld = true;
var loadWorld = true;
let preWorld;
var bg;
var score = 0;
var teime = 0;
var startMillis;
var aS;
var dim = 20;
var cols;
var rows;
var aStar;
var wallToSave = [];
var preloadWall = true;
var walls = [];
var wall = [];
var mc = false;
var path1 = [];

function preload(){
	preWorld = loadJSON("worldClear.json");
	bg = loadImage("pngs/dreamWorld4.jpg");
}

function setup() {
	//var myCanvas = createCanvas(640, 480);
	createCanvas(640, 480);
	cols = width / dim;
	rows = height / dim;
	startMillis = millis();
	//myCanvas.parent('myContainer');
	//const canvasElt = createCanvas(640, 480).elt;
  //canvasElt.style.width = '260px', canvasElt.style.height = "200px";
  pac = new Pacman({x:30, y:30}, {w:20, h:20}, 2.5, "up");
	for(var i = 0; i < numOfGhosts; i++){
		ghosts.push(new Ghost({x:280, y:190}, {w:20, h:20}, 2, "up"));
	}
  world = new TestWorld({w:20,h:20}, preWorld.wall, preWorld.branch, preWorld.pacTrace, preWorld.food);

	walls = transWall(world.wall);
	// console.log(wall.length);
	aStar = new AStar(cols, rows, dim, walls);
	// console.log(aStar.grid);
  if(preloadWall){
    for(var i = 0; i < walls.length; i++){
      var temp = aStar.grid.getNode(walls[i].i, walls[i].j);
      wallToSave.push({i:walls[i].i, j:walls[i].j});
      wall.push(temp);
      //aStar.addWall(temp);
    }
		aStar.updateWall();
		// console.log(aStar.wall);
  }
	world.setPactraceRandom();
}

function transWall(wallIn){
	var wallOut = [];
	for(var k = 0; k < wallIn.length; k++){
		var i = wallIn[k].x / dim;
		var j = wallIn[k].y / dim;
		wallOut.push({i:i, j:j});
	}
	return wallOut;
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

	if(mouseIsPressed && mc){
    mc = false;
		var wallCheck = false;
    var i = snap(mouseX, dim) / dim;
    var j = snap(mouseY, dim) / dim;
		console.log(walls[0]);
		for(var k = 0; k < walls.length; k++){
			if(walls[k].i === i && walls[k].j === j){
				console.log(i + " " + j);
				wallCheck = true;
			}
		}
		if(!wallCheck){
			var pacPos = pac.getPos(0,0);
			aStar.targetUpdate({i:pacPos.i,j:pacPos.j}, {i:i, j:j});
			path1 = aStar.calcPath();
		}
  }
	//document.getElementById("mytext").value = score;
	lS();
	if(path1.length > 0){
		if(pac.followPath(path1)){
			path1.splice(path1.length - 1, 1);
		}
		// drawPath(path1);
	}
}

function drawPath(path){
	strokeWeight(5);
	stroke("red");
	for(var i = 0; i < path.length - 2; i++){
		var x1 = path[i].i * dim + dim / 2;
		var y1 = path[i].j * dim + dim / 2;
		var x2 = path[i + 1].i * dim + dim / 2;
		var y2 = path[i + 1].j * dim + dim / 2;
		line(x1,y1,x2,y2);
	}
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

function snap(val, dim){
  var snapCndidate = dim * Math.floor(val/dim);
  return snapCndidate;
}

function mouseReleased() {
  mc = true;
}
