/*********************************************************************
*
*  Copyright (c) 2009, Willow Garage, Inc.
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
*   * Neither the name of the Willow Garage nor the names of its
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
*  Authors: Sarah Osentoski, Robert Bosch LLC
*
*********************************************************************/
/* A wrapper for multiple instances of a given action, one for each arm in the system
* This function performs mapping from an arm_name to a action for that arm by adding a prefix and/or suffix to the name of the arm.

  For each arm, it also performs "wait on first use". When the action for a given arm name is first requested, it will wait for the action, then create the client and return it. 
  It also remembers the client, so that on subsequent calls the client is returned directly without additional waiting.
 */

ros.MultiArmActionWrapper=Class.extend({
	init:function(node, prefix, suffix, action_type){
	    this.clients=new Object();
	    this.prefix=prefix;
	    this.suffix=suffix;
	    this.action_spec=new ros.actionlib.ActionSpec(action_type);
	},

	client:function(arm_name, duration){
	    client_name=this.prefix + arm_name + this.suffix;
	  
	    //check to see if the client is already stored
	    
	    if(client_name in clients)
		return clients[client_name];
	    
	    
	    //The action was not already stored; create new action client and store it
	    newclient=new ros.actionlib.SimpleActionClient(node, client_name, action_spec);
	    newclient.wait_for_server(duration, function(e){
		    if(!e) {
			log("Couldn't find action server.");
			return false;
		    }
		});
	    
	    this.clients[client_name]=newclient;
	    
	    return newclient;
	    
	},

});