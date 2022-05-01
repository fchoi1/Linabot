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

ros.visualization_widgets.VisualizationWidgetManager=Class.extend({
    init:function(node, div_id){
	this.node=node;
	this.main_div_id=div_id;
	this.visualizations=new Array(new Array());
	this.visualization_hash=[];
	//this.visualization_index=0;
	this.counter=1;	
    },

    add:function(type, name){
	if(this.visualizations[0].length == 0){
	    this.visualizations[0]=[type, name];
	}
	else{
	    this.visualizations.push([type, name]);
	}
	    
	
	// We should do something smart here.
	// Such as counting how many instances of each type exists
	// then nicely incrementing / decrementing the current index etc.
	// available here
	if(type != "PropertiesWidget"){
	    this.counter++;
	}
	
	//ros_debug(type);
	//ros_debug(name);
	if(type == "PropertiesWidget"){
	    var vis_widget = new ros.visualization_widgets.PropertiesWidget();
	}
	else if(type == "CameraWidget"){
	    var vis_widget = new ros.visualization_widgets.CameraWidget();
	}
	else if(type == "SnapshotWidget"){
	    var vis_widget = new ros.visualization_widgets.SnapshotWidget();
	}
	
	//var vis_widget=new window[type];
	//console.log(vis_widget);
	//ros_debug("adding"+name+"in the visualization_hash array");	
	this.visualization_hash[name]=vis_widget;
	//console.log(this.visualization_hash[name]);
	//console.log(this.visualizations);
	return vis_widget;
    },
    
    remove: function(type, name){

	if(this.visualizations.length > 1 || this.visualizations[0].length !=0 ){
	    for (var i in this.visualizations){
		if(this.visualizations[i][0]==type && this.visualizations[i][1]==name){
		    this.visualizations.splice(i,1);
		}
				
		$(this.visualization_hash[name].dialog_html).dialog('close');
		this.visualization_hash[name]=[];
	    }
	}

	if(this.visualizations.length == 0){
	    this.visualizations = new Array(new Array());
	}
	    
    },
    
    getVisualizationWidgetByName:function(name){
	return this.visualization_hash[name];
    },

    getVisualizationParameterHtml:function(name){
	widget=this.visualization_hash[name];
	//ros_debug(widget)
	return widget.getParameterHtml();
    },
    
    getWidgetHtml:function(name){
	ros_debug("getHtml of: "+name);
	widget=this.visualization_hash[name];
	return widget.getHtml();
    },
    
    setupWidget:function(name){
	
	// Widget.name and name are the same. Which is confusing... What to do?
	var widget=this.visualization_hash[name];

	var my_widget_html = widget.getHtml(widget.name);

	// If the widget is not a properties widget, then open the dialog, else don't do anything
	if(widget.name.substring(widget.name.length-10,widget.name.length) != 'properties'){
	    
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
		    
		    //console.log($('#'+widget.name+'_dialog'));
		    widget.onClose();
		    $('#'+widget.name+'_dialog').remove();
		},
		taskbar: '#tabs',
		closeOnEscape: false,
		height: 'auto',
		width: 'auto',
		resizable: false
	    });
	}
	
	// This is triggered when the user clicks on, for example, Grid_1_properties button in Visualization Control Panel
	delete widget;
    },

    setupWidgets:function(){
	//ros_debug("SETUP WIDGETS IS CALLED AND THE FOLLOWING IS THE VIS. HASH");
	//console.log(this.visualizations.length);
	if(this.visualizations.length > 1 || this.visualizations[0].length !=0 ){
	    for (var i in this.visualizations){
		//ros_debug(i.toString()+"th visualization node is "+this.visualizations[i][1]);
		this.setupWidget(this.visualizations[i][1]);
	    }
	}
	
    },
    
    

});