var moving = {
  u:false,
  d:false,
  r:false,
  l:false,
  s:false,
  w:false,
  pt:false,
  save:false,
  load:false,
  food:false,
  del:false
};

var help = {
  createEmptyNodesGrid: function(cols, rows, dim){
    var nodes = [];
    for(var i = 0; i < cols; i++){
      for(var j = 0; j < rows; j++){
        var index = this.getIndex(i,j, rows);
        nodes.push(new Node3(i, j, "yellow", dim, "free"));
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
  },

  keys: function(){
    document.onkeydown = function(event){
      //console.log(event.keyCode);
      if(event.keyCode === 39)   //d
        moving.r = true;
      else if(event.keyCode === 83 || event.keyCode === 40)   //s
        moving.d = true;
      else if(event.keyCode === 37) //left arrow
        moving.l = true;
      else if(event.keyCode === 38) // w
        moving.u = true;
      else if(event.keyCode === 32) // space
        moving.s = true;
      else if(event.keyCode === 88) // x
        moving.save = true;
      else if(event.keyCode === 76) // l
        moving.load = true;
      else if(event.keyCode === 87) // w
        moving.w = true;
      else if(event.keyCode === 65) //a
        moving.pt = true;
      else if(event.keyCode === 70) //f
        moving.food = true;
      else if(event.keyCode === 68) //d
        moving.del = true;
      }
      document.onkeyup = function(event){
        if(event.keyCode === 39)    //d
          moving.r = false;
        else if(event.keyCode === 83 || event.keyCode === 40)   //s
          moving.d = false;
        else if(event.keyCode === 37) //left arrow
          moving.l = false;
        else if(event.keyCode === 38) // w
          moving.u = false;
        else if(event.keyCode === 32) // space
          moving.s = false;
        else if(event.keyCode === 88) // x
          moving.save = false;
        else if(event.keyCode === 76) // l
          moving.load = false;
        else if(event.keyCode === 87) // w
          moving.w = false;
        else if(event.keyCode === 65) //a
          moving.pt = false;
        else if(event.keyCode === 70) //f
          moving.food = false;
        else if(event.keyCode === 68) //d
          moving.del = false;
        }

        return moving;
  }
}
