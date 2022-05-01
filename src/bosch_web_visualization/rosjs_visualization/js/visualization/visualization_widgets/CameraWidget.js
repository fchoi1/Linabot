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

ros.visualization_widgets.CameraWidget = Class.extend({
    init: function(widget_div_id, width, height, uri, update_interval){
	//console.log("Init says");
	//console.log(arguments);
	this.type = "CameraWidget";
	this.id='';
	this.dialog_html='';
	this.button='';
	this.sceneNode={};
	this.h_space=0;
	this.v_space=0;
	this.availableTopics=[];
	this.name='';
	this.host='';
	
	if(width == null || width == undefined)	this.width = 400;
	else this.width = width;

	if(height == null || height == undefined) this.height = 400;
	else this.height = height;
	
	this.widget_div_id = ''; 

	this.host = '';
	this.topic = '';
	this.image_width = 320;
  	this.image_height = 240;
	this.quality = 30; 
	this.invert = true;
	this.uri = '';

	this.minimizable = true;

	// Some sample URIs to pass in mjpeg_server:
	//
  	// 1) When mjpeg_server runs on a remote computer with a real cam:
	//
	//    this.uri = "http://merry:8080/stream?topic=/remote_lab_cam0/image_raw?invert?width=320?height=240?quality=30";
	//
	// 
	// 2) When mjpeg_server and gazebo runs on the same computer, i.e. localhost:
	//
	//    this.uri = "http://localhost:8080/stream?topic=/l_forearm_cam/image_raw?width=320?height=240?quality=30";
    },
    getHtml: function(name){
	this.name = name;
	
	if(this.dialog_html == ''){
	    var dialog = document.createElement('div');
	    dialog.setAttribute('id',name+'_dialog');
	    var shortName = name.substring(0,name.length-7);
	    dialog.setAttribute('title',shortName);
	    
	    this.widget_div_id = dialog.id;
	    this.image_id = this.widget_div_id + "_img";
	    
	    var img = document.createElement('img');
	    img.setAttribute('id',this.image_id);
	    img.setAttribute('width',this.image_width);
	    img.setAttribute('height',this.image_height);
	    
	    dialog.appendChild(img);

	    this.dialog_html = dialog;
	    this.dialog = dialog;
	}
	
	return this.dialog_html;
    },
    onOpen: function(){
	//console.log("Open sesame");

	if(this.host != ''){

	    // Now let's compose get our URI together
	    if(this.invert == true){
		var tmpStr = "?invert";
	    }
	    else{
		var tmpStr = '';
	    }
	    
	    this.uri = "http://"+this.host+":8080/stream?topic="+this.topic+tmpStr+"?width="+this.image_width+"?height="+this.image_height+"?quality="+this.quality;
	    	    
	    //console.log(this.image_id);
	    var img = document.getElementById(this.image_id);
	    //console.log(img);
	    img.setAttribute('width',this.image_width);
	    img.setAttribute('height',this.image_height);
	    img.src = this.uri;
	}
    },
    onClose: function(){
	//console.log("Clearing Interval");
	//clearInterval(this.myCallHandle);
    },
    onCancel: function(){
    },
    onUpdate: function(){
	//clearInterval(this.myCallHandle);
	this.onOpen();
    },
    onSave: function(){
    }
});