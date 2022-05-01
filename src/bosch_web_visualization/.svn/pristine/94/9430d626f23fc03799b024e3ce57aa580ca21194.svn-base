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

/* Halit Bener Suay - Fixed-Term - Bosch CR-RTC/NA
 * 05/22/2012
 */

/* This widget will receive an existing node's
 * properties and will show a dialog where you can
 * modify them on the fly. Node properties are read
 * from the object itself. Depending on the type of
 * the property, this dialog show one or more of
 * the below:
 * - text input field
 * - drop-down field
 * - color-picker
 * - number scrolling thingy (what is it called again?)
 */

ros.visualization_widgets.PropertiesWidget = Class.extend({
    init: function(mySceneNode) {
	//console.log("Init says");
	//console.log(arguments);
	this.type = "PropertiesWidget";
	this.id='';
	this.dialog_html='';
	this.button='';
	this.sceneNode=mySceneNode;
	this.h_space=0;
	this.v_space=0;
	this.availableTopics=[];
	this.name='';
	this.width = 640;
	this.height = 480;
	this.minimizable = false;
    },

    padding: function(str) {
	var pad = "";
	if(str.length < 6){
	    for(var i=str.length; i < 6; i=i+1){
		pad = pad + "0";
	    }
	}
	var padded = pad + str;
	return padded;
    },

    getHtml: function(name){

	this.name = name;
	this.saveID = name + '_saveButton';
	this.cancelID = name + '_cancelButton';
	//console.log('here');
	
	// Just in case redraw was set to 1 previously reset it.
	//console.log("Setting my redraw to 0 - I am the following scene node");
	//console.log(this.sceneNode);
	this.sceneNode.redraw=0;

	// This is where we generate the html code
	// for the properties dialog
	if(this.dialog_html == ''){

	    // Here iterate through the properties of the visualization widget and 
	    // add appropriate form elements in the dialog's html
	    // Let's begin from generating the title
	    //this.dialog_html= '<div id="'+name+'_dialog" title="'+name+'">';

	    var dialog = document.createElement('div');
	    dialog.setAttribute('id',name+'_dialog');
	    dialog.setAttribute('title',name);
	    var css = document.createElement('style');
	    css.type = 'text/css';
	    css.innerHTML = '#leftpane {float: left; width: 330px; height: 200px;}#rightpane {float: left; width: 50px; height: 200px;}#form { width: 500px; height: 200px;}#label { float: left; width: 100px; }#textbox { float: left; width: 200px; }#picker { width: 0px; height: 0px; }#choosetopic {float: left; width: 30px; }#slide { width: 30px; height: 100px; }#palette { float: left; height: 20px; width: 20px; }#container { position: relative; float: left; width: 200px; height: 23px; margin: 2px;}#overlaytb { position: absolute; top: 0; left: 0; z-index: 999; width: 176px;height: 16px;}#select { position: absolute; top: 0; left: 0; padding: 0; margin: 0; width: 200px; height: 23px;}';

	    dialog.appendChild(css);
	    
	    // Now let's go through the keys of whatever widget we are trying to show properties
	    // and put a text box for those keys
	    // console.debug(this.sceneNode.keys);

	    // Start generating a form
	    //this.dialog_html=this.dialog_html+'<div id="form"> <form>';
	    var formdiv = document.createElement('div');
	    var formform = document.createElement('form');
	    formdiv.setAttribute('id','form');
	    formdiv.appendChild(formform);
	    dialog.appendChild(formdiv);


	    var script = document.createElement('script');
	    script.type = 'text/javascript';
	    script.src = 'js/ros/visualization/visualization_widgets/colorpicker.js';
	    var headID = document.getElementsByTagName("head")[0];
	    var self = this;
	    script.onload = script.onreadystatechange = function(){
		
		// console.log("script onload");
		// console.log(that);
		// console.log(self);
		// If the scene node has a color property exposed,
		// Open the color picker's rainbow slide here
		if("color" in self.sceneNode.keys){
		    ColorPicker(self.slide,
				
				// old
				//document.getElementById('palette');
				
				// new
				// For the color textbox we don't have an id, so we get it by its name
				self.colorinput,
				
				function(hex, hsv, rgb) {
				    
				    // console.log("COLOR PICKER SAYS hex is:");
				    // console.log(hex);
				    // console.log(self.colorinput);
				    
				    //old
				    //document.getElementById('palette').style.backgroundColor=hex;
				    self.colorinput.style.backgroundColor=hex;
				    
				    self.colorinput.style.color=hex;
				    self.colorinput.value=[Number(rgb.r/255), Number(rgb.g/255), Number(rgb.b/255)];
				    
				    //console.log(rgb);
				    //ros_debug(Number(rgb.r/255));
				    //ros_debug(Number(rgb.g/255));
				    //ros_debug(Number(rgb.b/255));
				    
				    self.sceneNode.color = [Number(rgb.r/255), Number(rgb.g/255), Number(rgb.b/255)];
				    //console.log("Setting my redraw to 1 - I am the following scene node");
				    //console.log(this.sceneNode);
				    self.sceneNode.redraw=1;
				}
			       );
		}
	    };
	    
	    headID.appendChild(script);
	    
	    // Put the left pane here
	    //this.dialog_html=this.dialog_html+'<div id="leftpane">';
	    var leftpanediv = document.createElement('div');
	    leftpanediv.setAttribute('id','leftpane');
	    formform.appendChild(leftpanediv);
	    
	    for(var k in this.sceneNode.keys){
		// k is the index string; the name of the property.
		// this.sceneNode.keys[k] returns the value of the property.
		if( k == "color"){

		    // Convert object's color into hex
		    var rgbInHex = this.sceneNode.color[2]*255 | ( this.sceneNode.color[1]*255<< 8) | (this.sceneNode.color[0]*255 << 16);

		    // Set palette color
		    
		    // This input box is special, in that, it's not clickable (readonly)
		    // and that its background color depends on the color of the vis. wdgt.
		    var label = document.createElement('div');
		    label.setAttribute('id','label');
		    label.innerHTML = k;
		    
		    var textboxdiv = document.createElement('div');
		    textboxdiv.setAttribute('id','textbox');

		    var input = document.createElement('input');
		    input.setAttribute('type','text');
		    input.setAttribute('name',name + '_'+k+'_input');
		    input.setAttribute('readonly','readonly');
		    input.setAttribute('style',"background-color:#'+rgbInHex.toString(16)+'; color:#'+rgbInHex.toString(16)+';");
		    input.setAttribute('value',this.sceneNode.keys[k]);
		    input.style.backgroundColor = '#'+rgbInHex.toString(16);
		    input.style.color = '#'+rgbInHex.toString(16);
		    this.colorinput = input;
		    //console.log(input);
		    textboxdiv.appendChild(input);

		    leftpanediv.appendChild(label);
		    leftpanediv.appendChild(textboxdiv);
		}
		else if( k == "topic"){
		    // If the property of the widget is topic then put a drop-down list and a text-box.
		    // When the user clicks on the list it will only show matching topics to this scene node's message type.
		    var label = document.createElement('div');
		    label.setAttribute('id','label');
		    label.innerHTML = k;

		    var containerdiv = document.createElement('div');
		    containerdiv.setAttribute('id','container');

		    var input = document.createElement('input');
		    input.setAttribute('id','overlaytb');
		    input.setAttribute('type','text');
		    input.setAttribute('name',name + '_'+k+'_input');
		    input.setAttribute('value',this.sceneNode.keys[k]);

		    var dropdown = document.createElement('select');
		    dropdown.setAttribute('id','select');
		    dropdown.setAttribute('name',name + '_'+k+'_dropdown');
		    
		    // Add the textbox in the overlay-container
		    containerdiv.appendChild(input);
		    
		    // Add the populated dropdown list in the overlay-container
		    containerdiv.appendChild(dropdown);
		    
		    // Add the label in the dialog
		    leftpanediv.appendChild(label);
		    
		    // Add the overlay-container in the dialog
		    leftpanediv.appendChild(containerdiv);

		    
		}
		else if( k == "frame_id" ){
		    // If the property of the widget is frame_id then put a dropdown list and a text-box.
		    // When the user clicks on the list it will show all provided frames.
		    // The list of TFs are published by tf_lister package's tf_lister node.

		    // This will say: frame_id in the dialog
		    var label = document.createElement('div');
		    label.setAttribute('id','label');
		    label.innerHTML = k;
		    
		    // This will contain the textbox and the dropdown list
		    var containerdiv = document.createElement('div');
		    containerdiv.setAttribute('id','container');
		    
		    // This is the textbox that is overlayed on top of the dropdown list
		    var input = document.createElement('input');
		    input.setAttribute('id','overlaytb');
		    input.setAttribute('type','text');
		    input.setAttribute('name',name + '_'+k+'_input');
		    input.setAttribute('value',this.sceneNode.keys[k]);

		    // This is the dropdown list that will be populated later below
		    var dropdown = document.createElement('select');
		    dropdown.setAttribute('id','select');
		    dropdown.setAttribute('name',name + '_'+k+'_dropdown');

		    // Add the textbox in the overlay-container
		    containerdiv.appendChild(input);
		    
		    // Add the populated the dropdown list in the overlay-container
		    containerdiv.appendChild(dropdown);

		    // Add the label in the dialog
		    leftpanediv.appendChild(label);
		    
		    // Add the overlay-container in the dialog
		    leftpanediv.appendChild(containerdiv);	    
		}
		else{
		    // If the property of the widget is not "color"
		    // then just add its label and a textbox
		    //this.dialog_html=this.dialog_html +'<div id="label">'+ k + '</div> <div id="textbox"> <input type="text" name="'+name+'_'+k+'_input" 
		    //  value="'+this.sceneNode.keys[k]+'"> </div>';

		    var label = document.createElement('div');
		    label.setAttribute('id','label');
		    label.innerHTML = k;

		    var textboxdiv = document.createElement('div');
		    textboxdiv.setAttribute('id','textbox');

		    var input = document.createElement('input');
		    input.setAttribute('type','text');
		    input.setAttribute('name',name + '_'+k+'_input');
		    input.setAttribute('value',this.sceneNode.keys[k]);
		    textboxdiv.appendChild(input);

		    leftpanediv.appendChild(label);
		    leftpanediv.appendChild(textboxdiv);
		}
	    }

	    // Put a rightpane here
	    //this.dialog_html=this.dialog_html+'<div id="rightpane">';
	    var rightpane = document.createElement('div');
	    rightpane.setAttribute('id','rightpane');
	    formform.appendChild(rightpane);

	    if("color" in this.sceneNode.keys){
		// Rainbow slide yay!
		this.picker = document.createElement('div');
		this.picker.setAttribute('id','picker');
		rightpane.appendChild(this.picker);
		
		this.slide = document.createElement('div');
		this.slide.setAttribute('id','slide');
		rightpane.appendChild(this.slide);
		
		//console.log("Appended the slider");
		//console.log(this.slide);
	    }
	    
  	    // Add a Save and a Cancel button and finish generating the div 
	    // first </div> is for div class="form", id: name_properties_form
	    // second </div> is for div id: name_properties_dialog
	    var saveButton = document.createElement('button');
	    saveButton.setAttribute('type','button');
	    saveButton.setAttribute('id',this.saveID);
	    saveButton.innerHTML = '<center>Save</center>';
	    formdiv.appendChild(saveButton);

	    var cancelButton = document.createElement('button');
	    cancelButton.setAttribute('type','button');
	    cancelButton.setAttribute('id',this.cancelID);
	    cancelButton.innerHTML = '<center>Cancel</center>';
	    formdiv.appendChild(cancelButton);

	    this.dialog_html = dialog;
	    this.dialog = dialog;

	}	
	//console.log(this.colorinput);
		
	//console.log('done');
	return this.dialog_html;
    },

    onOpen: function(){
	
	// Just in case redraw was set to 1 previously reset it.
	this.sceneNode.redraw=0;

	// Refresh the input text fields
	for(var k in this.sceneNode.keys){
	    if( k == "color"){

		// Convert object's color into hex
		var rgbInHex = this.sceneNode.keys[k][2]*255 | (this.sceneNode.keys[k][1]*255 << 8) | (this.sceneNode.keys[k][0]*255 << 16);

		
		// Convert the rgb value in hex and pad the string with zeros
		// if it's shorter than 6 letters.
		rgbInHex = this.padding(rgbInHex.toString(16));
		
		//console.log("When opening the dialog RGB Color value converted in Hex");
		//console.log(rgbInHex)
		this.colorinput.style.backgroundColor = "#"+rgbInHex;
		this.colorinput.style.color = "#"+rgbInHex;
		this.colorinput.value = this.sceneNode.keys[k];
	    }
	    else if(k == "frame_id"){
		// Populate the dropdown list with existing TFs
		this.populateTFList();
	    }
	    else if(k == "topic"){
		// Populate the dropdown list with published topics
		this.populateTopicsList();
	    }
	    else{
		//console.log(this.name+'_'+k+'_input');
		document.getElementsByName(this.name+'_'+k+'_input')[0].value = this.sceneNode.keys[k];
	    }
	    //console.log(document.getElementsByName(name+'_'+k+'_input')[0]);
	    
	}

	

    },

    onClose: function(){
	// What to do?
    },

    onSave: function(){
	//console.log("Setting my redraw to 1 - I am the following scene node");
	//console.log(this.sceneNode);
	
	this.sceneNode.redraw=1;
	
	//this.sceneNode.resolution = Number($('#'+name+'_'+k+'properties_dialog input').val());
	//console.log(Number($('#'+name+'_properties_dialog input').val()));

	// Let's iterate through our textboxes and save their values into our variables
	for(var k in this.sceneNode.keys){


	    // Get the widget's attribute's type
	    var attrType = Object.prototype.toString.call(this.sceneNode.keys[k]).match(/^\[object (.*)\]$/)[1];
	    
	    
	    //eval('this.sceneNode.'+this.sceneNode.keys[k]+'='+document.getElementsByName(name+'_'+k+'_input')[0].value);		    
	    var my_eval_string = "this.sceneNode."+k+"=";
	    
	    //console.log(this.dialog_html);
	    //console.log("Spitting the current value of: "+this.name+"_"+k+"_input");
	    // console.log(document.getElementsByName(this.name+'_'+k+'_input'));
	    // console.log("ATTR NAME:");
	    // console.log(k);

	    if( attrType == "Array" ){

		//console.log("ATTR TYPE is Array");	

		my_eval_string = my_eval_string + "[" + document.getElementsByName(this.name+"_"+k+"_input")[0].value.toString() + "];";
		var my_array = document.getElementsByName(this.name+"_"+k+"_input")[0].value.split(",");
		// TODO We should check the array length in a smart way
		var key_value = [Number(my_array[0]),Number(my_array[1]),Number(my_array[2])];
		
	    }
	    else if(attrType == "String" || attrType == "Boolean"){
		//console.log("ATTR TYPE is String");
		
		my_eval_string = my_eval_string +"\"" +document.getElementsByName(this.name+"_"+k+"_input")[0].value.toString() +"\";";
		var key_value = document.getElementsByName(this.name+"_"+k+"_input")[0].value.toString();
	    }
	    else if(attrType == "Number") {
		//console.log("ATTR TYPE is Number");
		my_eval_string = my_eval_string + "Number("+document.getElementsByName(this.name+"_"+k+"_input")[0].value.toString() +");";
		var key_value = Number(document.getElementsByName(this.name+"_"+k+"_input")[0].value);
	    }	
	    
	    // console.log("Trying to evaluate the following:");
	    // console.log(attrType);
	    // console.log(my_eval_string);

	    // This will update the attributes of our visualization widget object
	    eval(my_eval_string);

	    // We should also update the keys of our visualization widget object
	    // Becasue this is where we read the key values from when we open
	    // the dialog
	    this.sceneNode.keys[k] = key_value;
	    
	}
    },
    
    onCancel: function(){
	// What to do?
    },

    populateTopicsList: function(){
	var that = this;

	// Create a service client
	var topicsClient = new this.sceneNode.vm.node.Service({
            name : '/rosapi/topics_for_type'
	    , serviceType : 'rosapi/TopicsForType'
	});
	
	// This is what we will send to /rosapi/topics_for_type service
	//console.log(that.sceneNode.msgType);
	
	var request = new this.sceneNode.vm.node.ServiceRequest({type: that.sceneNode.msgType});
	// Make the service call, get the list of published topics
	topicsClient.callService(request, function(response) {
	    
	    // This is the element we will populate with the topics published
	    var dropdown = document.getElementsByName(that.name+'_topic_dropdown')[0];

	    // Clear the list first
	    dropdown.options.length = 0;

	    var topics = response.topics;
	    
	    //console.log(topics);

	    for(var t=0; t < topics.length; t++){

		// For each topic found, create a new option element
		var opt = document.createElement('option');
		opt.setAttribute('value',topics[t]);
		opt.setAttribute('title',topics[t]);
		opt.innerHTML = topics[t];
		
		// And then append the option element to our list
		dropdown.appendChild(opt);
	    }

	    dropdown.addEventListener('click',that.updateTopicText.bind(that));
	});	
    },
    populateTFList: function(){

	var that = this;

	var tfsClient = new this.sceneNode.vm.node.Service({
            name : '/tf_lister/request_list'
	    , serviceType : 'tf_lister/TfLister'
	});

	// tf_lister/request_list service does not require any input argument.
	var request = new this.sceneNode.vm.node.Service({});
	
	tfsClient.callService(request, function(response) {	    
	    
	    // This is the element we will populate with the tfs published
	    var dropdown = document.getElementsByName(that.name+'_frame_id_dropdown')[0];

	    // Clear the list first
	    dropdown.options.length = 0;
	    
	    var tfs = response.tf_list;
	    	    
	    // Add all available TFs in the list
	    for(var f=0; f < tfs.length; f++){	

		// For each tf found, create a new option element
		var opt = document.createElement('option');
		opt.setAttribute('value',tfs[f]);
		opt.setAttribute('title',tfs[f]);
		opt.innerHTML = tfs[f];
		
		// And then append the option element to our list
		dropdown.appendChild(opt);
	    }

	    dropdown.addEventListener('click',that.updateTFText.bind(that));
	});
    },
    updateTFText: function(){
	
	// This is the element populated with the tfs available
	var dropdown = document.getElementsByName(this.name+'_frame_id_dropdown')[0];
	
	var textbox = document.getElementsByName(this.name+'_frame_id_input')[0];	
	textbox.value = dropdown.options[dropdown.selectedIndex].text;
	textbox.innerHTML = dropdown.options[dropdown.selectedIndex].text;
	
    },
    updateTopicText: function(){
	var dropdown = document.getElementsByName(this.name+'_topic_dropdown')[0];
	
	var textbox = document.getElementsByName(this.name+'_topic_input')[0];
	textbox.value = dropdown.options[dropdown.selectedIndex].text;
	textbox.innerHTML = dropdown.options[dropdown.selectedIndex].text;
	
    }
    
});
