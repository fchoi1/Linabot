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

function BinaryDecoder(endian) {
  // default precision and exponent.
  //this.precision = 23;
  //this.exponent = 8;
  this.is_bigendian = endian;

  this.toFloat = function(binary)
  {
    var i,j;
    var buffer = this.toCharCode(binary);
    
    //this.printCharCodeBinaryArray(buffer);
    var sign = 1 - (2 * (buffer[0] >> 7));
    var exponent = ((buffer[0] << 1 ) & 0xff | (buffer[1] >> 7)) - 127;
    var mantissa = ((buffer[1] & 0x7f) << 16) | (buffer[2] << 8) | buffer[3];

    if(mantissa == 0 && exponent == -127)
      return 0.0;

    return sign * (1 + mantissa * Math.pow(2,-23)) * Math.pow(2,exponent);
  }

  this.toInt = function(binary)
  {
    var b = this.toCharCode(binary);
    var str = this.printCharCodeBinaryArray(b);

    return parseInt(str,2);
  }

  this.toCharCode = function(binary) {
    var b = new Array(binary.length);

    for(var i =0; i < binary.length; i++) 
      b[i] = binary.charCodeAt(i);

    if(this.is_bigendian == false) 
      return b.reverse();
    else 
      return b;
  }

  this.printCharCodeBinaryArray = function(buffer) {
    var t = "";

    for(i = 0;i < buffer.length ; i++) {
      for(j =7 ;j >=0; j--) {
        var tt = buffer[i] >> j & 1;
        t = t + tt; 
      }
    }
    return t;
  }
}
