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

ros.visualization_widgets.SnapshotWidget = Class.extend({
    init: function(widget_div_id, width, height, uri, update_interval){
	console.log("Init says");
	console.log(arguments);
	this.type = "SnapshotWidget";
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
	this.dragging = false;
	this.rect = {};
	this.curleft = 320;
	this.curtop = 50;

	this.savedImgCounter = 0;
	
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

	    var css = document.createElement('style');
	    css.type = 'text/css';
	    css.innerHTML = '#myForm {float: left; width: 750px; height: 630px;} #imagelabel {float: left; width: 320px; height: 50px; text-align: center} #captImage {float: left; width: 320px; height: 240px; position: relative;} #myCnv0{position: absolute; left: 0px; top: 0px; z-index: 0;} #myCnv1{position: absolute; left: 0px; top: 0px; z-index: 1;} #liveImage {float: left; width: 320px; height: 240px;} #buttonpane {float: left; width: 100px; height: 290px;} #imagestrip {float: left; width: 750px; overflow: auto; white-space: nowrap;} #imagestrip div{display:inline-block;width: 340px;}';
	    dialog.appendChild(css);
	    
	    this.widget_div_id = dialog.id;
	    this.image_id = this.widget_div_id + "_img";

	    var liveImg = document.createElement('img');
	    liveImg.setAttribute('id',this.image_id+'_live');
	    liveImg.setAttribute('width',this.image_width);
	    liveImg.setAttribute('height',this.image_height);

	    var wrapper = document.createElement('div');
	    wrapper.setAttribute('id','myForm');
	    
	    var liveImgLbl = document.createElement('div');
	    liveImgLbl.setAttribute('id','imagelabel');
	    liveImgLbl.innerHTML = 'Live Image';
	    
	    var captImgLbl = document.createElement('div');
	    captImgLbl.setAttribute('id','imagelabel');
	    captImgLbl.innerHTML = 'Snap Shot';

	    var liveImgDiv = document.createElement('div');
	    liveImgDiv.setAttribute('id','liveImage');
	    
	    var captImgDiv = document.createElement('div');
	    captImgDiv.setAttribute('id','captImage');

	    var buttonDiv = document.createElement('div');
	    buttonDiv.setAttribute('id','buttonpane');
	    
	    var savedImgDiv = document.createElement('div');
	    savedImgDiv.setAttribute('id','imagestrip');

	    // Create a new unordered list where we will append our images
	    var unorderedList = document.createElement('ol');
	    unorderedList.setAttribute('id','savedImageList');
	    unorderedList.setAttribute('type','1');
	    
	    var captureBtn = document.createElement('input');
	    captureBtn.setAttribute('type','button');
	    captureBtn.setAttribute('id',name+'_capture');
	    captureBtn.setAttribute('value','Capture');
	    captureBtn.addEventListener('click',this.snap.bind(this));

	    var saveBtn = document.createElement('input');
	    saveBtn.setAttribute('type','button');
	    saveBtn.setAttribute('id',name+'_save_img');
	    saveBtn.setAttribute('value','Save');
	    saveBtn.addEventListener('click',this.saveImg.bind(this));

	    var cnv = document.createElement('canvas');
	    var ctx = cnv.getContext("2d");
	    ctx.strokeStyle="#FF0000";
	    cnv.setAttribute('id','myCnv1');
	    cnv.setAttribute('width',this.image_width);
	    cnv.setAttribute('height',this.image_height);

	    cnv.addEventListener('mousedown',this.mouseDown.bind(this));
	    cnv.addEventListener('mouseup',this.mouseUp.bind(this));
	    cnv.addEventListener('mousemove',this.mouseMove.bind(this));

	    var bottomCnv = document.createElement('canvas');
	    var bottomCtx = cnv.getContext("2d");
	    bottomCtx.strokeStyle="#00FF00";
	    bottomCnv.setAttribute('id','myCnv0');
	    bottomCnv.setAttribute('width',this.image_width);
	    bottomCnv.setAttribute('height',this.image_height);
	    
	    savedImgDiv.appendChild(unorderedList);
	    liveImgDiv.appendChild(liveImg);
	    captImgDiv.appendChild(bottomCnv);
	    captImgDiv.appendChild(cnv);
	    buttonDiv.appendChild(captureBtn);
	    buttonDiv.appendChild(saveBtn);

	    wrapper.appendChild(liveImgLbl);
	    wrapper.appendChild(captImgLbl);
	    wrapper.appendChild(liveImgDiv);
	    wrapper.appendChild(captImgDiv);
	    wrapper.appendChild(buttonDiv);
	    wrapper.appendChild(savedImgDiv);

	    dialog.appendChild(wrapper);

	    this.dialog_html = dialog;
	    this.dialog = dialog;
	}
	
	return this.dialog_html;
    },
    mouseDown: function(e){
	console.log("mouse down");
	if(e.which == 1){
	    console.log("left click");

	    var cnv = document.getElementById('myCnv1');
	    var pos = this.getMousePos(cnv,e);
	    var myOffset = this.getOffset( document.getElementById('myCnv1') ); 

	    this.curleft = myOffset.x;
	    this.curtop = myOffset.y;
	    
	    this.rect.startX = e.pageX - myOffset.x;
	    this.rect.startY = e.pageY - myOffset.y;
	    this.dragging = true;
	}
    },
    mouseUp: function(e){
	console.log("mouse up");
	var cnv = document.getElementById('myCnv1');
	var pos = this.getMousePos(cnv,e);
	var myOffset = this.getOffset( document.getElementById('myCnv1') ); 
	console.log("myOffset");
	console.log(myOffset.x);
	console.log(myOffset.y);
	console.log("pos");
	console.log(pos.x);
	console.log(pos.y);
	this.rect.endX = e.pageX - myOffset.x;
	this.rect.endY = e.pageY - myOffset.y;
	  
	this.rect.w = (this.rect.endX - this.rect.startX);
	this.rect.h = (this.rect.endY - this.rect.startY);
	this.dragging = false;

	console.log(this.rect.startX);
	console.log(this.rect.startY);
	console.log(this.rect.w);
	console.log(this.rect.h);
	this.draw();
    },
    mouseMove: function(e){
	//console.log("mouse move");
	var cnv = document.getElementById('myCnv1');
	var ctx = cnv.getContext('2d');
	var pos = this.getMousePos(cnv,e);
	var myOffset = this.getOffset( document.getElementById('myCnv1') ); 
	
	if (this.dragging) {
	    this.rect.endX = e.pageX - myOffset.x;// this.curleft;
	    this.rect.endY = e.pageY - myOffset.y;// this.curtop;
	    this.rect.w = (this.rect.endX - this.rect.startX);
	    this.rect.h = (this.rect.endY - this.rect.startY);
	    ctx.clearRect(0,0,cnv.width,cnv.height);
	    ctx.strokeRect(this.rect.startX,this.rect.startY,this.rect.w,this.rect.h);
	}
    },
    draw: function(){
	console.log("here!");
    },
    snap: function(){

	console.log("Snap!");
	if(this.host != ''){

	    // Now let's compose get our URI together
	    if(this.invert == true){
		var tmpStr = "?invert";
	    }
	    else{
		var tmpStr = '';
	    }
	    
	    this.uri = "http://"+this.host+":8080/snapshot?topic="+this.topic+tmpStr+"?width="+this.image_width+"?height="+this.image_height+"?quality="+this.quality;
	    
	    console.log(this.image_id);
	    var img = new Image(); //document.createElement(this.image_id);
	    console.log(img);
	    //img.setAttribute('id',this.image_id);
	    //img.setAttribute('width',this.image_width);
	    //img.setAttribute('height',this.image_height);
	    img.src = this.uri;
	    
	    var bottomCnv = document.getElementById('myCnv0');
	    bottomCnv.setAttribute('width',this.image_width);
	    bottomCnv.setAttribute('height',this.image_height);

	    var ctx = bottomCnv.getContext('2d');
	    
	    img.onload = function(){
		ctx.drawImage(img,0,0);
		ctx.strokeStyle = "green";
	    };

	    var topCnv = document.getElementById('myCnv1');
	    var topCtx = topCnv.getContext('2d');
	    topCtx.clearRect(0,0,topCnv.width,topCnv.height);
	}
    },
    goLive: function(){
	if(this.host != ''){
	    // Now let's compose get our URI together
	    if(this.invert == true){
		var tmpStr = "?invert";
	    }
	    else{
		var tmpStr = '';
	    }
	    this.uriLive = "http://"+this.host+":8080/stream?topic="+this.topic+tmpStr+"?width="+this.image_width+"?height="+this.image_height+"?quality="+this.quality;
	    
	    var liveImg = document.getElementById(this.image_id+'_live');
	    liveImg.src = this.uriLive;
	}
    },
    saveImg: function(){
	console.log("Saving Img");

	this.savedImgCounter++;

	// Get the handle for our saved images list
	var unorderedList = document.getElementById('savedImageList');

	var listItem = document.createElement('div');
	listItem.setAttribute('id','savedImg_'+this.savedImgCounter);

	var myDiv = document.getElementById('imagestrip');
	

	var myNewCnv = document.createElement('canvas');
	myNewCnv.width = 320;
	myNewCnv.height = 240;
	var myNewCtx = myNewCnv.getContext('2d');
	var mySnapshot = document.getElementById('myCnv0');
	var myBoundingBox = document.getElementById('myCnv1');

	myNewCtx.drawImage(mySnapshot,0,0);
	myNewCtx.drawImage(myBoundingBox,0,0);
	
	listItem.appendChild(document.createTextNode(""+this.savedImgCounter));
	listItem.appendChild(myNewCnv);
	myDiv.appendChild(listItem);
	
	// Add the list in the div
	//unorderedList.appendChild(listItem);
	if(this.snapCallback !== undefined){
	    this.snapCallback(this.savedImgCounter);
	}
    },
    onOpen: function(){
	console.log("Open sesame");
	this.goLive();
    },
    onClose: function(){
	console.log("Clearing Interval");
	//clearInterval(this.myCallHandle);
    },
    onCancel: function(){
    },
    onUpdate: function(){
	//clearInterval(this.myCallHandle);
	this.onOpen();
    },
    onSave: function(){	
    },
    getMousePos: function(canvas, evt) {
	var rect = canvas.getBoundingClientRect(), root = document.documentElement;
	
	// return relative mouse position
	var mouseX = evt.clientX - rect.top - root.scrollTop;
	var mouseY = evt.clientY - rect.left - root.scrollLeft;
	return {
	    x: mouseX,
	    y: mouseY
	};
    },
    getOffset: function( el ) {
	var _x = 0;
	var _y = 0;
	while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
	}
	return { y: _y, x: _x };
    },
    setSnapCallback: function(callback){
	this.snapCallback = callback;
    }
});