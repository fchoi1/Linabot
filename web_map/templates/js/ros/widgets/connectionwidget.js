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

ros.widgets.ConnectionWidget = Class.extend({
    init: function(callback_success, callback_failure){
	this.success = false;
	this.status = 'init';
	this.callback_success = callback_success;
	this.callback_failure = callback_failure;
	this.rosjs_server = "localhost:9090";
	
	this.setNodeCallbacks();
	this.dialog_html = '';
    },
    setNodeCallbacks: function(){	
	// new stuff
	this.node = new ROS('ws://'+this.rosjs_server);
	
	var that = this;

	// What's going to happen when the connection is closed?
	this.node.on('close', function() {
	    if(that.status == 'init'){
		console.log("Can't Connect.");
	    }
	    else if(that.status == 'connected'){
		console.log("Disconnected");
		that.status = 'disconnected';
	    }
	    that.callback_failure();
	});

	this.node.on('error', function(e) {
	    console.log("Unknown error!");
	    that.success = false;
	    that.callback_failure();
	});
	this.node.on('connection', function(e) {
	    that.status = 'connected';
	    // Inform the user
	    console.log("Connected to rosbridge_server.");
	    that.success = true;
	    // Then call the callback function on connect
	    that.callback_success();
	});   
    },
    getHtml: function(name){
	this.name = name;
	this.saveID = name + '_saveButton';
	this.cancelID = name + '_cancelButton';
	if(this.dialog_html == ''){
	    var dialog = document.createElement('div');
	    dialog.setAttribute('id',name+'_dialog');
	    dialog.setAttribute('title',"We can't find rosbridge :(");

	    var css = document.createElement('style');
	    css.type = 'text/css';
	    css.innerHTML = '#leftpane {float: left; width: 200px; height: 50px; text-align:justify; top: 10px;}#rightpane {float: left; width: 200px; height: 25px; margin: 10px;}#buttons { float: left; width: 200px; height: 25px; text-align: center;}#form { width: 420px; height: 100px;}#label { float: left; width: 200px; }#textbox { float: left; width: 200px; }';
	    dialog.appendChild(css);
	    
	    var formdiv = document.createElement('div');
	    var formform = document.createElement('form');
	    formdiv.setAttribute('id','form');
	    formdiv.appendChild(formform);
	    dialog.appendChild(formdiv);

	    // If the property of the widget is topic then put a small button next to it
	    // When the user clicks on the button it will pop the list of available topics
	    var label1 = document.createElement('div');
	    label1.setAttribute('id','label');
	    label1.innerHTML = 'Please write the name, or the IP address of the computer that runs rosbridge. ';

	    var input1 = document.createElement('input');
	    input1.setAttribute('type','text');
	    input1.setAttribute('name',name + '_rosbridge_input');	    

	    var textboxdiv = document.createElement('div');
	    textboxdiv.setAttribute('id','textbox');	    

	    var leftpanediv = document.createElement('div');
	    leftpanediv.setAttribute('id','leftpane');
	    formform.appendChild(leftpanediv);

	    var rightpanediv = document.createElement('div');
	    rightpanediv.setAttribute('id','rightpane');
	    formform.appendChild(rightpanediv);

	    leftpanediv.appendChild(label1);
	    rightpanediv.appendChild(input1);

	    var buttonsdiv = document.createElement('div');
	    buttonsdiv.setAttribute('id','buttons');
	    formform.appendChild(buttonsdiv);

	    // Add a Save and a Cancel button and finish generating the div 
	    // first </div> is for div class="form", id: name_properties_form
	    // second </div> is for div id: name_properties_dialog
	    var saveButton = document.createElement('button');
	    saveButton.setAttribute('type','button');
	    saveButton.setAttribute('id',this.saveID);
	    saveButton.innerHTML = '<center>Connect</center>';
	    buttonsdiv.appendChild(saveButton);

	    var cancelButton = document.createElement('button');
	    cancelButton.setAttribute('type','button');
	    cancelButton.setAttribute('id',this.cancelID);
	    cancelButton.innerHTML = '<center>Cancel</center>';
	    buttonsdiv.appendChild(cancelButton);

	    this.dialog_html = dialog;	    
	}
	return this.dialog_html;
    },
    onOpen: function(){
	
    },
    onClose: function(){
	
    },
    onSave: function(){
	
	this.rosjs_server = document.getElementsByName(this.name+"_rosbridge_input")[0].value;
	// If we are not connected, try to connect again
	if(this.success == false){
	    console.log("my name is");
	    console.log(this.name);
	    console.log("Tryin to connect to:");
	    console.log(this.rosjs_server);
	    this.setNodeCallbacks();
	}
    },
    onCancel: function(){
	
    },    
});


      
      
      
      
