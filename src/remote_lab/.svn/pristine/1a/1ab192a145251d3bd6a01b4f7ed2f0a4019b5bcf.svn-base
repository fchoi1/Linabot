#!/usr/bin/python
# Software License Agreement (BSD License)
#
# Copyright (c) 2009, Bosch LLC
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions
# are met:
#
#  * Redistributions of source code must retain the above copyright
#    notice, this list of conditions and the following disclaimer.
#  * Redistributions in binary form must reproduce the above
#    copyright notice, this list of conditions and the following
#    disclaimer in the documentation and/or other materials provided
#    with the distribution.
#  * Neither the name of the Willow Garage nor the names of its
#    contributors may be used to endorse or promote products derived
#    from this software without specific prior written permission.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
# "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
# LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
# FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
# COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
# INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
# BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
# LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
# CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
# LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
# ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
# POSSIBILITY OF SUCH DAMAGE.
#
# author: Sarah Osentoski 

## @package pick_and_place_manager
# Functions to grasp objects off flat tables and place them down in 
# specified rectangular regions in space

import roslib
roslib.load_manifest('pr2_pick_and_place_service')
import rospy
from object_manipulation_msgs.msg import PickupAction, PickupGoal, \
    PlaceAction, PlaceGoal, GripperTranslation, ReactivePlaceAction, ReactivePlaceGoal
from object_manipulation_msgs.srv import FindClusterBoundingBox, FindClusterBoundingBoxRequest
from object_manipulation_msgs.msg import ManipulationResult, GraspableObject
from tabletop_object_detector.srv import TabletopDetection, TabletopDetectionRequest
from tabletop_object_detector.msg import TabletopDetectionResult
from tabletop_collision_map_processing.srv import \
    TabletopCollisionMapProcessing, TabletopCollisionMapProcessingRequest
from pr2_controllers_msgs.msg import PointHeadAction, PointHeadGoal, Pr2GripperCommand
from pr2_pick_and_place_service.srv import *
from pr2_pick_and_place_service.msg import *
from trajectory_msgs.msg import JointTrajectory, JointTrajectoryPoint
import tf
import actionlib


from pr2_pick_and_place_demos.pick_and_place_manager import *

