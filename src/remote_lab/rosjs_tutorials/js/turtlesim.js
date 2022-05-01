var TurtleSim = (function() {

	var TurtleSim = function(context, node) {
    this.context = context;
    this.turtles = [];
    this.rosNode=node;
  };

  TurtleSim.prototype.spawnTurtle = function(name, callback) {
    var that = this;
    console.log(this.context);
    var initial_pos={};
    initial_pos.x=this.context.canvas.width/2;
    initial_pos.y=this.context.canvas.height/2;
    console.log(initial_pos.x);
    console.log(initial_pos.y);

    
    Turtle.createTurtle(name, this.context, this.rosNode, initial_pos, function(error, turtle) {
      that.turtles.push(turtle);
      turtle.on('dirty', that.draw.bind(that));
    });
  };

  TurtleSim.prototype.draw = function() {
    this.context.fillStyle = "BLUE"
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);

    this.turtles.forEach(function(turtle) {
      turtle.draw();
    });
  };

  return TurtleSim;

}());

