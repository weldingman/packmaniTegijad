
var dim = 20;
var cols = 31;
var rows = 24;
var windWith = dim * cols;
var winHeight = dim * rows;
var nodeArr = [];
var grid;
var mc = true;
var aStar;
var walls = [];
var walls2 = [];
var path = [];
var lastStart = {i:1, j:1};
var pacman;
var preWorld = [];
var bg;
var pacPos;

function preload(){
	preWorld = loadJSON("world.json");
	// bg = loadImage("pngs/dreamWorld4.jpg");
}

function setup() {
	//var myCanvas = createCanvas(640, 480);
	createCanvas(windWith, winHeight);

	walls2 = new Wall(preWorld);
	walls = walls2.wall.wall;


  nodeArr = help.createEmptyNodesGrid(cols, rows, dim);
  grid = new Grid(nodeArr, dim, cols, rows);

  grid.setNodesNeighbors();
	aStar = new AStar(walls, grid, lastStart, {i:5, j:5});
	aStar.setWall(walls);
	aStar.updateWall();
	console.log(aStar.wall);
	pacman = new Pacman({i:1, j:1}, dim);
	pacPos = pacman.getPosIJ();
}

function draw(){
  background(100);
  grid.show();
	pacman.show();

	if(pacman.getPosIJ().i != pacPos.i || pacman.getPosIJ().j != pacPos.j){
		pacPos = pacman.getPosIJ();
		console.log("pc");
	}
	var pacI = pacPos.i;
	var pacJ = pacPos.j;
	var node = grid.getNode(pacI, pacJ);

	var neighbors = node.getNeighbors();
	for(var i = 0; i < neighbors.length; i++){
		if(neighbors[i].type === "path"){
			setNodeFromArr(nodeArr, neighbors[i].i, neighbors[i].j, "purple", rows);
			pacman.followPath(neighbors[i].i, neighbors[i].j, neighbors[i].pathNum);
		}
	}
  if(mouseIsPressed){
		if(help.keys().w){
			buildWall();
		}
		else if(mc){
			updatePath();
			mc = false;
		}
  }
}

function builWall(){
	var i = help.snap(mouseX, dim) / dim;
	var j = help.snap(mouseY, dim) / dim;

		var node = grid.getNode(i, j);
		node.setToWall();
		var test = grid.getNodesByType("wall");
		aStar.setWall(test);
}

function updatePath(){
	var i = help.snap(mouseX, dim) / dim;
	var j = help.snap(mouseY, dim) / dim;
	var test = help.getIndex(i, j, rows);
	pacman.newPath();
	delPath(path);
	aStar.targetUpdate({i:pacman.i, j:pacman.j}, {i:i,j:j});
	path = aStar.calcPath();
	setNodeFromArr(nodeArr, i, j, "red", rows, "free");
	if(path != undefined){
		setPathNodes(path);
	}
	var node = grid.getNode(i, j);
	node.showNeighbors();
	lastStart = {i:i, j:j};
}

function setPathNodes(path){
	for(var i = 0; i < path.length; i++){
		path[i].setPath(path.length - i - 1);
	}
}

function delPath(path){
	for(var i = 0; i < path.length; i++){
		path[i].setFree();
	}
}

function mouseReleased() {
  mc = true;
}

function setNodeFromArrIndex(nodes, index, col){
  nodes[index].setCol(col);
}

function setNodeFromArr(nodes, i, j, col, rows, type){
  var index = help.getIndex(i, j, rows);
  nodes[index].set(col, type);
}
