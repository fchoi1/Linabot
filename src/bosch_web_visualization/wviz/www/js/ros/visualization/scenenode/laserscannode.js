/*********************************************************************
 *
 * Software License Agreement (BSD License)
 *
 *  Copyright (c) 2012, Robert Bosch LLC.
 *  All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions
 *  are met:
 *
 *   * Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *   * Redistributions in binary form must reproduce the above
 *     copyright notice, this list of conditions and the following
 *     disclaimer in the documentation and/or other materials provided
 *     with the distribution.
 *   * Neither the name of the Robert Bosch nor the names of its
 *     contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 *  "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 *  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 *  FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 *  BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 *  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 *  CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 *  LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 *  ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 *
 *********************************************************************/

/**
 * @class LaserScanNode
 *
 * @brief Class that keeps laser scan visualization properties. 
 * @details An instance of this class keeps necessary values to visualize a laser scanner in wviz.
 */
ros.visualization.LaserScanNode = ros.visualization.SceneNode.extend({

    /**
     * Constructor.
     * @param vm visualization manager. An instance of the class defined in rosjs_visualization/js/visualization/visualizationmanager.js.
     * @param args An array of arguments to pass in the constructor. args[0]: current_frame (e.g. /odom_combined or /base_link). args[1]: topic that publishes a message of type sensor_msgs/LaserScan.
     */
    init: function(vm,args) 
    {
	if(args.length == 2){
	    this.current_frame = args[0];
	    this.topic = args[1];
	}
	else{
	    
	    this.current_frame = "/odom_combined";
	    this.topic = "";
	}

	this._super(vm);      
	this.redraw=0;
	this.color = [1.0, 0.0, 0.0];
	this.pointSize = 1.0;
	this.model = new ros.visualization.LaserScanModel(vm.gl, vm.shader_manager,vm.scene_viewer,vm.node);

	if(this.topic != ""){
	    this.currentListener = new this.model.node.Topic({
		name : this.topic,
		messageType : this.msgType
	    });
	    var that = this;
	    this.currentListener.subscribe(function(msg){ that.updateFromMessage(msg)});
	}
	this.frame_id = this.current_frame;
	this.oldTopic = "";
	this.msgType = "sensor_msgs/LaserScan";
	// Which attributes of this widget should be accessible from PropertiesWidget?
	this.keys={"topic":this.topic,"pointSize":this.pointSize,"color":this.color};
	this.name="";
    },
    /**
     * Unsubsribe from the old topic and subsribe to a new topic.
     * @param newTopic the new topic to which we would like to subscribe.
     */
    changeTopic: function(newTopic){
	var that = this;

	this.unsub();

	this.currentListener = new this.model.node.Topic({
	    name : newTopic,
	    messageType : this.msgType
	});

	console.log("I am subscribing");
	console.log(this.currentListener);

	this.currentListener.subscribe(function(msg){ that.updateFromMessage(msg) });

	this.oldTopic = this.topic;
	this.topic = newTopic;
    },
    /**
     * Unsubscribe from 'topic'
     */
    unsub: function(){
	if(this.currentListener !== undefined){
	    console.log("I am unsubscribing");
	    console.log(this.currentListener);
	    this.currentListener.unsubscribe();
	}
    },
    /**
     * Gets the message in, manipulates or extracts information from it, then passes it back to interactive marker manager's updater object.
     * @param msg a ROS message of type visualization_msgs/InteractiveMarker
     */
    updateFromMessage: function(msg) 
    {
	// if(msg.header.frame_id != this.frame_id){
	//     // We have to update the node in the scene viewer
	//     this.frame_id = msg.header.frame_id;
	//     this.vm.scene_viewer.updateNode(this);
	// }
	
	this.setFrame(msg.header.frame_id);
	// You can do something with the message here
	// Then pass it to model's callback method	
	this.model.updateFromMessage(msg);
    },
});