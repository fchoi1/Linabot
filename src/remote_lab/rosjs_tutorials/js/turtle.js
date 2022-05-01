var Turtle = (function() {

  var CommandVelocity = null;
  var Pose = null;

  function createTurtle(name, context, node, pose, callback) {
     
      var turtle=new Turtle(name, node, pose, context);

      callback(null,turtle);
  };

  var Turtle = function(name, node, pos,  context) {
    var that = this;
    this.imageloaded=false;
    this.image = new Image();
    
    this.pos=pos;
    this.rosNode=node;
    this.context = context;    
    this.angularVelocity = 0;
    this.linearVelocity  = 0;


    this.image.onload=function(){
	that.meter=that.image.height;
	
	that.widthInMeters=that.context.canvas.width/that.meter;
	that.heightInMeters=that.context.canvas.height/that.meter;

	//convert
	that.pos.x=(that.pos.x/that.meter);
	that.pos.y=(that.pos.y/that.meter);


	that.orient=0;
	var message="/"+name+"/command_velocity";
	console.log(message);
	that.rosNode.subscribe(message,  'turtlesim/Velocity', that.onVelocity.bind(that));
	
	//subscribe to changes in velocity
	that.pos_mssg="/"+name+"/pose";
	
	that.draw();
	that.imageloaded=true;
    };
    
    var randnum=Math.floor(Math.random()*6);
    
    if(randnum==0){    
	this.image.src = 'images/diamondback.png';
    }
    else if(randnum==1){
	this.image.src = 'images/box-turtle.png';
    }
    else if(randnum==2){
	this.image.src = 'images/electric.png';
    }
    else if(randnum==3){
	this.image.src = 'images/robot-turtle.png';
    }
    else if(randnum==4){
	this.image.src = 'images/sea-turtle.png';
    }
    else{	
	this.image.src = 'images/turtle.png';
    }
  };
  Turtle.prototype.__proto__ = EventEmitter2.prototype;

  Turtle.prototype.onVelocity = function(message) {
    this.linearVelocity = message.linear;
    this.angularVelocity = message.angular;

    var pose = {};

     var dt=.1;
   
    this.orient=(this.orient+this.angularVelocity*dt)%(2*Math.PI);
    pose.x = this.pos.x+Math.sin(this.orient+ Math.PI/2)*this.linearVelocity* dt;
    pose.y = this.pos.y+Math.cos(this.orient+ Math.PI/2)*this.linearVelocity* dt;
    pose.theta = this.orient;
    pose.linear_velocity = this.linearVelocity;
    pose.angular_velocity = this.angularVelocity;

    //make sure does not go out of canvas
    if(pose.x<0 || pose.x>=(this.widthInMeters) || pose.y<0 || pose.y >= (this.heightInMeters))
	{
	    console.log(this.widthInMeters);
	    console.log(this.heightInMeters);
	    console.log(this.meter);
	    console.log(pose);
	    console.log("Oh no!  I hit the wall!");
	    
	}
    pose.x=Math.min(Math.max(pose.x, 0), this.widthInMeters);
    pose.y=Math.min(Math.max(pose.y, 0), this.heightInMeters);
    

    this.pos.x=pose.x;
    this.pos.y=pose.y;

    //this may need to be emmitted at a set interval
    this.rosNode.publish(this.pos_mssg, 'turtlesim/Pose', ros.json(pose));

    this.emit('dirty');
  };

 
  Turtle.prototype.draw = function() {
      console.log("drawing");
   
      this.context.save(); 
      
      var x=this.pos.x*this.meter;
      var y=this.pos.y*this.meter;
      var imgWidth=this.image.width;
      var imgHeight=this.image.height;

      this.context.translate(x, y);
      this.context.rotate(-this.orient);
      this.context.drawImage(this.image, -(imgWidth/2), -(imgHeight/2), imgWidth, imgHeight);
      this.context.restore();
  };

  return {
    Turtle: Turtle
  , createTurtle: createTurtle
  };

}());

