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
 * @class PointCloud2Node
 *
 * @brief Class that helps point clouds (PCL2).
 * @details An object of this class keeps necessary variables to visualize a point cloud of type sensor_msgs/PointCloud2. It is suggested for instances of this class that they subscribe to a point cloud published by the pcl_filter package (pcl_filter package reduces the amount of points in the cloud so that data transmission and visualization takes less time).
 *
 */
ros.visualization.PointCloud2Node = ros.visualization.SceneNode.extend({
    /**
     * Constructor.
     * @param vm visualization manager. An instance of the class defined in rosjs_visualization/js/visualization/visualizationmanager.js.
     * @param args An array of arguments. Currently only 2 arguments are used: args[0]: current_frame (e.g. /base_link); args[1]: a topic that publishes ROS messages of type sensor_msgs/PointCloud2
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
	this.color=[1.0,0.0,0.0];

	this.model = new ros.visualization.PointCloud2Model(vm.gl, vm.shader_manager,vm.scene_viewer,vm.node);
	this.msgType = "sensor_msgs/PointCloud2";
	
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
	this.pointSize = 1.0;
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
	
	this.currentListener = new this.vm.node.Topic({
	    name : newTopic,
	    messageType : this.msgType
	});
	
	this.currentListener.subscribe(function(msg){ that.updateFromMessage(msg)});
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
     * Gets the message in, manipulates or extracts information from it.
     * Here we set the frame of the pcl2node to the frame_id we receive from the publisher, and then we call the update function of the model.
     *
     * @param msg a ROS message of type sensor_msgs/PointCloud2
     */
    updateFromMessage: function(msg) 
    {
	if(msg.header.frame_id != this.frame_id){
	    // We have to update the node in the scene viewer
	    this.frame_id = msg.header.frame_id;
	    this.vm.scene_viewer.updateNode(this);
	}
	this.setFrame(msg.header.frame_id);
	this.model.updateFromMessage(msg);
    },
});