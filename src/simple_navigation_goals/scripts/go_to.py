#!/usr/bin/env python

"""
goto.py is a simple navigation system that can go to a location
  based on a voice command. 
"""

import roslib;# roslib.load_manifest('maxwell_navigation')
import rospy
import math

import tf
from tf.transformations import euler_from_quaternion, quaternion_from_euler
from geometry_msgs.msg import PoseStamped
from std_msgs.msg import String

from move_base_msgs.msg import MoveBaseAction, MoveBaseGoal
import actionlib
from actionlib_msgs.msg import *
from geometry_msgs.msg import Pose, Point, Quaternion


goals = { "Assem's Office": [-6.61, 9.27, 0.000, 1.000],
          "James' Office": [-3.63, 8.9, 0.000, 1.000],
          "Leigh's Office": [-11.8, 5.38, 0.000, 1.000],
          "Curtis' Office": [3.027, -0.966, 0.000, 1.000],
          "Entrance": [3.38, 6.26, 0.000, 1.000],
          "Meeting": [-1.48, 9.63, 0.000, 1.000],
          "Kitchen": [0.0564, 3.46, 0.000, 1.000],
          "The Hallway": [-8.22, 7.2, 0.000, 1.000] }

class maxwell_goto:

    def __init__(self):
        self.msg = PoseStamped()
        self.msg.header.frame_id = "/map"

	self.move_base = actionlib.SimpleActionClient("move_base", MoveBaseAction)
	rospy.loginfo("Wait for the action server to come up")

	# Allow up to 5 seconds for the action server to come up

	self.move_base.wait_for_server(rospy.Duration(10))


        self.pub_ = rospy.Publisher('/move_base_simple/goal', PoseStamped, queue_size=10)
        rospy.Subscriber('/kws_data', String, self.speechCb)
        rospy.spin()

    def setMsg(self, goal):
        self.msg.pose.position.x = goals[goal][0]
        self.msg.pose.position.y = goals[goal][1]
        self.msg.pose.position.z = goals[goal][2]
        q = quaternion_from_euler(0, 0, goals[goal][3], 'sxyz')
        self.msg.pose.orientation.x = q[0]
        self.msg.pose.orientation.y = q[1]
        self.msg.pose.orientation.z = q[2]
        self.msg.pose.orientation.w = q[3]
  

    def waitForgoal(self, goal_sent):
	if(goal_sent):
        # Allow TurtleBot up to 60 seconds to complete task
	    success = self.move_base.wait_for_result(rospy.Duration(60)) 

            state = self.move_base.get_state()

        if success and state == GoalStatus.SUCCEEDED:
            goal_sent = False
            # We made it!
        else:
            goal_sent = False
            self.move_base.cancel_goal()
            self.pub_.publish(self.msg)


      
    def speechCb(self, msg):
        rospy.loginfo(msg.data)
        self.msg.header.stamp = rospy.Time.now()
        self.goal_sent = True
        if msg.data.find("home") > -1: 
            self.setMsg("Aseem's Office")
        elif msg.data.find("james") > -1:
            self.setMsg("James' Office")
        elif msg.data.find("leigh") > -1:
            self.setMsg("Leigh's Office")
        elif msg.data.find("curtis") > -1:
            self.setMsg("Curtis' Office")
        elif msg.data.find("entrance") > -1:
            self.setMsg("Entrance")
        elif msg.data.find("meeting") > -1:
            self.setMsg("Meeting")
        elif msg.data.find("kitchen") > -1:
            self.setMsg("Kitchen")
        elif msg.data.find("hallway") > -1:
            self.setMsg("The Hallway")
        else:
            rospy.loginfo("unknown goal!")
            self.goal_sent = False
            return

        self.waitForgoal(self.goal_sent)
        return



       



    def cleanup(self):
        # stop the robot!
        twist = Twist()
        self.pub_.publish(twist)

if __name__=="__main__":
    rospy.init_node('maxwell_goto')
    try:
        maxwell_goto()
    except:
	pass
