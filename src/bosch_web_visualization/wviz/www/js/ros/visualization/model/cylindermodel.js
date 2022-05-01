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

ros.visualization.CylinderModel = ros.visualization.Model.extend({
    init: function(gl, shader_manager, radius, latitudeBands, longitudeBands) 
    {
	this._super(gl, shader_manager);
	this.prog = shader_manager.shaderPrograms[shader_manager.ShaderTypes.FLAT];
	this.renderer = new SglMeshGLRenderer(this.prog);
	
	this.radius = 0.5;
	this.latitudeBands = 10;
	this.longitudeBands = 10;
	
	var n = arguments.length;
	
	if(n == 3) {
	    this.radius = radius;
	} 
	
	if(n == 5) {
	    this.radius = radius;
	    this.latitudeBands = latitudeBands;
	    this.longitudeBands = longitudeBands;
	} 
	
	this.name = "Cylinder Model";

	var cylinder_vertices = [
	    0.5,0.5,1.77483e-17,
	    0.46194,0.5,-0.191342,
	    0.46194,0.5,0.191342,
	    0.46194,0.5,-0.191342,
	    0.353553,0.5,-0.353553,
	    0.353553,0.5,0.353553,
	    0.46194,0.5,-0.191342,
	    0.353553,0.5,0.353553,
	    0.46194,0.5,0.191342,
	    0.353553,0.5,-0.353553,
	    0.191342,0.5,-0.46194,
	    0.191342,0.5,0.46194,
	    0.353553,0.5,-0.353553,
	    0.191342,0.5,0.46194,
	    0.353553,0.5,0.353553,
	    0.191342,0.5,-0.46194,
		-1.16132e-16,0.5,-0.5,
	    6.32903e-18,0.5,0.5,
	    0.191342,0.5,-0.46194,
	    6.32903e-18,0.5,0.5,
	    0.191342,0.5,0.46194,
		-1.16132e-16,0.5,-0.5,
		-0.191342,0.5,-0.46194,
		-0.191342,0.5,0.46194,
		-1.16132e-16,0.5,-0.5,
		-0.191342,0.5,0.46194,
	    6.32903e-18,0.5,0.5,
		-0.191342,0.5,-0.46194,
		-0.353553,0.5,-0.353553,
		-0.353553,0.5,0.353553,
		-0.191342,0.5,-0.46194,
		-0.353553,0.5,0.353553,
		-0.191342,0.5,0.46194,
		-0.353553,0.5,-0.353553,
		-0.46194,0.5,-0.191342,
		-0.46194,0.5,0.191342,
		-0.353553,0.5,-0.353553,
		-0.46194,0.5,0.191342,
		-0.353553,0.5,0.353553,
		-0.46194,0.5,-0.191342,
		-0.5,0.5,7.89786e-17,
		-0.46194,0.5,0.191342,
	    0.46194,-0.5,0.191342,
	    0.353553,-0.5,0.353553,
	    0.353553,-0.5,-0.353553,
	    0.46194,-0.5,0.191342,
	    0.353553,-0.5,-0.353553,
	    0.46194,-0.5,-0.191342,
	    0.46194,-0.5,0.191342,
	    0.46194,-0.5,-0.191342,
	    0.5,-0.5,-4.3482e-17,
	    0.353553,-0.5,0.353553,
	    0.191342,-0.5,0.46194,
	    0.191342,-0.5,-0.46194,
	    0.353553,-0.5,0.353553,
	    0.191342,-0.5,-0.46194,
	    0.353553,-0.5,-0.353553,
	    0.191342,-0.5,0.46194,
	    6.32903e-18,-0.5,0.5,
		-1.16132e-16,-0.5,-0.5,
	    0.191342,-0.5,0.46194,
		-1.16132e-16,-0.5,-0.5,
	    0.191342,-0.5,-0.46194,
	    6.32903e-18,-0.5,0.5,
		-0.191342,-0.5,0.46194,
		-0.191342,-0.5,-0.46194,
	    6.32903e-18,-0.5,0.5,
		-0.191342,-0.5,-0.46194,
		-1.16132e-16,-0.5,-0.5,
		-0.191342,-0.5,0.46194,
		-0.353553,-0.5,0.353553,
		-0.353553,-0.5,-0.353553,
		-0.191342,-0.5,0.46194,
		-0.353553,-0.5,-0.353553,
		-0.191342,-0.5,-0.46194,
		-0.353553,-0.5,0.353553,
		-0.46194,-0.5,0.191342,
		-0.46194,-0.5,-0.191342,
		-0.353553,-0.5,0.353553,
		-0.46194,-0.5,-0.191342,
		-0.353553,-0.5,-0.353553,
		-0.46194,-0.5,0.191342,
		-0.5,-0.5,1.77483e-17,
		-0.46194,-0.5,-0.191342,
	    0.5,-0.5,-4.3482e-17,
	    0.46194,-0.5,-0.191342,
	    0.46194,0.5,-0.191342,
	    0.46194,0.5,-0.191342,
	    0.5,0.5,1.77483e-17,
	    0.5,-0.5,-4.3482e-17,
	    0.46194,-0.5,-0.191342,
	    0.353553,-0.5,-0.353553,
	    0.353553,0.5,-0.353553,
	    0.353553,0.5,-0.353553,
	    0.46194,0.5,-0.191342,
	    0.46194,-0.5,-0.191342,
	    0.353553,-0.5,-0.353553,
	    0.191342,-0.5,-0.46194,
	    0.191342,0.5,-0.46194,
	    0.191342,0.5,-0.46194,
	    0.353553,0.5,-0.353553,
	    0.353553,-0.5,-0.353553,
	    0.191342,-0.5,-0.46194,
		-1.16132e-16,-0.5,-0.5,
		-1.16132e-16,0.5,-0.5,
		-1.16132e-16,0.5,-0.5,
	    0.191342,0.5,-0.46194,
	    0.191342,-0.5,-0.46194,
		-1.16132e-16,-0.5,-0.5,
		-0.191342,-0.5,-0.46194,
		-0.191342,0.5,-0.46194,
		-0.191342,0.5,-0.46194,
		-1.16132e-16,0.5,-0.5,
		-1.16132e-16,-0.5,-0.5,
		-0.191342,-0.5,-0.46194,
		-0.353553,-0.5,-0.353553,
		-0.353553,0.5,-0.353553,
		-0.353553,0.5,-0.353553,
		-0.191342,0.5,-0.46194,
		-0.191342,-0.5,-0.46194,
		-0.353553,-0.5,-0.353553,
		-0.46194,-0.5,-0.191342,
		-0.46194,0.5,-0.191342,
		-0.46194,0.5,-0.191342,
		-0.353553,0.5,-0.353553,
		-0.353553,-0.5,-0.353553,
		-0.46194,-0.5,-0.191342,
		-0.5,-0.5,1.77483e-17,
		-0.5,0.5,7.89786e-17,
		-0.5,0.5,7.89786e-17,
		-0.46194,0.5,-0.191342,
		-0.46194,-0.5,-0.191342,
		-0.5,-0.5,1.77483e-17,
		-0.46194,-0.5,0.191342,
		-0.46194,0.5,0.191342,
		-0.46194,0.5,0.191342,
		-0.5,0.5,7.89786e-17,
		-0.5,-0.5,1.77483e-17,
		-0.46194,-0.5,0.191342,
		-0.353553,-0.5,0.353553,
		-0.353553,0.5,0.353553,
		-0.353553,0.5,0.353553,
		-0.46194,0.5,0.191342,
		-0.46194,-0.5,0.191342,
		-0.353553,-0.5,0.353553,
		-0.191342,-0.5,0.46194,
		-0.191342,0.5,0.46194,
		-0.191342,0.5,0.46194,
		-0.353553,0.5,0.353553,
		-0.353553,-0.5,0.353553,
		-0.191342,-0.5,0.46194,
	    6.32903e-18,-0.5,0.5,
	    6.32903e-18,0.5,0.5,
	    6.32903e-18,0.5,0.5,
		-0.191342,0.5,0.46194,
		-0.191342,-0.5,0.46194,
	    6.32903e-18,-0.5,0.5,
	    0.191342,-0.5,0.46194,
	    0.191342,0.5,0.46194,
	    0.191342,0.5,0.46194,
	    6.32903e-18,0.5,0.5,
	    6.32903e-18,-0.5,0.5,
	    0.191342,0.5,0.46194,
	    0.191342,-0.5,0.46194,
	    0.353553,-0.5,0.353553,
	    0.353553,-0.5,0.353553,
	    0.353553,0.5,0.353553,
	    0.191342,0.5,0.46194,
	    0.353553,-0.5,0.353553,
	    0.46194,-0.5,0.191342,
	    0.46194,0.5,0.191342,
	    0.46194,0.5,0.191342,
	    0.353553,0.5,0.353553,
	    0.353553,-0.5,0.353553,
	    0.46194,-0.5,0.191342,
	    0.5,-0.5,-4.3482e-17,
	    0.5,0.5,1.77483e-17,
	    0.5,0.5,1.77483e-17,
	    0.46194,0.5,0.191342,
	    0.46194,-0.5,0.191342
	];

	var cylinder_normals = [
		-0,1,0,
		-0,1,0,
		-0,1,0,
		-0,1,0,
		-0,1,0,
		-0,1,0,
	    0,1,0,
	    0,1,0,
	    0,1,0,
		-0,1,0,
		-0,1,0,
		-0,1,0,
	    0,1,0,
	    0,1,0,
	    0,1,0,
		-0,1,0,
		-0,1,0,
		-0,1,0,
	    0,1,0,
	    0,1,0,
	    0,1,0,
	    0,1,0,
	    0,1,0,
	    0,1,0,
	    0,1,0,
	    0,1,0,
	    0,1,0,
	    0,1,0,
	    0,1,0,
	    0,1,0,
	    0,1,0,
	    0,1,0,
	    0,1,0,
	    0,1,0,
	    0,1,0,
	    0,1,0,
	    0,1,0,
	    0,1,0,
	    0,1,0,
	    0,1,0,
	    0,1,0,
	    0,1,0,
	    0,-1,0,
	    0,-1,0,
	    0,-1,0,
		-0,-1,0,
		-0,-1,0,
		-0,-1,0,
		-0,-1,0,
		-0,-1,0,
		-0,-1,0,
	    0,-1,0,
	    0,-1,0,
	    0,-1,0,
		-0,-1,0,
		-0,-1,0,
		-0,-1,0,
	    0,-1,0,
	    0,-1,0,
	    0,-1,0,
		-0,-1,0,
		-0,-1,0,
		-0,-1,0,
	    0,-1,0,
	    0,-1,0,
	    0,-1,0,
	    0,-1,0,
	    0,-1,0,
	    0,-1,0,
	    0,-1,0,
	    0,-1,0,
	    0,-1,0,
	    0,-1,0,
	    0,-1,0,
	    0,-1,0,
	    0,-1,0,
	    0,-1,0,
	    0,-1,0,
	    0,-1,0,
	    0,-1,0,
	    0,-1,0,
	    0,-1,0,
	    0,-1,0,
	    0,-1,0,
	    0.980785,0,-0.19509,
	    0.980785,0,-0.19509,
	    0.980785,0,-0.19509,
	    0.980785,1.19454e-17,-0.19509,
	    0.980785,1.19454e-17,-0.19509,
	    0.980785,1.19454e-17,-0.19509,
	    0.83147,0,-0.55557,
	    0.83147,0,-0.55557,
	    0.83147,0,-0.55557,
	    0.83147,0,-0.55557,
	    0.83147,0,-0.55557,
	    0.83147,0,-0.55557,
	    0.55557,0,-0.83147,
	    0.55557,0,-0.83147,
	    0.55557,0,-0.83147,
	    0.55557,0,-0.83147,
	    0.55557,0,-0.83147,
	    0.55557,0,-0.83147,
	    0.19509,0,-0.980785,
	    0.19509,0,-0.980785,
	    0.19509,0,-0.980785,
	    0.19509,0,-0.980785,
	    0.19509,0,-0.980785,
	    0.19509,0,-0.980785,
		-0.19509,-0,-0.980785,
		-0.19509,-0,-0.980785,
		-0.19509,-0,-0.980785,
		-0.19509,0,-0.980785,
		-0.19509,0,-0.980785,
		-0.19509,0,-0.980785,
		-0.55557,-0,-0.83147,
		-0.55557,-0,-0.83147,
		-0.55557,-0,-0.83147,
		-0.55557,0,-0.83147,
		-0.55557,0,-0.83147,
		-0.55557,0,-0.83147,
		-0.83147,-0,-0.55557,
		-0.83147,-0,-0.55557,
		-0.83147,-0,-0.55557,
		-0.83147,0,-0.55557,
		-0.83147,0,-0.55557,
		-0.83147,0,-0.55557,
		-0.980785,1.19454e-17,-0.19509,
		-0.980785,1.19454e-17,-0.19509,
		-0.980785,1.19454e-17,-0.19509,
		-0.980785,0,-0.19509,
		-0.980785,0,-0.19509,
		-0.980785,0,-0.19509,
		-0.980785,0,0.19509,
		-0.980785,0,0.19509,
		-0.980785,0,0.19509,
		-0.980785,-1.19454e-17,0.19509,
		-0.980785,-1.19454e-17,0.19509,
		-0.980785,-1.19454e-17,0.19509,
		-0.83147,0,0.55557,
		-0.83147,0,0.55557,
		-0.83147,0,0.55557,
		-0.83147,0,0.55557,
		-0.83147,0,0.55557,
		-0.83147,0,0.55557,
		-0.55557,0,0.83147,
		-0.55557,0,0.83147,
		-0.55557,0,0.83147,
		-0.55557,0,0.83147,
		-0.55557,0,0.83147,
		-0.55557,0,0.83147,
		-0.19509,0,0.980785,
		-0.19509,0,0.980785,
		-0.19509,0,0.980785,
		-0.19509,0,0.980785,
		-0.19509,0,0.980785,
		-0.19509,0,0.980785,
	    0.19509,0,0.980785,
	    0.19509,0,0.980785,
	    0.19509,0,0.980785,
	    0.19509,-0,0.980785,
	    0.19509,-0,0.980785,
	    0.19509,-0,0.980785,
	    0.55557,-0,0.83147,
	    0.55557,-0,0.83147,
	    0.55557,-0,0.83147,
	    0.55557,0,0.83147,
	    0.55557,0,0.83147,
	    0.55557,0,0.83147,
	    0.83147,0,0.55557,
	    0.83147,0,0.55557,
	    0.83147,0,0.55557,
	    0.83147,-0,0.55557,
	    0.83147,-0,0.55557,
	    0.83147,-0,0.55557,
	    0.980785,-1.19454e-17,0.19509,
	    0.980785,-1.19454e-17,0.19509,
	    0.980785,-1.19454e-17,0.19509,
	    0.980785,-0,0.19509,
	    0.980785,-0,0.19509,
	    0.980785,-0,0.19509
	];

	var cylinder_indices = [
	    0,1,2,
	    3,4,5,
	    6,7,8,
	    9,10,11,
	    12,13,14,
	    15,16,17,
	    18,19,20,
	    21,22,23,
	    24,25,26,
	    27,28,29,
	    30,31,32,
	    33,34,35,
	    36,37,38,
	    39,40,41,
	    42,43,44,
	    45,46,47,
	    48,49,50,
	    51,52,53,
	    54,55,56,
	    57,58,59,
	    60,61,62,
	    63,64,65,
	    66,67,68,
	    69,70,71,
	    72,73,74,
	    75,76,77,
	    78,79,80,
	    81,82,83,
	    84,85,86,
	    87,88,89,
	    90,91,92,
	    93,94,95,
	    96,97,98,
	    99,100,101,
	    102,103,104,
	    105,106,107,
	    108,109,110,
	    111,112,113,
	    114,115,116,
	    117,118,119,
	    120,121,122,
	    123,124,125,
	    126,127,128,
	    129,130,131,
	    132,133,134,
	    135,136,137,
	    138,139,140,
	    141,142,143,
	    144,145,146,
	    147,148,149,
	    150,151,152,
	    153,154,155,
	    156,157,158,
	    159,160,161,
	    162,163,164,
	    165,166,167,
	    168,169,170,
	    171,172,173,
	    174,175,176,
	    177,178,179
	];

	this.vertices = cylinder_vertices;
	this.indices  = cylinder_indices;
	this.normals = cylinder_normals;
    },
    
    load: function (callback, scene_viewer)
    { 

	
	
	// OLD MODEL BEGINS
	//
	// var numVertices = 0;
	
	// var vertexPositionData = [];
	// var normalData = [];
	// var textureCoordData = [];
	// for (var latNumber = 0; latNumber <= this.latitudeBands; latNumber++) {
	//     var theta = latNumber * Math.PI / this.latitudeBands;
	//     var sinTheta = Math.sin(theta);
	//     var cosTheta = Math.cos(theta);
	    
	//     for (var longNumber = 0; longNumber <= this.longitudeBands; longNumber++) {
	// 	var phi = longNumber * 2 * Math.PI / this.longitudeBands;
	// 	var sinPhi = Math.sin(phi);
	// 	var cosPhi = Math.cos(phi);
		
	// 	var x = cosPhi * sinTheta;
	// 	var y = cosTheta;
	// 	var z = sinPhi * sinTheta;
	// 	var u = 1- (longNumber / this.longitudeBands);
	// 	var v = latNumber / this.latitudeBands;
		
	// 	normalData.push(x);
	// 	normalData.push(y);
	// 	normalData.push(z);
	// 	textureCoordData.push(u);
	// 	textureCoordData.push(v);
	// 	vertexPositionData.push(this.radius * x);
	// 	vertexPositionData.push(this.radius * y);
	// 	vertexPositionData.push(this.radius * z);
	// 	numVertices = numVertices + 1;
	//     }
	// }
	
	// var indexData = [];
	// for (var latNumber = 0; latNumber < this.latitudeBands; latNumber++) {
	//     for (var longNumber = 0; longNumber < this.longitudeBands; longNumber++) {
	// 	var first = (latNumber * (this.longitudeBands + 1)) + longNumber;
	// 	var second = first + this.longitudeBands + 1;
	// 	indexData.push(first);
	// 	indexData.push(second);
	// 	indexData.push(first + 1);
		
	// 	indexData.push(second);
	// 	indexData.push(second + 1);
	// 	indexData.push(first + 1);
	//     }
	// }
	//
	//
	//
	// this.vertices = vertexPositionData;
	// this.indices = indexData;    
	//
  	// this.mesh = new SglMeshGL(this.gl);
  	// this.mesh.addVertexAttribute("position", 3, new Float32Array(vertexPositionData));
  	// this.mesh.addVertexAttribute("normal",   3, new Float32Array(normalData));
  	// this.mesh.addArrayPrimitives("vertices", 	  this.gl.POINTS, 0, numVertices);
  	// this.mesh.addIndexedPrimitives("triangles", this.gl.TRIANGLES, new Uint16Array(indexData));
	//
	// // update bounding box 
  	// this.updateBoundingBox(vertexPositionData);
	// OLD MODEL ENDS

	// NEW MODEL BEGINS	
 
  	this.mesh = new SglMeshGL(this.gl);
  	this.mesh.addVertexAttribute("position", 3, new Float32Array(this.vertices));
  	this.mesh.addVertexAttribute("normal",   3, new Float32Array(this.normals));
  	this.mesh.addArrayPrimitives("vertices", 	  this.gl.POINTS, 0, this.indices.length);
  	this.mesh.addIndexedPrimitives("triangles", this.gl.TRIANGLES, new Uint16Array(this.indices));
	
	this.updateBoundingBox(this.vertices);

	// NEW MODEL ENDS
  	
	var async = (callback) ? (true) : (false);
	if (async) {
	    callback(this);
	}
	
    },

    draw: function (gl, xform)
    {
	var color = [this.color[0] * this.highlightPass, this.color[1] * this.highlightPass , this.color[2] * this.highlightPass];
	var uniforms = { u_mvp : xform.modelViewProjectionMatrix , u_view_normal_mat : xform.viewSpaceNormalMatrix, u_color : color};
	sglRenderMeshGLPrimitives(this.mesh, "triangles", this.prog, null, uniforms);  
    },
    
});
