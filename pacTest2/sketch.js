
var dim = 30;
var cols = 30;
var rows = 30;
var windWith = dim * cols;
var winHeight = dim * rows;
var nodeArr = [];
var grid;
var mc = true;
var aStar;
var walls = [];
var path = [];
var lastStart = {i:1, j:1};
var pacman;

function setup() {
	//var myCanvas = createCanvas(640, 480);
	createCanvas(windWith, winHeight);
  nodeArr = help.createEmptyNodesGrid(cols, rows, dim);
  grid = new Grid(nodeArr, dim, cols, rows);
  grid.setNodesNeighbors();
	aStar = new AStar(walls, grid, lastStart, {i:5, j:5});
	pacman = new Pacman({i:5, j:5}, dim);
}

function draw(){
  background(100);
  grid.show();
	pacman.show();

	var pacI = pacman.getPosIJ().i;
	var pacJ = pacman.getPosIJ().j;
	// console.log(pacI + " " + pacJ);
	var node = grid.getNode(pacI, pacJ);


	//node.showNeighbors();
	var neighbors = node.getNeighbors();
	for(var i = 0; i < neighbors.length; i++){
		if(neighbors[i].type === "path"){
			setNodeFromArr(nodeArr, neighbors[i].i, neighbors[i].j, "purple", rows);
			pacman.followPath(neighbors[i].i, neighbors[i].j, neighbors[i].pathNum);
		}
	}
  if(mouseIsPressed){
		var i = help.snap(mouseX, dim) / dim;
		var j = help.snap(mouseY, dim) / dim;
		if(help.keys().w){

			var node = grid.getNode(i, j);
			node.setToWall();
			var test = grid.getNodesByType("wall");
			aStar.setWall(test);
		}
		else if(mc){
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
			mc = false;
		}
  }
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
