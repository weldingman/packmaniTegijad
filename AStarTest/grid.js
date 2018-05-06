class Grid{
  constructor(nodes, dim){
    this.dim = dim;
    this.nodes = nodes;
  }
  show(){
    for(var i = 0; i < this.nodes.length; i++){
      this.nodes[i].show(this.dim);
    }
  }
  getNode(i, j){
    for(var k = 0; k < this.nodes.length; k++){
      if(i === this.nodes[k].i && j === this.nodes[k].j){
      return this.nodes[k];
      }
    }
    return null;
  }
  resetNodesVal(){
    for(var i = 0; i < this.nodes.length; i++){
      this.nodes[i].resetNode();
    }
  }
  setNode(node){
    //console.log(node);
    var i = node.i;
    var j = node.j;
    for(var k = 0; k < this.nodes.length; k++){
      if(i === this.nodes[k].i && j === this.nodes[k].j){
        this.nodes[k] = node;
      }
    }
  }
}
