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
/**
 * @class ArrowModel
 * @brief Class for the model of an arrow.
 * @details (generally used when visualizing coordinate frames or markers).
 */
ros.visualization.ArrowModel = ros.visualization.Model.extend({
    init: function(gl, shader_manager) 
    {
	this._super(gl, shader_manager);
	this.prog = shader_manager.shaderPrograms[shader_manager.ShaderTypes.FLAT];
	this.renderer = new SglMeshGLRenderer(this.prog);
	this.scale = [3.0, 3.0, 1.0];
	this.name ="Arrow Model";
	this.cone = new ros.visualization.ConeModel(gl,shader_manager);
	this.cylinder = new ros.visualization.CylinderModel(gl,shader_manager);
	this.scaleCylinder([0.50,0.50,0.50]);
	this.scaleCone([0.75,0.50,0.75]);
	
    },
    scaleCone: function(scale){
	this.coneScale = scale;
	for(var i = 0; i < this.cone.vertices.length; i=i+3){
	    this.cone.vertices[i]=this.cone.vertices[i]*scale[0];
	    this.cone.vertices[i+1]=this.cone.vertices[i+1]*scale[1];
	    this.cone.vertices[i+2]=this.cone.vertices[i+2]*scale[2];
	}
	
    },
    scaleCylinder: function(scale){
	this.cylinderScale = scale;
	for(var i = 0; i < this.cylinder.vertices.length; i=i+3){
	    this.cylinder.vertices[i]=this.cylinder.vertices[i]*scale[0];
	    this.cylinder.vertices[i+1]=this.cylinder.vertices[i+1]*scale[1];
	    this.cylinder.vertices[i+2]=this.cylinder.vertices[i+2]*scale[2];
	}
    },
    load: function (callback, scene_viewer)
    {  
	var arrow_vertices = this.cone.vertices;
	var shifted_cone_vertices = this.cone.vertices;
	var shifted_cylinder_vertices = this.cylinder.vertices;

	// This is the amount of shift that will be caused by the height of the cone
	var delta_cone = 0;
	for(var i = 1; i < this.cone.vertices.length; i=i+3){
	    if(this.cone.vertices[i]>delta_cone){
		delta_cone = this.cone.vertices[i];
	    }
	}
	
	//console.log(delta_cone);

	// This is the amount of shift that will be caused by the height of the cylinder
	var delta_cylinder = 0;
	for(var i = 1; i < this.cylinder.vertices.length; i=i+3){
	    if(this.cylinder.vertices[i]>delta_cylinder){
		delta_cylinder = this.cylinder.vertices[i];
	    }
	}

	// We have to shift the cone by:
	// total_shift = delta_cone + (cylinder's height/2);
	for(var i = 1; i < this.cone.vertices.length; i=i+3){
	    shifted_cone_vertices[i] = this.cone.vertices[i] + delta_cone;
	}

	for(var i = 1; i < this.cylinder.vertices.length; i=i+3){
	    shifted_cylinder_vertices[i] = this.cylinder.vertices[i] + delta_cylinder/2;
	}
	
	//console.log(delta_cylinder);

	arrow_vertices = shifted_cone_vertices.concat(shifted_cylinder_vertices);	
	
	var arrow_indices = this.cone.indices;
	arrow_indices = arrow_indices.concat(this.cylinder.indices);
	for(var i = 0; i < this.cylinder.indices.length; i++){
	    arrow_indices[this.cone.indices.length + i] = arrow_indices[this.cone.indices.length + i] + this.cone.indices.length;
	}

	var arrow_normals = this.cone.normals;
	arrow_normals = arrow_normals.concat(this.cylinder.normals);
	
	this.vertices = arrow_vertices;
	this.indices  = arrow_indices;
	this.normals = arrow_normals;

  	this.meshArrow = new SglMeshGL(this.gl);
  	this.meshArrow.addVertexAttribute("position", 3, new Float32Array(this.vertices));
  	this.meshArrow.addVertexAttribute("normal",   3, new Float32Array(this.normals));
  	this.meshArrow.addArrayPrimitives("vertices", 	  this.gl.POINTS, 0, this.indices.length);
  	this.meshArrow.addIndexedPrimitives("triangles", this.gl.TRIANGLES, new Uint16Array(this.indices));
	
	this.updateBoundingBox(this.vertices);
  	
	var async = (callback) ? (true) : (false);
	if (async) {
	    callback(this);
	}
    },

    draw: function (gl, xform)
    {
	var color = [this.color[0] * this.highlightPass, this.color[1] * this.highlightPass , this.color[2] * this.highlightPass];

	var uniforms = { u_mvp : xform.modelViewProjectionMatrix , u_view_normal_mat : xform.viewSpaceNormalMatrix, u_color : color};
	sglRenderMeshGLPrimitives(this.meshArrow, "triangles", this.prog, null, uniforms);  
    },
});
