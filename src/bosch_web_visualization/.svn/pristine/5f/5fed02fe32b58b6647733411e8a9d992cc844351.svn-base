/*********************************************************************
 *
 * Software License Agreement (BSD License)
 *
 *  Copyright (c) 2010, Robert Bosch LLC.
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

ros.visualization.Markers.CubeListMarker = ros.visualization.Markers.Marker.extend({
    init: function(vm) 
    {
	this._super(vm);
	this.model = null;
    },
    
    updateFromMessage: function(marker_msg) 
    {
	//console.log("in cubelist marker, updating from message");

	this._super(marker_msg);
	this.setFrame(marker_msg.header.frame_id);
	
	//console.log("there are "+ marker_msg.points.length + " cubes");

	this.model = new ros.visualization.CubeListModel(this.vm.gl, this.vm.shader_manager, marker_msg.points, marker_msg.scale);
	
	// for(var i=0;i<marker_msg.points.length;i++){
	//     if(i%50 == 0){
	// 	console.log("processing "+i+"th cube");
	//     }
	//     var model = new ros.visualization.BoxModel(this.vm.gl, this.vm.shader_manager);
	//     if (marker_msg.scale.x * marker_msg.scale.y * marker_msg.scale.z == 0.0)
	//     {
	// 	ros_debug("Scale of 0 in one of x/y/z");
	//     }
	//     var temp_pose = marker_msg.pose;
	//     temp_pose.position = marker_msg.points[i];

	//console.log("Will I am");
	//console.log(this);
	//this.setScale([marker_msg.scale.x,marker_msg.scale.y,marker_msg.scale.z]);
	if(marker_msg.color.a == 0)
	    marker_msg.color.a = 0.3; 
	this.model.setColor([marker_msg.color.r, marker_msg.color.g, marker_msg.color.b, marker_msg.color.a]);
    },	
});


										   
