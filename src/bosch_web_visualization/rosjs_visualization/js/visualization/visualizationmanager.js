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

ros.visualization.VisualizationManager = Class.extend({
    init: function(canvas_name) {
	this.tf = null;
	this.node = null;
	this.canvas_name = canvas_name;
	this.scene_viewer = new ros.visualization.SceneViewer();
	this.marker_manager = new ros.visualization.MarkerManager(this);
	this.scene_node_hash=[];
	this.counter=1;
	RightContext.initialize(canvas_name);    
	sglRegisterLoadedCanvas(canvas_name, this.scene_viewer, 25.0);
    },
    initialize: function(node, tf) {
	this.node = node;
	this.tf = tf;
	this.scene_viewer.tf = tf;
	//this.scene_viewer.puppetInteractor.kinematicSrv = node.serviceClient("/get_pose");
	//this.scene_viewer.puppetInteractor.releaseSrv = node.serviceClient("/release_pose");
	this.gl = this.scene_viewer.ui.gl;
	this.shader_manager = new ros.visualization.ShaderManager(this.gl);
	this.interactive_marker_manager = new ros.visualization.InteractiveMarkerManager(this);
    },
    
    removeVisualizationNode: function(sceneNode) {
	// Some scene nodes have children and other internal nodes.
	// We have to make sure that they are removed from the scene_viewer appropriately
	//console.log("visualization manager says:");
	//console.log(sceneNode);
	if(sceneNode.msgType !== null && sceneNode.msgType !== undefined){
	    //console.log("msgType is not null or undefined");
	    if(sceneNode.msgType == "visualization_msgs/InteractiveMarker"){
		// Interactive Markers may have children. Let's make sure to remove all of them
		//console.log("we are trying to remove interactive markers");
		sceneNode.interactiveMarkerManager.removeAllInteractiveMarkers();
	    }
	    else{
		//console.log("removing something other than an interactive marker");
		// We use this block to remove nodes that are single
		this.scene_viewer.removeNodeByName(sceneNode);
	    }
	}
	else{
	    //console.log("removing something other than an interactive marker");
	    // We use this block to remove nodes that are single
	    this.scene_viewer.removeNodeByName(sceneNode);
	}
	
    },

    cleanTheScene: function() {
	//ros_debug("VM says: currentNodeId is "+this.scene_viewer.currentNodeId);
	for (var i=0;i <= this.scene_viewer.currentNodeId;i++){
	    this.scene_viewer.removeNode(i);
	}
	this.scene_viewer.currentNodeId=0;
    },

    addVisualizationNode: function(type,name){
	this.counter++;

	if(type=="GridNode"){
	    // the following returns the scene_node for the widget
	    var sn = this.addGrid();
	    this.scene_node_hash[name] = sn;
	    sn.name = name;
	    return sn;	    
	}
	else if(type=="PointCloud2Node"){
	    var sn = this.addPointCloud2();
	    this.scene_node_hash[name] = sn;
	    sn.name = name;
	    return sn;
	}
	else if(type=="LaserScanNode"){
	    var sn = this.addLaserScan();
	    this.scene_node_hash[name] = sn;
	    sn.name = name;
	    return sn;
	}
	else if(type=="MapNode"){
	    var sn = this.addMap();
	    this.scene_node_hash[name] = sn;
	    sn.name = name;
	    return sn;
	}
	else if(type=="RobotModelNode"){
	    var sn = this.addRobotModel();
	    this.scene_node_hash[name] = sn;
	    sn.name = name;
	    return sn;
	}
	else if(type=="TFNode"){
	    var sn = this.addTF();
	    this.scene_node_hash[name] = sn;
	    sn.name = name;
	    return sn;
	}
	else if(type=="AxesNode"){
	    var sn = this.addCoordinateFrame();
	    this.scene_node_hash[name] = sn;
	    sn.name = name;
	    return sn;
	}
	else if(type=="MarkerNode"){
	    var sn = this.addMarker();
	    this.scene_node_hash[name] = sn;
	    sn.name = name;
	    return sn;
	}
	else if(type=="InteractiveMarkerNode"){
	    var sn = this.addInteractiveMarker();
	    this.scene_node_hash[name] = sn;
	    sn.name = name;
	    return sn;
	}
	else if(type=="CameraNode"){
	    var sn = this.addCameraFeed();
	    this.scene_node_hash[name] = sn;
	    sn.name = name;
	    return sn;
	}
	else if(type=="SnapshotNode"){
	    var sn = this.addSnapshotFeed();
	    this.scene_node_hash[name] = sn;
	    sn.name = name;
	    return sn;
	}
    },

    addNode : function(node) {
	node.setVM(this);
	this.scene_viewer.addNode(node);
    },
    
    addCoordinateFrame: function(frame_id) {

	var scene_node = new ros.visualization.CoordinateFrameNode(this);
	
	// The following call orients the coordinate frame's axes.
	scene_node.setOrientation();	

	// If we are adding a coord. frame using the web interface then frame_id will be null	
	if(frame_id != null && frame_id != undefined){
	    scene_node.setFrame(frame_id);
	}
	
	this.scene_viewer.addNode(scene_node);
	
	return scene_node;
    },
    
    addMarker: function(marker_topic) {
	//console.log("Adding a marker");
	var scene_node = new ros.visualization.MarkerNode(this,arguments);
	return scene_node;
    },

    addInteractiveMarker: function(imarker_topic) {
	var scene_node = new ros.visualization.InteractiveMarkerNode(this,arguments);
	return scene_node;
    },
    
    addTF: function() {
	var tf_node = new ros.visualization.TFNode(this, this.tf);
	this.scene_viewer.addNode(tf_node);
	return tf_node;
    },
    
    addRobotModel: function(urdf_xml,alpha,scaleFactor) {
	// No need to check if the scaleFactor is passed in here. We check it in robotnode.js anyway.
	//console.log("addRobotModel - My scaleFactor is: "+scaleFactor);
	//var robot_node = new ros.visualization.RobotNode(this, urdf_xml,alpha,scaleFactor);	
	var robot_node = new ros.visualization.RobotNode(this, arguments);	
	robot_node.load();
	this.scene_viewer.addNodeWithoutLoading(robot_node);
	robot_node.setBoundingBoxEnable(true);
	return robot_node;
    },
    
    addGrid: function(frame_id, size, resolution, color) {	    	
	var scene_node = new ros.visualization.GridNode(this,arguments);
	this.scene_viewer.addNode(scene_node);
	scene_node.nodeId=this.scene_viewer.currentNodeId;
	return scene_node;
    },
    
    addVisualizationScene: function(scene_topic) {
	this.marker_manager.subscribeVisualizationScene(scene_topic);
    },

    addMap : function(frame_id,maptopic)
    {
	var scene_node = new ros.visualization.MapNode(this,arguments);
	this.scene_viewer.addNode(scene_node);
	scene_node.nodeId=this.scene_viewer.currentNodeId;
	return scene_node;

    },
    
    addBox: function(frame_id) {
	var scene_node = new ros.visualization.SceneNode(this);
	var box_model = new ros.visualization.BoxModel(this.gl, this.shader_manager, 0.05);

	scene_node.setModel(box_model);
	scene_node.setFrame(frame_id);

	this.scene_viewer.addNode(scene_node);
	return scene_node;
    },

    addCollada : function(frame_id,src) {
	var scene_node = new ros.visualization.SceneNode(this);
	var uri = src.replace("package://","resources/");
	var scene = {frame:frame_id, url:uri, specular:[0.0,0.0,0.0,0.0], eye:[0.0,0.0,4.0], alpha:1.0}; 
	var collada_model = new ros.visualization.ColladaModel(this.gl, this.shader_manager,scene); 
	
	scene_node.setModel(collada_model);
	scene_node.setFrame(frame_id);

	this.scene_viewer.addNode(scene_node);

	return scene_node;
    },

    
    addSphere: function(frame_id) {
	var scene_node = new ros.visualization.SceneNode(this);
	var sphere_model = new ros.visualization.SphereModel(this.gl, this.shader_manager, 0.05, 10, 10);

	scene_node.setModel(sphere_model);
	scene_node.setFrame(frame_id);

	this.scene_viewer.addNode(scene_node);
	return scene_node;
    },
    
    addArrow: function(frame_id) {
	var scene_node = new ros.visualization.SceneNode(this);
	var arrow_model = new ros.visualization.ArrowModel(this.gl, this.shader_manager);

	scene_node.setModel(arrow_model);
	scene_node.setFrame(frame_id);
	this.scene_viewer.addNode(scene_node);
	return arrow_model;
    },
    
    addPointCloud: function(pointcloud) {
	var scene_node = new ros.visualization.SceneNode(this, nodeId);
	var point_cloud_model = new ros.visualization.PointCloudModel(this.gl, this.shader_manager, pointcloud);

	scene_node.setModel(point_cloud_model);
	scene_node.setFrame(pointcloud.header.frame_id);
	this.scene_viewer.addNode(scene_node);
	return scene_node;
    },

    addPointCloud2: function(frame_id, pointcloudtopic) {
	var scene_node = new ros.visualization.PointCloud2Node(this,arguments);
	this.scene_viewer.addNode(scene_node);
	scene_node.nodeId=this.scene_viewer.currentNodeId;
	return scene_node;
    },                                                  

	
    addLaserScan: function(frame_id, laserscantopic) {

	var scene_node = new ros.visualization.LaserScanNode(this,arguments);
	this.scene_viewer.addNode(scene_node);
	scene_node.nodeId=this.scene_viewer.currentNodeId;
	return scene_node;
    },

    addCameraFeed: function(mjpeg_server, cameratopic){
	var scene_node = new ros.visualization.CameraNode(this,arguments);
	return scene_node;
    },
    addSnapshotFeed: function(mjpeg_server, cameratopic){
	var scene_node = new ros.visualization.SnapshotNode(this,arguments);
	return scene_node;
    },    
    getSceneNodeByName: function(name){
	//console.log("GETTING SCENE NODE BY NAME");
	//console.log(name);
	//console.log(this.scene_node_hash);
	//console.log(this.scene_node_hash[name]);
	return this.scene_node_hash[name];
    },
});
