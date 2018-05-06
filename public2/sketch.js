var edit;
var dim = 30;
var canWidth = 20 * dim;
var canHeight = 20 * dim;
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
var path = [];
var paths = [];
var target = {i:17, j:15};
var test = true;
var start;

function setup() {
  createCanvas(canWidth, canHeight);

  edit = new Editor(dim, cols, rows);
  edit.createEmptyGrid();
  grid = edit.getGrid();
  pacman = new Pacman(0, 1, dim, cols, rows);
  aStar = new AStar(cols, rows, dim, walls);
  grid[getIndex(target.i, target.j)].setType("free", "yellow");
  // aStar.updateWall();
  // start.i = pacman.i;
  // start.j = pacman.j;
  aStar.targetUpdate(pacman, target);
  aStar.calcPath();
}

function draw() {
	background(30);
	frameRate(60);

  if(testLib.keys().w){
    edit.createWall();
  }
  edit.delWall();
  edit.drawWorld();
  pacman.move(grid, path, target);
  pacman.show();
  test = true;
  if(mouseIsPressed && sP && !testLib.keys().w && !testLib.keys().d){
    sP = false;
    test = false;
    walls = testLib.getBlocks(grid, "wall");
    edit.addGridElements(path, "free", "orange");
    aStar.setWall(walls);
    pacman.setI = pacman.i;
    pacman.setJ = pacman.j;

    aStar.targetUpdate(pacman, {i:testLib.snap(mouseX, dim) / dim, j:testLib.snap(mouseY, dim) / dim});
    path = aStar.calcPath();
    // grid[this.getIndex(pacman.i, pacman.j)].setType("free", "green");
    // path.push(new Node3(pacman.i, pacman.j, "green", dim));

    // path.splice(path.length - 2, 1);
    edit.addGridElements(path, "path", "blue");
    console.log(path);
    setNeighbors(grid);
  }

  if(testLib.keys().pt && sN){  //a
    sN = false;
    walls = testLib.getBlocks(grid, "wall");
    aStar.setWall(walls);
    path = aStar.calcPath();
    // path.splice(path.length - 1, 1);
    edit.addGridElements(path, "path", "blue");
    setNeighbors(grid);
  }
  if(!testLib.keys().pt){
    sN = true;
  }
  drawPath(path,"orange");
  // edit.drawRef();
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

function getIndex(i, j){
  //console.log(i * this.rows + j);
  return i * cols + j;
}

function mouseReleased() {
  sP = true;
}
