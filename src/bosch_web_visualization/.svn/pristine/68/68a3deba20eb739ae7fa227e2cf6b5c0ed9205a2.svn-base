/*******************************************************************************
 * 
 * Software License Agreement (BSD License)
 * 
 * Copyright (c) 2010, Robert Bosch LLC. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met: *
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer. * Redistributions in binary
 * form must reproduce the above copyright notice, this list of conditions and
 * the following disclaimer in the documentation and/or other materials provided
 * with the distribution. * Neither the name of the Robert Bosch nor the names
 * of its contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 * 
 ******************************************************************************/


ros.widgets.VisControlPanel = ros.widgets.Widget.extend({
    init: function(domobj) {
	this._super(domobj);
	
	var tool=['<button type="button" , id="vis_panel_open" style="width:100px;height:59px;"><center>Visualization Control Panel</center></button>'];
	
	this.jquery.append(tool.join(''));
	this.node=node;
	this.visualizationwidgetmanager=new ros.visualization_widgets.VisualizationWidgetManager(node, "vsw_visualizations");
	

	// This is the list of visualization options we show to our users 
	// Node or Widget types that are not supported are commented out for now
	this.displayoptions=[];
	this.displayoptions.push(['Axes', 'AxesNode']);
	this.displayoptions.push(['Camera', "CameraNode"]);
	//this.displayoptions.push(['Snapshot', "SnapshotNode"]);
	this.displayoptions.push(['Grid', "GridNode"]);
	//this.displayoptions.push(['GridCells', "GridCellsNode"]);
	//this.displayoptions.push(['Image', "ImageNode"]);
	this.displayoptions.push(['InteractiveMarker', "InteractiveMarkerNode"]);
	this.displayoptions.push(['LaserScan', "LaserScanNode"]);
	//this.displayoptions.push(['Map', "MapNode"]);
	this.displayoptions.push(['Marker', "MarkerNode"]);
	//this.displayoptions.push(['Path', "PathNode"]);
	//this.displayoptions.push(['Pose',"PoseNode"]);
	//this.displayoptions.push(['PoseArray', "PoseArrayNode"]);
	this.displayoptions.push(['PointCloud2', "PointCloud2Node"]);
	//this.displayoptions.push(['Polygon', "PolygonNode"]);
	//this.displayoptions.push(['Odometry', "OdometryNode"]);
	//this.displayoptions.push(['Range', "RangeNode"]);
	this.displayoptions.push(['RobotModel', "RobotModelNode"]);
	this.displayoptions.push(['TF', "TFNode"]);
	
	this.currentHtml= this.getInitialDisplayHtml();
	this.fixedframe='/odom_combined';
	this.targetframe=this.fixedframe;
	
	this.frameSelector=null;

	this.setUpCallBacks();
	
    },
    setVM:function(vm){
	this.vm=vm;
    },
    populateTFList: function(){

	var that = this;

	var tfsClient = new this.node.Service({
            name : '/tf_lister/request_list'
	    , serviceType : 'tf_lister/TfLister'
	});

	// tf_lister/request_list service does not require any input argument.
	var request = new this.node.Service({});
	
	tfsClient.callService(request, function(response) {	    
	        
	    // This is the element we will populate with the tfs published
	    var dropdown = document.getElementById('tfsDropdown');

	    // Clear the list first
	    dropdown.options.length = 0;
	    
	    // Scrape the list from the response
	    var tfs = response.tf_list;
	    	    
	    // Set a helper variable
	    var foundMatchingFrame = false;
	    
	    // Add all available TFs in the list
	    for(var f=0; f < tfs.length; f++){	

		// For each tf found, create a new option element
		var opt = document.createElement('option');
		opt.setAttribute('value',tfs[f]);
		opt.setAttribute('title',tfs[f]);
		opt.innerHTML = tfs[f];
		
		// And then append the option element to our list
		dropdown.appendChild(opt);

		// Check if the hard-coded fixed frame is equal to this specific option
		// If it is, then set the index to show to the user
		if(tfs[f] == that.fixedframe){
		    dropdown.selectedIndex = f;
		    foundMatchingFrame = true;
		}
	    }

	    // If the hard-coded frame was found in the list then no problem
	    // Else, let's set the fixed frame to the first item in the list
	    if(!foundMatchingFrame){
		dropdown.selectedIndex = 0;
		this.fixedframe=dropdown.options[0].value;
		this.targetframe=this.fixedframe;
	    }

	    dropdown.addEventListener('click',that.chooseFixedFrame.bind(that));
	});
    },
    chooseFixedFrame: function(){
	var tfs = document.getElementById("tfsDropdown").options;
	var i = document.getElementById("tfsDropdown").selectedIndex;
	//console.log("Your current fixed frame is...");
	//console.log(tfs[i].value);
	
	this.fixedframe=tfs[i].value;
	this.targetframe=this.fixedframe;
	
    },
    setUpCallBacks:function(){
	var that=this;
	
	jQuery('#vis_panel_open').click(function(e){

	    that.populateTFList();

	    htmltext=that.currentHtml;//that.getDisplayHtml()
	    $("#visualizations").html(htmltext);
	    
	    // Bind the 'Add Display' button to it's function
	    var addButton = document.getElementById('addDisplayBtn');
	    if(addButton !== null){
	     	addButton.addEventListener('click',that.addDisplay.bind(that));
	    }
	    
	    // Bind the double-click event to it's function (double-clicking on the list element opens the properties dialog).
	    var selectableDisplayList = document.getElementById('selectable_vis_list');
	    
	    if(selectableDisplayList !== null){
	     	selectableDisplayList.addEventListener('dblclick', that.openProperties.bind(that));
	    }

	    that.visualizationwidgetmanager.setupWidgets();

	    //set up the callbacks for the new HTML
	    $('#selectable_vis_list').selectable({
		selected: function(event,ui){
		    name=$(this).find('.ui-selected').attr('id');
		    //text=that.visualizationwidgetmanager.getVisualizationParameterHtml(name);
		    //ros_debug(name)
		    //ros_debug(text)
		    //$('#visualization_parameters').html(text);
		    that.selectedname=name;
		}
	    });
	    

	    $('#applyBtn').click(function(e){
		// Here we need to check if the user changed the properties of
		// existing visualization nodes. The ones that have been
		// changed should have their redraw attribute set to 1.
		// 
		// If redraw is 1 then we keep the widget (i.e. don't delete the object
		// itself) but trigger the sceneviewer to destroy its mesh and reload
		// the object into the scene.
		
		$('#selectable_vis_list li').each(function(index, element){
		    var name = $(element).attr('id');
		    var sn = that.vm.getSceneNodeByName(name);
		    // The user clicked on Close button of the control panel, let's update our attributes
		    //console.log("Visualization Control Panel says, you added the following scene node object:");
		    //console.log(sn);
		    if( sn.redraw == 1 ){
			
			//ros_debug("Redrawing the mesh");

			if(sn.model !== null && sn.model !== undefined){
			    //console.log("Destroying the mesh for");
			    //console.log(sn);
			    sn.model.mesh.destroy();
			}

			for(var k in sn.keys){
			    if(k == "frame_id"){
				sn.setFrame(sn.keys[k]);
				that.vm.scene_viewer.updateNode(sn);
			    }
			    else if(k == "topic"){
				if(sn.oldTopic != sn.topic){
				    sn.changeTopic(sn.topic);
				}
			    }
			    else if(k == "robotDescription"){
				if(sn.oldRobotDescription != sn.robotDescription){
				    sn.changeDescription(sn.robotDescription);
				}
			    }
			    else if(k == "scaleFactor"){
				// update the scale factor
				if(sn.oldScaleFactor != sn.scaleFactor){
				    sn.changeScale(sn.scaleFactor);
				}
			    }
			    else if(k == "scale"){
				// If you find the string Axes in the name of this scene node
				// Well, then it is an Axes node :)
				// if(sn.name.indexOf("Axes") != -1){
				//     // Axes node's children have meshArrows. Destroy them and load again to refresh the scene
				//     for(var c=0; c < sn.children.length; c++){
				// 	console.log("Destroying meshes of the axes node");
				// 	sn.children[c].model.meshArrow.destroy();
				//     }
				// }
			    }
			    else if(k == "host"){
				sn.changeUri();
			    }
			    else{
				if(sn.model !== null && sn.model !== undefined){
				    eval('sn.model.'+k+'=sn.'+k);
				}
			    }
			}
			
			if(sn.model != null || sn.model != undefined){
			    sn.model.load();
			}
			
				
			// We drew the visualization node, reset the flag
			//console.log("Vis Cont Panel - Setting my redraw to 0 - I am the following scene node");
			//console.log(this.sceneNode);
			sn.redraw = 0;
		    }
		    
		});
		
		$( "#visualization_dialog" ).dialog('close');
	    });    
	    
	    	    
	    //Code to remove a visualization type
	    jQuery('#removeDisplayBtn').click(function(e){
		
		// This is the name of the visualization node we would like to remove
		selectedvalue=$("#vsw_selected_name").val();
		
		//ros_debug(that.selectedname);
		
		// Following will remove the list items from the Vis. Select Window
		// the one in the left column
		$('#' + that.selectedname).remove();
		
		// the one in the right column
		$('#' + that.selectedname + "_properties").remove();

		// From here down we just delete the elements we inserted or added
		// in the callback function of the add button
		
		// For consistency, let's do things in the reverse order we added them

		// Get the handle of the scene node we want to remove
		var sn = that.vm.getSceneNodeByName(that.selectedname);
		
		// First let's remove the button html from the visualization_parameters div.
		// In order to do that, we need to get the handle for that widget
		var my_prop_widget = that.visualizationwidgetmanager.getVisualizationWidgetByName(that.selectedname+"_properties");
		
		// Unsubscribe from the topics if any
		for(var k in sn.keys){
		   if(k == "topic"){
		       //console.log("UNSUBSCRIBING FROM THE TOPIC ON REMOVE");
		       //sn.model.node.unsubscribe(sn.topic, function(msg){ that.updateFromMessage(msg)});
		       sn.unsub();
		   }
		}
		
		// Let's remove the visualization node from the scene viewer
		that.vm.removeVisualizationNode(sn);
		
		// Finally let's remove the widgets from the vis. widget manager
		// The scene node may have a widget, if so, remove that first
		if(sn.hasWidget != undefined && sn.hasWidget != null){
		    if(sn.hasWidget == true){
			//console.log("Scene node has a widget. Removing.");
			//console.log(sn.widget.type);
			//console.log(sn.widget.name);
			that.visualizationwidgetmanager.remove(sn.widget.type,sn.widget.name);
		    }
		}
		//
		// We also know that the scene node has a properties widget, so remove that too.
		that.visualizationwidgetmanager.remove(my_prop_widget.type,that.selectedname+"_properties");		
		
		
		// Lets try deleting the widget's sceneNode and see if we get rid of its callbacks
		delete sn;
		
		// Store the modified html in the variable for when we shall
		// open the Vis. Control Panel		
		that.currentHtml=$("#visualizations").html();
	    });
	    
	    $( "#visualization_dialog" ).dialog({ 
		closeOnEscape: false,
		height: 'auto',  
		width: 'auto', 
		resizable: 'false'
	    });
	    
	});	
    },
    addDisplay: function(){
	var displays = document.getElementById("addDisplayDropdown").options;
	var i = document.getElementById("addDisplayDropdown").selectedIndex;
	//console.log("You chose to add an item...");
	//console.log(displays[i].value);

	// Get the type of the display
	type = displays[i].value + 'Node';

	// Get the name of the selected visualization node
	name = displays[i].value + '_' + this.vm.counter;
	
	// Add the name in the left column of the table. 
	$('#selectable_vis_list').append('<li class="ui-widget-content" id="' +name+'" >'+ name + "</li>");
	
	//ros_debug("control panel says: type is " + type);
	//ros_debug("control panel says: name is " + name);
	
	// Finally let's add the object in the scene viewer
	// vm stands for visualization manager
	var sn = this.vm.addVisualizationNode(type,name);
	//ros_debug("control panel says: Scene Node is");
	//console.log(sn);

	// Scene nodes can have visualization widgets
	// For example, the CameraNode has a CameraWidget which is a dialog
	//
	// One should be careful about the difference between scene nodes and
	// widgets: scene nodes are managed by the "visualizationmanager.js"
	// whereas widgets are managed by the "visualization_widget_manager.js"
	//
	// Scene nodes are objects that we want to show to our user
	// Widgets are dialogs that pop for doing specific things
	// (including viewing camera feed for example);
	//
	// If the scene node has a widget
	if(sn.hasWidget != undefined && sn.hasWidget != null){
	    if(sn.hasWidget == true){
		
		// Debug
		//console.log("Scene node has a widget");

		// Get a handle to the widget
		var sn_widget = this.visualizationwidgetmanager.add(sn.widgetType,sn.name+"_widget");
		// Assign widget's name
		//console.log(sn_widget);
		//console.log(sn);
		sn_widget.name = sn.name + "_widget";
		

		// The following call basically gets the html of the widget and
		// either binds the html to a button or opens a dialog with it.
		this.visualizationwidgetmanager.setupWidget(sn_widget.name);

		// Finally keep the handle in the scene node as well.
		sn.widget = sn_widget;
	    }
	}
	
	// The node widget is added (e.g. GridWidget) and now
	// is the time to add a Properties widget that will handle
	// all the properties of that specific instance of, say, GridWidget.
	//
	// The following call increments the instance counter
	// pushes the widget type and name in the visualizations array
	// also keeps the instance of the widget in visualization_hash array
	var my_prop_widget = this.visualizationwidgetmanager.add("PropertiesWidget",name+"_properties");
	my_prop_widget.name = name + "_properties";

	// Which visualization widget's property will be set by this property widget?
	my_prop_widget.sceneNode = sn;
	var self = this;

	// If there is a topic attribute of the scene node exposed to users, then get the list of available topics from rosbridge
	for(var k in sn.keys){
	    if(k == "topic"){
		//console.log("This scene node has a topic attribute. Trying to get available topics");
		var f = function(topics){my_prop_widget.availableTopics = topics;};
		if(sn.model != null || sn.model != undefined){
		    sn.model.node.getTopics(f);
		}
	    }
	}
	
	
	// This is where we keep the html of the Vis. Control Panel
	// When click on the button and open it again, it should be
	// retrieved from this string variable
	this.currentHtml=$("#visualizations").html();
	
	// We're done adding.	
    },
    getInitialDisplayHtml:function(){
	
	var dialog_html = '';
	
	var dialog = document.createElement('div');
	dialog.setAttribute('id','main_container');
	dialog.setAttribute('title','Visualization Control Panel');
	
	var css = document.createElement('style');
	css.type = 'text/css';
	css.innerHTML = '#feedback {font-size: 1.2em;} #selectable_vis_list .ui-selecting {background: silver;} #selectable_vis_list .ui-selected {background: gray;color: white;} #selectable_vis_list { list-style-type: none; margin: 0; padding: 0; width: 100%; float: left;} #selectable_vis_list li { margin: 3px; padding: 0.4em; font-size: 1.0em; height: 18px; } #vsw_add_selector_div{overflow:hidden;display:inline-block;} #optLabel {width: 90px; height: 22px; float: left; margin-top: 2px;} #tfsDropdown {width: 160px; float: left;} #addDisplayDropdown {width: 160px; float: left;} #upperContFixedFrame { width: 310px; height: 23px;} #upperContAddDisplay { width: 310px; height: 23px;} #midCont {width: 310px; padding-top: 10px; text-align: center;} #lowerCont { width: 310px; height: 25px; text-align: center; float: left; padding-top: 10px;}';
	
	dialog.appendChild(css);

	var upperContainerFixedFrame = document.createElement('div');
	upperContainerFixedFrame.setAttribute('id','upperContFixedFrame');

	var upperContainerAddDisplay = document.createElement('div');
	upperContainerAddDisplay.setAttribute('id','upperContAddDisplay');	
	
	var ffLabel = document.createElement('div');
	ffLabel.setAttribute('id','optLabel');
	ffLabel.innerHTML = 'Fixed Frame';

	var addLabel = document.createElement('div');
	addLabel.setAttribute('id','optLabel');
	addLabel.innerHTML = 'Display Type';

	var tfsDropdown = document.createElement('select');
	tfsDropdown.setAttribute('id','tfsDropdown');
	
	var addDisplayDropdown = document.createElement('select');
	addDisplayDropdown.setAttribute('id','addDisplayDropdown');

	// Populate the addItemDropdown List.
	for(var i=0; i < this.displayoptions.length; i++) {
	    // For each item in the list new option element
	    var opt = document.createElement('option');
	    opt.setAttribute('value',this.displayoptions[i][0]);
	    opt.setAttribute('title',this.displayoptions[i][0]);
	    opt.innerHTML = this.displayoptions[i][0];
	    
	    // And then append the option element to our list
	    addDisplayDropdown.appendChild(opt);
	}


	var addButton = document.createElement('input');
	addButton.setAttribute('type','button');
	addButton.setAttribute('id','addDisplayBtn');
	addButton.setAttribute('value','Add');
	
	upperContainerFixedFrame.appendChild(ffLabel);
	upperContainerFixedFrame.appendChild(tfsDropdown);
	upperContainerAddDisplay.appendChild(addLabel);
	upperContainerAddDisplay.appendChild(addDisplayDropdown);
	upperContainerAddDisplay.appendChild(addButton);
	dialog.appendChild(upperContainerFixedFrame);
	dialog.appendChild(upperContainerAddDisplay);

	var midContainer = document.createElement('div');
	midContainer.setAttribute('id','midCont');

	var selectableDisplayList = document.createElement('div');
	selectableDisplayList.setAttribute('id','selectable_vis_list');
	
	var displayPropertiesList = document.createElement('div');
	displayPropertiesList.setAttribute('id','visualization_parameters');
	
	midContainer.appendChild(selectableDisplayList);
	dialog.appendChild(midContainer);
	
	var lowerContainer = document.createElement('div');
	lowerContainer.setAttribute('id','lowerCont');
	
	var removeButton = document.createElement('input');
	removeButton.setAttribute('type','button');
	removeButton.setAttribute('id','removeDisplayBtn');
	removeButton.setAttribute('value','Remove');

	var applyButton = document.createElement('input');
	applyButton.setAttribute('type','button');
	applyButton.setAttribute('id','applyBtn');
	applyButton.setAttribute('value','Apply');

	lowerContainer.appendChild(removeButton);
	lowerContainer.appendChild(applyButton);
	dialog.appendChild(lowerContainer);
		
	//return htmlstring;
	return dialog;
    },
    openProperties: function(){
	//console.log('double clicked on '+$('#selectable_vis_list').find('.ui-selected').attr('id'));
	var displayName = $('#selectable_vis_list').find('.ui-selected').attr('id');
	//console.log(displayName);
	var propName = displayName + '_properties';
	//console.log(propName);
	var widget = this.visualizationwidgetmanager.visualization_hash[propName];
	//console.log(widget);
	var my_widget_html = widget.getHtml(propName);
	$(my_widget_html).dialog({
	    open: function(event, ui) {

		widget.onOpen();

		// saveID and cancelID are widget's buttons' ids.
		jQuery('#'+widget.saveID).click(function(e){
		    //console.log("Clicked on save");
		    //console.log(widget);
		    widget.onSave();
		    $('#'+widget.name+'_dialog').dialog('close');
		});
		
		jQuery('#'+widget.cancelID).click(function(e){
		    //console.log("Clicked on cancel");
		    widget.onCancel();
		    $('#'+widget.name+'_dialog').dialog('close');
		});
		
	    },
	    beforeClose: function(event, ui) {
		// This is called when the user clicks on the X at the top-right corner
		// Note that jQuery holds the state of the DOM and if we don't remove
		// the dialog div's html from the DOM, its callbacks are only set-up
		// once when we open it first. However if we remove it whenever we close
		// and re-create every time we open it, callbacks are set up properly.
		widget.onClose();
		//console.log($('#'+widget.name+'_dialog'));
		$('#'+widget.name+'_dialog').remove();
	    },
	    closeOnEscape: false,
	    height: 'auto',
	    width: 'auto',
	    resizable: false
	});
    },
});
