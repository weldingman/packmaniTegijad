var help = {
  createEmptyNodesGrid: function(cols, rows, dim){
    var nodes = [];
    for(var i = 0; i < cols; i++){
      for(var j = 0; j < rows; j++){
        var index = this.getIndex(i,j, rows);
        nodes.push(new Node3(i, j, "yellow", dim));
      }
    }
    return nodes;
  },

  getIndex: function(i, j, rows){
    //console.log(i * this.rows + j);
    return i * rows + j;
  },

  getIJ: function(index, cols, rows){
    var i = Math.floor(index / cols);
    var j = index - i * rows;

    return {i,j};
  },

  snap: function(val, dim){
    var snapCndidate = dim * Math.floor(val/dim);
    return snapCndidate;
  }


}
