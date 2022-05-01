#!/usr/bin/env python
import roslib; roslib.load_manifest('robot_booking')
import rospy
from threading import Lock
from std_msgs.msg import *
from robot_booking.srv import *
from robot_booking.msg import *
from visualization_msgs.msg import * 
from interactive_marker_client.msg import *

class Booklist:
  def __init__(self):
    self.robot_inuse = False
    self.robot_inuse_name = "get_robot_status"
    self.robot_set_name = "set_robot_status"
    self.lock = Lock()

    self.exp_topic = "/experiment_result"
    self.exp2_topic="/experiment_info"
    self.key_topic = "/keyboard"
    self.marker1_topic = "/intent"
    self.marker2_topic ="/median_array"
    self.intmarker1_topic = "/grasp_locations/update_web"
    self.intmarker2_topic = "/gripper_control/update_web"

  def spin(self):
    self.checkService = rospy.Service(self.robot_inuse_name, CheckRobot,self.checkRobotStatus)
    self.setService = rospy.Service(self.robot_set_name, CheckRobot,self.setRobotStatus)
    self.pubExperimentResult = rospy.Publisher(self.exp_topic, ExperimentResult)
    self.pubExperimentInfo = rospy.Publisher(self.exp2_topic, ExperimentInfo)
    self.pubKey = rospy.Publisher(self.key_topic, Keys)
    self.pubMarker1 = rospy.Publisher(self.marker1_topic, Marker)
    self.pubMarker2 = rospy.Publisher(self.marker2_topic, MarkerArray)
    self.pubIntMarker1 = rospy.Publisher(self.intmarker1_topic, InteractiveMarkerUpdateWeb)
    self.pubIntMarker2 = rospy.Publisher(self.intmarker2_topic, InteractiveMarkerUpdateWeb)

    rospy.loginfo('Robot booking Initialized')

    rospy.spin()
    rospy.loginfo('byebye')


  def checkRobotStatus(self,msg):
    rospy.loginfo('Checking robot : ' + str(self.robot_inuse))
    rv = False
    self.lock.acquire()
    if self.robot_inuse == True:
      rv = False
    else:
      rv = True
    self.lock.release()
    return CheckRobotResponse(rv)

  def setRobotStatus(self,msg):
    rv = False
    self.lock.acquire()
    rospy.loginfo('Setting robot flag to ' + str(msg.set))

    if self.robot_inuse == True:
      rv = False
    else:
      rv = True
#    self.robot_inuse = msg.set
    self.lock.release()

    return CheckRobotResponse(rv)
    
      

if __name__ == "__main__":
  try:
    rospy.init_node('robot_booking')
    node = Booklist()
    node.spin() 
  except rospy.ROSInterruptException: pass
