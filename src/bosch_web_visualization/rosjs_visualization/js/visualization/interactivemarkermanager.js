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
/**
 * Class that manages interactive markers.
 * @class
 * @augments Class
 */
ros.visualization.InteractiveMarkerManager = Class.extend(
    /** @lends ros.visualization.InteractiveMarkerManager# */
    {
	/**
	 * Initialization function
	 * 
	 * @param vm visualization manager
	 * 
	 */	
	init: function(vm) {
	    this.vm = vm;
	    this.updateMap = new ros.Map();
	    this.updater = new ros.visualization.InteractiveMarkers.InteractiveMarkerUpdate(this.vm,this);
	},

	/**
	 * Function that subscribes to interactive marker topic on the server
	 * 
	 * @param imarker_topic
	 * 
	 */	
	subscribeInteractiveMarker: function(imarker_topic, callback, updaterOfTheSceneNode) {	    
	    var that = this;

	    // subscribe to interactive marker
	    //this.updater.subscribeInteractiveMarker(imarker_topic,callback);
	    updaterOfTheSceneNode.subscribeInteractiveMarker(imarker_topic,callback);
	  
	    //this.updateMap.insert(imarker_topic,this.updater);
	    this.updateMap.insert(imarker_topic,updaterOfTheSceneNode);

	},

	// When the user removes interactive markers from the visualization control panel this should be called
	// to clear all the scene nodes
	removeAllInteractiveMarkers: function(updaterOfTheSceneNode){
	    console.log("interactive marker manager says: I'm calling eraseAllMarkers method of the updater");
	    this.updater.eraseAllMarkers();
	    //updaterOfTheSceneNode.eraseAllMarkers();
	}

    });

