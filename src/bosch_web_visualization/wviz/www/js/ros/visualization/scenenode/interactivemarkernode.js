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
 * @class InteractiveMarkerNode
 * @brief Creates a scene node for one or a group of interactive markers.
 * @details Creates a scene node for one or a group of interactive markers (markers with which users can interact with mouse clicks). Provides methods to handle topic changes.
 */
ros.visualization.InteractiveMarkerNode = ros.visualization.SceneNode.extend({
    /**
     * Constructor. Sets default values and tells Interactive Marker Manager to subscribe to a topic.
     * @param vm Visualization Manager. An instance of the class defined in rosjs_visualization/js/visualization/visualizationmanager.js.
     * @param args An array of input arguments. For now only args[0] is used (interactive marker topic to subscribe e.g. /basic_controls/update).
     */
    init: function(vm,args){
        this.vm = vm;
	this.topic = "";
	this.fullTopic = "";
	this.redraw = 0;
	this.msgType = "visualization_msgs/InteractiveMarkerUpdate";
	this.keys = {"topic":this.topic};
	this.name = "";
	this.oldTopic = "";
	this.oldFullTopic = "";
	this.interactiveMarkerManager = this.vm.interactive_marker_manager;
	this.updater = new ros.visualization.InteractiveMarkers.InteractiveMarkerUpdate(this.vm,this.vm.interactive_marker_manager);

	// args[0] is the topic to subscribe
	if(args[0] !== undefined && args[0] !== null){
	    this.changeTopic(args[0]);
		//this.interactiveMarkerManager.subscribeInteractiveMarker(args[0]);
	}
	this.imarkerId='';
    },
    /**
     * Unsubsribe from the old topic and subsribe to a new topic.
     * @param newTopic the new topic to which we would like to subscribe.
     */
    changeTopic: function(newTopic){
	var that = this;
    	this.unsub();
	this.interactiveMarkerManager.subscribeInteractiveMarker(newTopic,function(msg){that.updateFromMessage(msg);},this.updater);
	this.oldTopic = this.topic;
	this.oldFullTopic = this.fullTopic;
	this.topic = newTopic;
	this.fullTopic = newTopic + '_full';
    },
    /**
     * Unsubscribe from 'topic' (e.g. /basic_controls/update) and 'fullTopic' (e.g. /basic_controls/update_full).
     */
    unsub: function(){
	// First unsubscribe from the topic so that rosjs does not trigger the callback.
	//this.interactiveMarkerManager.updater.unsubscribeAll();
	    this.updater.unsubscribeAll();
	//this.interactiveMarkerManager.updater.eraseMarkers(this.imarkerId);
	    this.updater.eraseMarkers(this.imarkerId);
    },
    /**
     * Gets the message in, manipulates or extracts information from it, then passes it back to interactive marker manager's updater object.
     * @param msg a ROS message of type visualization_msgs/InteractiveMarker
     */
    updateFromMessage: function(msg){
	// You can do something with the message here
	// Then pass it to somewhere you want
	// console.log("interactive marker node, update from message callback");
	// Let's keep a copy of the message id (for when we want to remove the scene node), 
	this.imarkerId = this.updater.iMarkerNodes.find(msg.name); 

	// then convery the message to interactive marker manager    
	this.updater.receiveInteractiveMarkerMessage(msg);
    }
});