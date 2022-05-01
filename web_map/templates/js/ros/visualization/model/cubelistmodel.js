
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

ros.visualization.CubeListModel = ros.visualization.Model.extend({
    init: function(gl, shader_manager, cube_coordinates, scale) 
    {
	this._super(gl, shader_manager);
	this.prog_flat = shader_manager.shaderPrograms[shader_manager.ShaderTypes.FLAT];
	this.prog_simple = shader_manager.shaderPrograms[shader_manager.ShaderTypes.SIMPLE];

	
	this.radius = null;
	this.minExtent = null;
	this.maxExtend = null;
	
	this.points = cube_coordinates;
	
        this.minExtent = [-scale.x*1.5, -scale.y*1.5, -scale.z*1.5];
        this.maxExtend = [ scale.x*1.5,  scale.y*1.5,  scale.z*1.5];

	this.name = "Cube List Model";

	this.threshold = 1000;
	
	if(this.points.length>this.threshold){
	    this.bigCluster = true;
	}
	else{
	    this.bigCluster = false;
	}

	
	this.limit = this.points.length;

	// This parameter makes the loop skip every N cubes to improve the rendering speed.
	// If step_size is set to 9, only 1/10th of the cluster will be shown (if the cluster size is bigger than 
	// "this.threshold" variable.
	this.stepSize = 9;
	
    },
    setHighlightPass: function(pass)
    {

	//console.log("Cube list set highlight pass!");
	this.highlightPass = pass;
	var numPoints = this.points.length;
	var colors = [];
	for(var i=0, j=0, l=numPoints; i < l; i++) {
	    colors[j++] = 1.0;
	    colors[j++] = 0.0;
	    colors[j++] = 0.0;
	}
	this.mesh.addVertexAttribute("color", 3, new Float32Array(colors));
	
    },
    load: function (callback, scene_viewer)
    { 
	
	// Reset all drawing related variables
	this.vertices = [];
	this.vertexNormals = [];
	this.cubeTriangleIndices = [];
	this.cubeEdgeIndices = [];
	this.numOfCubes = 0;
	
	for(var p=0;p<this.limit-this.stepSize;p++){
	    
	    // j should be independent of p in case we want to skip some cubes for efficiency
	    var j = this.numOfCubes*24;
	    
	    if(this.bigCluster){
		// Then process only 1/(stepSize+1) of the points we have to improve the speed
		p=p+this.stepSize;
	    }
	    
	    var minx = (this.minExtent[0]*4)+this.points[p].x; // This will put the cube in front of the point instead of around the point
	    //var minx = this.minExtent[0]+this.points[p].x;
	    var miny = this.minExtent[1]+this.points[p].y;
	    var minz = this.minExtent[2]+this.points[p].z;
	    var maxx = (this.minExtent[0]*2)+this.points[p].x; // This will put the cube in front of the point instead of around the point
	    //var maxx = this.maxExtend[0]+this.points[p].x;
	    var maxy = this.maxExtend[1]+this.points[p].y;
	    var maxz = this.maxExtend[2]+this.points[p].z;

	    var latest_vertices = [
		// Front face
		minx, miny, maxz,
		maxx, miny, maxz,
		maxx, maxy, maxz,
		minx, maxy, maxz,

		// Back face
		minx, miny, minz,
		minx, maxy, minz,
		maxx, maxy, minz,
		maxx, miny, minz,

		// Top face
		minx, maxy, minz,
		minx, maxy, maxz,
		maxx, maxy, maxz,
		maxx, maxy, minz,

		// Bottom face
		minx, miny, minz,
		maxx, miny, minz,
		maxx, miny, maxz,
		minx, miny, maxz,

		// Right face
		maxx, miny, minz,
		maxx, maxy, minz,
		maxx, maxy, maxz,
		maxx, miny, maxz,

		// Left face
		minx, miny, minz,
		minx, miny, maxz,
		minx, maxy, maxz,
		minx, maxy, minz,
	    ];
	    
	    // Append our current cube's vertices to our big list of vertices
	    
	    this.vertices = this.vertices.concat(latest_vertices);

	    var vertexNormals = [
		// Front face
		0.0,  0.0,  1.0,
		0.0,  0.0,  1.0,
		0.0,  0.0,  1.0,
		0.0,  0.0,  1.0,

		// Back face
		0.0,  0.0, -1.0,
		0.0,  0.0, -1.0,
		0.0,  0.0, -1.0,
		0.0,  0.0, -1.0,

		// Top face
		0.0,  1.0,  0.0,
		0.0,  1.0,  0.0,
		0.0,  1.0,  0.0,
		0.0,  1.0,  0.0,

		// Bottom face
		0.0, -1.0,  0.0,
		0.0, -1.0,  0.0,
		0.0, -1.0,  0.0,
		0.0, -1.0,  0.0,

		// Right face
		1.0,  0.0,  0.0,
		1.0,  0.0,  0.0,
		1.0,  0.0,  0.0,
		1.0,  0.0,  0.0,

		// Left face
		-1.0,  0.0,  0.0,
		-1.0,  0.0,  0.0,
		-1.0,  0.0,  0.0,
		-1.0,  0.0,  0.0,
	    ];
	    
	    // Append vertex normals to our big list of vertex normals
	    this.vertexNormals = this.vertexNormals.concat(vertexNormals);
	    
	    var cubeTriangleIndices = [
		0+j, 1+j, 2+j, 0+j, 2+j, 3+j,    // Front face
		4+j, 5+j, 6+j, 4+j, 6+j, 7+j,    // Back face
		8+j, 9+j, 10+j,8+j, 10+j, 11+j,  // Top face
		12+j, 13+j, 14+j,   12+j, 14+j, 15+j, // Bottom face
		16+j, 17+j, 18+j,   16+j, 18+j, 19+j, // Right face
		20+j, 21+j, 22+j,   20+j, 22+j, 23+j  // Left face  
	    ];

	    // Append triangle indices to our big list of indices
	    this.cubeTriangleIndices = this.cubeTriangleIndices.concat(cubeTriangleIndices);

	    var cubeEdgeIndices = [
		0+j, 1+j,  1+j, 2+j,  2+j, 3+j,  3+j, 0+j,  0+j, 2+j, // Front face
		4+j, 5+j,  5+j, 6+j,  6+j, 7+j,  7+j, 4+j,  4+j, 6+j, // Back face
		8+j, 9+j,  9+j,10+j, 10+j,11+j, 11+j, 8+j,  8+j,10+j, // Top face
		12+j,13+j, 13+j,14+j, 14+j,15+j, 15+j,12+j, 12+j,14+j, // Bottom face
		16+j,17+j, 17+j,18+j, 18+j,19+j, 19+j,16+j, 16+j,18+j, // Right face
		20+j,21+j, 21+j,22+j, 22+j,23+j, 23+j,20+j, 20+j,22+j, // Left face
	    ];

	    // Append this cube's edge indices to our big list of edge indices
	    this.cubeEdgeIndices = this.cubeEdgeIndices.concat(cubeEdgeIndices);	    
		   
	    this.numOfCubes++;
	}

	this.indices = this.cubeTriangleIndices;
  	this.mesh = new SglMeshGL(this.gl);
  	this.mesh.addVertexAttribute("position",    3, new Float32Array(this.vertices));
  	this.mesh.addVertexAttribute("normal",      3, new Float32Array(this.vertexNormals));
  	this.mesh.addArrayPrimitives("vertices", 	  this.gl.POINTS, 0, this.numOfCubes*24);	
  	this.mesh.addIndexedPrimitives("triangles", this.gl.TRIANGLES, new Uint16Array(this.cubeTriangleIndices));
  	this.mesh.addIndexedPrimitives("edges",     this.gl.LINES, new Uint16Array(this.cubeEdgeIndices));	

	// update bounding box 
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
	
	var prog;
	if(this.light) {
	    prog = this.prog_flat; 
	}
	else {
	    prog = this.prog_simple;  
	}
	
	sglRenderMeshGLPrimitives(this.mesh, this.primitives, prog, null, uniforms);    
    },
    
    
});
