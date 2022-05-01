/*********************************************************************
 *
 * Software License Agreement (BSD License)
 *
 *  Copyright (c) 2011, Robert Bosch LLC.
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

ros.visualization.InteractiveMarkers = ros.visualization.InteractiveMarkers || {};
/**
 * Class that handles  interactive markers.
 * @class
 * @augments ros.visualization.SceneNode
 */
ros.visualization.InteractiveMarkers.InteractiveMarker = ros.visualization.SceneNode.extend(
    /** @lends ros.visualization.InteractiveMarkers.InteractiveMarker# */
    {
	/**
	 * Initialization function
	 * 
	 * @param vm visualization manager
	 * 
	 */	
	init: function(vm) {
	    this._super(vm);
	    this.name = "InteractiveMarker";
	    this.description = null;
	    this.scale = null;
	    this.menu = new Array();
	    this.controls = this.children;
	    this.setPickable(true);
	    this.feedbacktopic ="";
	    this.feedbacktopictype = 'visualization_msgs/InteractiveMarkerFeedback';
	    this.lastPose = null;
	},
	
	sgn: function(x){
	    if(x>0)return 1;
	    else if(x<0)return -1;
	    else return 0;
	},
	
	updateFromMessage: function(msg)
	{
	    this.name = msg.name;
	    this.description = msg.description;
	    this.setFrame(msg.header.frame_id);

	    // console.log(msg.name);
	    // console.log(msg.name.slice(0,6));
	    // console.log(msg.description);
	    // console.log(msg.header.frame_id);

	    //console.log("This is my interactive marker");
	    //console.log(this.vm.tf.lookupTransformMartix("/base_link","/odom_combined"));

	    // If the incoming interactive marker is a segmented object's cube list
	    // Then we want to transform the coordinate frame of this cube list from base_link to odom_combined
	    if(msg.name.slice(0,6) == "object"){

		this.setFrame("/odom_combined");
		
		// Now, changing the coordinate frame is not enough. We have to translate and rotate all the points' coordinates
		for(var p = 0; p < msg.controls[0].markers[0].points.length; p++){
		    var point = msg.controls[0].markers[0].points[p];
		    // We have the coordinates of one point
		    // Now let's translate the position
		    var translatedPoint = point;

		    // This will give us the coordinates of the base_link in odom_combined
		    var tm = this.vm.tf.lookupTransformMartix("/base_link","/odom_combined");

		    // tm[0]: X_base_link reflected on X_odom_combined
		    // tm[1]: X_base_link reflected on Y_odom_combined
		    //
		    // tm[4]: Y_base_link reflected on X_odom_combined
		    // tm[5]: Y_base_link reflected on Y_odom_combined
		    // 
		    // tm[12]: X coordinate of the base_link's origin in odom_combined
		    // tm[13]: Y coordinate of the base_link's origin in odom_combined
		    // tm[14]: Z coordinate of the base_link's origin in odom_combined

		    
		    // old and buggy
		    // translatedPoint.x = tm[0]*point.x + tm[4]*point.y + tm[12];
		    // translatedPoint.y = tm[1]*point.x + tm[5]*point.y + tm[13];
		    // end of old and buggy

		    var c = Math.sqrt(point.x*point.x + point.y*point.y);

		    if(tm[1]<0 || point.y > 0){
			var gamma = Math.acos(point.y/c);
			var omega = Math.acos(tm[0]);
			var b = c*Math.sin(gamma - this.sgn(tm[1])*omega);
			var a = c*Math.cos(gamma - this.sgn(tm[1])*omega);
		    }
		    else{
		     	var gamma = Math.asin(point.y/c);
		     	var omega = Math.acos(tm[0]);
		     	var b = c*Math.cos(omega + gamma);
		     	var a = c*Math.sin(omega + gamma);
		    }
		    translatedPoint.x = tm[12] + b;
		    translatedPoint.y = tm[13] + a;
		    translatedPoint.z = point.z + tm[14];

		    msg.controls[0].markers[0].points[p] = translatedPoint;
		}
	    }
	    
	    
	    this.setScale([1,1,1]);
	    this.setPose(msg.pose);

	    this.lastPose = msg.pose;

	    if(msg.scale == 0)
		msg.scale = 1;

	    
	    if(this.description != "") {
		var title = ros.visualization.InteractiveMarkers.Tool.makeTitle(msg.scale, this.description);

		var title_control = new ros.visualization.InteractiveMarkers.InteractiveMarkerControl(this.vm, this);
		title_control.updateFromMessage(title);
		this.controls.push(title_control);
		title_control.setCumMatrix(); 
	    }

	    for(var c in msg.controls)
	    {
		var control = new ros.visualization.InteractiveMarkers.InteractiveMarkerControl(this.vm, this);
		ros.visualization.InteractiveMarkers.Tool.autoComplete(msg.controls[c],msg.scale);
		control.updateFromMessage(msg.controls[c]);
		this.controls.push(control);
		control.setCumMatrix();
	    }

	    this.createMenu(msg.menu_entries);
	},

	/**
	 * Creates menu that will appear on right click of interactive marker
	 * @param menu_entries array of objects describing the commands provided in the menu
	 */
	createMenu : function(menu_entries)
	{
	    var menu = {};
	    
	    var itemArray = [];
	    var that = this;
	    
	    for(var i in menu_entries)
	    {
		var item = {}
		item.type = RightContext.TYPE_MENU;
		// check for an in-line menu option and indent as necessary 
		if(menu_entries[i].parent_id !== 0) {
			item.text = '&nbsp;&nbsp;&nbsp;>&nbsp;' + menu_entries[i].title;
		} else {
			item.text = menu_entries[i].title;
		}
		item.onclick = function() { that.menuEvent(this)};
		item.command_type = menu_entries[i].command_type;
		item.command = menu_entries[i].command;
		item.id = menu_entries[i].id;
		itemArray.push(item);
	    }

	    menu.attributes = "";
	    menu.items = itemArray;

	    this.menu = menu;
	},

	menuEvent : function(item)
	{
	    var command_type = item.getAttribute("command_type"); 
	    var id = item.getAttribute("id"); 
	    var feedback = this.feedbackMsg;
	    feedback.event_type  = ros.visualization.InteractiveMarkers.InteractiveMarkerFeedback.Types.MENU_SELECT;
	    feedback.menu_entry_id = parseInt(id);

	    this.publishFeedback(feedback);
	},

	updateFromPoseMessage: function(pose)
	{
	    if(this.mouseDragging)
	    {
		this.lastPose = pose.pose;
	    }
	    else {
		this.lastPose = pose.pose;
		this.poseUpdate();
	    }
	},

	mouseEvent : function(control, control_name, pickInfo, mouseButton, type)
	{
	    var feedback = new ros.visualization.InteractiveMarkers.InteractiveMarkerFeedback();

	    feedback.client_id = "wviz";
	    feedback.event_type = type;
	    feedback.marker_name = this.name;
	    feedback.control_name = control_name;
	    
	    feedback.mouse_point_valid = pickInfo.valid;
	    if(pickInfo.valid)
	    {
		var m = this.vm.scene_viewer.lookupTransform(this.frame_id); 
		var matrix = sglInverseM4(m);

		var refPoint = ros.visualization.transformPoint(matrix, pickInfo.worldIntersectionPosition);        
		feedback.mouse_point = {x:refPoint[0], y:refPoint[1], z:refPoint[2]};
	    }
	    
	    if(mouseButton[0])
	    { 
		this.publishFeedback(feedback);

		if(type == ros.visualization.InteractiveMarkers.InteractiveMarkerFeedback.Types.MOUSE_UP) 
		{
		    this.poseUpdate();
		    this.mouseDragging = false;
		    return false;
		}
		else {
		    this.mouseDragging = true;
		    return true;
		}
	    }
	    else if(mouseButton[2]){
		this.feedbackMsg = feedback;
		RightContext.setMenu(this.menu);
		return true;
	    }

	    return false;
	},

	poseUpdate : function()
	{
	    this.setPose(this.lastPose);
	},


	publishPose: function(name)
	{
	    var feedback = new ros.visualization.InteractiveMarkers.InteractiveMarkerFeedback();

	    feedback.client_id = "wviz";
	    feedback.event_type = ros.visualization.InteractiveMarkers.InteractiveMarkerFeedback.Types.POSE_UPDATE;
	    feedback.marker_name = this.name;
	    feedback.control_name = name;

	    for(var c in this.controls)
	    {
		var control = this.controls[c];
		control.setCumMatrix();
	    }

	    this.publishFeedback(feedback);
	},

	/**
	 * Publish interactive marker feedback to server
	 */
	publishFeedback: function(feedback)
	{
	    var feedbackNode = new this.vm.node.Topic({
		name: this.feedbacktopic,
		messageType: 'visualization_msgs/InteractiveMarkerFeedback'
	    });

	    feedback.header = new ros.roslib.Header();
	    feedback.header.frame_id = this.frame_id;
	    feedback.header.stamp = (new ros.Time).now(); 

	    feedback.pose = {};
	    feedback.pose.position = this.position;
	    feedback.pose.orientation = this.orientation;

	    var feedbackMsg = new this.vm.node.Message({
		header: feedback.header,
		client_id: feedback.client_id,
		marker_name: feedback.marker_name,
		control_name: feedback.control_name,
		event_type: feedback.event_type,
		pose: feedback.pose,
		menu_entry_id: feedback.menu_entry_id,
		mouse_point: feedback.mouse_point,
		mouse_point_valid: feedback.mouse_point_valid
	    });

	    feedbackNode.publish(feedbackMsg);
	},

	getSize : function()
	{
	    return this.scale[0];
	},

    });

ros.include('js/ros/visualization/interactivemarker/interactivemarkercontrol');
ros.include('js/ros/visualization/interactivemarker/interactivemarkerupdate');
ros.include('js/ros/visualization/interactivemarker/interactivemarkerfeedback');
ros.include('js/ros/visualization/interactivemarker/tool');
