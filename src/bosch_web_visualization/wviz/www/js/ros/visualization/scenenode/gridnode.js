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

/**
 * @class GridNode
 * @brief Class that creates a Grid in the scene.
 */
ros.visualization.GridNode = ros.visualization.SceneNode.extend({
    /**
     * Constructor. Sets default values for the Grid object.
     * @param vm visualization manager. An instance of the class defined in rosjs_visualization/js/visualization/visualizationmanager.js.
     * @param args array of arguments to pass in. current_frame, size, resolution, and color.
     */
    init: function(vm,args) 
    {

	if(args.length == 4){
	    this.current_frame = args[0];
	    this.size = args[1];
	    this.resolution = args[2];
	    this.color = args[3];
	}
	else if(args.length == 3){
	    this.current_frame = args[0];
	    this.size = args[1];
	    this.resolution = args[2];
	    this.color = [0.0,0.0,0.3];
	}
	else{
	    
	    this.current_frame = "/odom_combined";
	    this.size = 10;
	    this.resolution = Math.random();
	    this.color = [Math.random(), Math.random(), Math.random()];
	}
	
	this._super(vm);      
	this.redraw=0;
	this.model = new ros.visualization.GridModel(vm.gl, vm.shader_manager, this.size, this.resolution, this.color);
	this.frame_id = this.current_frame;

	this.keys={"frame_id":this.frame_id, "size":this.size, "resolution":this.resolution,"color":this.color};
	this.name="";
    },
});