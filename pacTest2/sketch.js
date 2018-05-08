
var dim = 60;
var cols = 15;
var rows = 15;
var windWith = dim * cols;
var winHeight = dim * rows;
var nodeArr = [];
var grid;
var mc = true;

function setup() {
	//var myCanvas = createCanvas(640, 480);
	createCanvas(windWith, winHeight);
  nodeArr = help.createEmptyNodesGrid(cols, rows, dim);
  grid = new Grid(nodeArr, dim, cols, rows);
  grid.setNodesNeighbors();
}

function draw(){
  background(100);
  grid.show();
  if(mouseIsPressed){
    var i = help.snap(mouseX, dim) / dim;
    var j = help.snap(mouseY, dim) / dim;
    var test = help.getIndex(i, j, rows);
    setNodeFromArr(nodeArr, i, j, "red", rows);
    var node = grid.getNode(i, j);
    node.showNeighbors();
    mc = false;
  }
  // if(mc){
  //   var path = getPath(nodeArr);
  //   followThePath(path);
  // }


}

function getPath(){
  for(var k = 0; k < 0; k++){

  }
}

function mouseReleased() {
  mc = true;
}

function setNodeFromArr(nodes, i, j, col, rows){
  var index = help.getIndex(i, j, rows);
  console.log(index);
  nodes[index].setCol(col);
}
