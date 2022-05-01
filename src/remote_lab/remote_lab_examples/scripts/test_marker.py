#!/usr/bin/env python
import roslib; roslib.load_manifest('wviz')
import rospy
import time


from std_msgs.msg import String
from visualization_msgs.msg import Marker

def callback(marker):
    rospy.loginfo(rospy.get_name()+"Got a marker of type %d",marker.type)
    #time.sleep(10)

def listener():
    rospy.init_node('marker_listener', anonymous=True)
    rospy.Subscriber("/tabletop_detector_markers", Marker, callback)
    rospy.spin()

if __name__ == '__main__':
    listener()
