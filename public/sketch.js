// test heoku
var pac;
var world;
var ghost1;
var ghost2;
var ghost3;
var ghost4;
var ghost5;
var pac1U;
var pac1D;
var pac1L;
var pac1R;
var pac2U;
var pac2D;
var pac2L;
var pac2R;
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
var path2 = [];
var restart = true;
var restartTime = 0;
var win = false;
var lives = 3;
var lost = false;

function preload(){
	preWorld = loadJSON("world3.json");
	ghost1 = loadImage('pngs/Pacman/Kollid/koll1.png');
	ghost2 = loadImage('pngs/Pacman/Kollid/koll2.png');
	ghost3 = loadImage('pngs/Pacman/Kollid/koll3.png');
	ghost4 = loadImage('pngs/Pacman/Kollid/koll4.png');
	ghost5 = loadImage('pngs/Pacman/Kollid/koll5.png');
	pac1U = loadImage('pngs/Pacman/pacman1U.png');
	pac1D = loadImage('pngs/Pacman/pacman1D.png');
	pac1L = loadImage('pngs/Pacman/pacman1L.png');
	pac1R= loadImage('pngs/Pacman/pacman1R.png');
	pac2U = loadImage('pngs/Pacman/pacman2U.png');
	pac2D = loadImage('pngs/Pacman/pacman2D.png');
	pac2L = loadImage('pngs/Pacman/pacman2L.png');
	pac2R= loadImage('pngs/Pacman/pacman2R.png');
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
  pac = new Pacman({x:30, y:30}, {w:20, h:20}, 2.5, "up", {u1:pac1U, d1:pac1D, l1:pac1L, r1:pac1R, u2:pac2U, d2:pac2D, l2:pac2L, r2:pac2R});

	ghosts.push(new Ghost({x:290, y:190}, {w:20, h:20}, 2, "up", ghost1));
	ghosts.push(new Ghost({x:290, y:190}, {w:20, h:20}, 2, "up", ghost2));
	ghosts.push(new Ghost({x:290, y:190}, {w:20, h:20}, 2, "up", ghost3));
	ghosts.push(new Ghost({x:290, y:190}, {w:20, h:20}, 2, "up", ghost4));
	ghosts.push(new Ghost({x:290, y:190}, {w:20, h:20}, 2, "up", ghost5));

  world = new TestWorld({w:20,h:20}, preWorld.wall, preWorld.branch, preWorld.pacTrace, preWorld.food);
	walls = transWall(world.wall);
	aStar = new AStar(cols, rows, dim, walls);

  if(preloadWall){
    for(var i = 0; i < walls.length; i++){
      var temp = aStar.grid.getNode(walls[i].i, walls[i].j);
      wallToSave.push({i:walls[i].i, j:walls[i].j});
      wall.push(temp);
    }
		aStar.updateWall();
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
	if(win){
		stroke("red");
		textSize(60);
		fill("yellow");
		text("YOU WIN THE GAME!",20,210);
	}
	else{
		if(lost){
			stroke("red");
			textSize(50);
			fill("yellow");
			text("YOU LOST THE GAME!",50,210);
		}
		else{
			if(restart){
				if(restartTime + 3000 < millis()){
					restart = false;
				}
				textSize(50);
				fill("yellow");
				text("READY!",220,210);
			}
			else{

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
				if(score === 16250){
					win = true;
				}
			  pac.update(worldObj.wall);

				for(var i = 0; i < ghosts.length; i++){
					if(ghosts[i].update(worldObj, pac)){
						lives -= 1;
						if(lives === 0){
							lost = true;
						}
						else{
							restartWorld();
						}
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

				lS();
				if(path1.length > 0){
					if(pac.followPath(path1)){
						path1.splice(path1.length - 1, 1);
					}
					drawPath(path1, "red");
				}
			}
		}
		}
}

function drawPath(path, col){
	strokeWeight(3);
	stroke(col);
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
	pac = new Pacman({x:30, y:30}, {w:20, h:20}, 2.5, "up", {u1:pac1U, d1:pac1D, l1:pac1L, r1:pac1R, u2:pac2U, d2:pac2D, l2:pac2L, r2:pac2R});
	ghosts = [];
	ghosts.push(new Ghost({x:290, y:190}, {w:20, h:20}, 2, "up", ghost1));
	ghosts.push(new Ghost({x:290, y:190}, {w:20, h:20}, 2, "down", ghost2));
	ghosts.push(new Ghost({x:290, y:190}, {w:20, h:20}, 2, "left", ghost3));
	ghosts.push(new Ghost({x:290, y:190}, {w:20, h:20}, 2, "right", ghost4));
	ghosts.push(new Ghost({x:290, y:190}, {w:20, h:20}, 2, "up", ghost5));
	restart = true;
	restartTime = millis();
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
