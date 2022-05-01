#!/usr/bin/env python
import roslib; roslib.load_manifest('wviz')
import rospy
import time

from std_msgs.msg import String
from pr2_pick_and_place_service.srv import *

def listener():
	rospy.init_node('test_service', anonymous=True)
    
	rospy.wait_for_service('pick_and_place_detect_object')
	try:
		detect_object = rospy.ServiceProxy('pick_and_place_detect_object', DetectObjects)
		resp1 = detect_object('d')
		print 'Service call succeeded'
		print 'Received %d objects' % (len(resp1.objects),)
	except rospy.ServiceException, e:
		print "Service call failed"
    
if __name__ == '__main__':
    listener()
