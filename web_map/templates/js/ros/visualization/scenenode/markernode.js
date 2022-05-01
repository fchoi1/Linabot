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
 * @class MarkerNode
 *
 * @brief Class that helps visualizing markers.
 * @details An object of this class keeps necessary variables to visualize a map of type visualization_msgs/Marker
 */
ros.visualization.MarkerNode = ros.visualization.SceneNode.extend({
    /**
     * Constructor.
     * @param vm visualization manager. An instance of the class defined in rosjs_visualization/js/visualization/visualizationmanager.js.
     * @param args An array of arguments. Currently only 1 argument is used: args[0]: a topic that publishes visualization_msgs/Marker messages.
     */
    init: function(vm,args){
	this.vm = vm;
	this.topic = "";
	this.redraw = 0;
	this.msgType = "visualization_msgs/Marker";
	this.keys = {"topic":this.topic};
	this.name = "";
	this.oldTopic = "";
	this.marker_manager = this.vm.marker_manager;

	// args[0] is the topic to subscribe
	if(args[0] != 'undefined' && args[0] != 'null'){
	    this.marker_manager.subscribeMarker(args[0]);
	}
	this.marker_id='';
	this.node_id='';
    },
    /**
     * Unsubsribe from the old topic and subsribe to a new topic.
     * @param newTopic the new topic to which we would like to subscribe.
     */
    changeTopic: function(newTopic){
	var that = this;
    	this.unsub();
    	this.marker_manager.subscribeMarker(newTopic,function(msg){that.updateFromMessage(msg);});
	this.oldTopic = this.topic;
	this.topic = newTopic;
    },
    /**
     * Unsubscribe from 'topic' and delete the marker model from the scene.
     */
    unsub: function(){
	// First unsubscribe from the topic so that rosjs does not trigger the callback.
	this.marker_manager.unsubscribeMarker();

	// Since markers don't have a model, we will destroy the node here.
	//
	// Get the node_id
	var n_id = this.marker_manager.markerNodes.find(this.marker_id);
	
	// We already know the marker_id; we can remove the marker
	this.marker_manager.removeMarker(n_id, this.marker_id);
    },
    /**
     * Gets the message in, extracts the marker id from it, and then passes it in to marker manager.
     * @param msg a ROS marker message of type visualization_msgs/Marker
     */
    updateFromMessage: function(msg){
	// You can do something with the message here
	// Then pass it to somewhere you want
	
	// Let's keep a copy of the message id (for when we want to remove the scene node), 
	this.marker_id = this.marker_manager.getMarkerStringID(msg);
	
	// then convery the message to marker_manager	
	this.marker_manager.receiveMarkerMessage(msg);
    }
});