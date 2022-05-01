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


ros.pr2interaction.pr2_mechanism_interface=Class.extend({
	init:function(node){
	    this.node=node;
	    this.IK_SERVICE_SUFFIX = "/constraint_aware_ik";
	    this.FK_SERVICE_SUFFIX = "/get_fk";
	    this.INTERPOLATED_IK_SERVICE_SUFFIX = "/interpolated_ik";
	    this.INTERPOLATED_IK_SET_PARAMS_SERVICE_SUFFIX = "/interpolated_ik_set_params";
	    this.IK_QUERY_SERVICE_SUFFIX = "/get_ik_solver_info";
	    this.GRASP_STATUS_SUFFIX = "/grasp_status";
	    this.CHECK_STATE_VALIDITY_NAME = "environment_server/get_state_validity";
	    this.NORMALIZE_SERVICE_NAME = "trajectory_filter_unnormalizer/filter_trajectory";
	    
	    this.REACTIVE_GRASP_ACTION_SUFFIX = "/reactive_grasp";
	    this.REACTIVE_LIFT_ACTION_SUFFIX = "/reactive_lift";
	    this.REACTIVE_PLACE_ACTION_SUFFIX = "/reactive_place";
	    this.MOVE_ARM_ACTION_SUFFIX = "/move_arm";
	    this.TRAJECTORY_ACTION_SUFFIX = "/joint_trajectory";
	    this.HAND_POSTURE_ACTION_SUFFIX = "/hand_posture_execution";
	    this.MOVE_ARM_PLANNER_ID = "SBLkConfig1";
	    this.MOVE_ARM_PLANNER_SERVICE_NAME = "ompl_planning/plan_kinematic_path";
	    
	    this.MOVE_ARM_CONSTRAINED_PLANNER_SERVICE_NAME = "ompl_planning/plan_kinematic_path";
	    this.ATTACHED_COLLISION_TOPIC="attached_collision_object";
	    this.POINT_HEAD_ACTION_TOPIC = "/head_traj_controller/point_head_action";
	    this.OBJECT_POSITION_TOLERANCE_X = 0.02;
	    this.OBJECT_POSITION_TOLERANCE_Y = 0.02;
	    this.OBJECT_POSITION_TOLERANCE_Z = 0.02;
	    
		    //multi arm service clients 
	    this.ik_query_client=new ros.MultiArmServiceWrapper(node, "", this.IK_QUERY_SERVICE_SUFFIX, true);
	    this.ik_service_client=new ros.MultiArmServiceWrapper(node, "", this.IK_SERVICE_SUFFIX, true);
	    this.fk_service_client=new ros.MultiArmServiceWrapper(node, "", this.FK_SERVICE_SUFFIX, true);
	    this.interpolated_ik_service_client = new ros.MultiArmServiceWrapper(node, "", this.INTERPOLATED_IK_SERVICE_SUFFIX, true);
	    this.interpolated_ik_set_params_client= new ros.MultiArmServiceWrapper(node, "", this.INTERPOLATED_IK_SET_PARAMS_SERVICE_SUFFIX, true);
	    this.grasp_status_client=new ros.MultiArmServiceWrapper(node, "", this.GRASP_STATUS_SUFFIX, true);
	    
	    //simple service clients
	    this.check_state_validity_client= new ros.ServiceWrapper(node, this.CHECK_STATE_VALIDITY_NAME);
	    this.joint_trajectory_normalizer_service =new ros.ServiceWrapper(node, this.NORMALIZE_SERVICE_NAME);
	    
	    //multi arm action clients
	    this.reactive_grasp_action_client= new ros.MultiArmActionWrapper(node, "", this.REACTIVE_GRASP_ACTION_SUFFIX, '/object_manipulation_msgs/ReactiveGraspAction');
		    
	    this.reactive_lift_action_client= new ros.MultiArmActionWrapper(node, "", this.REACTIVE_LIFT_ACTION_SUFFIX, '/object_manipulation_msgs/ReactiveLiftAction');
	    this.reactive_place_action_client= new ros.MultiArmActionWrapper(node, "", this.REACTIVE_PLACE_ACTION_SUFFIX, '/object_manipulation_msgs/ReactivePlaceAction');
	    this.move_arm_action_client= new ros.MultiArmActionWrapper(node, "", this.MOVE_ARM_ACTION_SUFFIX, '/move_arm_msgs/MoveArmAction');
	    this.traj_action_client=new ros.MultiArmActionWrapper(node, "", this.TRAJECTORY_ACTION_SUFFIX, '/pr2_controllers_msgs/JointTrajectoryAction');
	    this.hand_posture_client=new ros.MultiArmActionWrapper(node,"", this.HAND_POSTURE_ACTION_SUFFIX, '/object_manipulation_msgs/GraspHandPostureExecutionAction');
	    
		    //head action client
	    this.point_head_action_client= new ros.ActionWrapper(node, this.POINT_HEAD_ACTION_TOPIC, 'pr2_controllers_msgs/PointHeadAction',true);
	    	    
	    //collison map publishing topics
	    this.attached_object_pub=node.advertise(this.ATTACHED_COLLISION_TOPIC, '/mapping_msgs/AttachedCollisionObject');
	    
	},

	attemptMoveArmToGoal function:(arm_name, desired_joint_values){
	    int num_tries = 0;
	    int max_tries = 5
	    motion_plan_request.group_name=handDescription().armGroup(arm_name);  //TODO: IMPLEMENT THIS
	    motion_plan_request.num_planning_attempts=1;
	    motion_plan_request.allowed_planning_time=5;//check this
	    motion_plan_request.planner_id=MOVE_ARM_PLANNER_ID;
	    
	    planner_service_name=MOVE_ARM_SERVICE_NAME;
	    joint_names=getJointNames(arm_name); //TODO: IMPLEMENT THIS
	    
	    
	    
			
		    }
		});
	    
	}


    });