##Manager for pick and place actions
class PickAndPlaceService():


    def __init__(self, use_slip_controller = 0, use_slip_detection = 0):

        #pick and place manager from demos
        self.pickandplacemanager=PickAndPlaceManager()

        self.whicharm=1  #gave default arm
        self. lgripper=rospy.Publisher('/l_gripper_controller/command', Pr2GripperCommand)
        self. rgripper=rospy.Publisher('/r_gripper_controller/command', Pr2GripperCommand)
        
        self.headpub=rospy.Publisher('/head_traj_controller/command', JointTrajectory, latch=True)
        self.headx=0
        self.heady=0
        self.table_detected=False
        
        #Definition for Provided Services
        self.pickplaceservice_detachobject=rospy.Service('pick_and_place_detach_object', DetachObjectFromGripper, self.detach_object_service_interface)
        self.pickplaceservice_detectobjects=rospy.Service('pick_and_place_detect_object', DetectObjects, self.detect_object_service_interface)
        self.pickplaceservice_detecttable=rospy.Service('pick_and_place_detect_table', DetectTable, self.detect_table_service_interface)
        self.pickplaceservice_pickupobject=rospy.Service('pick_and_place_pickup_object', PickUpObject, self.pickup_object_service_interface)
        self.pickplaceservice_pointhead=rospy.Service('pick_and_place_point_head', PointHead, self.point_head_service_interface)
        self.pickplaceservice_selectarm=rospy.Service('pick_and_place_select_arm', SelectArm, self.select_arm_service_interface)
        self.pickplaceservice_switchsides=rospy.Service('pick_and_place_switch_sides', SwitchPickupPutdownSides, self.switch_sides_service_interface)
        self.pickplaceservice_placeobject=rospy.Service('pick_and_place_place_object', PlaceObject, self.place_object_service_interface)
        self.pickplaceservice_armtoside=rospy.Service('pick_and_place_move_arm_to_side', MoveArmToSide, self.move_arm_to_side_service_interface)
        self.pickplaceservice_armtofront=rospy.Service('pick_and_place_move_arm_to_front', MoveArmToFront, self.move_arm_to_front_service_interface)        


        #arm-away joint angles                                                                                                                                                        
        self.arm_above_and_to_side_angles = [[-0.968, 0.729, -0.554, -1.891, -1.786, -1.127, 0.501],
                                        [0.968, 0.729, 0.554, -1.891, 1.786, -1.127, 0.501]]
        self.arm_to_side_angles = [[-2.135, 0.803, -1.732, -1.905, -2.369, -1.680, 1.398],
                              [2.135, 0.803, 1.732, -1.905, 2.369, -1.680, 1.398]]
        self.arm_above_and_to_front_angles=[[-0.968, 0.729, -0.554, -1.891, -1.786, -1.127, 0.501], [0.968, 0.729, 0.554, -1.891, 1.786, -1.127, 0.501]]
        self.arm_to_front_angles=[[0.0, 1.203, 0.0, -2.105,  -3.13, -1.680, 1.398],[0.0, 1.203, 0.0, -2.105,  3.13, -1.680, 1.398]]

    
    def getObjects(self):
        objectlist=[];
        print objectlist
        print type(self.pickandplacemanager.detected_objects)
        for (ind, object) in enumerate(self.pickandplacemanager.detected_objects):
            print "indext:"
            print ind
            ob=PickPlaceObject()
            ob.objectid=ind
            ob.pose=object.pose
            ob.object=object.object
            print type(ob)
            print type(ob.object)
            print type(object.pose)
            print type(object.box_dims)
            ob.boundingbox=object.box_dims
            
            objectlist.append(ob)
        print len(objectlist)
        print type(objectlist)
        return objectlist

    #opens hand to drop object
    def drop_object(self, arm):
        gripper_command=Pr2GripperCommand()
        gripper_command.position=.08
        gripper_command.max_effort=-1;
        if arm=='l':
            self.lgripper.publish(gripper_command)
        else:
           self. rgripper.publish(gripper_command)

    #opens hand to drop object  
    #future improvement: check that something is in the hand
    def detach_object_service_interface(self, req):
        #set the current positions of the wrists as the current 'goals' relative to which Cartesian movements are expressed
        arm=req.arm
        
        if arm=='r'or  arm=='l':
            self.drop_object(arm)
            
        else:
            return DetachObjectFromGripperResponse(False)
        
        return DetachObjectFromGripperResponse(True)

    #detects object 
    def detect_object_service_interface(self, req):
        command=req.command
        if not self.table_detected:
            self.pickandplacemanager.find_table()

        if command=='d':
            rospy.loginfo("detecting objects")
            self.pickandplacemanager.call_tabletop_detection(update_table = 0, clear_attached_objects = 0)
        elif input == 'da':
            rospy.loginfo("detecting objects and clearing  attached objects")
            self.pickandplacemanager.call_tabletop_detection( update_table = 0, clear_attached_objects = 1)
        elif input == 'dp':
            rospy.loginfo("detecting objects, taking a new static collision map, and clearing attached objects")
            self.pickandplacemanager.call_tabletop_detection(update_table = 0, clear_attached_objects = 1, num_models = 5)
            
 #update current arm goals 
        print('returned from service call')
        objectlist=self.getObjects()
        print('length of objectlist')

        print(len(objectlist))
        rvar= DetectObjectsResponse(objectlist)
        print(len(rvar.objects))
        
        return DetectObjectsResponse(objectlist) #change this to 

    def detect_table_service_interface(self, req):
        rospy.loginfo("finding the table")
        self.pickandplacemanager.find_table()
        print "found table"
        return DetectTableResponse(self.pickandplacemanager.table_height, self.pickandplacemanager.table_front_edge_x, self.pickandplacemanager.place_rect_dims) #change this to 
        
    def move_head(self, dir):
        delta=.01
        negdelta=-.01
        if dir=='l':
            self.headx=self.headx+negdelta
        elif  dir=='r':
            self.headx=self.headx+delta
        elif dir=='u':
            print "moving head down"
            print negdelta
            self.heady=self.heady+negdelta
        elif dir =='d' :
            self.heady=self.heady+delta
        
        if self.headx < -2.8:
            self.headx=-2.8
        elif self.headx> 2.8:
            self.headx=2.8
        
        if self.heady< -.24:
            self.heady=-.24
        elif self.heady> 1.16:
            self.heady=1.16
        print self.headx
        print self.heady
        traj=JointTrajectory()
        traj.joint_names = ["head_pan_joint", "head_tilt_joint"]
        traj.points = []
        positions=[self.headx, self.heady]
        velocities=[0.0]*len(positions)
        accelerations=[]
        time_from_start=rospy.Duration(0, 0)
        traj.points.append(JointTrajectoryPoint(positions, velocities,
                                                accelerations,  time_from_start))
        self.headpub.publish(traj)

                     
    def point_head_service_interface(self, req):
        side=req.dir
        rospy.loginfo("pointing the head at the current place location and draw the place area")
        if side=='r' or side=='l' or side=='d' or side =='u' :
            self.move_head(side)
    

        else:
            self.point_head_at_place_rect()
            self.draw_place_area()
            
        return PointHeadResponse(True)

    def pickup_object_service_interface(self, req):
        object_num=req.objectid
        arm=req.arm

        if arm=='r':
            armnum=0
        elif arm=='l':
            armnum=1
        else:
            return PickUpObjectResponse(False)
        
        (result, arm_used)=self.pickandplacemanager.grasp_object_and_check_success(self.pickandplacemanager.detected_objects[object_num], armnum)
        if result=="succeeded":
            return PickUpObjectResponse(True)
        elif result=="attempt failed":
            return PickUpObjectResponse(False)
        elif result == "no feasible grasp":
            rospy.loginfo("no feasible grasp for this object with the %s arm"%self.arm_dict[self.whicharm])
            return PickUpObjectResponse(False)
         
    #Service Changes arm that is being used for tasks.     
    def select_arm_service_interface(self, req):
        arm=req.side
        if arm=='r':
           self.whicharm=0
        elif arm=='l':
            self.whicharm =1
        else:
            return SelectArmResponse(False)
        
        return SelectArmResponse(True)

    #switch the pickup and place sides of the table
    def switch_sides(self):
        self.pickandplacemanager.put_down_side=self.pickandplacemanager.pick_up_side
        self.pickandplacemanager.pick_up_side=1-self.pickandplacemanager.put_down_side
        rospy.loginfo("switching sides!  pick-up side is now %s, put-down is %s"%(self.pickandplacemanager.arm_dict[self.pick_up_side],  self.pickandplacemanager.arm_dict[self.put_down_side]))
        
        #update the place rectangle
        self.set_table_place_rectangle(self.pickandplacemanager.put_down_side)
 
    #set the place rectangle to one side of the table
    def set_table_place_rectangle(self, side):
        rect_pose_mat = scipy.identity(4)
        rect_pose_mat[0:3, 3] = scipy.matrix(self.pickandplacemanager.table_centers[side])
        rect_pose_stamped = stamp_pose(mat_to_pose(rect_pose_mat), 'base_link')
        self.pickandplacemanager.set_place_area(rect_pose_stamped, self.pickandplacemanager.table_side_dims)

    def switch_sides_service_interface(self, req):
        self.switch_sides()
        return SwitchPickupPutdownSidesResponse(True)

    

    def place_object_service_interface(self, req):
        command=req.command
        arm=req.arm
        rightarm=0
        leftarm=1
        
        if arm=='r':
            armnum=0
        else:
            armnum=1
        
        if command=='w' or command=='wo':
            if not any(self.pickandplacemanager.held_objects):
                print "the robot doesn't think it's holding any objects \n  Use manual control to do an open loop place anyway"
                return PlaceObjectResponse(False)
            elif arm=='l' and not self.pickandplacemanager.held_objects[leftarm]:
                print "the robot doesn't think it's holding any objects in its left arm \n Use manual control to do an open loop place anyway"

            elif arm=='r' and not self.pickandplacemanager.held_objects[rightarm]:
                print "the robot doesn't think it's holding any objects in its rigt arm \n Use manual control to do an open loop place anyway"
                return PlaceObjectResponse(False)
            if command =='wo':
                if not self.pickandplacemanager.held_objects[armnum]:
                        print "no recorded pose for an object in that gripper!"
                        return PlaceObjectResponse(False)
                self.pickandplacemanager.place_object(armnum, self.held_objects[armnum].pose)
            else:
                self.pickandplacemanager.put_down_object(armnum, use_place_override = 1)

            return PlaceObjectResponse(True)
        else:
            return PlaceObjectResponse(False)
    def move_arm_to_side_service_interface(self, req):
        arm=req.arm
        if arm=='r':
            armnum=0
        else:
            armnum=1

        if arm=='l' or arm=='r':
            self.pickandplacemanager.move_arm_to_side(armnum)
        else:
            return MoveArmToSideResponse(False)
        return MoveArmToSideResponse(True)

    def move_arm_to_front(self, whicharm, try_constrained=0):
        if try_constrained:
            if whicharm == 1:
                start_angles = [0, 1.203, 0, -2.105,  3.13, -1.680, 1.398]
            else:
                start_angles = [0, 1.203, 0, -2.105, -3.13, -1.680, 1.398]
                
             #default location is arm-to-the-side
            if whicharm == 1:
                rospy.loginfo("Planning for the left arm")
                location = [0.05, 0.576, 0.794]
            else:
                rospy.loginfo("Planning for the right arm")
                location = [0.05, -0.576, 0.794]

            current_pose = self.pickandplacemanager.cms[whicharm].get_current_wrist_pose_stamped('base_link')
            orientation_constraint = self.pickandplacemanager.get_keep_object_level_constraint(whicharm,current_pose)
            constraint = Constraints()
            constraint.orientation_constraints.append(orientation_constraint)
            result = self.pickandplacemanager.try_to_move_constrained(whicharm,constraint,3,start_angles,location)
            if result == 1:
                return 1

        #either constrained move didn't work or we didn't request a constrained move
        result = self.pickandplacemanager.try_hard_to_move_joint(whicharm, [self.arm_above_and_to_front_angles[whicharm],self.arm_to_front_angles[whicharm]], use_open_loop = 1)
        return result  


    def move_arm_to_front_service_interface(self, req):
        arm=req.arm
        if arm=='r':
            armnum=0
        else:
            armnum=1;
        if arm=='l' or arm=='r':
            self.move_arm_to_front(armnum)
        else: 
            return MoveArmToFrontResponse(False)
        return MoveArmToFrontResponse(True)

if __name__ == '__main__':

    rospy.init_node('pick_and_place_manager', anonymous=True)
    pick_and_place_manager = PickAndPlaceService()
    rospy.spin()
#    pick_and_place_manager.keyboard_interface()
