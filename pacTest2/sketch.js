
var dim = 60;
var cols = 15;
var rows = 15;
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
  if(mouseIsPressed && mc){
		delPath(path);
    var i = help.snap(mouseX, dim) / dim;
    var j = help.snap(mouseY, dim) / dim;
    var test = help.getIndex(i, j, rows);
		aStar.targetUpdate(lastStart, {i:i,j:j});
		path = aStar.calcPath();
    setNodeFromArr(nodeArr, i, j, "red", rows);
		if(path != undefined){
			setPathNodes(path);
		}
    var node = grid.getNode(i, j);
    node.showNeighbors();
		lastStart = {i:i, j:j};
    mc = false;
  }
  // if(mc){
  //   var path = getPath(nodeArr);
  //   followThePath(path);
  // }


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

function setPath(start, target){

}

function getPath(){
  for(var k = 0; k < 0; k++){

  }
}

function mouseReleased() {
  mc = true;
}

function setNodeFromArrIndex(nodes, index, col){
  nodes[index].setCol(col);
}

function setNodeFromArr(nodes, i, j, col, rows){
  var index = help.getIndex(i, j, rows);
  nodes[index].setCol(col);
}
