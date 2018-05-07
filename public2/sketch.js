var edit;
var dim = 20;
var canWidth = 31 * dim;
var canHeight = 24 * dim;
var pacman;
var pacPos;
var pacNeighbors = [];
var grid = [];
var cols = canWidth / dim;
var rows = canHeight / dim;
var sN = true;
var sP = true;
var aStar;
var walls = [];
var walls2;
var path = [];
var ghostPath = [];
var paths = [];
var target = {i:17, j:15};
var test = true;
var start;
var saveWorld = true;
var ghost;
var editGhost;
var ghostGrid;
var aStar2;
var walls3 = [];
var pacPosChanged;
var changePos = false;
var testI;
var testJ;

function preload(){
	preWorld = loadJSON("world.json");
  console.log(preWorld);
	bg = loadImage("pngs/dreamWorld4.jpg");
}

function setup() {
  createCanvas(canWidth, canHeight);

	walls2 = new Wall(preWorld);
	walls = walls2.wall.wall;
  edit = new Editor(dim, cols, rows);
  edit.createEmptyGrid();
	edit.addGridElements(walls2.wall.wall,"wall", color(255));
	editGhost = new Editor(dim, cols, rows);
	editGhost.createEmptyGrid();
	editGhost.addGridElements(walls2.wall.wall,"wall", color(255));
  grid = edit.getGrid();
	ghostGrid = editGhost.getGrid();
  pacman = new Pacman(1, 1, dim, cols, rows);
	ghost = new Pacman(14, 9, dim, cols, rows);
	ghost.speed = 1;
  aStar = new AStar(cols, rows, dim, walls);
	aStar2 = new AStar(cols, rows, dim, walls);
  // grid[getIndex(target.i, target.j)].setType("free", "yellow");
	// ghostGrid
  // aStar.updateWall();
  // start.i = pacman.i;
  // start.j = pacman.j;
  // aStar.targetUpdate(pacman, target);
  // aStar.calcPath();
	pacPosChanged = {i:pacman.i, j:pacman.j};
}

