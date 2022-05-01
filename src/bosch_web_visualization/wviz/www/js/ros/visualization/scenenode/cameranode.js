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
 * @class CameraNode
 * @brief Creates a Camera Node that works with a Camera Widget.
 * @details This node is here for compatibility with the visualization control panel. To see Camera Widget refer to rosjs_remotelabwidgets/js/visualization_widgets/CameraWidget.js}
 */
ros.visualization.CameraNode = ros.visualization.SceneNode.extend({

    /** 
     * Constructor. Sets the default values for the intended camera feed.
     * @param vm visualization manager. An instance of the class defined in rosjs_visualization/js/visualization/visualizationmanager.js.
     * @param args arguments for future use
     */
    init: function(vm,args){
	this._super(vm); 
	this.redraw=0;
	this.oldTopic = '';
	
	this.image_width = 320;
	this.image_height = 240;
	this.quality = 30;
	this.invert = false;
	this.host = '';
	this.topic = '';
	// Which attributes of this widget should be accessible from PropertiesWidget?
	this.keys={"host":this.host,"topic":this.topic,"image_width":this.image_width,"image_height":this.image_height,"quality":this.quality,"invert":this.invert};
	this.name='';
	this.widgetType = "CameraWidget";
	this.hasWidget = true;
	this.widget = {};
	this.msgType = "sensor_msgs/Image";

	if(args.length == 2){
	    this.host = args[0];
	    this.topic = args[1];

	    //this.changeTopic(this.topic);
	    //this.changeUri();
	}
    },
    /**
     * This method is here for compatibility with other scene nodes. It does not actually change the topic. Currently camera feeds are provided by mjpeg_server as a stream or snapshot, not as a message.
     * @param newTopic new topic that we want this scene node to listen to
     */
    changeTopic: function(newTopic){
	this.oldTopic = this.topic;
	this.topic = newTopic;
    },
    /**
     * If a camera feed property changes, this method is called by the visualization_control_panel. This method updates CameraWidget's variables and triggers onUpdate() method to reflect the changes.
     */
    changeUri: function(){
	// This node does not really subscribe to a topic (yet)
	// We keep the function name the same for compability and to prevent confusion
	
	this.widget.host = this.host;
	this.widget.topic = this.topic;
	this.widget.image_width = this.image_width;
  	this.widget.image_height = this.image_height; 
	this.widget.width = this.image_width + 100;
	this.widget.height = this.image_height + 100;
	this.widget.invert = this.invert;
	this.widget.quality = this.quality;
	
	// The following call will update the 
	this.widget.onUpdate();
    },
    /**
     * This method is here for compatibility. This scene node does not subscribe to a topic.
     */
    unsub: function(){
	// This node does not really unsubscribe from topics (see changeTopic)
    },
    /**
     * This method is here for compatibility. This scene node does not have a callback.
     *
     */
    updateFromMessage: function(){
    },
});