function draw() {
	background(bg);
	// background(30);
	frameRate(60);

  if(testLib.keys().w){
    edit.createWall();
  }
  edit.delWall();
  // edit.drawWorld();
  pacman.move(grid, path);
  pacman.show();
	ghost.move(ghostGrid, ghostPath);
  ghost.show();
  test = true;
	if(pacPosChanged.i != pacman.i || pacPosChanged.j != pacman.j){
		console.log("pos changed");
		pacPosChanged = {i:pacman.i, j:pacman.j};
		changePos = true;
	}
	else{
		changePos = false;
	}


  if(mouseIsPressed && sP && !testLib.keys().w && !testLib.keys().d && mouseX < canWidth && mouseY < canHeight){
		var i = testLib.snap(mouseX, dim) / dim;
		var j = testLib.snap(mouseY, dim) / dim;
		if(!edit.isWall(i,j)){
			sP = false;
			test = false;
			walls = testLib.getBlocks(grid, "wall");
			edit.addGridElements(path, "free", "orange");
			aStar.setWall(walls);
			pacman.setI = pacman.i;
			pacman.setJ = pacman.j;
			pacPos = pacman.getPosXY();
			var pacIJ = pacman.getSetIJ();
			console.log(pacIJ.j);
			if(pacPos.x > pacIJ.i * dim){
				pacman.setPos(pacman.setI + 1, pacman.setJ);
			}
			if(pacPos.x < pacIJ.i * dim){
				pacman.setPos(pacman.setI - 1, pacman.setJ);
			}
			if(pacPos.y > pacIJ.j * dim){
				pacman.setPos(pacman.setI, pacman.setJ  + 1);
				console.log("j: " + (pacman.setJ  + 1));
			}
			if(pacPos.y < pacIJ.j * dim){
				pacman.setPos(pacman.setI ,pacman.setJ - 1);
					console.log("j: " + (pacIJ.j  + 1));
			}

			aStar.targetUpdate({i:pacIJ.i, j:pacIJ.j}, {i:testLib.snap(mouseX, dim) / dim, j:testLib.snap(mouseY, dim) / dim});
			path = aStar.calcPath();

			edit.addGridElements(path, "path", "blue");
			console.log(path);
			setNeighbors(grid);
		}
  }

  // if(testLib.keys().pt && sN){  //a
	// 	console.log(ghostPath);
  //   sN = false;
  //   walls = testLib.getBlocks(grid, "wall");
  //   aStar.setWall(walls);
  //   path = aStar.calcPath();
  //   // path.splice(path.length - 1, 1);
  //   edit.addGridElements(path, "path", "blue");
  //   setNeighbors(grid);
  // }
// if(testLib.keys().pt && sN || changePos){
// 	sN = false;

	walls3 = testLib.getBlocks(ghostGrid, "wall");
	editGhost.addGridElements(ghostPath, "free", "orange");
	aStar2.setWall(walls3);
	// ghost.setJ = ghost.j;
	var ghostPos = ghost.getPosXY();
	var ghostIJ = ghost.getSetIJ();

	ghost.setI = ghost.i;
	ghost.setJ = ghost.j;
	if(ghostPath[ghostPath.length - 3] != undefined){
		// console.log(ghostPath[ghostPath.length - 3]);
		// console.log(ghostPath[ghostPath.length - 3].i);
		testI = ghostPath[ghostPath.length - 3].i
		testJ = ghostPath[ghostPath.length - 3].j
	}

	// console.log(testI);
	// if(testI > ghost.i){
	// 	console.log(testI);
	// 		ghost.setPos(testI, ghost.j);
	// }
	// if(testI < ghost.i){
	// 	console.log(testI);
	// 		ghost.setPos(testI, ghostPath[ghostPath.length - 2].j);
	// }
	// if(testI < ghost.i){
	// 		ghost.setPos(testI, ghost.setJ);
	// }
	// if(testI < ghost.i){
	// 		ghost.setI = ghost.i;
	// }
	// if(testJ > ghost.j){
	// 		ghost.setJ = ghost.j;
	// }

	if(ghostPos.x > ghostIJ.i * dim || testI > ghost.i){
		ghost.setPos(ghost.setI + 1, ghost.setJ);
		// console.log(ghost.setI + 1);
	}

	if(ghostPos.x < ghostIJ.i * dim || testI < ghost.i){
		ghost.setPos(ghost.setI - 1, ghost.setJ);
	}
	if(ghostPos.y > ghostIJ.j * dim && testJ > ghost.j){
		ghost.setPos(ghost.setI, ghost.setJ  + 1);
	}
	if(ghostPos.y < ghostIJ.j * dim && testJ < ghost.j){
		ghost.setPos(ghost.setI ,ghost.setJ - 1);
	}


	aStar2.targetUpdate({i:ghost.i, j:ghost.j}, {i:pacman.i, j:pacman.j});
	ghostPath = aStar2.calcPath();
	//console.log(ghostPath);
	editGhost.addGridElements(ghostPath, "path", "blue");
	setNeighbors2(ghostGrid);

// }


	// sN = false;
	// walls3 = testLib.getBlocks(ghostGrid, "wall");
	//
	// edit.addGridElements(ghostPath, "free", "orange");
	// aStar2.setWall(walls3);
	// ghost.setI = ghost.i;
	// ghost.setJ = ghost.j;
	// var ghostPos = ghost.getPosXY();
	// var ghostIJ = ghost.getSetIJ();
	//
	// if(ghost.x > ghostIJ.i * dim){
	// 	ghost.setPos(ghost.setI + 1, ghost.setJ);
	// 	// console.log("j: " + (ghost.setJ  + 1));
	// }
	// if(ghostPos.x < ghostIJ.i * dim){
	// 	ghost.setPos(ghost.setI - 1, ghost.setJ);
	// 	// console.log("j: " + (ghost.setJ  + 1));
	// }
	// if(ghostPos.y > ghostIJ.j * dim){
	// 	ghost.setPos(ghost.setI, ghost.setJ  + 1);
	// 	// console.log("j: " + (ghost.setJ  + 1));
	// }
	// if(ghostPos.y < ghostIJ.j * dim){
	// 	ghost.setPos(ghost.setI ,ghost.setJ - 1);
	// 		console.log("j: " + (ghostIJ.j  + 1));
	// }
	//
	// aStar2.targetUpdate({i:ghostIJ.i, j:ghostIJ.j}, {i:testLib.snap(mouseX, dim) / dim, j:testLib.snap(mouseY, dim) / dim});
	// ghostPath = aStar2.calcPath();
	//
	// editGhost.addGridElements(ghostPath, "path", "blue");
	// editGhost.setNeighbors();
  // ghostGrid = editGhost.getGrid();
// }
//
// if(testLib.keys().pt && sN){  //a
// sN = false;
// walls = testLib.getBlocks(grid, "wall");
// aStar.setWall(walls);
// path = aStar.calcPath();
// // path.splice(path.length - 1, 1);
// edit.addGridElements(path, "path", "blue");
// setNeighbors(grid);

// }



  if(!testLib.keys().pt){
    sN = true;
  }
  // drawPath(path,"orange");
	drawPath(ghostPath,"red");
  edit.show(edit.getWall());
  lS();
}

function getPathIndex(i, j, path){
  for(var k = 0; k < path.length; k++){
    if(path[k].i === i && path[k].j === j){
      return k;
    }
  }
  return -1;
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
  strokeWeight(1);
  stroke("black");
}

function setNeighbors(grid){
  edit.setNeighbors();
  grid = edit.getGrid();
}

function setNeighbors2(grid){
  editGhost.setNeighbors();
  grid = editGhost.getGrid();
}

function getIndex(i, j){
  //console.log(i * this.rows + j);
  return i * cols + j;
}

function mouseReleased() {
  sP = true;
}

function lS(){

	if(testLib.keys().save && saveWorld){
    console.log("saved");
    var tempWall = edit.getWallIJ();
    var me = new Wall(edit.getWallIJ());
		this.saveWorld = false;
		saveJSON(me, "world.json");
	}
	if(testLib.keys().load && this.loadWorld){
		//var text = require('world.json'); //(with path)
		var obj = loadJSON("world.json");
		console.log(obj);
		walls2 = new Wall(obj);
    console.log(walls2);
		loadWorld = false;
	}
	if(!testLib.keys().load){
		loadWorld = true;
	}
	if(!testLib.keys().save){
		saveWorld = true;
	}
}
